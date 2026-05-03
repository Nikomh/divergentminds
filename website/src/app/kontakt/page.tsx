import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Bell } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BRAND, TEAM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Schreib dem Team von Divergent Minds Berlin. Wir freuen uns auf deine Nachricht.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        label="Schreib uns"
        title="Kontakt"
        subtitle="Fragen, Feedback oder einfach Hallo. Wir freuen uns."
        backHref="/"
        backLabel="Zur Startseite"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Form — Coming Soon */}
          <div className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Nachricht schreiben</h2>
              <p className="text-sm text-muted-foreground">
                Das Kontaktformular kommt bald.
              </p>
            </div>
            <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Bell size={18} className="text-primary" />
                </div>
                <div>
                  <Badge variant="secondary">Kommt bald</Badge>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Das Kontaktformular ist noch in Arbeit. In der Zwischenzeit erreichst du uns
                direkt per E-Mail oder Telefon.
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
              >
                <Mail size={14} />
                {BRAND.email}
              </a>
            </div>
          </div>

          {/* Direktkontakt + Illustration */}
          <div className="space-y-8">
            <Image
              src="/assets/illustrations/kontakt.png"
              alt="Zwei Menschen stehen sich gegenüber und halten je eine Sprechblase mit Brief und Herz"
              width={500}
              height={500}
              className="w-full rounded-2xl"
              sizes="(max-width: 768px) 100vw, 500px"
            />

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Direktkontakt</h2>
              <div className="space-y-3">
                <a href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors">
                  <Mail size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{BRAND.email}</p>
                    <p className="text-xs text-muted-foreground">Allgemeine Anfragen</p>
                  </div>
                </a>
                <a href="tel:01772838555"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors">
                  <Phone size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{BRAND.phone}</p>
                    <p className="text-xs text-muted-foreground">Monti Prior, ADHS Coaching</p>
                  </div>
                </a>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-border">
                  <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">MeetUp-Ort</p>
                    <p className="text-xs text-muted-foreground">{BRAND.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Direkt ans Team</h3>
              <div className="space-y-3">
                {TEAM.filter((m) => "email" in m || "website" in m).map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                    <div className="relative size-9 rounded-full overflow-hidden shrink-0">
                      <Image src={member.photo} alt={member.name} fill className="object-cover" sizes="36px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.shortRole}</p>
                    </div>
                    {"website" in member && member.website && (
                      <a href={member.website} target="_blank" rel="noopener noreferrer" className="shrink-0">
                        <Globe size={14} className="text-muted-foreground hover:text-primary transition-colors" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
