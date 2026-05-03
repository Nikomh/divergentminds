from dataclasses import dataclass, field
from datetime import datetime
from rich.table import Table
from rich.console import Console
from rich import box

# Preise in USD pro 1M Tokens (claude-sonnet-4-5, Stand 2025)
PRICE_INPUT_PER_M = 3.00
PRICE_OUTPUT_PER_M = 15.00
USD_TO_EUR = 0.92

console = Console()


@dataclass
class CallRecord:
    timestamp: str
    agent: str
    task_slug: str
    input_tokens: int
    output_tokens: int
    cost_usd: float
    cost_eur: float


@dataclass
class CostTracker:
    session_start: str = field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d %H:%M"))
    records: list[CallRecord] = field(default_factory=list)

    def record(self, agent: str, task: str, input_tokens: int, output_tokens: int) -> CallRecord:
        cost_usd = (input_tokens * PRICE_INPUT_PER_M + output_tokens * PRICE_OUTPUT_PER_M) / 1_000_000
        cost_eur = cost_usd * USD_TO_EUR
        rec = CallRecord(
            timestamp=datetime.now().strftime("%H:%M:%S"),
            agent=agent,
            task_slug=task[:50],
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            cost_usd=cost_usd,
            cost_eur=cost_eur,
        )
        self.records.append(rec)
        return rec

    @property
    def total_input_tokens(self) -> int:
        return sum(r.input_tokens for r in self.records)

    @property
    def total_output_tokens(self) -> int:
        return sum(r.output_tokens for r in self.records)

    @property
    def total_cost_eur(self) -> float:
        return sum(r.cost_eur for r in self.records)

    def print_summary(self) -> None:
        table = Table(
            title=f"Kosten-Zusammenfassung — Session seit {self.session_start}",
            box=box.ROUNDED,
            show_header=True,
            header_style="bold cyan",
        )
        table.add_column("Zeit", style="dim", width=10)
        table.add_column("Agent", style="bold")
        table.add_column("Aufgabe", style="dim", max_width=40)
        table.add_column("In-Token", justify="right")
        table.add_column("Out-Token", justify="right")
        table.add_column("Kosten (€)", justify="right", style="bold yellow")

        for r in self.records:
            table.add_row(
                r.timestamp,
                r.agent,
                r.task_slug,
                str(r.input_tokens),
                str(r.output_tokens),
                f"{r.cost_eur:.4f}",
            )

        table.add_section()
        table.add_row(
            "",
            "[bold]GESAMT[/bold]",
            "",
            f"[bold]{self.total_input_tokens:,}[/bold]",
            f"[bold]{self.total_output_tokens:,}[/bold]",
            f"[bold green]{self.total_cost_eur:.4f}€[/bold green]",
        )
        console.print(table)


# Session-Singleton
tracker = CostTracker()
