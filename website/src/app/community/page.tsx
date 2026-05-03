import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { COMMUNITY_VALUES, BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Community",
  description: "Werde Teil der Divergent Minds Community Berlin. Offen, respektvoll, ohne Druck.",
};

const WHAT_TO_EXPECT = [
  "Ein geschützter Raum ohne Bewertung",
  "Menschen, die wissen, wie sich ADHS anfühlt",
  "Praxisnahe Tipps statt leere Motivationsfloskeln",
  "Echte Gespräche statt Small Talk",
  "Experteninput bei jedem MeetUp",
  "Keine Anmeldepflicht, kein Leistungsdruck",
];

const HOW_TO_JOIN = [
  { step: "1", title: "MeetUp besuchen",  desc: "Komm einfach vorbei. Keine Anmeldung nötig. Die Adresse findest du auf der MeetUps-Seite." },
  { step: "2", title: "Community-Chat",   desc: "Nach dem ersten MeetUp bekommst du den Einladungslink zu unserem Chat. Dort läuft der Austausch auch zwischen den Events." },
  { step: "3", title: "Newsletter",       desc: "Abonniere den Forschungs-Radar und bekomm relevante ADHS-Studien und Ressourcen direkt ins Postfach." },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        label="Mitmachen"
        title="Die Community"
        subtitle="Ein Ort für Erwachsene mit ADHS in Berlin. Echt, offen, ohne Druck."
        backHref="/"
        backLabel="Zur Startseite"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">

        {/* Community Netzwerk Illustration */}
        <div className="relative max-h-80 overflow-hidden rounded-2xl">
          <Image
            src="/assets/illustrations/community-netzwerk.png"
            alt="Fünf diverse Menschen stehen zusammen, verbunden durch Punkte und Symbole"
            width={900}
            height={600}
            className="w-full h-auto object-cover object-center"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>

        {/* Was / was nicht */}
        <section className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Was Divergent Minds ist und was nicht</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Wir sind keine Selbsthilfegruppe. Kein Therapieangebot. Kein Verein.
                Wir sind eine offene Community von Menschen, die anders denken.
              </p>
              <p>
                Der Fokus liegt auf echtem Austausch, konkreten Ressourcen und dem Gefühl,
                nicht allein zu sein. Wissenschaftlich fundiert und menschlich geblieben.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Was dich erwartet</p>
            {WHAT_TO_EXPECT.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-foreground">
                <div className="size-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Werte */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Was uns zusammenhält</h2>
            <p className="text-muted-foreground">Was du von jedem MeetUp erwarten kannst.</p>
          </div>

          <div className="max-w-lg mx-auto">
            <Image
              src="/assets/illustrations/community-werte.png"
              alt="Vier Szenen zeigen die Community-Werte: Respekt, Offenheit, kein Druck, Vertraulichkeit"
              width={512}
              height={512}
              className="w-full rounded-2xl"
              sizes="512px"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {COMMUNITY_VALUES.map((val) => (
              <Card key={val.title} className="hover:shadow-soft transition-shadow">
                <CardContent className="pt-5 pb-5">
                  <h3 className="font-semibold text-foreground mb-1.5">{val.title}</h3>
                  <p className="text-sm text-muted-foreground">{val.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Wer ist dabei */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Wer kommt</h2>
          <p className="text-muted-foreground leading-relaxed">
            Unsere Community ist bunt. Diagnose oder nicht, jung oder erfahren, frisch
            auf dem Weg oder schon lange dabei. Was alle verbindet: die Bereitschaft,
            offen über das eigene Erleben zu sprechen.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "Berufstätige mit ADHS", "Frisch Diagnostizierte", "Menschen auf dem Diagnoseweg",
              "Partner:innen und Angehörige", "Neurodivergente ohne Diagnose", "Coaches und Fachleute",
            ].map((group) => (
              <Badge key={group} variant="secondary" className="text-sm py-1 px-3">{group}</Badge>
            ))}
          </div>
        </section>

        <Separator />

        {/* Wie mitmachen */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">So wirst du Teil davon</h2>

          <div className="relative max-h-72 overflow-hidden rounded-2xl">
            <Image
              src="/assets/illustrations/mitmachen.png"
              alt="Drei Szenen: Jemand kommt zur Tür herein, sitzt im Kreis, schaut auf das Handy mit Community-App"
              width={900}
              height={600}
              className="w-full h-auto object-cover object-center"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className="space-y-4">
            {HOW_TO_JOIN.map((step) => (
              <div key={step.step} className="flex gap-5 p-5 rounded-xl border border-border bg-card">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {step.step}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Fragen vor dem ersten Mal?</h2>
          <p className="text-muted-foreground">Schreib uns einfach. Wir antworten innerhalb von 48 Stunden.</p>
          <a href={`mailto:${BRAND.email}`}
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors max-w-sm">
            <Mail size={16} className="text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">{BRAND.email}</p>
              <p className="text-xs text-muted-foreground">Wir antworten innerhalb von 48h</p>
            </div>
          </a>
        </section>

        <div className="rounded-2xl bg-primary text-primary-foreground p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Bereit?</h3>
          <p className="text-primary-foreground/75 max-w-md mx-auto">
            Einfach vorbeikommen. Kein Vorab-Formular, kein Dresscode, kein Erwartungsdruck.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/meetups" className={cn(buttonVariants({ size: "lg" }), "bg-white text-primary hover:bg-white/90 gap-2")}>
              Zum nächsten MeetUp <ArrowRight size={16} />
            </Link>
            <Link href="/kontakt" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/30 text-white hover:bg-white/10")}>
              Schreib uns
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
