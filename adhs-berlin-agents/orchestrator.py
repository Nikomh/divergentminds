"""
Orchestrator: Leitet Anfragen an den richtigen Agenten oder Workflow weiter.
Der ProjectManagerAgent trifft die Routing-Entscheidung.
"""
import asyncio
from dataclasses import dataclass
from typing import Callable

from agents import (
    ProjectManagerAgent,
    VibeCoderAgent,
    FrontendAgent,
    BackendAgent,
    QAAgent,
    AutomationAgent,
    ContentAgent,
    SEOAnalyticsAgent,
)
from utils.logger import log_info, log_warning, log_success


@dataclass
class AgentTask:
    agent_name: str
    task: str
    context: dict | None = None


@dataclass
class AgentResponse:
    agent_name: str
    result: str
    success: bool = True
    error: str = ""


@dataclass
class WorkflowResult:
    workflow: str
    steps: list[AgentResponse]
    final_output: str

    @property
    def success(self) -> bool:
        return all(s.success for s in self.steps)


# Registry: Agentenname → Klasse
_AGENT_REGISTRY: dict[str, Callable] = {
    "ProjectManagerAgent": ProjectManagerAgent,
    "VibeCoderAgent": VibeCoderAgent,
    "FrontendAgent": FrontendAgent,
    "BackendAgent": BackendAgent,
    "QAAgent": QAAgent,
    "AutomationAgent": AutomationAgent,
    "ContentAgent": ContentAgent,
    "SEOAnalyticsAgent": SEOAnalyticsAgent,
}


class Orchestrator:
    def __init__(self) -> None:
        self._pm = ProjectManagerAgent()
        self._agent_cache: dict[str, object] = {}

    def _get_agent(self, name: str):
        """Lazy-initialisiert Agenten (erst beim ersten Aufruf)."""
        if name not in self._agent_cache:
            cls = _AGENT_REGISTRY.get(name)
            if cls is None:
                raise ValueError(f"Unbekannter Agent: {name}")
            self._agent_cache[name] = cls()
        return self._agent_cache[name]

    def route(self, user_input: str) -> WorkflowResult:
        """
        Analysiert die Anfrage via PM → entscheidet sequenziell oder parallel
        → führt aus → gibt WorkflowResult zurück.
        """
        log_info("ProjectManager analysiert Anfrage…")
        plan = self._pm.analyze(user_input)

        log_info(
            f"Plan: {plan.get('workflow')} | "
            f"Agenten: {plan.get('agents')} | "
            f"Priorität: {plan.get('priority')}"
        )

        task_brief = plan.get("task_brief", user_input)
        agent_names: list[str] = plan.get("agents", ["VibeCoderAgent"])

        if plan.get("workflow") == "parallel":
            responses = asyncio.run(self.run_parallel([
                AgentTask(name, task_brief) for name in agent_names
            ]))
        else:
            responses = self._run_sequential(agent_names, task_brief)

        final = responses[-1].result if responses else "Keine Ergebnisse."
        return WorkflowResult(workflow="auto", steps=responses, final_output=final)

    def run_workflow(self, workflow_name: str, user_input: str) -> WorkflowResult:
        """Startet einen benannten Workflow direkt."""
        from workflows import WORKFLOW_REGISTRY
        workflow_fn = WORKFLOW_REGISTRY.get(workflow_name)
        if workflow_fn is None:
            raise ValueError(f"Unbekannter Workflow: '{workflow_name}'. Verfügbar: {list(WORKFLOW_REGISTRY.keys())}")
        return workflow_fn(user_input)

    def _run_sequential(self, agent_names: list[str], initial_task: str) -> list[AgentResponse]:
        """Führt Agenten sequenziell aus — Output eines Agenten = Input des nächsten."""
        responses: list[AgentResponse] = []
        current_input = initial_task

        for name in agent_names:
            try:
                agent = self._get_agent(name)
                result = agent.run(current_input)
                resp = AgentResponse(agent_name=name, result=result)
                responses.append(resp)
                # Nächster Agent bekommt kombinierten Kontext
                current_input = (
                    f"Vorheriger Output von {name}:\n{result}\n\n"
                    f"Ursprüngliche Aufgabe:\n{initial_task}"
                )
            except Exception as exc:
                log_warning(f"{name} fehlgeschlagen: {exc}")
                responses.append(AgentResponse(agent_name=name, result="", success=False, error=str(exc)))

        return responses

    async def run_parallel(self, tasks: list[AgentTask]) -> list[AgentResponse]:
        """Führt unabhängige Agent-Tasks gleichzeitig aus."""
        loop = asyncio.get_running_loop()
        futures = [
            loop.run_in_executor(None, self._run_single_task, task)
            for task in tasks
        ]
        return list(await asyncio.gather(*futures, return_exceptions=False))

    def _run_single_task(self, task: AgentTask) -> AgentResponse:
        try:
            agent = self._get_agent(task.agent_name)
            result = agent.run(task.task, task.context)
            return AgentResponse(agent_name=task.agent_name, result=result)
        except Exception as exc:
            log_warning(f"{task.agent_name} fehlgeschlagen: {exc}")
            return AgentResponse(agent_name=task.agent_name, result="", success=False, error=str(exc))
