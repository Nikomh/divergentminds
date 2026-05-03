from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    anthropic_api_key: str = Field(default="", alias="ANTHROPIC_API_KEY")
    model: str = "claude-sonnet-4-5"

    beehiiv_api_key: str = Field(default="", alias="BEEHIIV_API_KEY")
    beehiiv_publication_id: str = Field(default="", alias="BEEHIIV_PUBLICATION_ID")

    luma_api_key: str = Field(default="", alias="LUMA_API_KEY")

    plausible_api_key: str = Field(default="", alias="PLAUSIBLE_API_KEY")
    plausible_domain: str = Field(default="adhs-berlin.de", alias="PLAUSIBLE_DOMAIN")

    # Outputs-Verzeichnis relativ zum Projekt-Root
    output_dir: str = "outputs"


# Singleton — lädt .env automatisch via pydantic-settings
# ANTHROPIC_API_KEY-Pflicht wird in BaseAgent.__init__ geprüft, nicht hier,
# damit der Import auch ohne .env funktioniert (z.B. adhs status, adhs --help)
settings = Settings()  # type: ignore[call-arg]


ADHS_BERLIN_CONTEXT = """
Projekt: ADHS Berlin Community (ehrenamtlich)
Coaches:
  - Monty Prior: ADHS-Coach, Berlin
  - Jacqueline Eldaxen Gotowski: ADHS-Coach, Berlin

Website-Seiten (geplant):
  - Startseite: Hero, Coaches-Teaser, nächstes Meetup, Newsletter-CTA
  - /coaches: Profil beider Coaches mit Booking-Link
  - /meetups: Luma-Events-Integration, Archiv
  - /newsletter: Beehiiv-Sign-up
  - /ressourcen: Berliner Anlaufstellen (Phase 2)
  - /blog: SEO-Artikel (Phase 2)
  - /chat: KI-Assistent (Phase 3)

Tech Stack:
  - Next.js 14 (App Router, TypeScript)
  - Tailwind CSS + shadcn/ui
  - Vercel (Hosting)
  - Beehiiv (Newsletter)
  - Luma Events (Meetups)
  - Claude API (Chatbot)
  - Plausible (Analytics, DSGVO-konform)
  - Discord (Community)

Budget: ca. 44€/Monat
Team: 3 Personen (ehrenamtlich), 1 davon tech-affin (Claude Code Nutzer)
Ziel-KPIs (12 Monate): 1.000 Website-Besucher/Monat, 500 Newsletter-Subscriber

Ton: Warm, direkt, ADHS-freundlich — kurze Sätze, klare Struktur, "du" nicht "Sie"
Design: WCAG 2.1 AA, kein Auto-Play, viel Weißraum, gedämpfte Farben, Bionic Reading
"""
