from datetime import datetime
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
from rich.spinner import Spinner
from rich.live import Live
from rich import box

console = Console()

AGENT_COLORS = {
    "ProjectManagerAgent": "bold cyan",
    "VibeCoderAgent": "bold magenta",
    "FrontendAgent": "bold blue",
    "BackendAgent": "bold yellow",
    "QAAgent": "bold red",
    "AutomationAgent": "bold green",
    "ContentAgent": "bold white",
    "SEOAnalyticsAgent": "bold bright_cyan",
    "Orchestrator": "bold bright_white",
}


def agent_color(name: str) -> str:
    return AGENT_COLORS.get(name, "bold white")


def log_agent_start(agent_name: str, task: str) -> None:
    color = agent_color(agent_name)
    console.print()
    console.print(
        Panel(
            f"[dim]{task[:120]}{'…' if len(task) > 120 else ''}[/dim]",
            title=f"[{color}]▶ {agent_name}[/{color}]",
            border_style=color.replace("bold ", ""),
            box=box.ROUNDED,
        )
    )


def log_agent_result(agent_name: str, result: str, input_tokens: int, output_tokens: int, cost_eur: float) -> None:
    color = agent_color(agent_name)
    console.print(
        Panel(
            result,
            title=f"[{color}]✓ {agent_name}[/{color}]",
            subtitle=f"[dim]in:{input_tokens} out:{output_tokens} ≈ {cost_eur:.4f}€[/dim]",
            border_style=color.replace("bold ", ""),
            box=box.ROUNDED,
        )
    )


def log_workflow_step(step: int, total: int, description: str) -> None:
    console.print(f"\n[dim]── Schritt {step}/{total}:[/dim] [bold]{description}[/bold]")


def log_info(message: str) -> None:
    console.print(f"[dim]ℹ  {message}[/dim]")


def log_success(message: str) -> None:
    console.print(f"[bold green]✅ {message}[/bold green]")


def log_warning(message: str) -> None:
    console.print(f"[bold yellow]⚠  {message}[/bold yellow]")


def log_error(message: str) -> None:
    console.print(f"[bold red]❌ {message}[/bold red]")


def spinner_context(message: str):
    """Kontextmanager: Spinner während API-Call läuft."""
    return Live(Spinner("dots", text=f" [dim]{message}[/dim]"), console=console, refresh_per_second=10)


def output_filename(agent_name: str, task_slug: str, subdir: str = "") -> str:
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M")
    slug = task_slug[:40].lower().replace(" ", "-").replace("/", "-")
    name = f"{ts}_{agent_name.lower()}_{slug}.md"
    if subdir:
        return f"outputs/{subdir}/{name}"
    return f"outputs/{name}"
