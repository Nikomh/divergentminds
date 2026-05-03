"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { REFRAMING_CARDS, SITUATION_TAGS, type SituationTag } from "@/lib/resources-data";

function FlipCard({ card }: { card: typeof REFRAMING_CARDS[number] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      id={card.id}
      className="relative cursor-pointer select-none scroll-mt-24"
      style={{ height: "360px", perspective: "1200px" }}
      onClick={() => setFlipped(f => !f)}
      role="button"
      aria-label={flipped ? "Karte umdrehen" : `Reframe für: ${card.situation}`}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border border-border bg-card p-6 flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-wrap gap-1.5">
              {card.tags.map(t => (
                <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
              ))}
            </div>
            <RotateCcw size={14} className="text-muted-foreground/40 shrink-0" />
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-3">
            <h3 className="text-xl font-bold text-foreground leading-snug">{card.situation}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium mt-4">
            <RotateCcw size={12} />
            Tippen für den Reframe
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-6 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">Reframe</span>
            <RotateCcw size={14} className="text-amber-600/40 shrink-0" />
          </div>

          <div className="flex-1 flex flex-col justify-between space-y-4">
            <p className="text-base font-semibold text-foreground leading-relaxed">
              {card.reframe}
            </p>

            <div className="space-y-3">
              <div className="rounded-xl bg-white/60 dark:bg-black/20 border border-amber-200/50 dark:border-amber-800/50 p-3">
                <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">Was hilft</p>
                <p className="text-xs text-foreground leading-relaxed">{card.tip}</p>
              </div>
              <p className="text-[11px] text-muted-foreground italic leading-relaxed">{card.science}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium mt-4">
            <RotateCcw size={12} />
            Tippen zum Zurückdrehen
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ReframingPage() {
  const [activeTag, setActiveTag] = useState<SituationTag | "Alle">("Alle");

  const filtered = activeTag === "Alle"
    ? REFRAMING_CARDS
    : REFRAMING_CARDS.filter(c => (c.tags as readonly string[]).includes(activeTag));

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/ressourcen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group">
            <ArrowRight size={13} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Zurück zu Ressourcen
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/15">
              <RotateCcw size={18} className="text-amber-600 dark:text-amber-400" />
            </div>
            <Badge variant="secondary">Reframing Cards</Badge>
          </div>

          <h1 className="text-display-md font-bold tracking-tight text-foreground mb-3">
            Schwierige Momente anders sehen
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Karten für die Momente, in denen das eigene Gehirn gerade kein fairer Zeuge ist.
            Tippe eine Karte an um den Reframe zu sehen.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          {(["Alle", ...SITUATION_TAGS] as const).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag as SituationTag | "Alle")}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-all duration-200",
                activeTag === tag
                  ? "bg-amber-500 text-white border-amber-500"
                  : "border-border hover:border-amber-500/40 text-muted-foreground hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((card) => (
            <FlipCard key={card.id} card={card} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Keine Karten für diese Situation.</p>
          </div>
        )}

        <div className="pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Mehr Karten folgen. Hast du eine Situation die noch fehlt?{" "}
            <Link href="/kontakt" className="text-primary hover:underline">Schreib uns.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
