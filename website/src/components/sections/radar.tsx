"use client";

import { useState } from "react";
import { Mail, ArrowRight, BookOpen, Beaker, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { RADAR_PREVIEW } from "@/lib/constants";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Schlaf: Brain,
  Produktivität: Beaker,
  Diagnose: BookOpen,
};

export function RadarSection() {
  const [email, setEmail] = useState("");

  return (
    <section id="radar" className="py-20 md:py-32 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <motion.div variants={fadeUp}>
            <Label className="mb-4 block">Wissen</Label>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-display-md font-bold tracking-tight text-foreground mb-3"
          >
            Der{" "}
            <span className="text-gradient">Forschungs-Radar</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground">
            ADHS-Studien, die wirklich relevant sind — kuratiert, praxisnah,
            ohne Fachsprache-Overhead. Kommt bald.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left: Newsletter signup */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-2xl border border-border bg-card p-7 md:p-8 space-y-6"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
              <Mail size={20} className="text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Informiert bleiben
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wir schicken dir neue Studien und Ressourcen direkt in dein Postfach —
                maximal 2× im Monat, keine Werbung.
              </p>
            </div>

            {/* Form (UI only) */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  className={cn(
                    "flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm",
                    "placeholder:text-muted-foreground/60",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                    "transition-shadow duration-200"
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4",
                    "bg-primary text-primary-foreground text-sm font-semibold",
                    "hover:brightness-110 active:scale-[0.98] transition-all duration-200",
                    "whitespace-nowrap"
                  )}
                >
                  Anmelden
                  <ArrowRight size={14} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Datenschutz: Deine Adresse wird nur für den Newsletter verwendet.
              </p>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="muted">Kein Spam</Badge>
              <Badge variant="muted">Jederzeit kündbar</Badge>
              <Badge variant="muted">DSGVO-konform</Badge>
            </div>
          </motion.div>

          {/* Right: Blurred preview cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4 relative"
          >
            {/* "Coming soon" overlay */}
            <div className="absolute -top-3 right-0 z-10">
              <Badge variant="secondary" className="shadow-soft-sm">
                🔬 Bald verfügbar
              </Badge>
            </div>

            {/* Preview cards (blurred) */}
            <div className="space-y-3 select-none pointer-events-none" aria-hidden>
              {RADAR_PREVIEW.map((article, i) => {
                const Icon = CATEGORY_ICONS[article.category] ?? BookOpen;
                return (
                  <div
                    key={article.title}
                    className={cn(
                      "rounded-xl border border-border bg-card p-4",
                      "transition-opacity duration-200",
                      i === 0 ? "opacity-60 blur-[1.5px]" : i === 1 ? "opacity-40 blur-[2.5px]" : "opacity-25 blur-[3px]"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 mt-0.5">
                        <Icon size={14} className="text-primary" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <Badge variant="muted" className="text-[10px] px-1.5 py-0">
                          {article.category}
                        </Badge>
                        <p className="text-sm font-semibold text-foreground leading-snug">
                          {article.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
