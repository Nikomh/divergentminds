"""
Feature-Workflow: VibeCoder → Frontend → Backend → QA

Für neue Website-Features: schneller Prototype → production-ready Komponenten
→ API-Integration → QA-Freigabe.
"""
from pathlib import Path
from datetime import datetime

from agents import ProjectManagerAgent, VibeCoderAgent, FrontendAgent, BackendAgent, QAAgent
from orchestrator import AgentResponse, WorkflowResult
from utils.logger import log_workflow_step, log_success, log_info


def run(user_input: str) -> WorkflowResult:
    pm = ProjectManagerAgent()
    vibe = VibeCoderAgent()
    frontend = FrontendAgent()
    backend = BackendAgent()
    qa = QAAgent()
    steps: list[AgentResponse] = []

    # Schritt 1: PM-Brief
    log_workflow_step(1, 5, "ProjectManager erstellt Feature-Brief")
    plan = pm.analyze(f"Feature-Anfrage für ADHS Berlin Website:\n{user_input}")
    brief = plan.get("task_brief", user_input)
    steps.append(AgentResponse("ProjectManagerAgent", str(plan)))

    # Schritt 2: VibeCoder Prototype
    log_workflow_step(2, 5, "VibeCoder erstellt Quick Prototype")
    prototype = vibe.run(
        f"Erstelle einen Quick Prototype für:\n{brief}\n\nFokus: funktioniert, nicht perfekt."
    )
    steps.append(AgentResponse("VibeCoderAgent", prototype))

    # Schritt 3: Frontend production-ready
    log_workflow_step(3, 5, "FrontendAgent baut production-ready Komponente")
    frontend_code = frontend.run(
        f"Überarbeite diesen Prototype zu einer production-ready, ADHS-freundlichen "
        f"React-Komponente:\n\n{prototype}\n\nOriginal-Brief:\n{brief}"
    )
    steps.append(AgentResponse("FrontendAgent", frontend_code))

    # Schritt 4: Backend API Route (falls nötig)
    log_workflow_step(4, 5, "BackendAgent implementiert API-Integration")
    backend_code = backend.run(
        f"Implementiere die notwendigen API Routes und Backend-Integrationen für:\n"
        f"{brief}\n\nFrontend-Komponente (Referenz):\n{frontend_code[:500]}…"
    )
    steps.append(AgentResponse("BackendAgent", backend_code))

    # Schritt 5: QA
    log_workflow_step(5, 5, "QAAgent prüft alles")
    combined = f"Frontend:\n{frontend_code}\n\nBackend:\n{backend_code}"
    qa_report = qa.run(f"Prüfe dieses Feature für ADHS Berlin:\n\n{combined}")
    steps.append(AgentResponse("QAAgent", qa_report))

    _save_outputs(frontend_code, backend_code, qa_report, user_input)
    log_success("Feature-Workflow abgeschlossen.")

    final = f"## Frontend\n{frontend_code}\n\n## Backend\n{backend_code}\n\n## QA\n{qa_report}"
    return WorkflowResult(workflow="feature", steps=steps, final_output=final)


def _save_outputs(frontend: str, backend: str, qa: str, original: str) -> None:
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M")
    slug = original[:30].lower().replace(" ", "-")
    Path("outputs/code").mkdir(parents=True, exist_ok=True)
    Path("outputs/qa_reports").mkdir(parents=True, exist_ok=True)

    Path(f"outputs/code/{ts}_feature_{slug}_frontend.md").write_text(frontend, encoding="utf-8")
    Path(f"outputs/code/{ts}_feature_{slug}_backend.md").write_text(backend, encoding="utf-8")
    Path(f"outputs/qa_reports/{ts}_feature_{slug}_qa.md").write_text(qa, encoding="utf-8")
    log_info(f"Feature-Outputs gespeichert unter outputs/code/ und outputs/qa_reports/")
