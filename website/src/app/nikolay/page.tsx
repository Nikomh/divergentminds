import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Users, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nikolay Huse",
  description: "Nikolay Huse ist AI Enablement Specialist bei Divergent Minds Berlin.",
};

const FOCUS = [
  { icon: BrainCircuit, title: "KI für die Community",   desc: "Tools, die den Alltag mit ADHS erleichtern. Nicht die nächste App, die man nicht nutzt." },
  { icon: Users,         title: "Community-Aufbau",       desc: "Digitale Strukturen, die echte Verbindung ermöglichen." },
  { icon: Sparkles,      title: "Change Facilitation",    desc: "Communities und Organisationen in ihrer Entwicklung begleiten." },
];

export default function NikolayPage() {
  return (
    <>
      <PageHero
        label="Das Team"
        title="Nikolay Huse"
        subtitle="AI Enablement Specialist, Change Agent"
        photo="/assets/team/nikolay.png"
        photoAlt="Nikolay Huse"
        backHref="/#team"
        backLabel="Zum Team"
        accent="primary"
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">

        <blockquote className="border-l-4 border-primary pl-5 py-1">
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic">
            &bdquo;KI und Gemeinschaft schließen sich nicht aus. Sie verstärken einander.&ldquo;
          </p>
        </blockquote>

        <Separator />

        {/* KI Community Illustration */}
        <Image
          src="/assets/illustrations/ki-community.png"
          alt="Mann am Laptop, digitale Verbindungslinien zu Community-Mitgliedern"
          width={700}
          height={467}
          className="w-full rounded-2xl"
          sizes="(max-width: 768px) 100vw, 700px"
        />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Was ich einbringe</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Meine Aufgabe ist es, Divergent Minds digital zukunftsfähig zu machen.
              Nicht als Tech-Spielzeug, sondern als echte Unterstützung für Menschen mit ADHS.
            </p>
            <p>
              KI-Tools können erheblich entlasten: Gedanken strukturieren, Erinnerungssysteme
              aufbauen, kognitive Last reduzieren. Das bringe ich in die Community.
            </p>
          </div>
        </section>

        <Separator />

        <section className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Fokus</h2>
          <div className="grid gap-4">
            {FOCUS.map((f) => (
              <Card key={f.title} className="hover:shadow-soft transition-shadow">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                      <f.icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7 text-center space-y-4">
          <h3 className="text-xl font-bold">Divergent Minds kennenlernen</h3>
          <p className="text-muted-foreground">Komm zu einem MeetUp und erlebe die Community live.</p>
          <Link href="/meetups" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
            Zum nächsten MeetUp <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
