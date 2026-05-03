"""
ADHS Berlin Agent CLI
Verwendung:
  adhs ask "Schreib mir einen Newsletter-Entwurf"
  adhs workflow newsletter "Meetup-Rückblick Oktober"
  adhs workflow feature "Newsletter-Signup mit Beehiiv"
  adhs workflow blog "ADHS Diagnose Berlin Erwachsene"
  adhs workflow chatbot "Baue den ADHS-Assistenten"
  adhs qa --file ./outputs/content/draft.md
  adhs status
  adhs costs
"""
from pathlib import Path
from typing import Optional

import typer
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich import box

app = typer.Typer(
    name="adhs",
    help="ADHS Berlin Community — KI-Agenten-Team",
    add_completion=False,
    rich_markup_mode="rich",
)
console = Console()

AVAILABLE_WORKFLOWS = ["newsletter", "feature", "blog", "chatbot"]


def _init_env() -> None:
    """Lädt .env und prüft ANTHROPIC_API_KEY."""
    from dotenv import load_dotenv
    load_dotenv()
    import os
    if not os.getenv("ANTHROPIC_API_KEY"):
        console.print("[bold red]❌ ANTHROPIC_API_KEY fehlt.[/bold red] Bitte .env konfigurieren.")
        raise typer.Exit(1)


@app.command()
def ask(
    prompt: str = typer.Argument(..., help="Deine Anfrage an das Agenten-Team"),
) -> None:
    """Freie Anfrage — ProjectManager entscheidet, welche Agenten antworten."""
    _init_env()
    from orchestrator import Orchestrator
    from utils.cost_tracker import tracker

    console.print(Panel(prompt, title="[bold cyan]Anfrage[/bold cyan]", box=box.ROUNDED))
    orch = Orchestrator()
    result = orch.route(prompt)
    console.print(Panel(result.final_output, title="[bold green]Ergebnis[/bold green]", box=box.ROUNDED))
    tracker.print_summary()


@app.command()
def workflow(
    name: str = typer.Argument(..., help=f"Workflow-Name: {', '.join(AVAILABLE_WORKFLOWS)}"),
    input_text: str = typer.Argument(..., help="Eingabe / Kontext für den Workflow"),
) -> None:
    """Startet einen vordefinierten Workflow direkt."""
    _init_env()
    if name not in AVAILABLE_WORKFLOWS:
        console.print(f"[red]Unbekannter Workflow: '{name}'[/red]")
        console.print(f"Verfügbar: {', '.join(AVAILABLE_WORKFLOWS)}")
        raise typer.Exit(1)

    from orchestrator import Orchestrator
    from utils.cost_tracker import tracker

    console.print(Panel(
        f"[bold]{name.upper()}[/bold]\n[dim]{input_text}[/dim]",
        title="[bold cyan]Workflow gestartet[/bold cyan]",
        box=box.ROUNDED,
    ))

    orch = Orchestrator()
    result = orch.run_workflow(name, input_text)

    if result.success:
        console.print(Panel(result.final_output, title="[bold green]✅ Workflow abgeschlossen[/bold green]", box=box.ROUNDED))
    else:
        failed = [s.agent_name for s in result.steps if not s.success]
        console.print(f"[yellow]⚠️  Teilweise fehlgeschlagen: {failed}[/yellow]")
        console.print(result.final_output)

    tracker.print_summary()


@app.command()
def qa(
    file: Optional[Path] = typer.Option(None, "--file", "-f", help="Datei die geprüft werden soll"),
    text: Optional[str] = typer.Option(None, "--text", "-t", help="Text direkt eingeben"),
) -> None:
    """QA-Prüfung einer Datei oder eines Textes."""
    _init_env()
    if not file and not text:
        console.print("[red]Bitte --file oder --text angeben.[/red]")
        raise typer.Exit(1)

    content = text or Path(file).read_text(encoding="utf-8")  # type: ignore[arg-type]
    from agents import QAAgent
    from utils.cost_tracker import tracker

    agent = QAAgent()
    report = agent.run(f"Prüfe diesen Inhalt:\n\n{content}")
    score = agent.get_score(report)

    status_color = "green" if score >= 45 else "yellow" if score >= 30 else "red"
    console.print(Panel(
        report,
        title=f"[bold {status_color}]QA-Report — Score: {score}/60[/bold {status_color}]",
        box=box.ROUNDED,
    ))
    tracker.print_summary()


@app.command()
def status() -> None:
    """Zeigt Agenten-Team, verfügbare Workflows und Session-Infos."""
    from utils.cost_tracker import tracker

    table = Table(title="ADHS Berlin — Agenten-Team", box=box.ROUNDED, header_style="bold cyan")
    table.add_column("Agent", style="bold")
    table.add_column("Rolle")
    table.add_column("Output-Ordner")

    agents_info = [
        ("ProjectManagerAgent 🎯", "Orchestrierung, Routing, Task-Briefs", "outputs/"),
        ("VibeCoderAgent 🤖", "Rapid Prototyping, Quick PoCs", "outputs/code/"),
        ("FrontendAgent 🎨", "React/Next.js Komponenten, ADHS-Design", "outputs/code/"),
        ("BackendAgent ⚙️", "API Routes, Beehiiv/Luma/Claude API", "outputs/code/"),
        ("QAAgent 🔍", "Code-Review, ADHS-UX, DSGVO, Performance", "outputs/qa_reports/"),
        ("AutomationAgent ⚡", "n8n/Zapier Workflows, Social Media", "outputs/"),
        ("ContentAgent ✍️", "Newsletter, Blog, Social Media", "outputs/content/"),
        ("SEOAnalyticsAgent 🔎", "Keywords, On-Page-SEO, Plausible", "outputs/seo_reports/"),
    ]

    for name, role, folder in agents_info:
        table.add_row(name, role, folder)

    console.print(table)

    wf_table = Table(title="Verfügbare Workflows", box=box.SIMPLE, header_style="bold")
    wf_table.add_column("Befehl")
    wf_table.add_column("Ablauf")
    wf_table.add_row("adhs workflow newsletter '…'", "PM → Content → QA (→ Revision)")
    wf_table.add_row("adhs workflow feature '…'", "PM → VibeCoder → Frontend → Backend → QA")
    wf_table.add_row("adhs workflow blog '…'", "SEO-Brief → Content → QA")
    wf_table.add_row("adhs workflow chatbot '…'", "VibeCoder → Backend → Frontend → QA")
    console.print(wf_table)

    console.print(f"\n[dim]Session-Calls bisher: {len(tracker.records)} | Kosten: {tracker.total_cost_eur:.4f}€[/dim]")


@app.command()
def costs() -> None:
    """Zeigt Token-Verbrauch und Kosten dieser Session."""
    from utils.cost_tracker import tracker
    tracker.print_summary()


def main() -> None:
    app()


if __name__ == "__main__":
    main()
