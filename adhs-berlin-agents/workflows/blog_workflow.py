"""
Blog-Workflow: SEO-Keyword → SEOAgent-Brief → ContentAgent schreibt → QA prüft
"""
from pathlib import Path
from datetime import datetime

from agents import SEOAnalyticsAgent, ContentAgent, QAAgent
from orchestrator import AgentResponse, WorkflowResult
from utils.logger import log_workflow_step, log_success, log_info


def run(user_input: str) -> WorkflowResult:
    seo = SEOAnalyticsAgent()
    content = ContentAgent()
    qa = QAAgent()
    steps: list[AgentResponse] = []

    # Schritt 1: SEO-Brief
    log_workflow_step(1, 3, "SEOAgent erstellt Keyword-Brief")
    seo_brief = seo.run(
        f"Erstelle einen vollständigen SEO-Brief für einen Blog-Artikel.\n"
        f"Keyword / Thema: {user_input}\n\n"
        f"Liefere: Primärkeyword, Long-Tail-Varianten, H2-Struktur, Meta-Description-Vorlage."
    )
    steps.append(AgentResponse("SEOAnalyticsAgent", seo_brief))

    # Schritt 2: Artikel schreiben
    log_workflow_step(2, 3, "ContentAgent schreibt Blog-Artikel")
    article = content.run(
        f"Schreibe einen Blog-Artikel (750-900 Wörter) für ADHS Berlin Community.\n\n"
        f"SEO-Brief:\n{seo_brief}"
    )
    steps.append(AgentResponse("ContentAgent", article))

    # Schritt 3: QA
    log_workflow_step(3, 3, "QAAgent prüft Artikel")
    qa_report = qa.run(f"Prüfe diesen Blog-Artikel auf Qualität, Stil und SEO:\n\n{article}")
    steps.append(AgentResponse("QAAgent", qa_report))

    _save_outputs(article, qa_report, user_input)
    log_success("Blog-Workflow abgeschlossen.")

    return WorkflowResult(workflow="blog", steps=steps, final_output=article)


def _save_outputs(article: str, qa: str, original: str) -> None:
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M")
    slug = original[:30].lower().replace(" ", "-")
    Path("outputs/content").mkdir(parents=True, exist_ok=True)
    Path("outputs/qa_reports").mkdir(parents=True, exist_ok=True)

    Path(f"outputs/content/{ts}_blog_{slug}.md").write_text(article, encoding="utf-8")
    Path(f"outputs/qa_reports/{ts}_blog_{slug}_qa.md").write_text(qa, encoding="utf-8")
    log_info(f"Blog-Outputs gespeichert unter outputs/content/")
