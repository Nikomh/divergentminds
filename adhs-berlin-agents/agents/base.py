import time
from typing import Iterator
from pathlib import Path

import anthropic

from utils.config import settings, ADHS_BERLIN_CONTEXT
from utils.logger import (
    log_agent_start,
    log_agent_result,
    spinner_context,
    output_filename,
    log_warning,
)
from utils.cost_tracker import tracker, CallRecord


class BaseAgent:
    """Basisklasse für alle ADHS-Berlin-Agenten."""

    name: str = "BaseAgent"
    color: str = "white"
    output_subdir: str = ""

    MAX_RETRIES = 3
    TIMEOUT = 90.0

    def __init__(self, system_prompt: str) -> None:
        if not settings.anthropic_api_key:
            raise RuntimeError(
                "ANTHROPIC_API_KEY fehlt. Bitte .env konfigurieren "
                "(cp .env.example .env, dann Key eintragen)."
            )
        self.system_prompt = f"{ADHS_BERLIN_CONTEXT}\n\n---\n\n{system_prompt}"
        self._client = anthropic.Anthropic(
            api_key=settings.anthropic_api_key,
            timeout=self.TIMEOUT,
        )

    def run(self, task: str, context: dict | None = None) -> str:
        """Führt den Agenten synchron aus und gibt den vollständigen Text zurück."""
        full_task = self._build_task(task, context)
        log_agent_start(self.name, task)

        # Spinner läuft nur während des API-Calls — danach erst loggen
        with spinner_context(f"{self.name} arbeitet…"):
            text, rec = self._call_api(full_task)

        # Ausgabe NACH dem Spinner, damit Rich kein Konflikt hat
        log_agent_result(self.name, text, rec.input_tokens, rec.output_tokens, rec.cost_eur)
        self._save_output(text, task)
        return text

    def run_streaming(self, task: str, context: dict | None = None) -> Iterator[str]:
        """Streamt die Antwort Token für Token (für Terminal-Output)."""
        full_task = self._build_task(task, context)
        log_agent_start(self.name, task)

        messages = [{"role": "user", "content": full_task}]
        with self._client.messages.stream(
            model=settings.model,
            max_tokens=4096,
            system=self.system_prompt,
            messages=messages,
        ) as stream:
            full_text = ""
            for text in stream.text_stream:
                full_text += text
                yield text

            msg = stream.get_final_message()
            tracker.record(
                self.name,
                task[:50],
                msg.usage.input_tokens,
                msg.usage.output_tokens,
            )
            self._save_output(full_text, task)

    def _call_api(self, task: str) -> tuple[str, CallRecord]:
        """API-Call mit exponential Backoff (max. 3 Versuche). Gibt (text, record) zurück."""
        messages = [{"role": "user", "content": task}]
        last_error: Exception | None = None

        for attempt in range(self.MAX_RETRIES):
            try:
                response = self._client.messages.create(
                    model=settings.model,
                    max_tokens=4096,
                    system=self.system_prompt,
                    messages=messages,
                )
                rec = tracker.record(
                    self.name,
                    task[:50],
                    response.usage.input_tokens,
                    response.usage.output_tokens,
                )
                return response.content[0].text, rec

            except anthropic.RateLimitError as e:
                wait = 2 ** (attempt + 1)
                log_warning(f"{self.name}: Rate-Limit, warte {wait}s (Versuch {attempt + 1}/{self.MAX_RETRIES})")
                time.sleep(wait)
                last_error = e
            except anthropic.APIStatusError as e:
                log_warning(f"{self.name}: API-Fehler {e.status_code}, Versuch {attempt + 1}/{self.MAX_RETRIES}")
                time.sleep(2 ** attempt)
                last_error = e

        raise RuntimeError(
            f"{self.name}: API nicht erreichbar nach {self.MAX_RETRIES} Versuchen — {last_error}"
        )

    def _build_task(self, task: str, context: dict | None) -> str:
        if not context:
            return task
        ctx_lines = "\n".join(f"  {k}: {v}" for k, v in context.items())
        return f"{task}\n\nKontext:\n{ctx_lines}"

    def _save_output(self, content: str, task: str) -> None:
        path = output_filename(self.name, task, self.output_subdir)
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        Path(path).write_text(content, encoding="utf-8")
