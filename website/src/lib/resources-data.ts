export type SituationTag = "Fokus" | "Emotionen" | "Struktur" | "Diagnose" | "Beziehungen" | "Energie";

export const SITUATION_TAGS: SituationTag[] = [
  "Fokus", "Emotionen", "Struktur", "Diagnose", "Beziehungen", "Energie",
];

// ── Reframing Cards ───────────────────────────────────────────
export const REFRAMING_CARDS = [
  {
    id: "prokrastination",
    tags: ["Fokus", "Struktur"] as SituationTag[],
    situation: "Ich komm schon wieder nicht ran",
    description: "Der Task liegt seit Tagen auf der Liste. Du weißt, was du tun müsstest. Du machst trotzdem was anderes. Und hasst dich dafür.",
    reframe: "Prokrastination ist fast immer Überwältigung, keine Faulheit. Frage dich: Was genau fühlt sich gerade zu viel an?",
    tip: "Mach es kleiner. Nicht die Steuererklärung. Sondern eine Quittung suchen. Nur das.",
    science: "ADHS-Gehirne brauchen einen konkreten Startpunkt. Abstrakte Aufgaben erzeugen Lähmung.",
  },
  {
    id: "zu-viel",
    tags: ["Emotionen", "Beziehungen"] as SituationTag[],
    situation: "Ich bin zu viel für andere",
    description: "Jemand rollt die Augen. Sagt, du redest zu viel. Unterbricht dich. Du kennst das Gefühl sehr gut.",
    reframe: "Du bist nicht zu viel. Du bist in einem System, das nicht für dich gebaut wurde. Das ist ein Design-Problem, kein Persönlichkeitsproblem.",
    tip: "Such dir Menschen, bei denen du einfach so sein kannst. Die gibt es.",
    science: "ADHS ist keine Persönlichkeitsstörung. Das Gehirn funktioniert anders. Nicht falsch.",
  },
  {
    id: "deadline",
    tags: ["Struktur", "Emotionen"] as SituationTag[],
    situation: "Ich hab die Deadline wieder verpasst",
    description: "Du wusstest es. Irgendwie hast du es trotzdem nicht geschafft. Jetzt kommt die Welle aus Scham und Selbstkritik.",
    reframe: "Zeit-Blindheit ist ein neurologisches ADHS-Merkmal. Dein Gehirn erlebt Zeit anders. Das ist kein Versagen der Disziplin.",
    tip: "Externe Erinnerungssysteme sind keine Krücke. Sie sind das Äquivalent einer Brille für schlechte Augen.",
    science: "Willenskraft kompensiert keine neurologische Differenz. Systeme schon.",
  },
  {
    id: "hyperfokus-raus",
    tags: ["Fokus", "Energie"] as SituationTag[],
    situation: "Ich komm aus dem Hyperfokus nicht raus",
    description: "Du hast eigentlich was anderes vor. Aber du steckst gerade so tief drin, dass alles andere aufgehört hat zu existieren.",
    reframe: "Hyperfokus ist kein Kontrollverlust, sondern das ADHS-Gehirn in seinem Element. Das Problem ist nicht der Fokus, sondern das fehlende Ausstiegssignal.",
    tip: "Setz dir vorher einen Alarm und sag dir laut: Das ist mein Ende. Nicht irgendwann. Jetzt.",
    science: "Externe Signale überschreiben das Hyperfokus-Muster. Interne nicht.",
  },
  {
    id: "rsd-ablehnung",
    tags: ["Emotionen", "Beziehungen"] as SituationTag[],
    situation: "Jemand ist gerade kurz abweisend und ich drehe durch",
    description: "Eine kurze Nachricht ohne Emoji. Eine knappe Antwort. Du weißt rational, dass es nichts bedeutet. Fühlst es aber ganz anders.",
    reframe: "Rejection Sensitivity ist ein ADHS-Merkmal. Dein Gehirn überinterpretiert soziale Signale neurologisch bedingt. Die Reaktion ist real, die Bedrohung meist nicht.",
    tip: "Warte 20 Minuten, bevor du antwortest oder reagierst. Nur warten. Nichts anderes.",
    science: "Das Dopaminsystem bei ADHS reagiert auf soziale Ablehnung anders als bei Neurotypischen.",
  },
  {
    id: "energie-null",
    tags: ["Energie", "Emotionen"] as SituationTag[],
    situation: "Ich hab null Energie, obwohl ich nichts gemacht hab",
    description: "Du hast den Tag kaum genutzt. Trotzdem bist du am Abend erschöpft. Das macht keinen Sinn. Oder doch?",
    reframe: "ADHS-Management kostet mental enorm viel. Fokussieren, filtern, regulieren. Das läuft im Hintergrund und zieht Energie, auch wenn nach außen nichts passiert.",
    tip: "Zähl was du gemanagt hast, nicht was du produziert hast.",
    science: "Kognitive Last durch ADHS-Selbstregulation ist messbar und erschöpft das Gehirn.",
  },
] as const;

