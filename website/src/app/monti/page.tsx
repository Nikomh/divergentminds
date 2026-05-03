import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Globe, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Monti Prior",
  description: "Monti Prior ist ADHS Coach, Konfliktcoach und Gründerin von Divergent Minds Berlin.",
};

const AREAS = [
  { title: "ADHS-Coaching",            desc: "Strategien, die wirklich zu deinem Kopf passen. Nicht zu irgendeinem Lehrbuch." },
  { title: "Body-Doubling",             desc: "Gemeinsam arbeiten, damit das klappt, was allein nicht gelingt." },
  { title: "Ordnungstraining",          desc: "Struktur schaffen, ohne sich dabei selbst zu bestrafen." },
  { title: "Konfliktcoaching",          desc: "Schwierige Gespräche angehen. Im Job und im Privatleben." },
  { title: "Systemische Paarberatung", desc: "ADHS in der Partnerschaft verstehen und als Team navigieren." },
  { title: "Kommunikationstraining",   desc: "Klar reden, ohne zu überfordern. Weder dich noch andere." },
];

const METHODS = [
  "Visualisierung", "Gesprächssimulationen", "Aufstellungsarbeit",
  "Systemische Fragen", "Feedback-Techniken", "Videotraining", "Paarberatungsmoderation",
];

export default function MontiPage() {
  return (
    <>
      <PageHero
        label="Das Team"
        title="Monti Prior"
        subtitle="ADHS Coach, Konfliktcoach, Kommunikationstrainerin, Paarberaterin"
        photo="/assets/team/monti.jpeg"
        photoAlt="Monti Prior"
        backHref="/#team"
        backLabel="Zum Team"
        accent="primary"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">

        <div className="flex justify-center md:justify-start">
          <Badge variant="default" className="text-sm px-4 py-1.5">
            Gründerin von Divergent Minds Berlin
          </Badge>
        </div>

        <blockquote className="border-l-4 border-primary pl-5 py-1">
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
            &bdquo;Neurotypisch ist für mich kein Maßstab. Wenn wir aufhören uns zu vergleichen,
            kann jede und jeder eine persönliche Freiheit erlangen.&ldquo;
          </p>
        </blockquote>

        <Separator />

        {/* Coaching Scene Illustration */}
        <Image
          src="/assets/illustrations/coaching.png"
          alt="Zwei Menschen im offenen, warmen Coaching-Gespräch"
          width={700}
          height={467}
          className="w-full rounded-2xl"
          sizes="(max-width: 768px) 100vw, 700px"
        />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Wie es angefangen hat</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Schneiderin, Grafikerin, 20 Jahre Gastronomie, Eventorganisation. Seit 1997
              selbstständig. Mein Weg war nie geradlinig, und lange wusste ich nicht warum.
            </p>
            <p>
              2011 kam die Diagnose. Kein Schock, eher eine Erleichterung. Endlich hatte all das,
              was mich mein Leben lang begleitet hatte, einen Namen. Noch im selben Jahr begann ich
              meine Ausbildung zur Konfliktcoach und Mediatorin.
            </p>
            <p>
              Divergent Minds Berlin habe ich gegründet, weil ich selbst einen solchen Ort gebraucht
              hätte. Einen Raum, in dem ADHS einfach dazugehört. Keine Erklärungen, kein
              Entschuldigen.
            </p>
          </div>
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Womit ich arbeite</h2>

          {/* Kompetenzrad */}
          <Image
            src="/assets/illustrations/kompetenzen.png"
            alt="Frau im Zentrum umgeben von sechs Vignetten ihrer Coaching-Methoden"
            width={700}
            height={700}
            className="w-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 700px"
          />

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

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Wie ich arbeite</h2>
          <p className="text-muted-foreground leading-relaxed">
            Kein Schema F. Kein 08/15-Hausaufgabenheft. Ich arbeite mit dem, was funktioniert,
            und das ist bei jedem Mensch etwas anderes.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {METHODS.map((m) => (
              <Badge key={m} variant="secondary">{m}</Badge>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Kontakt</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <a href="tel:01772838555"
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors">
              <Phone size={16} className="text-primary shrink-0" />
              <span className="text-sm font-medium">0177 28 38 555</span>
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

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7 text-center space-y-4">
          <h3 className="text-xl font-bold">Lust auf ein Gespräch?</h3>
          <p className="text-muted-foreground">
            Komm zum nächsten MeetUp und triff Monti persönlich.
          </p>
          <Link href="/meetups" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
            Zum nächsten MeetUp <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
