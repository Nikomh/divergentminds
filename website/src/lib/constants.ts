export const BRAND = {
  name: "Divergent Minds Berlin",
  shortName: "Divergent Minds",
  tagline: "Gemeinsam ADHS meistern",
  description:
    "Eure Plattform für neueste Forschung, praxisnahe Tipps und echten Austausch rund um ADHS – vernetzt, gestärkt, informiert.",
  url: "https://www.divergentminds.berlin",
  email: "m.prior@me.com",
  phone: "0177-2838555",
  location: "Ackerstraße 169, 10115 Berlin",
  address: "Bergstraße 70, 10115 Berlin",
  vatId: "DE264337443",
} as const;

export const NAV_LINKS = [
  { label: "Home",        href: "/" },
  { label: "MeetUps",    href: "/meetups" },
  { label: "Community",  href: "/community" },
  { label: "Ressourcen", href: "/ressourcen" },
  { label: "Kontakt",    href: "/kontakt" },
] as const;

export const TEAM = [
  {
    id: "monti",
    name: "Monti Prior",
    role: "ADHS Coach · Konfliktcoach · Paarberaterin",
    shortRole: "Gründerin & ADHS Coach",
    bio: "Seit 2012 Senior Coach. Eigene ADHS-Diagnose 2011 — sie weiß aus erster Hand, wovon sie spricht. Gründerin von Divergent Minds Berlin.",
    quote: "Neurotypisch ist für mich kein Maßstab. Wenn wir aufhören uns zu vergleichen, kann jede/jeder eine persönliche Freiheit erlangen.",
    photo: "/assets/team/monti.jpeg",
    founder: true,
    website: "https://www.prior-coaching.de",
    email: "m.prior@me.com",
    phone: "0177-2838555",
    href: "/monti",
  },
  {
    id: "jaqueline",
    name: "Jacqueline Eldagsen-Gutowsky",
    role: "Psychologisches Coaching & Beratung",
    shortRole: "Psychologin & Coach",
    bio: "Master in Psychologie, Universität Maastricht. 12+ Jahre Erfahrung in klinischen und beratenden Feldern. Selbst ADHS-betroffen.",
    quote: "Psychologisches Wissen in den Alltag integrieren, entstigmatisieren und befähigen.",
    photo: "/assets/team/jaqueline.jpeg",
    website: "https://www.adhsadhs.de",
    instagram: "@adhs_neuropsychologie",
    href: "/jaqueline",
  },
  {
    id: "ingo",
    name: "Ingo Kemnitzer",
    role: "Digital Coach · Apple Certified Support Professional",
    shortRole: "Digital Coach",
    bio: "IT-Experte mit eigener Neurodivergenz. Spezialist für ablenkungsarme, intuitive Apple-Lösungen.",
    quote: "Achtsam, verständnisvoll, strukturiert — keine Standard-Lösungen.",
    photo: "/assets/team/ingo.jpeg",
    website: "https://www.meindigital.coach",
    href: "/ingo",
  },
  {
    id: "nikolay",
    name: "Nikolay Huse",
    role: "AI Enablement Specialist · Change Agent",
    shortRole: "AI & Technologie",
    bio: "Verbindet KI-Technologie mit dem Community-Aufbau von Divergent Minds Berlin.",
    quote: "KI und Gemeinschaft sind kein Widerspruch — sie verstärken einander.",
    photo: "/assets/team/nikolay.png",
    href: "/nikolay",
  },
] as const;

export const MEETUPS = [
  {
    id: 3,
    number: "#3",
    theme: "Masking vs. Authentizität",
    date: "19.08.2025",
    time: "18:00–21:00 Uhr",
    location: "Ackerstraße 169, 10115 Berlin",
    attendees: 25,
    status: "past" as const,
  },
  {
    id: 2,
    number: "#2",
    theme: "Konsummuster",
    date: "27.05.2025",
    time: "18:00–21:00 Uhr",
    location: "Ackerstraße 169, 10115 Berlin",
    attendees: 20,
    status: "past" as const,
  },
] as const;

