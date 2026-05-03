"use client";

import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MEETUPS } from "@/lib/constants";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function MeetupSection() {
  const next = MEETUPS.find((m) => m.status === "upcoming")!;
  const past = MEETUPS.filter((m) => m.status === "past");

  return (
    <section id="meetups" className="py-20 md:py-32 bg-muted/20 border-y border-border/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <motion.div variants={fadeUp}>
            <Label className="mb-4 block">Events</Label>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-display-md font-bold tracking-tight text-foreground mb-3">
            MeetUps
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground">
            Persönliche Treffen in Berlin Mitte — offen für alle Neurodivergenten und Interessierten.
          </motion.p>
        </motion.div>

        {/* Next MeetUp — highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="mb-6"
        >
          <div className="relative rounded-2xl border border-primary/25 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/5" />
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/3 blur-2xl" />

            <div className="relative z-10 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                {/* Left: Content */}
                <div className="space-y-5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="default">
                      <span className="relative flex size-1.5 mr-1">
                        <span className="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-60" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                      </span>
                      Kommendes MeetUp {next.number}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                      {next.theme}
                    </h3>
                    {"description" in next && (
                      <p className="text-muted-foreground leading-relaxed max-w-lg">
                        {next.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} className="text-primary shrink-0" />
                      {next.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={14} className="text-primary shrink-0" />
                      {next.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={14} className="text-primary shrink-0" />
                      {next.location}
                    </div>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                  <button
                    className={cn(buttonVariants({ size: "lg" }), "w-full md:w-auto")}
                  >
                    Platz sichern
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Kostenlos · Ohne Anmeldepflicht
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Past MeetUps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4"
          >
            Vergangene Events
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-4">
            {past.map((meetup) => (
              <motion.div key={meetup.id} variants={fadeUp}>
                <Card className="group hover:shadow-soft transition-all duration-300 opacity-75 hover:opacity-100">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="muted">MeetUp {meetup.number}</Badge>
                      {"attendees" in meetup && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users size={11} />
                          {meetup.attendees} dabei
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-base">{meetup.theme}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={11} /> {meetup.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={11} /> {meetup.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
