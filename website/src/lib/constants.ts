export const BRAND = {
  name: "Divergent Minds Berlin",
  shortName: "Divergent Minds",
  tagline: "Gemeinsam ADHS meistern",
  description:
    "Eure Plattform für neueste Forschung, praxisnahe Tipps und echten Austausch rund um ADHS – vernetzt, gestärkt, informiert.",
  url: "https://www.divergentminds.berlin",
  email: "m.prior@me.com",
  location: "Ackerstraße 169, 10115 Berlin",
} as const;

export const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "Team",      href: "/#team" },
  { label: "MeetUps",  href: "/#meetups" },
  { label: "Community", href: "/#community" },
  { label: "Kontakt",  href: "/#kontakt" },
] as const;

export const TEAM = [
  {
    id: "monti",
    name: "Monti Prior",
    role: "ADHS Coach · Konfliktcoach · Kommunikationstrainerin · Paarberaterin",
    bio: "Seit 2012 als Senior Coach tätig. ADHS-Diagnose 2011 — sie weiß aus eigener Erfahrung, wovon sie spricht.",
    quote: "Neurotypisch ist für mich kein Maßstab. Wenn wir aufhören uns zu vergleichen, kann jede/jeder eine persönliche Freiheit erlangen.",
    website: "https://www.prior-coaching.de",
    email: "m.prior@me.com",
    phone: "0177-2838555",
    href: "/monti",
  },
  {
    id: "jaqueline",
    name: "Jacqueline Eldagsen-Gutowsky",
    role: "Psychologisches Coaching & Beratung",
    bio: "Master in Psychologie (Maastricht). Über 12 Jahre Erfahrung. Schwerpunkte: ADHS, emotionale Dysregulation, Trauma.",
    quote: "Psychologisches Wissen in den Alltag integrieren, entstigmatisieren, befähigen.",
    website: "https://www.adhsadhs.de",
    instagram: "@adhs_neuropsychologie",
    href: "/jaqueline",
  },
  {
    id: "ingo",
    name: "Ingo Kemnitzer",
    role: "Digital Coach · Apple Certified Support Professional",
    bio: "IT-Experte mit eigener Neurodivergenz. Ablenkungsarme, intuitive Apple-Lösungen für strukturbedürftige Menschen.",
    quote: "Achtsam, verständnisvoll, strukturiert — keine Standard-Lösungen.",
    website: "https://www.meindigital.coach",
    href: "/ingo",
  },
  {
    id: "nikolay",
    name: "Nikolay Huse",
    role: "AI Enablement Specialist · Change Agent",
    bio: "Verbindet KI-Technologie mit dem Community-Aufbau von Divergent Minds Berlin.",
    href: "/",
  },
] as const;

export const MEETUPS = [
  {
    id: 4,
    number: "#4",
    theme: "Masking vs. Authentizität",
    date: "09.12.2025",
    time: "18:00–21:00 Uhr",
    location: "Ackerstraße 169, 10115 Berlin",
    status: "upcoming" as const,
  },
  {
    id: 3,
    number: "#3",
    theme: "Masking vs. Authentizität",
    date: "19.08.2025",
    time: "18:00–21:00 Uhr",
    location: "Ackerstraße 169, 10115 Berlin",
    status: "past" as const,
  },
  {
    id: 2,
    number: "#2",
    theme: "Konsummuster",
    date: "27.05.2025",
    time: "18:00–21:00 Uhr",
    location: "Ackerstraße 169, 10115 Berlin",
    status: "past" as const,
  },
] as const;

export const VALUES = [
  {
    icon: "Users",
    title: "Echte Community",
    description: "Persönliche Begegnung statt digitale Isolation. Wir treffen uns in Berlin.",
  },
  {
    icon: "Brain",
    title: "Evidenzbasiert",
    description: "Neueste ADHS-Forschung, praxisnah aufbereitet und direkt anwendbar.",
  },
  {
    icon: "Heart",
    title: "Ohne Druck",
    description: "Respektvoll, offen, ohne Smalltalk-Zwang. Jede/r so, wie sie/er ist.",
  },
  {
    icon: "Zap",
    title: "ADHS als Stärke",
    description: "Divergenz ist kein Defizit. Wir entdecken gemeinsam das Potenzial dahinter.",
  },
] as const;
