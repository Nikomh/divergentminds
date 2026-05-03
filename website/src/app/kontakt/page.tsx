import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { ContactForm } from "@/components/ui/contact-form";
import { Separator } from "@/components/ui/separator";
import { BRAND, TEAM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt — Divergent Minds Berlin",
  description:
    "Kontaktiere das Team von Divergent Minds Berlin. Wir freuen uns auf deine Nachricht.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        label="Schreib uns"
        title="Kontakt"
        subtitle="Wir freuen uns auf deine Nachricht — egal ob Frage, Feedback oder einfach Hallo."
        backHref="/"
        backLabel="Zur Startseite"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Form */}
          <div className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Nachricht schreiben</h2>
              <p className="text-sm text-muted-foreground">
                Alle Felder sind optional außer E-Mail und Nachricht.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Direktkontakt */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Direktkontakt</h2>
              <div className="space-y-3">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  <Mail size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{BRAND.email}</p>
                    <p className="text-xs text-muted-foreground">Allgemeine Anfragen</p>
                  </div>
                </a>
                <a
                  href="tel:01772838555"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  <Phone size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{BRAND.phone}</p>
                    <p className="text-xs text-muted-foreground">Monti Prior · ADHS Coaching</p>
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

            {/* Team mini-cards */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Direkt ans Team</h3>
              <div className="space-y-3">
                {TEAM.filter((m) => "email" in m || "website" in m).map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                    <div className="relative size-9 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.shortRole}</p>
                    </div>
                    {"website" in member && member.website && (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0"
                      >
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
