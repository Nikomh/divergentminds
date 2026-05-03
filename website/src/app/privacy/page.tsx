import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Divergent Minds Berlin",
  description: "Datenschutzerklärung von Divergent Minds Berlin gemäß DSGVO.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 md:py-24">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-10 transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Zur Startseite
      </Link>

      <div className="space-y-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Rechtliches</p>
          <h1 className="text-3xl font-bold tracking-tight">Datenschutzerklärung</h1>
          <p className="text-sm text-muted-foreground mt-3">Stand: Mai 2026</p>
        </div>

        <Section title="1. Datenschutz auf einen Blick">
          <p><strong className="text-foreground">Allgemeine Hinweise:</strong> Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
          <p><strong className="text-foreground">Datenerfassung auf dieser Website:</strong> Verantwortlich für die Datenverarbeitung ist der Websitebetreiber (Kontakt im Impressum). Daten werden erhoben durch Angaben, die Sie uns mitteilen (z.B. Kontaktformular), sowie automatisch durch technische Systeme bei Ihrem Besuch.</p>
          <p><strong className="text-foreground">Ihre Rechte:</strong> Sie haben jederzeit das Recht auf kostenlose Auskunft über Ihre gespeicherten Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung. Außerdem haben Sie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.</p>
        </Section>

        <Section title="2. Verantwortliche Stelle">
          <p>
            Monti Prior — Coaching<br />
            Inhaberin: Monti Prior<br />
            {BRAND.address}<br />
            Telefon: {BRAND.phone}<br />
            E-Mail: <a href={`mailto:${BRAND.email}`} className="text-primary hover:underline">{BRAND.email}</a>
          </p>
        </Section>

        <Section title="3. Ihre Rechte als betroffene Person">
          <p>Sie haben folgende Rechte gegenüber uns bezüglich Ihrer personenbezogenen Daten:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerruf einer erteilten Einwilligung jederzeit per E-Mail</li>
            <li>Beschwerderecht bei der zuständigen Aufsichtsbehörde</li>
          </ul>
        </Section>

        <Section title="4. Datenerfassung auf dieser Website">
          <p><strong className="text-foreground">Server-Log-Dateien:</strong> Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.</p>
          <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
          <p><strong className="text-foreground">Kontaktformular:</strong> Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>
        </Section>

        <Section title="5. Sicherheit">
          <p>
            Diese Website nutzt SSL- bzw. TLS-Verschlüsselung, um die Übertragung vertraulicher
            Inhalte zu schützen. Eine verschlüsselte Verbindung erkennen Sie an dem Schloss-Symbol
            in der Adressleiste Ihres Browsers sowie an dem Präfix &bdquo;https&ldquo;.
          </p>
        </Section>

        <Section title="6. Newsletter">
          <p>
            Wenn Sie unseren Newsletter abonnieren, verwenden wir Ihre E-Mail-Adresse ausschließlich
            für den Versand des Newsletters. Ihre Daten werden nicht an Dritte weitergegeben.
            Sie können den Newsletter jederzeit über den Link in jeder Newsletter-E-Mail abbestellen.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
        </Section>

        <Section title="7. Analyse-Tools">
          <p>
            Diese Website verwendet Vercel Analytics zur anonymisierten Auswertung des Nutzerverhaltens.
            Es werden keine personenbezogenen Daten gespeichert oder weitergegeben. Die Analyse
            erfolgt vollständig datenschutzkonform gemäß DSGVO.
          </p>
        </Section>

        <div className="pt-4 border-t border-border">
          <Link href="/terms" className="text-sm text-primary hover:underline">
            → Zum Impressum
          </Link>
        </div>
      </div>
    </div>
  );
}
