"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RECOGNITION_CHIPS } from "@/lib/constants";
import { fadeUp, stagger, staggerFast, viewport } from "@/lib/motion";

const chipStyles = {
  default: "bg-primary/8 text-primary border-primary/15 hover:bg-primary/12",
  accent:  "bg-accent/8  text-accent-foreground border-accent/15 hover:bg-accent/12",
  muted:   "bg-muted text-muted-foreground border-border hover:bg-muted/80",
};

export function Recognition() {
  return (
    <section className="py-20 md:py-28 bg-muted/30 border-y border-border/60 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55 }}
            className="order-2 lg:order-1"
          >
            <Image
              src="/assets/illustrations/recognition.png"
              alt="Person sitzt am Schreibtisch, Gedankenblasen mit verschiedenen Symbolen schweben um sie herum"
              width={500}
              height={500}
              className="w-full max-w-sm mx-auto rounded-2xl"
              sizes="(max-width: 1024px) 80vw, 40vw"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-8 order-1 lg:order-2"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Klingt vertraut?
            </motion.p>

            <motion.div
              variants={staggerFast}
              className="flex flex-wrap gap-3"
            >
              {RECOGNITION_CHIPS.map((chip) => (
                <motion.span
                  key={chip.text}
                  variants={fadeUp}
                  className={cn(
                    "inline-flex items-center rounded-full border px-4 py-2",
                    "text-sm font-medium transition-colors duration-200",
                    chipStyles[chip.variant]
                  )}
                >
                  {chip.text}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Dann bist du hier{" "}
                <span className="text-gradient">richtig.</span>
              </p>
              <p className="text-muted-foreground">
                Eine Diagnose brauchst du nicht. Nur die Neugier, mehr über deinen Kopf zu erfahren.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
