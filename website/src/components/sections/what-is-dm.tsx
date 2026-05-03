"use client";

import Image from "next/image";
import { Users, BookOpen, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/typography";
import { PILLARS } from "@/lib/constants";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const ICONS = { Users, BookOpen, Zap };

const pillarColors = {
  teal:    { bg: "bg-teal-500/10",  text: "text-teal-600 dark:text-teal-400"  },
  primary: { bg: "bg-primary/10",   text: "text-primary"                       },
  amber:   { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
};

export function WhatIsDM() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.div variants={fadeUp}>
            <Label className="mb-4 block">Was Divergent Minds ist</Label>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-display-md font-bold tracking-tight text-foreground"
          >
            Keine Therapie. Keine Selbsthilfegruppe.
            <br />
            <span className="text-gradient">Eine echte Community.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted-foreground">
            Wir sind Menschen mit ADHS, die sich gegenseitig kennen. Nicht aus Büchern.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid md:grid-cols-3 gap-5 mb-16"
        >
          {PILLARS.map((pillar) => {
            const Icon = ICONS[pillar.icon as keyof typeof ICONS];
            const colors = pillarColors[pillar.color];
            return (
              <motion.div key={pillar.title} variants={fadeUp}>
                <Card className="h-full hover:shadow-soft-md transition-shadow duration-300">
                  <CardHeader className="gap-4">
                    <div className={`flex size-12 items-center justify-center rounded-2xl ${colors.bg}`}>
                      <Icon size={20} className={colors.text} />
                    </div>
                    <div className="space-y-1.5">
                      <CardTitle className="text-lg">{pillar.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {pillar.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Founder quote */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative rounded-2xl border border-border bg-card p-8 md:p-10"
        >
          <div
            aria-hidden
            className="absolute top-6 right-8 text-8xl font-serif leading-none text-primary/8 select-none"
          >
            &rdquo;
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
            <motion.div variants={fadeUp} className="shrink-0">
              <div className="relative size-16 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-card">
                <Image
                  src="/assets/team/monti.jpeg"
                  alt="Monti Prior"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                &bdquo;Neurotypisch ist für mich kein Maßstab. Wenn wir aufhören uns zu vergleichen,
                kann jede und jeder eine persönliche Freiheit erlangen.&ldquo;
              </blockquote>
              <footer className="space-y-0.5">
                <p className="font-semibold text-foreground text-sm">Monti Prior</p>
                <p className="text-xs text-muted-foreground">Gründerin, ADHS Coach</p>
              </footer>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
