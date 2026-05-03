"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, RotateCcw, Bot, Zap, MapPin, BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  SITUATION_TAGS, REFRAMING_CARDS, PROMPTING_PLAYBOOKS,
  MEETUP_LIBRARY, COMING_SOON_RESOURCES, type SituationTag,
} from "@/lib/resources-data";


export default function RessourcenPage() {
  const [activeTag, setActiveTag] = useState<SituationTag | "Alle">("Alle");

  const filterByTag = <T extends { tags: readonly SituationTag[] }>(items: readonly T[]) =>
    activeTag === "Alle" ? items : items.filter(i => (i.tags as readonly string[]).includes(activeTag));

  const filteredCards    = filterByTag(REFRAMING_CARDS);
  const filteredPlaybooks = filterByTag(PROMPTING_PLAYBOOKS);
  const filteredMeetups  = filterByTag(MEETUP_LIBRARY);

  return (
    <div className="min-h-screen">

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group">
            <ArrowRight size={13} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Zur Startseite
          </Link>
          <Badge variant="muted" className="mb-4">Ressourcen</Badge>
          <h1 className="text-display-md font-bold tracking-tight text-foreground mb-3">
            Alles auf einem Platz
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Reframing Cards, Prompting Playbooks, MeetUp-Zusammenfassungen und mehr.
            Keine langen Texte. Nur was wirklich hilft.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">

        {/* ── Situation Filter ─────────────────────────────── */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Ich brauche gerade etwas zu...
          </p>
          <div className="flex flex-wrap gap-2">
            {(["Alle", ...SITUATION_TAGS] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag as SituationTag | "Alle")}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  activeTag === tag
                    ? "bg-primary text-primary-foreground border-primary shadow-soft-sm"
                    : "border-border hover:border-primary/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── Reframing Cards ──────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10">
                <RotateCcw size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Reframing Cards</h2>
                <p className="text-xs text-muted-foreground">Schwierige Momente anders sehen</p>
              </div>
            </div>
            <Link href="/ressourcen/reframing"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
              Alle {REFRAMING_CARDS.length} ansehen <ArrowRight size={13} />
            </Link>
          </div>

          {filteredCards.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">Keine Karten für diese Situation.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.slice(0, 3).map((card) => (
                <Link key={card.id} href={`/ressourcen/reframing#${card.id}`}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-5 hover:border-amber-500/40 hover:shadow-soft transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap gap-1">
                        {card.tags.map(t => (
                          <span key={t} className="text-[10px] font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">{t}</span>
                        ))}
                      </div>
                      <RotateCcw size={13} className="text-muted-foreground/50 group-hover:text-amber-500 transition-colors shrink-0" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 leading-snug">{card.situation}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-3 font-medium">Zum Reframe tippen</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── Prompting Playbooks ──────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                <Bot size={16} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Prompting Playbooks</h2>
                <p className="text-xs text-muted-foreground">KI konkret für ADHS nutzen</p>
              </div>
            </div>
            <Link href="/ressourcen/prompts"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
              Alle {PROMPTING_PLAYBOOKS.length} ansehen <ArrowRight size={13} />
            </Link>
          </div>

          {filteredPlaybooks.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">Keine Playbooks für diese Situation.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredPlaybooks.slice(0, 2).map((pb) => (
                <Link key={pb.id} href={`/ressourcen/prompts#${pb.id}`}>
                  <div className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-soft transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                        <Bot size={14} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground leading-snug">{pb.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{pb.when}</p>
                      </div>
                    </div>
                    <p className="text-xs text-primary font-medium mt-2">Prompt ansehen und kopieren</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── Notfallplan ──────────────────────────────────── */}
        <section>
          <Link href="/ressourcen/notfallplan">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 md:p-8 hover:border-emerald-500/50 hover:shadow-soft transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15">
                  <Zap size={20} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-1">ADHS-Notfallplan</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Wenn gerade alles zu viel ist und du nicht weißt wo anfangen.
                    Fünf konkrete Schritte die immer funktionieren.
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-3">
                    Zum Notfallplan <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── MeetUp Library ───────────────────────────────── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500/10">
                <BookOpen size={16} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">MeetUp Library</h2>
                <p className="text-xs text-muted-foreground">Zusammenfassungen jedes Abends</p>
              </div>
            </div>
            <Link href="/ressourcen/meetup-library"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
              Alle ansehen <ArrowRight size={13} />
            </Link>
          </div>

          {filteredMeetups.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">Keine MeetUp-Einträge für diese Situation.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredMeetups.slice(0, 2).map((m) => (
                <Link key={m.id} href={`/ressourcen/meetup-library#${m.id}`}>
                  <div className="group rounded-2xl border border-border bg-card p-5 hover:border-orange-500/40 hover:shadow-soft transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="muted">MeetUp #{m.number}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={10} /> 5 Min. Lesen
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{m.theme}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{m.summary}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {m.tags.map(t => (
                        <span key={t} className="text-[10px] font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── Diagnose-Kompass ─────────────────────────────── */}
        <section>
          <Link href="/ressourcen/diagnose">
            <div className="rounded-2xl border border-teal-500/30 bg-teal-500/5 p-6 md:p-8 hover:border-teal-500/50 hover:shadow-soft transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-500/15">
                  <MapPin size={20} className="text-teal-600 dark:text-teal-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-1">Diagnose-Kompass Berlin</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Wo und wie bekomme ich in Berlin als Erwachsener eine ADHS-Diagnose?
                    Realistisch, konkret, ohne Schönfärberei.
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-teal-600 dark:text-teal-400 font-medium mt-3">
                    Zum Kompass <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── Coming Soon ──────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-1">Kommt bald</h2>
            <p className="text-sm text-muted-foreground">Aktuell in Arbeit. Erscheint nach und nach.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COMING_SOON_RESOURCES.map((r) => (
              <div key={r.title} className="rounded-xl border border-border/60 bg-muted/30 p-4 opacity-60">
                <span className="text-2xl mb-2 block">{r.icon}</span>
                <h3 className="font-semibold text-sm text-foreground">{r.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
