"""
Newsletter-Workflow: Stichpunkte → PM-Brief → ContentAgent → QAAgent → Output

Ablauf:
  1. ProjectManager erstellt strukturierten Task-Brief
  2. ContentAgent schreibt Newsletter-Entwurf
  3. QAAgent prüft (Score/60)
  4. Bei Score < 45: ContentAgent überarbeitet (max. 2 Zyklen)
  5. Output als Markdown gespeichert
"""
from pathlib import Path
from datetime import datetime

from agents import ProjectManagerAgent, ContentAgent, QAAgent
from orchestrator import AgentResponse, WorkflowResult
from utils.logger import log_workflow_step, log_info, log_success, log_warning
from utils.cost_tracker import tracker

MAX_REVISION_CYCLES = 2


def run(user_input: str) -> WorkflowResult:
    pm = ProjectManagerAgent()
    content = ContentAgent()
    qa = QAAgent()
    steps: list[AgentResponse] = []

    # Schritt 1: PM erstellt Task-Brief
    log_workflow_step(1, 4, "ProjectManager analysiert Stichpunkte")
    plan = pm.analyze(
        f"Erstelle einen Task-Brief für den ContentAgent. Aufgabe: Newsletter schreiben.\n"
        f"Eingabe vom Coach:\n{user_input}"
    )
    brief = plan.get("task_brief", user_input)
    steps.append(AgentResponse("ProjectManagerAgent", str(plan)))

    # Schritt 2: ContentAgent schreibt Entwurf
    log_workflow_step(2, 4, "ContentAgent schreibt Newsletter-Entwurf")
    draft = content.run(
        f"Schreibe einen Newsletter-Entwurf (450-550 Wörter) auf Basis dieser Informationen:\n{brief}"
    )
    steps.append(AgentResponse("ContentAgent", draft))

    # Schritt 3 + 4: QA-Prüfung mit optionalen Überarbeitungszyklen
    log_workflow_step(3, 4, "QAAgent prüft Entwurf")
    qa_report = qa.run(
        f"Prüfe diesen Newsletter-Entwurf für ADHS Berlin Community:\n\n{draft}"
    )
    score = qa.get_score(qa_report)
    steps.append(AgentResponse("QAAgent", qa_report))

    cycle = 0
    while score < 45 and cycle < MAX_REVISION_CYCLES:
        cycle += 1
        log_warning(f"QA-Score: {score}/60 — Überarbeitungszyklus {cycle}/{MAX_REVISION_CYCLES}")
        log_workflow_step(3, 4, f"ContentAgent überarbeitet (Zyklus {cycle})")
        draft = content.run(
            f"Überarbeite den Newsletter-Entwurf auf Basis dieses QA-Feedbacks.\n\n"
            f"QA-Report:\n{qa_report}\n\n"
            f"Ursprünglicher Entwurf:\n{draft}"
        )
        steps.append(AgentResponse("ContentAgent (Revision)", draft))

        qa_report = qa.run(
            f"Prüfe den überarbeiteten Newsletter-Entwurf:\n\n{draft}"
        )
        score = qa.get_score(qa_report)
        steps.append(AgentResponse("QAAgent (Re-Check)", qa_report))

    # Schritt 4: Outputs speichern
    log_workflow_step(4, 4, "Outputs speichern")
    _save_outputs(draft, qa_report, score, user_input)

    status = "✅ Bereit für Coach-Lektorat" if score >= 45 else f"⚠️ Score {score}/60 — manuelle Überarbeitung empfohlen"
    log_success(f"Newsletter-Workflow abgeschlossen. {status}")

    final = f"{draft}\n\n---\n\n{qa_report}\n\n**Status:** {status}"
    return WorkflowResult(workflow="newsletter", steps=steps, final_output=final)


def _save_outputs(draft: str, qa_report: str, score: int, original_input: str) -> None:
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M")
    Path("outputs/content").mkdir(parents=True, exist_ok=True)
    Path("outputs/qa_reports").mkdir(parents=True, exist_ok=True)

    draft_path = f"outputs/content/{ts}_newsletter_entwurf.md"
    qa_path = f"outputs/qa_reports/{ts}_newsletter_qa.md"

    Path(draft_path).write_text(
        f"# Newsletter-Entwurf\n_Erstellt: {ts}_\n_Input: {original_input[:80]}_\n\n---\n\n{draft}\n\n[KI-ENTWURF — Coach-Lektorat nötig!]",
        encoding="utf-8",
    )
    Path(qa_path).write_text(
        f"# QA-Report Newsletter\n_Erstellt: {ts}_\n_Score: {score}/60_\n\n---\n\n{qa_report}",
        encoding="utf-8",
    )
    log_info(f"Newsletter gespeichert: {draft_path}")
    log_info(f"QA-Report gespeichert: {qa_path}")
