import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Users, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MEETUP_LIBRARY } from "@/lib/resources-data";

export const metadata: Metadata = {
  title: "MeetUp Library",
  description: "Zusammenfassungen, Insights und Learnings aus jedem Divergent Minds MeetUp.",
};

function MeetupEntry({ m }: { m: typeof MEETUP_LIBRARY[number] }) {
  return (
    <article id={m.id} className="scroll-mt-24 rounded-2xl border border-border bg-card overflow-hidden">

      {/* Header */}
      <div className="p-6 md:p-8 border-b border-border bg-muted/20">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="muted">MeetUp #{m.number}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar size={11} /> {m.date}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users size={11} /> {m.attendees} dabei
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={11} /> 5 Min. Lesen
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{m.theme}</h2>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {m.tags.map(t => (
            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Worum es ging</p>
          <p className="text-muted-foreground leading-relaxed">{m.summary}</p>
        </div>

        <Separator />

        {/* Insights */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">3 Key Insights</p>
          <div className="space-y-3">
            {m.insights.map((insight, i) => (
              <div key={i} className="flex gap-4">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed pt-0.5">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Quote */}
        <blockquote className="border-l-4 border-primary/30 pl-4 py-1">
          <p className="text-sm italic text-muted-foreground leading-relaxed">&bdquo;{m.quote}&ldquo;</p>
          <footer className="text-xs text-muted-foreground mt-2">Aus dem Gespräch, MeetUp #{m.number}</footer>
        </blockquote>

        {/* Action */}
        <div className="flex gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <ChevronRight size={16} className="text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-primary mb-1">Eine Handlung für diese Woche</p>
            <p className="text-sm text-foreground leading-relaxed">{m.action}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MeetupLibraryPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border/60 bg-orange-500/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/ressourcen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group">
            <ArrowRight size={13} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Zurück zu Ressourcen
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-500/15">
              <BookOpen size={18} className="text-orange-600 dark:text-orange-400" />
            </div>
            <Badge variant="secondary">MeetUp Library</Badge>
          </div>

          <h1 className="text-display-md font-bold tracking-tight text-foreground mb-3">
            Was an jedem Abend passiert ist
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Wer dabei war, kann nachlesen. Wer nicht dabei war, bekommt das Wichtigste.
            Jede Zusammenfassung in unter 5 Minuten.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Library entries */}
        {MEETUP_LIBRARY.map(m => (
          <MeetupEntry key={m.id} m={m} />
        ))}

        {/* Upcoming placeholder */}
        <div className="rounded-2xl border border-dashed border-border p-8 text-center space-y-3 opacity-60">
          <BookOpen size={24} className="mx-auto text-muted-foreground" />
          <p className="font-semibold text-foreground">MeetUp #4 — Masking vs. Authentizität</p>
          <p className="text-sm text-muted-foreground">09.12.2025 · Zusammenfassung erscheint danach</p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 text-center space-y-3">
          <p className="font-semibold text-foreground">Beim nächsten MeetUp live dabei sein</p>
          <p className="text-sm text-muted-foreground">
            Eine Zusammenfassung ist gut. Dabei sein ist besser.
          </p>
          <Link
            href="/meetups"
            className="inline-flex items-center gap-1.5 text-sm text-orange-600 dark:text-orange-400 font-medium hover:underline"
          >
            Zum nächsten MeetUp <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
