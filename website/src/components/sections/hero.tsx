"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BRAND, STATS } from "@/lib/constants";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100dvh-64px)] flex items-center overflow-hidden">

      {/* ── Background ──────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Radial blobs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[100px]" />
        {/* Neural pattern */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/pattern-neural.svg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      </div>

      {/* ── Content grid ────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
            {/* Live badge */}
            <motion.div variants={fadeUp}>
              <Badge variant="default" className="gap-2 px-3 py-1.5 text-sm">
                <span className="relative flex size-2.5">
                  <span className="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                </span>
                Nächstes MeetUp: 09.12. · Berlin
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp}>
              <h1 className="text-display-lg font-bold tracking-tight text-foreground leading-[1.08]">
                Dein Gehirn spielt{" "}
                <br className="hidden sm:block" />
                <span className="text-gradient">nach anderen Regeln.</span>
                <br />
                <span className="text-muted-foreground/70">Das ist kein Fehler.</span>
              </h1>
            </motion.div>

            {/* Lead */}
            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              {BRAND.shortName} ist die Community für Erwachsene mit ADHS in Berlin —
              peer-to-peer, ohne Druck, ohne Diagnose-Pflicht.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#community"
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                Community beitreten
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/#meetups"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Nächstes MeetUp
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6 pt-2"
            >
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <div className="flex items-center gap-6">
                    {i > 0 && (
                      <div className="h-8 w-px bg-border" />
                    )}
                    <div>
                      <div className="text-xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/illustration-hero.svg"
                alt="Divergent Minds Community Netzwerk"
                width={480}
                height={360}
                priority
                className="w-full max-w-md drop-shadow-soft-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5"
      >
        <span className="text-xs text-muted-foreground/60 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-border to-transparent" />
      </motion.div>
    </section>
  );
}
