import type { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Jacqueline Eldagsen-Gutowsky — Psychologisches Coaching",
  description:
    "Jacqueline Eldagsen-Gutowsky ist Psychologin und Coach mit Master-Abschluss der Universität Maastricht. Spezialisiert auf ADHS, emotionale Dysregulation und Trauma.",
};

const FOCUS = [
  "ADHS bei Erwachsenen & Kindern",
  "Emotionale Dysregulation",
  "Bindungsfragen",
  "Trauma & Traumafolgen",
  "Familiendynamiken",
  "Selbstwert & Identität",
];

const METHODS = [
  { name: "ACT",                      desc: "Acceptance & Commitment Therapy" },
  { name: "EMDR-basiert",             desc: "Eye Movement Desensitization and Reprocessing" },
  { name: "CBASP",                    desc: "Cognitive Behavioral Analysis System of Psychotherapy" },
  { name: "Klientenzentriert",        desc: "Gesprächstherapie nach Carl Rogers" },
  { name: "Verhaltenstherapeutisch",  desc: "Kognitive Verhaltenstherapie" },
  { name: "Tiefenpsychologisch",      desc: "Arbeit mit unbewussten Mustern" },
];

export default function JaquelinePage() {
  return (
    <>
      <PageHero
        label="Das Team"
        title="Jacqueline Eldagsen-Gutowsky"
        subtitle="Psychologisches Coaching & Beratung — persönlich, proaktiv, wertschätzend"
        photo="/assets/team/jaqueline.jpeg"
        photoAlt="Jacqueline Eldagsen-Gutowsky"
        backHref="/#team"
        backLabel="Zum Team"
        accent="teal"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">

        {/* Quote */}
        <blockquote className="border-l-4 border-teal-500 pl-5 py-1">
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
            &bdquo;Psychologisches Wissen in den Alltag integrieren, entstigmatisieren — und Menschen
            unterstützen, sich selbst neu zu begegnen.&ldquo;
          </p>
        </blockquote>

        <Separator />

        {/* Wer bin ich */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Wer ich bin</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Ich bin Spezialistin für Neuropsychologie mit Master-Abschluss der Universität
              Maastricht — und selbst von ADHS betroffen. Das macht den Unterschied: Ich spreche
              nicht über das Thema, ich lebe damit.
            </p>
            <p>
              Mit über 12 Jahren Erfahrung in klinischen, beratenden und schulischen Feldern bringe
              ich wissenschaftliche Erkenntnisse in den Alltag. Ich bin Rednerin und Vermittlerin
              zwischen dem, was die Forschung zeigt, und dem, was im echten Leben funktioniert.
            </p>
            <p>
              Mein ursprünglicher Traum: Elefanten in Afrika erforschen, wie Jane Goodall. Heute
              arbeite ich gerne mit &bdquo;Elefanten im Porzellanladen&ldquo; — also Menschen, die viel
              mitbringen und oft zu wenig dafür anerkannt werden.
            </p>
          </div>
        </section>

        <Separator />

        {/* Expertise */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Schwerpunkte</h2>
          <div className="flex flex-wrap gap-2">
            {FOCUS.map((f) => (
              <Badge key={f} variant="secondary" className="text-sm py-1 px-3">{f}</Badge>
            ))}
          </div>
        </section>

        <Separator />

        {/* Methoden */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Meine Methoden</h2>
          <p className="text-muted-foreground">
            Mein Ansatz ist integrativ — ich kombiniere unterschiedliche Methoden je nach Mensch
            und Situation. Regelmäßige Teilnahme an Fachkongressen hält mich auf dem Stand der Forschung.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {METHODS.map((m) => (
              <Card key={m.name} className="hover:shadow-soft transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <p className="font-semibold text-foreground text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Rolle bei DM */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Rolle bei Divergent Minds</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bei unseren MeetUps übernehme ich die Rolle der psychologischen Expertin und Speakerin.
            Ich mache komplexe Sachverhalte verständlich — ohne die Tiefe zu verlieren.
            Was die Wissenschaft über ADHS weiß, soll bei dir ankommen, nicht im Fachvokabular verschwinden.
          </p>
        </section>

        <Separator />

        {/* Kontakt */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Kontakt & Online</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="https://www.adhsadhs.de" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors flex-1">
              <Globe size={16} className="text-teal-600 shrink-0" />
              <span className="text-sm font-medium">adhsadhs.de</span>
            </a>
            <a href="https://instagram.com/adhs_neuropsychologie" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors flex-1">
              <Globe size={16} className="text-teal-600 shrink-0" />
              <span className="text-sm font-medium">@adhs_neuropsychologie</span>
            </a>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-7 text-center space-y-4">
          <h3 className="text-xl font-bold">Jacqueline beim MeetUp erleben</h3>
          <p className="text-muted-foreground">
            Bei unseren Events spricht Jacqueline über Neuropsychologie — verständlich, direkt, mit Tiefe.
          </p>
          <Link href="/meetups" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-teal-600 hover:bg-teal-700 border-0")}>
            Zum nächsten MeetUp <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
