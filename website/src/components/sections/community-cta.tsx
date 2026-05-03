"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function CommunityCTA() {
  return (
    <section id="community" className="relative py-24 md:py-36 overflow-hidden bg-primary">

      {/* Background decoration */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/15 translate-x-1/3 translate-y-1/3 blur-3xl" />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-8"
        >
          {/* Logo mark */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icon.svg" alt="" className="size-10 brightness-0 invert" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h2 className="text-display-md font-bold tracking-tight text-white">
              Werde Teil von{" "}
              <br className="hidden sm:block" />
              Divergent Minds Berlin
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-lg mx-auto">
              Termine, Themen, Ressourcen rund um ADHS —
              respektvoll, offen, ohne Smalltalk-Zwang.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              className={cn(
                "inline-flex h-12 items-center gap-2 rounded-lg px-8",
                "bg-white text-primary font-semibold text-base",
                "hover:bg-white/90 active:scale-[0.98] transition-all duration-200 shadow-glow"
              )}
            >
              Community beitreten
              <ArrowRight size={17} />
            </button>
            <button
              className={cn(
                "inline-flex h-12 items-center gap-2 rounded-lg px-8",
                "border border-white/30 text-white font-semibold text-base",
                "hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
              )}
            >
              Nächstes MeetUp
            </button>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-2 text-sm text-white/50"
          >
            <MapPin size={13} />
            {BRAND.location}
          </motion.div>

          {/* Reassurance chips */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-2 pt-2"
          >
            {["Kostenlos", "Ohne Diagnose-Pflicht", "Offen für alle"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs text-white/70"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
