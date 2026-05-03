import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NOTFALLPLAN_STEPS } from "@/lib/resources-data";

export const metadata: Metadata = {
  title: "ADHS-Notfallplan",
  description: "Fünf konkrete Schritte für Momente in denen alles gerade zu viel ist.",
};

export default function NotfallplanPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border/60 bg-emerald-500/5">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/ressourcen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group">
            <ArrowRight size={13} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Zurück zu Ressourcen
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/15">
              <Zap size={18} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <Badge variant="secondary">Notfallplan</Badge>
          </div>

          <h1 className="text-display-md font-bold tracking-tight text-foreground mb-3">
            Wenn gerade alles zu viel ist
          </h1>
          <p className="text-lg text-muted-foreground">
            Fünf Schritte. Immer in dieser Reihenfolge. Kein Nachdenken nötig.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">

        {/* Steps */}
        {NOTFALLPLAN_STEPS.map((step, i) => (
          <div
            key={step.nr}
            className="relative flex gap-5 p-6 rounded-2xl border border-border bg-card"
          >
            {/* Connector line */}
            {i < NOTFALLPLAN_STEPS.length - 1 && (
              <div className="absolute left-[2.35rem] top-full w-px h-6 bg-border" />
            )}

            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-sm">
              {step.nr}
            </div>
            <div className="space-y-1 pt-1">
              <h2 className="text-xl font-bold text-foreground">{step.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}

        {/* Print hint */}
        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
          <Printer size={16} className="text-muted-foreground shrink-0" />
          <p className="text-sm text-muted-foreground">
            Am besten ausdrucken und sichtbar aufhängen. Oder als Screenshot im Handy speichern.
            Im Moment der Krise will man nicht suchen.
          </p>
        </div>

        {/* Community note */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center space-y-3">
          <p className="text-foreground font-semibold">Wenn Schritt 5 kommt: Wir sind da.</p>
          <p className="text-sm text-muted-foreground">
            Die Community ist ein sicherer Raum für genau solche Momente.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
          >
            Zur Community <ArrowRight size={13} />
          </Link>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Dieser Notfallplan ersetzt keine professionelle Hilfe. Bei anhaltenden Krisen wende dich an
            die Telefonseelsorge (0800 111 0 111, kostenlos, 24h) oder deinen Arzt.
          </p>
        </div>
      </div>
    </div>
  );
}
