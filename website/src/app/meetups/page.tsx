import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MEETUPS, MEETUP_FORMAT, MEETUP_FAQ, BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "MeetUps — Divergent Minds Berlin",
  description:
    "Persönliche ADHS-Community-Treffen in Berlin Mitte. Offen für alle — keine Diagnose nötig. Aktuelle und vergangene MeetUp-Termine.",
};

export default function MeetupsPage() {
  const next = MEETUPS.find((m) => m.status === "upcoming")!;
  const past = MEETUPS.filter((m) => m.status === "past");

  return (
    <>
      <PageHero
        label="Events"
        title="MeetUps"
        subtitle="Persönliche Treffen in Berlin — ohne Anmeldepflicht, ohne Diagnose, ohne Druck."
        backHref="/"
        backLabel="Zur Startseite"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">

        {/* Nächstes MeetUp */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Nächstes MeetUp</h2>

          <div className="relative rounded-2xl border border-primary/25 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/5" />
            <div className="relative z-10 p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">
                  <span className="relative flex size-1.5 mr-1.5">
                    <span className="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                  </span>
                  MeetUp {next.number}
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                  {next.theme}
                </h3>
                {"description" in next && (
                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    {next.description}
                  </p>
                )}
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
                  Kostenlos · Keine Anmeldepflicht
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Wie läuft ein MeetUp ab */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Wie läuft ein MeetUp ab?</h2>
            <p className="text-muted-foreground">Ein typischer Abend bei Divergent Minds — überschaubar, echt, ohne Programmdruck.</p>
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

        {/* Vergangene MeetUps */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Vergangene MeetUps</h2>
          <div className="space-y-4">
            {past.map((meetup) => (
              <Card key={meetup.id} className="opacity-80 hover:opacity-100 transition-opacity">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <Badge variant="muted">MeetUp {meetup.number}</Badge>
                    {"attendees" in meetup && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users size={12} /> {meetup.attendees} Teilnehmende
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-1">{meetup.theme}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5"><Calendar size={11} /> {meetup.date}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={11} /> {meetup.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Ort */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Wo wir uns treffen</h2>
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">{BRAND.location}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Berlin Mitte — gut erreichbar mit U8 (Rosenthaler Platz) oder S-Bahn (Nordbahnhof).
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* FAQ */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Häufige Fragen</h2>
          <div className="space-y-3">
            {MEETUP_FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-border bg-card px-5 py-4 cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-foreground text-sm list-none gap-4">
                  {item.q}
                  <span className="shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Dabei sein</h3>
          <p className="text-primary-foreground/75 max-w-md mx-auto">
            Keine Anmeldung nötig. Einfach vorbeikommen — wir freuen uns auf dich.
          </p>
          <Link href="/community" className={cn(buttonVariants({ size: "lg" }), "bg-white text-primary hover:bg-white/90 gap-2")}>
            Community beitreten <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
