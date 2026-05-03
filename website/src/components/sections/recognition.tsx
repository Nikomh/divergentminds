"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RECOGNITION_CHIPS } from "@/lib/constants";
import { fadeUp, staggerFast, viewport } from "@/lib/motion";

const chipStyles = {
  default: "bg-primary/8 text-primary border-primary/15 hover:bg-primary/12",
  accent:  "bg-accent/8  text-accent-foreground border-accent/15  hover:bg-accent/12",
  muted:   "bg-muted      text-muted-foreground  border-border       hover:bg-muted/80",
};

export function Recognition() {
  return (
    <section className="py-20 md:py-28 bg-muted/30 border-y border-border/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-10"
        >
          {/* Label */}
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Kommt dir das bekannt vor?
          </motion.p>

          {/* Chips */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {RECOGNITION_CHIPS.map((chip) => (
              <span
                key={chip.text}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-2",
                  "text-sm font-medium transition-colors duration-200",
                  chipStyles[chip.variant]
                )}
              >
                {chip.text}
              </span>
            ))}
          </motion.div>

          {/* Closing line */}
          <motion.div variants={fadeUp} className="space-y-3">
            <p className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Dann bist du hier{" "}
              <span className="text-gradient">genau richtig.</span>
            </p>
            <p className="text-muted-foreground">
              Du brauchst keine Diagnose. Nur die Neugier zu verstehen, wie dein Kopf tickt.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
