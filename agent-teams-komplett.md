# Agent Teams — Vollständige Referenz

> Quelle: https://code.claude.com/docs/en/agent-teams  
> Stand: Mai 2026

---

## Was sind Agent Teams?

Agent Teams ermöglichen es, mehrere Claude Code Instanzen gleichzeitig als koordiniertes Team arbeiten zu lassen. Eine Session übernimmt die Rolle des **Team Leads**, der die Arbeit koordiniert, Aufgaben verteilt und Ergebnisse zusammenführt. Die **Teammates** arbeiten unabhängig, jeder in seinem eigenen Context Window, und können direkt miteinander kommunizieren.

> **Experimental — standardmäßig deaktiviert.**  
> Benötigt Claude Code v2.1.32 oder neuer. Version prüfen: `claude --version`

---

## Aktivierung

In `~/.claude/settings.json` oder projekt-lokalem `settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## Agent Teams vs. Subagents — Kernunterschied

| | Subagents | Agent Teams |
|---|---|---|
| **Context** | Eigenes Context Window; Ergebnis geht zurück an Hauptagent | Eigenes Context Window; vollständig unabhängig |
| **Kommunikation** | Nur Rückgabe an Hauptagent | Teammates schreiben sich gegenseitig direkt |
| **Koordination** | Hauptagent verwaltet alles | Gemeinsame Task-Liste, Selbstkoordination |
| **Am besten für** | Fokussierte Aufgaben, wo nur das Ergebnis zählt | Komplexe Arbeit mit Diskussion und Zusammenarbeit |
| **Token-Kosten** | Niedriger | Höher (jeder Teammate = eigene Claude-Instanz) |

**Faustregel:** Subagents wenn nur das Ergebnis zählt. Agent Teams wenn die Worker miteinander diskutieren und koordinieren müssen.

---

## Wann Agent Teams einsetzen

### Starke Use Cases
- **Research & Review**: Mehrere Teammates untersuchen verschiedene Aspekte gleichzeitig
- **Neue Module/Features**: Jeder Teammate besitzt einen separaten Bereich ohne Konflikte
- **Debugging mit konkurrierenden Hypothesen**: Paralleles Testen verschiedener Theorien
- **Cross-Layer-Koordination**: Frontend, Backend, Tests — je ein Teammate pro Schicht

### Wann NICHT verwenden
- Sequenzielle Aufgaben
- Aufgaben in derselben Datei
- Aufgaben mit vielen Abhängigkeiten
- Routineaufgaben (Single Session ist kostengünstiger)

---

## Team starten

Einfach in natürlicher Sprache beschreiben:

```
Ich designe ein CLI-Tool. Erstelle ein Agent Team mit drei Perspektiven:
einer für UX, einer für technische Architektur, einer als Devil's Advocate.
```

Claude erstellt das Team, spawnt die Teammates, koordiniert die Arbeit und räumt am Ende auf.

---

## Anzeige-Modi (Display Modes)

### In-Process (Standard falls kein tmux)
- Alle Teammates laufen im Haupt-Terminal
- `Shift+Down` zum Durchschalten zwischen Teammates
- Tippen = Nachricht an aktuellen Teammate
- `Enter` = Session des Teammates aufrufen
- `Escape` = Aktuellen Turn unterbrechen
- `Ctrl+T` = Task-Liste ein/ausblenden

### Split Panes (Standard wenn bereits in tmux)
- Jeder Teammate bekommt einen eigenen Pane
- Alle Outputs gleichzeitig sichtbar
- In Pane klicken = direkte Interaktion
- Benötigt: **tmux** oder **iTerm2** mit `it2` CLI

### Konfiguration

In `~/.claude/settings.json`:
```json
{
  "teammateMode": "in-process"
}
```

Für einzelne Session als Flag:
```bash
claude --teammate-mode in-process
```

**Verfügbare Werte:** `"auto"` (Standard), `"in-process"`, `"tmux"`

---

## Team kontrollieren

### Modell und Anzahl angeben
```
Erstelle ein Team mit 4 Teammates zum Refactoring. Nutze Sonnet für jeden Teammate.
```

### Plan-Approval erzwingen
```
Spawne einen Architect-Teammate für das Auth-Modul. Plane-Approval vor Änderungen erforderlich.
```
Ablauf: Teammate plant → sendet Plan an Lead → Lead genehmigt oder lehnt ab mit Feedback → Bei Ablehnung: Teammate bleibt im Plan-Modus und überarbeitet.

### Direktnachrichten an Teammates
- In-Process: `Shift+Down` → dann tippen
- Split-Pane: in Pane klicken

### Tasks zuweisen
- **Lead weist zu**: explizit sagen, welchen Task welcher Teammate bekommt
- **Self-Claim**: Teammate holt sich nach Abschluss den nächsten freien Task selbst

### Teammate beenden
```
Bitte den Researcher-Teammate, sich zu beenden.
```

### Team aufräumen
```
Räume das Team auf.
```
> **Wichtig:** Immer vom Lead aus aufräumen, nie von einem Teammate.

---

## Hooks für Quality Gates

| Hook | Auslöser | Exit Code 2 = |
|---|---|---|
| `TeammateIdle` | Teammate wird idle | Feedback senden, Teammate weiterarbeiten lassen |
| `TaskCreated` | Task wird erstellt | Erstellung verhindern + Feedback |
| `TaskCompleted` | Task als erledigt markiert | Abschluss verhindern + Feedback |

---

## Architektur im Detail

### Komponenten

| Komponente | Rolle |
|---|---|
| **Team Lead** | Hauptsession: erstellt Team, spawnt Teammates, koordiniert |
| **Teammates** | Separate Claude Code Instanzen, je eine pro Aufgabe |
| **Task List** | Gemeinsame Liste, Teammates claimen und erledigen Tasks |
| **Mailbox** | Messaging-System zwischen Agents |

### Datenspeicherung (lokal)
- Team-Config: `~/.claude/teams/{team-name}/config.json`
- Task-Liste: `~/.claude/tasks/{team-name}/`

> Config wird automatisch von Claude Code verwaltet — **nicht manuell bearbeiten**, Änderungen werden überschrieben.

### Task-Zustände
1. `pending` — wartet
2. `in progress` — wird bearbeitet
3. `completed` — erledigt

Tasks können **Abhängigkeiten** haben: ein Task mit unerfüllten Dependencies kann nicht geclaimed werden, bis die Abhängigkeiten abgeschlossen sind. Das System entsperrt automatisch.

### Task-Claiming
File-Locking verhindert Race Conditions wenn mehrere Teammates denselben Task beanspruchen wollen.

---

## Context & Kommunikation

### Was Teammates beim Spawn erhalten
- Projekt-Context (CLAUDE.md, MCP Servers, Skills)
- Spawn-Prompt vom Lead
- **NICHT**: die Konversations-History des Leads

### Kommunikationswege
- **Automatische Nachrichtenlieferung**: keine Notwendigkeit zu pollen
- **Idle-Notifications**: Teammates benachrichtigen Lead automatisch bei Abschluss
- **Shared Task List**: alle Agents sehen Taskstatus
- **Direct Messaging**: Teammate an Teammate per Name

Namen werden vom Lead beim Spawnen vergeben. Für vorhersehbare Namen: explizit im Spawn-Befehl angeben.

---

## Subagent-Definitionen als Teammates verwenden

Wiederverwendbare Rollen definieren (z.B. `security-reviewer`) und beim Spawn referenzieren:

```
Spawne einen Teammate mit dem security-reviewer Agent Type für das Auth-Modul.
```

- Respektiert `tools`-Allowlist und `model` aus der Definition
- Definition wird als **zusätzliche Anweisungen** an den System-Prompt angehängt (ersetzt ihn nicht)
- Team-Tools (`SendMessage`, Task-Management) sind immer verfügbar, auch wenn `tools` eingeschränkt ist
- `skills` und `mcpServers` aus Subagent-Definitionen werden **nicht** angewendet wenn als Teammate genutzt

---

## Permissions

- Teammates starten mit den Permission-Settings des Leads
- `--dangerously-skip-permissions` beim Lead = alle Teammates auch
- Nach dem Spawnen: einzelne Teammate-Modi änderbar
- Beim Spawn: keine per-Teammate-Modi setzbar

---

## Token-Kosten

Token-Verbrauch skaliert linear mit der Anzahl der Teammates. Jeder Teammate hat sein eigenes Context Window. Für Research, Review und neue Features lohnt sich der Mehraufwand meist. Für Routineaufgaben: Single Session nutzen.

---

## Best Practices

### Teammates ausreichend Context geben
Konversations-History des Leads wird nicht vererbt → task-spezifische Details im Spawn-Prompt mitgeben:
```
Spawne einen Security-Reviewer mit folgendem Prompt: "Überprüfe das Auth-Modul
unter src/auth/ auf Sicherheitslücken. Fokus: Token-Handling, Session-Management,
Input-Validation. Die App nutzt JWT in httpOnly Cookies. Berichte mit Schweregrad."
```

### Team-Größe
- **3–5 Teammates** für die meisten Workflows
- **5–6 Tasks pro Teammate** für gute Produktivität
- Mehr Teammates = mehr Koordinationsaufwand + höhere Token-Kosten
- Kein hartes Limit, aber Diminishing Returns jenseits von ~5

### Task-Größe
- Zu klein: Koordinationsaufwand > Nutzen
- Zu groß: Langer Lauf ohne Check-ins, erhöhtes Risiko für Fehlinvestitionen
- Ideal: Selbstständige Einheit mit klarem Deliverable (Funktion, Test-Datei, Review)

### Lead warten lassen
Falls Lead selbst implementiert statt zu delegieren:
```
Warte, bis deine Teammates ihre Tasks abgeschlossen haben, bevor du weitermachst.
```

### Datei-Konflikte vermeiden
Zwei Teammates dürfen nicht dieselbe Datei bearbeiten → Arbeit so aufteilen, dass jeder Teammate seinen eigenen Dateisatz besitzt.

### Mit Research starten
Für Einsteiger: Aufgaben ohne Code-Schreiben beginnen (PR-Review, Library-Research, Bug-Investigation) — klare Grenzen, weniger Koordinationsherausforderungen.

---

## Beispiel-Prompts

### Paralleles Code-Review
```
Erstelle ein Agent Team für PR #142. Drei Reviewer:
- Einer fokussiert auf Security
- Einer prüft Performance
- Einer validiert Test-Coverage
Alle sollen unabhängig reviewen und Ergebnisse melden.
```

### Debugging mit konkurrierenden Hypothesen
```
User berichten: App beendet sich nach einer Nachricht statt verbunden zu bleiben.
Spawne 5 Agent Teammates für verschiedene Hypothesen. Sie sollen miteinander
diskutieren und versuchen, die Theorien der anderen zu widerlegen — wie eine
wissenschaftliche Debatte. Schreibe entstehenden Konsens in findings.md.
```

---

## Troubleshooting

| Problem | Lösung |
|---|---|
| Teammates erscheinen nicht | `Shift+Down` prüfen; `which tmux` ausführen; Task evtl. nicht komplex genug |
| Zu viele Permission-Prompts | Häufige Operationen in Permission-Settings vorab freigeben |
| Teammate stoppt bei Fehler | Mit `Shift+Down` Output prüfen, direkt Anweisungen geben oder Ersatz-Teammate spawnen |
| Lead beendet zu früh | Lead anweisen weiterzumachen |
| Verwaiste tmux-Sessions | `tmux ls` dann `tmux kill-session -t <name>` |

---

## Bekannte Limitations (Experimental)

- **Kein Session-Resumption** für In-Process Teammates (`/resume`, `/rewind` funktionieren nicht)
- **Task-Status kann verzögert sein** — bei festsitzenden Tasks manuell Status aktualisieren
- **Shutdown kann langsam sein** — Teammate beendet aktuellen Request/Tool-Call zuerst
- **Eine Team pro Session** — erst altes Team aufräumen, dann neues starten
- **Kein Nested Teams** — Teammates können keine eigenen Teams spawnen
- **Lead ist fix** — kein Leadership-Transfer möglich
- **Split Panes nicht in** VS Code Terminal, Windows Terminal, Ghostty
- **Permissions beim Spawn gesetzt** — keine per-Teammate-Modi beim Spawnen

---

## Nächste Schritte / Verwandte Konzepte

- **Subagents** (`/en/sub-agents`) — leichtgewichtige Delegation ohne Inter-Agent-Kommunikation
- **Git Worktrees** (`/en/worktrees`) — manuelle parallele Sessions ohne automatische Team-Koordination
- **Hooks** (`/en/hooks`) — Quality Gates für TeamIdle, TaskCreated, TaskCompleted
- **Costs** (`/en/costs#agent-team-token-costs`) — Token-Kosten im Detail
