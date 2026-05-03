# ADHS Berlin — KI-Agenten-Team

8 spezialisierte Agenten entwickeln, testen und optimieren die ADHS Berlin Community Website gemeinsam.

## Agenten

| Agent | Rolle |
|---|---|
| ProjectManagerAgent 🎯 | Orchestrierung, Routing, Task-Briefs |
| VibeCoderAgent 🤖 | Rapid Prototyping, Quick PoCs |
| FrontendAgent 🎨 | React/Next.js, ADHS-Design, Accessibility |
| BackendAgent ⚙️ | API Routes, Beehiiv/Luma/Claude-Integration |
| QAAgent 🔍 | Code-Review, ADHS-UX-Audit, DSGVO, Performance |
| AutomationAgent ⚡ | n8n/Zapier Workflows, Social Media |
| ContentAgent ✍️ | Newsletter, Blog-Artikel, Social Media |
| SEOAnalyticsAgent 🔎 | Keywords, On-Page-SEO, Plausible Analytics |

## Setup

### 1. Python 3.11+ prüfen

```bash
python3 --version
```

### 2. Virtuelle Umgebung erstellen und aktivieren

```bash
python3 -m venv .venv
source .venv/bin/activate   # macOS/Linux
# .venv\Scripts\activate    # Windows
```

### 3. Abhängigkeiten installieren

```bash
pip install -e .
```

Oder ohne Projekt-Installation:
```bash
pip install -r requirements.txt
```

### 4. .env konfigurieren

```bash
cp .env.example .env
```

Dann `.env` öffnen und mindestens `ANTHROPIC_API_KEY` eintragen.
Die anderen Keys sind optional — nur für Beehiiv/Luma/Plausible-Features nötig.

### 5. Ersten Test starten

```bash
adhs status
```

## Verwendung

### Freie Anfrage

```bash
adhs ask "Schreib mir einen Newsletter-Entwurf über ADHS im Berufsalltag"
```

Der ProjectManager analysiert die Anfrage und wählt die richtigen Agenten.

### Workflows

**Newsletter** (Stichpunkte → Entwurf → QA):
```bash
adhs workflow newsletter "Meetup war super, 25 Leute, Thema ADHS im Job"
```

**Website-Feature** (Prototype → Frontend → Backend → QA):
```bash
adhs workflow feature "Newsletter-Signup-Komponente mit Beehiiv-Integration"
```

**Blog-Artikel** (SEO-Brief → Artikel → QA):
```bash
adhs workflow blog "ADHS Diagnose Berlin Erwachsene"
```

**Chatbot** (Prototype → Backend → Frontend → QA):
```bash
adhs workflow chatbot "Baue den ADHS-Assistenten für Phase 3"
```

### QA einzelner Dateien

```bash
adhs qa --file ./outputs/content/newsletter-draft.md
adhs qa --text "Dieser Text soll geprüft werden."
```

### Session-Info und Kosten

```bash
adhs status   # Agenten-Team + verfügbare Workflows
adhs costs    # Token-Verbrauch + Kosten-Zusammenfassung
```

## Outputs

Alle Ergebnisse werden automatisch gespeichert:

```
outputs/
  content/      ← Newsletter, Blog-Artikel
  code/         ← React-Komponenten, API Routes
  qa_reports/   ← QA-Reports
  seo_reports/  ← Keyword-Analysen, SEO-Audits
```

Dateinamen-Format: `YYYY-MM-DD_HH-MM_[agent]_[aufgabe].md`

## Newsletter-Workflow im Detail

Der vollständig implementierte Workflow (`workflows/newsletter_workflow.py`):

```
Input: "Meetup war super, 25 Leute, Thema ADHS im Job"
  ↓
Schritt 1: ProjectManager → strukturierter Task-Brief
  ↓
Schritt 2: ContentAgent → Newsletter-Entwurf (450-550 Wörter)
  ↓
Schritt 3: QAAgent → Prüfung auf 6 Dimensionen (Score /60)
  ↓
Score ≥ 45 → ✅ Bereit für Coach-Lektorat
Score < 45  → ContentAgent überarbeitet (max. 2 Zyklen)
  ↓
Output: newsletter_entwurf.md + newsletter_qa.md
```

## Projektstruktur

```
adhs-berlin-agents/
├── agents/           ← 8 spezialisierte Agenten
│   ├── base.py       ← BaseAgent (API-Client, Retry, Token-Tracking)
│   ├── project_manager.py
│   ├── vibe_coder.py
│   ├── frontend.py
│   ├── backend.py
│   ├── qa.py
│   ├── automation.py
│   ├── content.py
│   └── seo_analytics.py
├── workflows/        ← Vordefinierte Multi-Agenten-Workflows
│   ├── newsletter_workflow.py
│   ├── feature_workflow.py
│   ├── blog_workflow.py
│   └── chatbot_workflow.py
├── cli/main.py       ← Typer CLI (adhs-Befehle)
├── orchestrator.py   ← Routing-Logik
└── utils/
    ├── config.py     ← Settings + ADHS_BERLIN_CONTEXT
    ├── logger.py     ← Rich-Formatierung
    └── cost_tracker.py ← Token + Kosten-Tracking
```

## Kosten-Schätzung

Modell: claude-sonnet-4-5 (3$/M Input-Token, 15$/M Output-Token)

| Workflow | Typische Kosten |
|---|---|
| Newsletter (3 Agenten) | ~0.05–0.15€ |
| Feature (5 Agenten) | ~0.10–0.30€ |
| Blog (3 Agenten) | ~0.05–0.15€ |
| Chatbot (4 Agenten) | ~0.10–0.25€ |

`adhs costs` zeigt die genauen Kosten der aktuellen Session.