// ── Prompting Playbooks ───────────────────────────────────────
export const PROMPTING_PLAYBOOKS = [
  {
    id: "nicht-anfangen",
    tags: ["Fokus", "Struktur"] as SituationTag[],
    title: "Wenn ich nicht anfangen kann",
    when: "Du willst, aber du kommst einfach nicht rein. Schon seit einer Stunde.",
    prompt: `Ich habe ADHS und muss [Aufgabe einfügen] erledigen, aber ich komme nicht rein. Ich stehe seit [Zeit] davor.

Frag mich zunächst: Was genau macht mir an dieser Aufgabe gerade Angst oder fühlt sich zu groß an?

Dann hilf mir, nur den allerersten Schritt zu finden. Nicht mehr. Dieser Schritt soll maximal 5 Minuten dauern und so konkret sein, dass ich sofort weiß, was ich tun muss.`,
    what_you_get: "Eine so kleine erste Handlung, dass das Gehirn sie nicht mehr ablehnen kann.",
    tip: "Füge am Ende hinzu: \"Ich bin bereit. Sag mir genau was ich jetzt tue.\"",
  },
  {
    id: "overwhelm-sortieren",
    tags: ["Emotionen", "Struktur"] as SituationTag[],
    title: "Wenn alles gleichzeitig zu viel ist",
    when: "Fünf Aufgaben im Kopf, alle gleich wichtig, alle gleich dringend. Du weißt nicht wo anfangen.",
    prompt: `Ich habe ADHS und bin gerade überwältigt. Hier ist alles, was ich gerade im Kopf habe:
[Liste alles auf was dich gerade beschäftigt]

Ich brauche Hilfe beim Sortieren. Bitte:
1. Frag mich was davon wirklich heute fertig sein muss
2. Dann zeig mir die eine Aufgabe, die ich als erstes angehen soll
3. Erkläre warum genau diese eine und nicht die anderen`,
    what_you_get: "Klarheit, womit wirklich anzufangen ist, und warum.",
    tip: "Schreib wirklich alles hin, auch die kleinen Dinge. Je mehr, desto besser die Sortierung.",
  },
  {
    id: "email-schreiben",
    tags: ["Struktur", "Beziehungen"] as SituationTag[],
    title: "Wenn eine E-Mail seit Wochen ungeschrieben ist",
    when: "Du musst eine schwierige oder wichtige E-Mail schreiben. Sie liegt seit Tagen da.",
    prompt: `Ich muss eine E-Mail schreiben, aber komme nicht dazu. Hier sind die wichtigsten Infos:

An wen: [Empfänger]
Worum geht es: [Kontext]
Was ich eigentlich sagen will: [Kernbotschaft, auch wenn unklar formuliert]
Ton soll sein: [professionell / freundlich / direkt]

Schreib mir einen ersten Entwurf, den ich dann anpassen kann. Kurz und direkt.`,
    what_you_get: "Einen Entwurf, den du nur noch leicht anpassen musst statt von Null anfangen.",
    tip: "Sag dem Modell auch was du NICHT sagen willst. Das hilft genauso viel.",
  },
] as const;

