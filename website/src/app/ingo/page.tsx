import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Globe, ArrowRight, Monitor, Calendar, FolderOpen, Laptop, Wifi } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ingo Kemnitzer",
  description: "Ingo Kemnitzer ist Digital Coach und Apple Certified Support Professional mit eigener Neurodivergenz.",
};

const SERVICES = [
  { icon: Laptop,     title: "Geräteeinrichtung",         desc: "iPhone, iPad und Mac so einrichten, dass man sich nicht mehr durchklickt, sondern einfach arbeitet." },
  { icon: FolderOpen, title: "Dateiorganisation",          desc: "Ordnung ins digitale Chaos bringen. Nachhaltig, nicht nur bis nächste Woche." },
  { icon: Calendar,   title: "Kalender und To-Do",         desc: "Systeme, die wirklich funktionieren. Auf das Gehirn zugeschnitten, nicht auf die App." },
  { icon: Monitor,    title: "Digitale Stressreduktion",   desc: "Weniger Benachrichtigungen, weniger Reize, mehr Konzentration." },
  { icon: Wifi,       title: "Vor Ort und Remote",         desc: "Ich komme zu dir, oder wir klären es per Video. Je nachdem, was gerade passt." },
];

const QUALIFICATIONS = [
  { title: "IT-Systemkaufmann",                       org: "GRAVIS, IHK" },
  { title: "Business Coach",                          org: "IHK, seit 2018" },
  { title: "Apple Certified Support Professional",    org: "ACSP, seit 2025" },
];

export default function IngoPage() {
  return (
    <>
      <PageHero
        label="Das Team"
        title="Ingo Kemnitzer"
        subtitle="Digital Coach, Apple Certified Support Professional"
        photo="/assets/team/ingo.jpeg"
        photoAlt="Ingo Kemnitzer"
        backHref="/#team"
        backLabel="Zum Team"
        accent="amber"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">

        <blockquote className="border-l-4 border-amber-500 pl-5 py-1">
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
            &bdquo;Achtsam, verständnisvoll, strukturiert. Keine Standard-Lösungen.&ldquo;
          </p>
        </blockquote>

        <Separator />

        {/* Digital Illustration */}
        <div className="max-w-xs mx-auto">
          <Image
            src="/assets/illustrations/digital.png"
            alt="Mann sitzt entspannt im Sessel mit Smartphone, digitale Organisations-Icons schweben um ihn herum"
            width={320}
            height={320}
            className="w-full rounded-2xl"
            sizes="320px"
          />
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Mein Ansatz</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Ich habe selbst ADHS. Und mein iPhone ist seit Jahren mein wichtigstes
              Organisations-Tool. Nicht weil ich es musste, sondern weil es funktioniert.
            </p>
            <p>
              Schon in meiner Ausbildung bei GRAVIS habe ich gemerkt: Apple-Technologie ist
              für strukturbedürftige Menschen besonders gut geeignet. Seitdem begleite ich Menschen
              dabei, genau das für sich zu nutzen.
            </p>
            <p>
              Ich erkläre nicht nur, wie etwas geht. Ich erkläre, warum. Damit du es danach
              selbst weiterführen kannst.
            </p>
          </div>
        </section>

        <Separator />

        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Was ich anbiete</h2>
          <div className="grid gap-4">
            {SERVICES.map((s) => (
              <Card key={s.title} className="hover:shadow-soft transition-shadow">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 mt-0.5">
                      <s.icon size={16} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Qualifikationen</h2>
          <div className="space-y-3">
            {QUALIFICATIONS.map((q) => (
              <div key={q.title} className="flex items-center justify-between p-4 rounded-xl border border-border">
                <span className="font-medium text-sm text-foreground">{q.title}</span>
                <Badge variant="muted">{q.org}</Badge>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Meine Rolle bei Divergent Minds</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ingo kümmert sich um das technische Setup bei den MeetUps und veröffentlicht
            die Panel-Talks auf YouTube. Hinter den Kulissen, damit alles läuft.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Kontakt</h2>
          <a href="https://www.meindigital.coach" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors">
            <Globe size={16} className="text-amber-600 shrink-0" />
            <span className="text-sm font-medium">meindigital.coach</span>
          </a>
        </section>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-7 text-center space-y-4">
          <h3 className="text-xl font-bold">Ingo beim MeetUp kennenlernen</h3>
          <p className="text-muted-foreground">
            Digitale Überforderung ist ein echtes ADHS-Thema. Ingo weiß, wie man das ändert.
          </p>
          <Link href="/meetups" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-amber-600 hover:bg-amber-700 border-0")}>
            Zum nächsten MeetUp <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
