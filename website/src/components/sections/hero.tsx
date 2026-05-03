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

      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="default" className="gap-2 px-3 py-1.5 text-sm">
                <span className="relative flex size-2.5">
                  <span className="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                </span>
                Nächstes MeetUp: 09.12. in Berlin
              </Badge>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h1 className="text-display-lg font-bold tracking-tight text-foreground leading-[1.08]">
                Du denkst anders.{" "}
                <br className="hidden sm:block" />
                <span className="text-gradient">Das ist gut so.</span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              {BRAND.shortName} ist eine Community für Erwachsene mit ADHS in Berlin.
              Peer-to-peer, kein Druck, keine Diagnose nötig.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link href="/#community" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
                Mitmachen
                <ArrowRight size={16} />
              </Link>
              <Link href="/meetups" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                Nächstes MeetUp
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-6 pt-2">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  {i > 0 && <div className="h-8 w-px bg-border" />}
                  <div>
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/illustrations/hero.png"
                alt="Vier Menschen sitzen zusammen im Gespräch, Gedanken schweben als Symbole um sie herum"
                width={600}
                height={400}
                priority
                className="w-full rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

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