// ── MeetUp Library ────────────────────────────────────────────
export const MEETUP_LIBRARY = [
  {
    id: "masking-authentizitaet",
    number: 3,
    theme: "Masking vs. Authentizität",
    date: "19.08.2025",
    tags: ["Emotionen", "Beziehungen"] as SituationTag[],
    attendees: 25,
    summary: "In einer Welt, die auf neurotypische Menschen ausgelegt ist, lernen viele mit ADHS früh, sich anzupassen. Masking nennt sich diese Strategie: soziale Normen imitieren, Symptome verstecken, nach außen hin funktionieren. Was kurzfristig schützt, kostet langfristig enorm Energie und kann zu ADHS-Burnout führen. An diesem Abend haben wir ehrlich darüber gesprochen, wann Masking beginnt, was es kostet, und wie der Weg zur Authentizität aussehen kann.",
    insights: [
      "Masking ist keine bewusste Entscheidung, sondern eine erlernte Überlebensstrategie. Die meisten merken erst im Nachhinein, dass sie es getan haben.",
      "Der Preis ist Erschöpfung. Wer täglich maskt, hat am Ende des Tages weniger mentale Ressourcen für sich selbst.",
      "Authentizität ist kein Schalter. Es ist eine Praxis, die Zeit braucht und sichere Umgebungen voraussetzt.",
    ],
    action: "Diese Woche eine Situation bewusst wahrnehmen, in der du maskst. Nicht ändern. Nur bemerken.",
    quote: "Das Erschöpfendste am Masking ist nicht das Masken selbst, sondern zu vergessen, wer man darunter war.",
  },
  {
    id: "konsummuster",
    number: 2,
    theme: "Konsummuster",
    date: "27.05.2025",
    tags: ["Struktur", "Emotionen", "Energie"] as SituationTag[],
    attendees: 20,
    summary: "Impulsivität und Belohnungssuche sind neurobiologische ADHS-Merkmale. Das führt häufig zu Konsummustern, die kurzfristig Dopamin liefern, langfristig aber Probleme schaffen. Käufe, Essen, Social Media, Substanzen. An diesem Abend haben wir ohne Wertung darüber gesprochen, wie diese Muster entstehen und was wirklich hilft, sie zu verändern.",
    insights: [
      "Impulsives Konsumverhalten ist oft Dopamin-Suche, keine Charakterschwäche. Das versteht man, wenn man die Neurobiologie dahinter kennt.",
      "Muster erkennen ist wichtiger als Willenskraft. Willenskraft ist eine begrenzte Ressource, die bei ADHS ohnehin unter Druck steht.",
      "Umgebungsgestaltung funktioniert besser als Selbstkontrolle. Wenn etwas nicht sichtbar ist, ist es schwerer, impulsiv zu reagieren.",
    ],
    action: "Eine konkrete Trigger-Situation identifizieren und eine Umgebungsveränderung testen. Zum Beispiel: das Handy aus dem Schlafzimmer.",
    quote: "Es geht nicht darum, stärker zu sein als der Impuls. Es geht darum, die Umgebung zu gestalten, damit der Impuls gar nicht erst entsteht.",
  },
] as const;

