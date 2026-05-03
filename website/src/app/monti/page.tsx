import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Globe, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Monti Prior — ADHS Coach Berlin",
  description:
    "Monti Prior ist ADHS Coach, Konfliktcoach und Gründerin von Divergent Minds Berlin. Seit 2012 unterstützt sie Menschen mit ADHS dabei, ihre persönliche Freiheit zu finden.",
};

const METHODS = [
  "Visualisierung & Bildsprache",
  "Gesprächssimulationen",
  "Aufstellungsarbeit",
  "Systemische Fragen",
  "Feedback-Techniken",
  "Videotraining",
  "Paarberatungsmoderation",
];

const AREAS = [
  { title: "ADHS-Coaching",       desc: "Strategien für den Alltag, die wirklich zu deinem Gehirn passen." },
  { title: "Body-Doubling",        desc: "Gemeinsam arbeiten — damit das, was allein nicht klappt, gelingt." },
  { title: "Ordnungstraining",     desc: "Strukturen schaffen ohne Selbstbestrafung." },
  { title: "Konfliktcoaching",     desc: "Schwierige Gespräche meistern — im Beruf und im Privatleben." },
  { title: "Systemische Paarberatung", desc: "ADHS in der Partnerschaft verstehen und gemeinsam navigieren." },
  { title: "Kommunikationstraining", desc: "Klar und direkt kommunizieren, ohne zu überfordern." },
];

export default function MontiPage() {
  return (
    <>
      <PageHero
        label="Das Team"
        title="Monti Prior"
        subtitle="ADHS Coach · Konfliktcoach · Kommunikationstrainerin · Paarberaterin"
        photo="/assets/team/monti.jpeg"
        photoAlt="Monti Prior"
        backHref="/#team"
        backLabel="Zum Team"
        accent="primary"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">

        {/* Founder badge */}
        <div className="flex justify-center md:justify-start">
          <Badge variant="default" className="text-sm px-4 py-1.5">
            Gründerin von Divergent Minds Berlin
          </Badge>
        </div>

        {/* Quote */}
        <blockquote className="border-l-4 border-primary pl-5 py-1">
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
            &bdquo;Neurotypisch ist für mich kein Maßstab. Wenn wir aufhören uns zu vergleichen,
            kann jede/jeder eine persönliche Freiheit erlangen.&ldquo;
          </p>
        </blockquote>

        <Separator />

        {/* Geschichte */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Meine Geschichte</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Mein Weg war alles andere als geradlinig — und genau das macht ihn zu meiner Stärke.
              Schneiderin, Grafikerin, 20 Jahre in der Gastronomie, Eventorganisation: Ich kenne das
              Leben aus vielen Perspektiven. Seit 1997 bin ich Unternehmerin, seit 2011 weiß ich, warum
              vieles davon so war, wie es war.
            </p>
            <p>
              Meine ADHS-Diagnose 2011 war kein Schock — sie war eine Erklärung. Noch im selben Jahr
              begann ich meine Ausbildung zur Konfliktcoach und Mediatorin. Seit 2012 begleite ich
              Menschen als Senior Coach.
            </p>
            <p>
              Divergent Minds Berlin habe ich gegründet, weil ich selbst einen solchen Ort gebraucht
              hätte — einen Raum, in dem ADHS keine Entschuldigung ist, sondern einfach ein Teil
              von wem man ist.
            </p>
          </div>
        </section>

        <Separator />

        {/* Kompetenzen */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Kompetenzbereiche</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {AREAS.map((area) => (
              <Card key={area.title} className="hover:shadow-soft transition-shadow">
                <CardContent className="pt-5 pb-5">
                  <h3 className="font-semibold text-foreground mb-1">{area.title}</h3>
                  <p className="text-sm text-muted-foreground">{area.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Methoden */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Wie ich arbeite</h2>
          <p className="text-muted-foreground">
            Ich arbeite intuitiv und erfahrungsbasiert — mit Methoden, die zu dir passen,
            nicht umgekehrt. Kein Schema F, keine 08/15-Hausaufgaben.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {METHODS.map((m) => (
              <Badge key={m} variant="secondary">{m}</Badge>
            ))}
          </div>
        </section>

        <Separator />

        {/* Kontakt */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Kontakt</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <a href="tel:01772838555"
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors">
              <Phone size={16} className="text-primary shrink-0" />
              <span className="text-sm font-medium">0177-2838555</span>
            </a>
            <a href="mailto:m.prior@me.com"
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors">
              <Mail size={16} className="text-primary shrink-0" />
              <span className="text-sm font-medium">m.prior@me.com</span>
            </a>
            <a href="https://www.prior-coaching.de" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors">
              <Globe size={16} className="text-primary shrink-0" />
              <span className="text-sm font-medium">prior-coaching.de</span>
            </a>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border">
              <MapPin size={16} className="text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">Schröderstr. 12/II, 10115 Berlin</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7 text-center space-y-4">
          <h3 className="text-xl font-bold">Neugierig geworden?</h3>
          <p className="text-muted-foreground">
            Komm zu einem unserer MeetUps und triff Monti persönlich.
          </p>
          <Link href="/meetups" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
            Zum nächsten MeetUp <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