export const RECOGNITION_CHIPS = [
  { text: "Fünf Tabs offen. Im Kopf und im Browser.", variant: "default"  as const },
  { text: "Eigentlich clever, aber die Deadline war gestern",  variant: "accent"   as const },
  { text: "Zu viel erklärt, obwohl keiner gefragt hat",  variant: "muted"   as const },
  { text: "Immer kurz vor dem Durchstarten. Und dann doch nicht.", variant: "default" as const },
  { text: "Erschöpft von dem, was anderen leichtfällt", variant: "accent"  as const },
  { text: "Hyperfokus auf alles außer dem, was gerade dran wäre", variant: "muted"   as const },
] as const;

export const PILLARS = [
  {
    icon: "Users",
    color: "teal"    as const,
    title: "Vernetzen",
    description: "Kein Therapiekreis. Einfach Menschen, die dasselbe kennen. Wir treffen uns in Berlin.",
  },
  {
    icon: "BookOpen",
    color: "primary" as const,
    title: "Lernen",
    description: "ADHS-Forschung, so aufbereitet, dass man sie auch im Alltag nutzen kann.",
  },
  {
    icon: "Zap",
    color: "amber"   as const,
    title: "Wachsen",
    description: "Expert:innen, die ADHS nicht nur aus Büchern kennen. Sondern selbst damit leben.",
  },
] as const;

export const RADAR_PREVIEW = [
  {
    category: "Schlaf",
    title: "Warum ADHS-Gehirne später einschlafen — und was dagegen hilft",
    excerpt: "Neue Forschung zeigt: Zirkadianer Rhythmus und ADHS hängen direkt zusammen.",
  },
  {
    category: "Produktivität",
    title: "Was Body-Doubling wirklich bewirkt: Forschungsstand 2025",
    excerpt: "Warum die Anwesenheit anderer Menschen konzentrationssteigernd wirkt.",
  },
  {
    category: "Diagnose",
    title: "ADHS im Erwachsenenalter: Wie die Diagnose das Leben verändert",
    excerpt: "Erfahrungsberichte und aktuelle Studienlage zur Spätdiagnose.",
  },
] as const;

export const STATS = [
  { value: "4+",  label: "MeetUps" },
  { value: "25+", label: "Community-Mitglieder" },
  { value: "3",   label: "Expert:innen" },
] as const;

export const COMMUNITY_VALUES = [
  { title: "Respekt",         description: "Jeder Mensch wird so angenommen, wie er ist. Diagnose hin oder her." },
  { title: "Offenheit",       description: "Keine Hierarchien, kein Fachwissen nötig. Nur echtes Interesse aneinander." },
  { title: "Kein Druck",      description: "Du redest, wenn du willst. Schweigen ist genauso willkommen." },
  { title: "Vertraulichkeit", description: "Was im Raum gesprochen wird, bleibt im Raum." },
] as const;

export const MEETUP_FORMAT = [
  { step: "1", title: "Ankommen",     description: "Kaffee, Wasser, kurzes Kennenlernen. Kein Zwang, sofort zu reden." },
  { step: "2", title: "Themen-Input", description: "Eine Person aus dem Team gibt einen kurzen Impuls zum Abend-Thema. Rund 20 Minuten." },
  { step: "3", title: "Austausch",    description: "Offene Runde. Fragen, Erfahrungen, Geschichten. Was gerade kommt." },
  { step: "4", title: "Ausklingen",   description: "Wer mag, bleibt noch. Gespräche entstehen von selbst." },
] as const;

export const MEETUP_FAQ = [
  { q: "Brauche ich eine ADHS-Diagnose?",         a: "Nein. Die MeetUps sind offen für alle, die sich dem Thema Neurodivergenz verbunden fühlen. Eine Diagnose ist kein Ticket." },
  { q: "Kostet es etwas?",                         a: "Die MeetUps sind kostenlos. Wir freuen uns über ein Getränk vor Ort, das ist aber kein Muss." },
  { q: "Muss ich mich anmelden?",                  a: "Eine kurze Anmeldung hilft uns bei der Planung. Einfach so vorbeikommen geht aber auch." },
  { q: "Was, wenn ich eher introvertiert bin?",    a: "Kein Problem. Du musst gar nichts sagen. Viele kommen zum Zuhören und das ist vollkommen okay." },
  { q: "Wie viele Menschen kommen?",               a: "Wir halten die Gruppen bewusst klein. Rund 15 bis 25 Personen, damit der Austausch persönlich bleibt." },
] as const;
