import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Jacqueline Eldagsen-Gutowsky",
  description: "Jacqueline Eldagsen-Gutowsky ist Psychologin und Coach, spezialisiert auf ADHS und Neuropsychologie.",
};

const FOCUS = [
  "ADHS bei Erwachsenen und Kindern", "Emotionale Dysregulation",
  "Bindungsfragen", "Trauma und Traumafolgen",
  "Familiendynamiken", "Selbstwert und Identität",
];

const METHODS = [
  { name: "ACT",                  desc: "Acceptance and Commitment Therapy" },
  { name: "EMDR-basiert",         desc: "Eye Movement Desensitization and Reprocessing" },
  { name: "CBASP",                desc: "Cognitive Behavioral Analysis System of Psychotherapy" },
  { name: "Klientenzentriert",    desc: "Gesprächstherapie nach Carl Rogers" },
  { name: "Verhaltenstherapie",   desc: "Kognitive Verhaltenstherapie" },
  { name: "Tiefenpsychologisch",  desc: "Arbeit mit unbewussten Mustern" },
];

export default function JaquelinePage() {
  return (
    <>
      <PageHero
        label="Das Team"
        title="Jacqueline Eldagsen-Gutowsky"
        subtitle="Psychologisches Coaching und Beratung"
        photo="/assets/team/jaqueline.jpeg"
        photoAlt="Jacqueline Eldagsen-Gutowsky"
        backHref="/#team"
        backLabel="Zum Team"
        accent="teal"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">

        <blockquote className="border-l-4 border-teal-500 pl-5 py-1">
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
            &bdquo;Psychologisches Wissen soll im Alltag ankommen. Nicht im Fachbegriff verschwinden.&ldquo;
          </p>
        </blockquote>

        <Separator />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Wer ich bin</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ich habe Psychologie an der Universität Maastricht studiert und arbeite seit
                über zwölf Jahren in klinischen, beratenden und schulischen Zusammenhängen.
                Ich habe selbst ADHS. Das macht einen Unterschied.
              </p>
              <p>
                Mein Job ist es, Brücken zu bauen. Zwischen dem, was die Forschung weiß, und dem,
                was im echten Leben funktioniert. Ohne die Tiefe zu verlieren.
              </p>
              <p>
                Ursprünglich wollte ich Elefanten in Afrika erforschen. Heute arbeite ich gerne
                mit den Elefanten im Porzellanladen.
              </p>
            </div>
          </section>

          {/* Neuropsychologie Illustration */}
          <div className="max-w-xs mx-auto w-full">
            <Image
              src="/assets/illustrations/neuropsychologie.png"
              alt="Frau schaut auf Gedankenblasen mit Symbolen zu Familie, Bindung, Gehirn und Emotionen"
              width={400}
              height={267}
              className="w-full rounded-2xl"
              sizes="400px"
            />
          </div>
        </div>

        <Separator />

        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Schwerpunkte</h2>
          <div className="flex flex-wrap gap-2">
            {FOCUS.map((f) => (
              <Badge key={f} variant="secondary" className="text-sm py-1 px-3">{f}</Badge>
            ))}
          </div>
        </section>

        <Separator />

        {/* Methoden Illustration */}
        <div className="max-w-sm mx-auto">
          <Image
            src="/assets/illustrations/methoden.png"
            alt="Therapeutin im Gespräch mit Klienten, Gedankenblasen zeigen verschiedene Therapieansätze"
            width={384}
            height={384}
            className="w-full rounded-2xl"
            sizes="384px"
          />
        </div>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Wie ich arbeite</h2>
          <p className="text-muted-foreground leading-relaxed">
            Integrativ. Das bedeutet: Ich nehme, was passt, nicht was gerade Trend ist.
            Ich bin regelmäßig auf Fachkongressen, damit das auf dem Stand der Forschung bleibt.
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

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Meine Rolle bei Divergent Minds</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bei unseren MeetUps bringe ich den wissenschaftlichen Input. Ich erkläre, was die
            Forschung zu ADHS sagt, und mache es greifbar. Kein Vortrag, sondern ein Gespräch.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Online</h2>
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

        <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-7 text-center space-y-4">
          <h3 className="text-xl font-bold">Jacqueline beim MeetUp erleben</h3>
          <p className="text-muted-foreground">
            Sie erklärt Neuropsychologie so, dass man sie danach auch wirklich nutzen kann.
          </p>
          <Link href="/meetups" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-teal-600 hover:bg-teal-700 border-0")}>
            Zum nächsten MeetUp <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
