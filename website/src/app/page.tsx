import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Clock, Users, Brain, Heart, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Section, Container, SectionHeader } from "@/components/ui/container";
import { Heading, Lead, Label } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { BRAND, TEAM, MEETUPS, VALUES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const VALUE_ICONS = { Users, Brain, Heart, Zap };

export default function HomePage() {
  const nextMeetup = MEETUPS.find((m) => m.status === "upcoming");
  const pastMeetups = MEETUPS.filter((m) => m.status === "past");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section size="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <Container narrow className="text-center">
          <Badge variant="default" className="mb-6">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Berlin · ADHS Community
          </Badge>

          <Heading as="h1" size="display-lg" className="mb-5 text-balance">
            Gemeinsam ADHS meistern –{" "}
            <span className="text-gradient">vernetzt, gestärkt, informiert</span>
          </Heading>

          <Lead className="mb-8 max-w-xl mx-auto">{BRAND.description}</Lead>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/#community" className={cn(buttonVariants({ size: "lg" }))}>
              Community beitreten <ArrowRight size={16} />
            </Link>
            <Link href="/#meetups" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Nächstes MeetUp
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto">
            {[
              { value: "4+", label: "MeetUps" },
              { value: "25+", label: "Mitglieder" },
              { value: "3", label: "Expert:innen" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Separator />

      {/* ── Values ───────────────────────────────────────────── */}
      <Section id="values">
        <Container>
          <SectionHeader>
            <Label className="mb-3 block">Warum Divergent Minds</Label>
            <Heading size="display-sm">Ein Ort, der wirklich versteht</Heading>
          </SectionHeader>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => {
              const Icon = VALUE_ICONS[value.icon as keyof typeof VALUE_ICONS];
              return (
                <Card key={value.title} className="group hover:shadow-soft transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 mb-2 group-hover:bg-primary/15 transition-colors">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                    <CardDescription>{value.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Separator />

      {/* ── MeetUps ──────────────────────────────────────────── */}
      <Section id="meetups">
        <Container>
          <SectionHeader>
            <Label className="mb-3 block">Events</Label>
            <Heading size="display-sm">MeetUps</Heading>
            <Lead className="mt-3">
              Persönliche Treffen in Berlin Mitte — offen für alle Neurodivergenten und Interessierten.
            </Lead>
          </SectionHeader>

          <div className="space-y-4">
            {nextMeetup && (
              <Card className="border-primary/30 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">Kommendes MeetUp {nextMeetup.number}</Badge>
                  </div>
                  <CardTitle className="text-xl">{nextMeetup.theme}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" /> {nextMeetup.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary" /> {nextMeetup.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary" /> {nextMeetup.location}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href="/#community" className={cn(buttonVariants())}>
                      Anmelden <ArrowRight size={14} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {pastMeetups.map((meetup) => (
                <Card key={meetup.id} className="opacity-80 hover:opacity-100 transition-opacity">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="muted">MeetUp {meetup.number}</Badge>
                    </div>
                    <CardTitle>{meetup.theme}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} /> {meetup.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} /> {meetup.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Separator />

      {/* ── Team ─────────────────────────────────────────────── */}
      <Section id="team">
        <Container>
          <SectionHeader>
            <Label className="mb-3 block">Das Team</Label>
            <Heading size="display-sm">Expert:innen, die es kennen</Heading>
            <Lead className="mt-3">
              Alle Teammitglieder haben entweder selbst ADHS oder arbeiten täglich damit — mit echtem Verständnis statt Theorie.
            </Lead>
          </SectionHeader>

          <div className="grid gap-5 sm:grid-cols-2">
            {TEAM.map((member) => (
              <Card key={member.id} className="group hover:shadow-soft-md transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground font-bold text-sm shrink-0">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{member.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{member.role}</p>
                    </div>
                  </div>
                  {"bio" in member && <CardDescription>{member.bio}</CardDescription>}
                </CardHeader>
                {"quote" in member && (
                  <CardContent className="pt-0">
                    <blockquote className="border-l-2 border-primary/40 pl-3 text-sm text-muted-foreground italic leading-relaxed">
                      &bdquo;{member.quote}&ldquo;
                    </blockquote>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Separator />

      {/* ── Community CTA ────────────────────────────────────── */}
      <Section id="community">
        <Container narrow>
          <Card className="text-center border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-0" />
            <CardHeader className="pb-2 pt-10 px-8 relative z-10">
              <Label className="mb-3 block">Community</Label>
              <CardTitle>
                <Heading size="display-sm">Werde Teil unserer Community</Heading>
              </CardTitle>
              <CardDescription className="text-base mt-2 max-w-md mx-auto">
                Termine, Themen, Ressourcen rund um ADHS – respektvoll, offen, ohne Smalltalk-Zwang.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-10 relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                <a href={`mailto:${BRAND.email}`} className={cn(buttonVariants({ size: "lg" }))}>
                  Jetzt anfragen <ArrowRight size={16} />
                </a>
                <Link href="/#meetups" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  Nächstes MeetUp
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{BRAND.location}</p>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </>
  );
}
