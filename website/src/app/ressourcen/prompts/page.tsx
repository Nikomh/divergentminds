"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Copy, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PROMPTING_PLAYBOOKS, SITUATION_TAGS, type SituationTag } from "@/lib/resources-data";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
        copied
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          : "bg-primary/10 text-primary hover:bg-primary/15"
      )}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Kopiert!" : "Prompt kopieren"}
    </button>
  );
}

function PlaybookCard({ pb }: { pb: typeof PROMPTING_PLAYBOOKS[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div id={pb.id} className="rounded-2xl border border-border bg-card scroll-mt-24 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-4 p-6 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 mt-0.5">
          <Bot size={16} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {pb.tags.map(t => (
              <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
            ))}
          </div>
          <h3 className="font-bold text-foreground">{pb.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{pb.when}</p>
        </div>
        <ChevronDown
          size={16}
          className={cn("text-muted-foreground shrink-0 mt-1 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">

              {/* Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Der Prompt</p>
                  <CopyButton text={pb.prompt} />
                </div>
                <div className="rounded-xl bg-muted/50 border border-border p-4">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">{pb.prompt}</pre>
                </div>
              </div>

              {/* What you get */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-primary/5 border border-primary/15 p-4">
                  <p className="text-xs font-semibold text-primary mb-1.5">Was du bekommst</p>
                  <p className="text-sm text-foreground leading-relaxed">{pb.what_you_get}</p>
                </div>
                <div className="rounded-xl bg-muted/50 border border-border p-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Tipp</p>
                  <p className="text-sm text-foreground leading-relaxed">{pb.tip}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Funktioniert mit ChatGPT, Claude, Gemini oder jedem anderen KI-Chat.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PromptsPage() {
  const [activeTag, setActiveTag] = useState<SituationTag | "Alle">("Alle");

  const filtered = activeTag === "Alle"
    ? PROMPTING_PLAYBOOKS
    : PROMPTING_PLAYBOOKS.filter(p => (p.tags as readonly string[]).includes(activeTag));

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/ressourcen" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group">
            <ArrowRight size={13} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Zurück zu Ressourcen
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <Bot size={18} className="text-primary" />
            </div>
            <Badge variant="secondary">Prompting Playbooks</Badge>
          </div>

          <h1 className="text-display-md font-bold tracking-tight text-foreground mb-3">
            KI konkret für ADHS nutzen
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Fertige Prompts für schwierige ADHS-Momente. Einfach kopieren und in ChatGPT,
            Claude oder ein anderes Tool einfügen.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* How it works */}
        <div className="rounded-2xl border border-border bg-muted/30 p-5 grid sm:grid-cols-3 gap-4 text-sm">
          {[
            { nr: "1", text: "Playbook öffnen das zu deiner Situation passt" },
            { nr: "2", text: "Prompt kopieren und in ChatGPT oder Claude einfügen" },
            { nr: "3", text: "In eckigen Klammern deine eigenen Infos ergänzen" },
          ].map(s => (
            <div key={s.nr} className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{s.nr}</span>
              <p className="text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          {(["Alle", ...SITUATION_TAGS] as const).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag as SituationTag | "Alle")}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-all duration-200",
                activeTag === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Playbooks */}
        <div className="space-y-4">
          {filtered.map(pb => <PlaybookCard key={pb.id} pb={pb} />)}
          {filtered.length === 0 && (
            <p className="text-muted-foreground text-sm py-8 text-center">Keine Playbooks für diese Situation.</p>
          )}
        </div>

        <div className="pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Mehr Playbooks in Arbeit. Einen Prompt-Vorschlag?{" "}
            <Link href="/kontakt" className="text-primary hover:underline">Schreib uns.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