// ── Notfallplan ───────────────────────────────────────────────
export const NOTFALLPLAN_STEPS = [
  {
    nr: "01",
    title: "Stopp.",
    desc: "Leg alles hin. Genau so. Auch wenn du mitten in etwas bist.",
  },
  {
    nr: "02",
    title: "Grounding.",
    desc: "Fühl deine Füße auf dem Boden. Hände auf die Oberschenkel. Drei tiefe Atemzüge.",
  },
  {
    nr: "03",
    title: "Was brauchst du gerade wirklich?",
    desc: "Trinken? Pause? Bewegung? Gespräch? Etwas essen? Nichts davon ist falsch.",
  },
  {
    nr: "04",
    title: "Das Kleinste zuerst.",
    desc: "Nicht das Wichtigste. Nicht das Dringendste. Das Kleinste. Eine Sache. Nur eine.",
  },
  {
    nr: "05",
    title: "Wenn nichts geht, sag es.",
    desc: "Schreib jemandem. Komm in die Community. Du musst das nicht alleine lösen.",
  },
] as const;

// ── Diagnose-Kompass Berlin ───────────────────────────────────
export const DIAGNOSE_STEPS = [
  {
    step: "1",
    title: "Hausarzt ansprechen",
    desc: "Erste Anlaufstelle für eine Überweisung. Beschreib konkrete Alltagssituationen, keine abstrakten Symptome. Was geht nicht? Was kostet dich unverhältnismäßig viel Energie?",
    tip: "Führ eine Woche lang ein kurzes Symptom-Tagebuch. Das hilft beim Gespräch enorm.",
  },
  {
    step: "2",
    title: "Psychiater oder Neurologe",
    desc: "Die eigentliche Diagnose stellt ein Facharzt. In Berlin gibt es spezialisierte Praxen für Erwachsene mit ADHS. Wartezeiten: realistisch 3 bis 12 Monate.",
    tip: "Ruf gleichzeitig bei mehreren Praxen an. Trag dich auf Wartelisten ein. Es lohnt sich.",
  },
  {
    step: "3",
    title: "Die Diagnostik selbst",
    desc: "Fragebogen, Gespräche, manchmal Neuropsychologische Tests. Kein Bluttest, kein eindeutiges Ergebnis in 5 Minuten. Das dauert manchmal mehrere Termine.",
    tip: "Bring wenn möglich jemanden mit der dich kennt. Eine zweite Perspektive auf dein Verhalten ist wertvoll.",
  },
  {
    step: "4",
    title: "Was danach kommt",
    desc: "Diagnose ist kein Endpunkt, sondern ein Startpunkt. Behandlungsoptionen: Medikamente, Coaching, Psychotherapie, Kombination. Kein universelles Rezept.",
    tip: "Lass dir Zeit mit der Entscheidung. Du musst nicht sofort alles ändern.",
  },
] as const;

// ── Coming Soon ───────────────────────────────────────────────
export const COMING_SOON_RESOURCES = [
  { title: "RSD erklärt",          desc: "Rejection Sensitivity Dysphoria", tags: ["Emotionen"] as SituationTag[],               icon: "💔" },
  { title: "Masking",               desc: "Was es ist und was es kostet",    tags: ["Emotionen", "Beziehungen"] as SituationTag[], icon: "🎭" },
  { title: "ADHS-Burnout",          desc: "Erkennen und vorbeugen",          tags: ["Energie"] as SituationTag[],                  icon: "🔋" },
  { title: "Hyperfokus nutzen",     desc: "Stärke statt Symptom",            tags: ["Fokus"] as SituationTag[],                    icon: "🔍" },
  { title: "Energie-Management",   desc: "Statt Zeit-Management",           tags: ["Energie", "Struktur"] as SituationTag[],      icon: "⚡" },
  { title: "Forschungs-Radar",      desc: "Neue Studien zu ADHS",           tags: ["Diagnose"] as SituationTag[],                  icon: "🔬" },
  { title: "Berlin-Kompass",        desc: "Anlaufstellen und Spezialisten", tags: ["Diagnose"] as SituationTag[],                  icon: "📍" },
  { title: "ADHS und Schlaf",       desc: "Sciencebasiert",                  tags: ["Energie"] as SituationTag[],                  icon: "🌙" },
] as const;
