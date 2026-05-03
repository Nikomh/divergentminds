"""
Chatbot-Workflow: VibeCoder Prototype → Backend API Route → Frontend UI → QA

Baut den ADHS-Berlin-Chatbot (Phase 3) Schritt für Schritt.
"""
from pathlib import Path
from datetime import datetime

from agents import VibeCoderAgent, BackendAgent, FrontendAgent, QAAgent
from orchestrator import AgentResponse, WorkflowResult
from utils.logger import log_workflow_step, log_success, log_info


def run(user_input: str) -> WorkflowResult:
    vibe = VibeCoderAgent()
    backend = BackendAgent()
    frontend = FrontendAgent()
    qa = QAAgent()
    steps: list[AgentResponse] = []

    chatbot_brief = (
        f"ADHS-Berlin-Chatbot Feature-Anfrage:\n{user_input}\n\n"
        "Technische Anforderungen:\n"
        "- Claude API (claude-sonnet-4-5) mit Streaming\n"
        "- System Prompt: ADHS-Berlin-Kontext, Berlin-Ressourcen\n"
        "- Rate-Limiting: 10 Req/Min pro User\n"
        "- WCAG 2.1 AA, prefers-reduced-motion\n"
        "- Next.js 14 App Router + Tailwind + shadcn/ui"
    )

    log_workflow_step(1, 4, "VibeCoder erstellt Chatbot-Prototype")
    prototype = vibe.run(chatbot_brief)
    steps.append(AgentResponse("VibeCoderAgent", prototype))

    log_workflow_step(2, 4, "BackendAgent implementiert API Route mit Streaming")
    backend_code = backend.run(
        f"Implementiere die /api/chat Route für den ADHS-Berlin-Chatbot.\n\n"
        f"Prototype als Referenz:\n{prototype[:600]}…\n\n"
        f"Anforderungen: Claude API Streaming, Rate-Limiting, Input-Validierung mit zod."
    )
    steps.append(AgentResponse("BackendAgent", backend_code))

    log_workflow_step(3, 4, "FrontendAgent baut Chat-UI")
    frontend_code = frontend.run(
        f"Baue eine ADHS-freundliche Chat-UI Komponente.\n\n"
        f"Prototype:\n{prototype[:600]}…\n\n"
        f"Backend-API (Referenz):\n{backend_code[:400]}…\n\n"
        "Besondere Anforderungen: Keine ablenkenden Animationen, klare Fokus-States, "
        "Streaming-Text anzeigen, Ladezustand sichtbar."
    )
    steps.append(AgentResponse("FrontendAgent", frontend_code))

    log_workflow_step(4, 4, "QAAgent prüft Chatbot-Implementation")
    combined = f"Frontend:\n{frontend_code}\n\nBackend:\n{backend_code}"
    qa_report = qa.run(f"Prüfe den ADHS-Berlin-Chatbot:\n\n{combined}")
    steps.append(AgentResponse("QAAgent", qa_report))

    _save_outputs(frontend_code, backend_code, qa_report, user_input)
    log_success("Chatbot-Workflow abgeschlossen.")

    final = f"## Chat-UI\n{frontend_code}\n\n## API Route\n{backend_code}\n\n## QA\n{qa_report}"
    return WorkflowResult(workflow="chatbot", steps=steps, final_output=final)


def _save_outputs(frontend: str, backend: str, qa: str, original: str) -> None:
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M")
    Path("outputs/code").mkdir(parents=True, exist_ok=True)
    Path("outputs/qa_reports").mkdir(parents=True, exist_ok=True)

    Path(f"outputs/code/{ts}_chatbot_frontend.md").write_text(frontend, encoding="utf-8")
    Path(f"outputs/code/{ts}_chatbot_backend.md").write_text(backend, encoding="utf-8")
    Path(f"outputs/qa_reports/{ts}_chatbot_qa.md").write_text(qa, encoding="utf-8")
    log_info("Chatbot-Outputs gespeichert.")
