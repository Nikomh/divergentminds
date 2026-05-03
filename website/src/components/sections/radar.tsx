"use client";

import Image from "next/image";
import { BookOpen, Beaker, Brain, Bell } from "lucide-react";
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

  return (
    <section id="radar" className="py-20 md:py-32 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

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
          <motion.h2 variants={fadeUp} className="text-display-md font-bold tracking-tight text-foreground mb-3">
            Der{" "}
            <span className="text-gradient">Forschungs-Radar</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground">
            Studien zu ADHS gibt es viele. Wir filtern raus, was wirklich relevant ist,
            und erklären es so, dass man es auch im Alltag nutzen kann.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Newsletter signup */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Illustration */}
            <Image
              src="/assets/illustrations/radar.png"
              alt="Person schaut neugierig durch eine Lupe auf wissenschaftliche Dokumente"
              width={500}
              height={500}
              className="w-full rounded-2xl"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />

            {/* Coming Soon */}
            <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Bell size={16} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight text-foreground">
                    Informiert bleiben
                  </h3>
                  <p className="text-xs text-muted-foreground">Der Newsletter kommt bald.</p>
                </div>
              </div>
              <Badge variant="secondary">Kommt bald</Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wir arbeiten gerade am Forschungs-Radar. Sobald er startet, kannst du dich hier eintragen
                und bekommst maximal zweimal im Monat relevante ADHS-Studien direkt ins Postfach.
              </p>
            </div>
          </motion.div>

          {/* Preview cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4 relative"
          >
            <div className="absolute -top-3 right-0 z-10">
              <Badge variant="secondary" className="shadow-soft-sm">
                Kommt bald
              </Badge>
            </div>

            <div className="space-y-3 select-none pointer-events-none" aria-hidden>
              {RADAR_PREVIEW.map((article, i) => {
                const Icon = CATEGORY_ICONS[article.category] ?? BookOpen;
                return (
                  <div
                    key={article.title}
                    className={cn(
                      "rounded-xl border border-border bg-card p-4",
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
