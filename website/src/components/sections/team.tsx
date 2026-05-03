"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/typography";
import { TEAM } from "@/lib/constants";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function TeamSection() {
  return (
    <section id="team" className="py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.div variants={fadeUp}>
            <Label className="mb-4 block">Das Team</Label>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-display-md font-bold tracking-tight text-foreground mb-3"
          >
            Expert:innen, die ADHS{" "}
            <span className="text-gradient">von innen kennen</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground">
            Alle Teammitglieder haben entweder selbst ADHS oder arbeiten täglich damit —
            mit echtem Verständnis statt reiner Theorie.
          </motion.p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid sm:grid-cols-2 gap-5"
        >
          {TEAM.map((member) => (
            <motion.div key={member.id} variants={fadeUp}>
              <div className="group relative flex flex-col h-full rounded-2xl border border-border bg-card p-6 hover:shadow-soft-md hover:border-primary/20 transition-all duration-300">

                {/* Founder badge */}
                {"founder" in member && member.founder && (
                  <div className="absolute top-5 right-5">
                    <Badge variant="default" className="text-xs">Gründerin</Badge>
                  </div>
                )}

                {/* Avatar + name */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative shrink-0">
                    {"photo" in member && member.photo ? (
                      <div className="relative size-[72px] rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-card ring-primary/15 group-hover:ring-primary/40 transition-all duration-300">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>
                    ) : (
                      <div className="flex size-[72px] items-center justify-center rounded-full bg-gradient-brand text-primary-foreground font-bold text-lg ring-2 ring-offset-2 ring-offset-card ring-primary/15">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(member as any).initials ?? member.name.slice(0, 2)}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground leading-tight">{member.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{member.role}</p>
                  </div>
                </div>

                {/* Bio */}
                {"bio" in member && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {member.bio}
                  </p>
                )}

                {/* Quote */}
                {"quote" in member && (
                  <blockquote className="border-l-2 border-primary/30 pl-3 text-sm text-muted-foreground italic leading-relaxed mb-5">
                    &bdquo;{member.quote}&ldquo;
                  </blockquote>
                )}

                {/* Footer links */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  {"website" in member && member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={11} />
                      Website
                    </a>
                  )}
                  <Link
                    href={member.href}
                    className="ml-auto flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors group-hover:gap-1.5"
                  >
                    Mehr erfahren
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
