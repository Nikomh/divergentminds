import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle2, Bell } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MEETUPS, MEETUP_FORMAT, MEETUP_FAQ, BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "MeetUps",
  description: "Unsere ADHS-Community-Treffen in Berlin Mitte. Offen für alle, keine Diagnose nötig.",
};

// ── Mini Calendar ──────────────────────────────────────────────────────────
const MONTH_NAMES = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const DAY_NAMES = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function buildCells(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month - 1, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1; // Monday-based
  const total = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

interface MiniCalProps {
  dateStr: string; // "DD.MM.YYYY"
  theme: string;
  number: string;
  isPast: boolean;
  attendees?: number;
}

function MiniCal({ dateStr, theme, number, isPast, attendees }: MiniCalProps) {
  const [d, m, y] = dateStr.split(".").map(Number);
  const cells = buildCells(y, m);

  return (
    <div className={cn(
      "rounded-2xl border p-5 space-y-3 transition-all duration-200",
      isPast
        ? "border-border bg-muted/20 hover:bg-muted/30"
        : "border-primary/30 bg-card shadow-soft-sm hover:shadow-soft",
    )}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <Badge variant={isPast ? "muted" : "default"} className="text-xs">
          {!isPast && (
            <span className="relative flex size-1.5 mr-1.5">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-primary-foreground opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary-foreground" />
            </span>
          )}
          MeetUp {number}
        </Badge>
        {attendees && (
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Users size={9} /> {attendees} dabei
          </span>
        )}
        {!isPast && !attendees && (
          <span className="text-[10px] font-semibold text-primary uppercase tracking-wide">Nächstes</span>
        )}
      </div>

      {/* Theme */}
      <p className={cn(
        "font-semibold text-sm leading-snug",
        isPast ? "text-muted-foreground" : "text-foreground",
      )}>{theme}</p>

      {/* Calendar grid */}
      <div>
        <p className="text-[10px] font-bold text-center text-muted-foreground mb-1.5">
          {MONTH_NAMES[m - 1]} {y}
        </p>
        <div className="grid grid-cols-7 gap-px mb-0.5">
          {DAY_NAMES.map(day => (
            <span key={day} className="text-[8px] font-semibold text-muted-foreground/50 text-center py-0.5">
              {day}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px">
          {cells.map((cell, i) => (
            <div key={i} className={cn(
              "h-6 w-6 mx-auto flex items-center justify-center rounded-full text-[10px] font-medium",
              cell === null && "invisible",
              cell === d && !isPast && "bg-primary text-primary-foreground font-bold",
              cell === d && isPast && "bg-muted-foreground/25 text-foreground font-bold",
              cell !== d && cell !== null && (isPast ? "text-muted-foreground/60" : "text-foreground/70"),
            )}>
              {cell}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-border/50 flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <Calendar size={9} />
        {dateStr}
        <span className="mx-1">·</span>
        <Clock size={9} />
        18:00 Uhr
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function MeetupsPage() {
  const next = MEETUPS.find((m) => (m.status as string) === "upcoming");
  const past = MEETUPS.filter((m) => (m.status as string) === "past");
  const all = [...MEETUPS].sort((a, b) => b.id - a.id);

  return (
    <>
      <PageHero
        label="Events"
        title="MeetUps"
        subtitle="Wir treffen uns in Berlin. Kein Programm, kein Druck, keine Pflicht zur Selbstdarstellung."
        backHref="/"
        backLabel="Zur Startseite"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">

        {/* ── Nächstes MeetUp ─────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Nächstes MeetUp</h2>

          {next ? (
            <div className="relative rounded-2xl border border-primary/25 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/5" />
              <div className="relative z-10 p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">
                    <span className="relative flex size-1.5 mr-1.5">
                      <span className="animate-ping absolute inline-flex size-full rounded-full bg-primary-foreground opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-primary-foreground" />
                    </span>
                    MeetUp {next.number}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                    {next.theme}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar size={14} className="text-primary" />{next.date}</div>
                  <div className="flex items-center gap-2"><Clock size={14} className="text-primary" />{next.time}</div>
                  <div className="flex items-center gap-2"><MapPin size={14} className="text-primary" />{next.location}</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
                    Platz sichern <ArrowRight size={16} />
                  </button>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground self-center">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Kostenlos, keine Anmeldepflicht
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl border border-dashed border-border overflow-hidden bg-muted/20">
              <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <Bell size={22} className="text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <Badge variant="secondary" className="mb-1">Kommt bald</Badge>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">MeetUp #4 in Planung</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    Das nächste Thema ist noch nicht festgelegt. Wir melden uns, sobald Datum und Ort stehen.
                    Am schnellsten erfährst du es über die Community.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                    <MapPin size={13} className="shrink-0" />
                    Ackerstraße 169, 10115 Berlin
                  </div>
                </div>
                <div className="shrink-0">
                  <Link href="/community" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
                    Community beitreten <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        <Separator />

        {/* ── Kalenderansicht ──────────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Alle Termine</h2>
              <p className="text-sm text-muted-foreground mt-1">Jeden Abend ein Thema. Immer dienstags.</p>
            </div>
            <Link
              href="/ressourcen/meetup-library"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              MeetUp Library <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* Coming Soon card when no upcoming meetup */}
            {!next && (
              <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-5 space-y-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Bell size={9} /> Kommt bald
                  </Badge>
                </div>
                <p className="font-semibold text-sm text-muted-foreground">MeetUp #4</p>
                <div>
                  <p className="text-[10px] font-bold text-center text-muted-foreground/60 mb-1.5">Datum noch offen</p>
                  <div className="h-[88px] flex items-center justify-center">
                    <span className="text-3xl font-bold text-muted-foreground/20">?</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-border/50 text-[10px] text-muted-foreground">
                  Wir geben Bescheid, sobald es feststeht.
                </div>
              </div>
            )}
            {all.map((m) => (
              <MiniCal
                key={m.id}
                dateStr={m.date}
                theme={m.theme}
                number={m.number}
                isPast={m.status === "past"}
                attendees={"attendees" in m ? m.attendees : undefined}
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center pt-1">
            Alle MeetUps finden in der Ackerstraße 169, 10115 Berlin statt.
          </p>
        </section>

        <Separator />

        {/* ── Atmosphäre Illustration ──────────────────────────── */}
        <div className="relative max-h-72 overflow-hidden rounded-2xl">
          <Image
            src="/assets/illustrations/meetup-atmosphaere.png"
            alt="Sechs Menschen sitzen im Kreis zusammen, entspannte Gesprächsatmosphäre"
            width={900}
            height={506}
            className="w-full h-auto object-cover object-center"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>

        <Separator />

        {/* ── Format ──────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Wie ein Abend aussieht</h2>
            <p className="text-muted-foreground">Ein typischer Abend bei Divergent Minds. Überschaubar, echt, ohne Programmdruck.</p>
          </div>

          <div className="relative max-h-64 overflow-hidden rounded-2xl">
            <Image
              src="/assets/illustrations/meetup-format.png"
              alt="Vier Szenen zeigen den Ablauf eines MeetUps: Ankommen, Input, Austausch, Netzwerken"
              width={900}
              height={506}
              className="w-full h-auto object-cover object-center"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {MEETUP_FORMAT.map((step) => (
              <div key={step.step} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Vergangene ──────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Was bisher war</h2>
          <div className="space-y-3">
            {past.map((m) => (
              <div key={m.id} className="flex items-start gap-5 p-5 rounded-xl border border-border bg-card">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground font-bold text-sm">
                  {m.number}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{m.theme}</h3>
                  <div className="flex flex-wrap gap-4 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {m.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={10} /> Berlin Mitte</span>
                    {"attendees" in m && (
                      <span className="flex items-center gap-1"><Users size={10} /> {m.attendees} Teilnehmende</span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/ressourcen/meetup-library#meetup-${m.id}`}
                  className="shrink-0 text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
                >
                  Zusammenfassung <ArrowRight size={10} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Veranstaltungsort ───────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Wo wir uns treffen</h2>

          <div className="relative max-h-80 overflow-hidden rounded-2xl">
            <Image
              src="/assets/illustrations/veranstaltungsort.png"
              alt="Berliner Straße am Abend, drei Menschen gehen auf einen beleuchteten Eingang zu"
              width={900}
              height={600}
              className="w-full h-auto object-cover object-top"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">{BRAND.location}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Berlin Mitte. Gut erreichbar mit der U8 (Rosenthaler Platz) oder S-Bahn (Nordbahnhof).
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Häufige Fragen</h2>
          <div className="space-y-3">
            {MEETUP_FAQ.map((item) => (
              <details key={item.q} className="group rounded-xl border border-border bg-card px-5 py-4 cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-foreground text-sm list-none gap-4">
                  {item.q}
                  <span className="shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Einfach vorbeikommen</h3>
          <p className="text-primary-foreground/75 max-w-md mx-auto">
            Keine Anmeldung nötig. Wir freuen uns, wenn du da bist.
          </p>
          <Link href="/community" className={cn(buttonVariants({ size: "lg" }), "bg-white text-primary hover:bg-white/90 gap-2")}>
            Zur Community <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
