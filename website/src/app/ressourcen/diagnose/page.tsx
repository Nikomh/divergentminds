import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DIAGNOSE_STEPS } from "@/lib/resources-data";

export const metadata: Metadata = {
  title: "Diagnose-Kompass Berlin",
  description: "Wie bekomme ich in Berlin als Erwachsener eine ADHS-Diagnose? Realistisch, konkret, ohne Schönfärberei.",
};

export default function DiagnosePage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border/60 bg-teal-500/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/ressourcen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group">
            <ArrowRight size={13} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Zurück zu Ressourcen
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/15">
              <MapPin size={18} className="text-teal-600 dark:text-teal-400" />
            </div>
            <Badge variant="secondary">Diagnose-Kompass Berlin</Badge>
          </div>

          <h1 className="text-display-md font-bold tracking-tight text-foreground mb-3">
            Wie bekomme ich eine ADHS-Diagnose in Berlin?
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Realistisch, konkret, ohne Schönfärberei. Für alle, die gerade am Anfang des Weges stehen.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Reality check */}
        <div className="flex gap-3 p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5">
          <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Das solltest du wissen bevor du anfängst</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In Berlin sind Wartezeiten von 6 bis 18 Monaten für Fachärzte normal.
              Das ist kein Einzelfall, sondern die Realität.
              Meld dich früh an, such mehrere Praxen parallel, und halt das nicht für ein Zeichen,
              dass dein Anliegen nicht ernst genommen wird.
            </p>
          </div>
        </div>

        {/* Steps */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Der Weg zur Diagnose</h2>
          <div className="space-y-8">
            {DIAGNOSE_STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < DIAGNOSE_STEPS.length - 1 && (
                  <div className="absolute left-5 top-16 w-px h-8 bg-border" />
                )}
                <div className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-500 text-white font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="space-y-2 pt-1.5">
                    <h3 className="font-bold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    <div className="flex items-start gap-2 bg-teal-500/5 border border-teal-500/20 rounded-xl p-3">
                      <MapPin size={13} className="text-teal-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-teal-700 dark:text-teal-300 leading-relaxed">{step.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* What to say */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Was du beim Arztgespräch sagen kannst</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Abstrakte Beschreibungen helfen weniger als konkrete Situationen.
            Statt &bdquo;Ich habe Konzentrationsprobleme&ldquo; eher:
          </p>
          <div className="space-y-3">
            {[
              "Ich kann Aufgaben, die mich nicht sofort interessieren, kaum beginnen, egal wie wichtig sie sind.",
              "Ich verliere regelmäßig den Überblick über Zeit und merke erst sehr spät, dass Deadlines kommen.",
              "Ich bin erschöpfter als andere nach Tagen, die objektiv wenig anstrengend waren.",
              "Ich unterbreche andere häufig unbeabsichtigt, weil Gedanken sofort kommen wollen.",
            ].map((ex, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl border border-border bg-card">
                <span className="text-teal-500 font-bold text-sm shrink-0 mt-0.5">&ldquo;</span>
                <p className="text-sm text-foreground italic leading-relaxed">{ex}&ldquo;</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Disclaimer */}
        <div className="flex gap-3 p-5 rounded-xl border border-border bg-muted/30">
          <AlertCircle size={16} className="text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Dieser Kompass ist eine allgemeine Orientierung, kein medizinischer Rat.
            Konkrete Empfehlungen zu Praxen in Berlin geben wir gerne persönlich im MeetUp.
            Informationen können sich ändern.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 text-center space-y-3">
          <p className="font-semibold text-foreground">Du hast Fragen zum Diagnose-Weg?</p>
          <p className="text-sm text-muted-foreground">
            Im MeetUp sprechen wir offen darüber. Auch über persönliche Erfahrungen mit dem System.
          </p>
          <Link
            href="/meetups"
            className="inline-flex items-center gap-1.5 text-sm text-teal-600 dark:text-teal-400 font-medium hover:underline"
          >
            Zum nächsten MeetUp <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
