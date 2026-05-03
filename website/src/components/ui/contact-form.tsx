"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const CONTACT_REASONS = [
  "Fragen zu unseren MeetUps",
  "Coaching-Anfrage bei einem Expert:in",
  "Presse & Medienanfrage",
  "Kooperation & Partnerschaft",
  "Feedback oder Anregungen",
  "Sonstiges",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center space-y-3">
        <div className="text-3xl">✓</div>
        <p className="font-semibold text-foreground">Nachricht gesendet!</p>
        <p className="text-sm text-muted-foreground">
          Wir melden uns innerhalb von 48 Stunden bei dir.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
    >
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="name">Name</label>
          <input
            id="name" type="text" placeholder="Dein Name"
            className={cn(
              "w-full h-10 rounded-lg border border-input bg-background px-3 text-sm",
              "placeholder:text-muted-foreground/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            )}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground" htmlFor="email">
            E-Mail <span className="text-destructive">*</span>
          </label>
          <input
            id="email" type="email" placeholder="deine@email.de" required
            className={cn(
              "w-full h-10 rounded-lg border border-input bg-background px-3 text-sm",
              "placeholder:text-muted-foreground/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="subject">Betreff</label>
        <select
          id="subject"
          className={cn(
            "w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
          )}
        >
          <option value="">Thema auswählen…</option>
          {CONTACT_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="message">
          Nachricht <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message" rows={5} placeholder="Was liegt dir auf dem Herzen?" required
          className={cn(
            "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm resize-none",
            "placeholder:text-muted-foreground/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
          )}
        />
      </div>

      <button
        type="submit"
        className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all duration-200"
      >
        Nachricht senden
      </button>

      <p className="text-xs text-muted-foreground">
        Deine Daten werden ausschließlich zur Beantwortung deiner Anfrage verwendet.
        Weitere Infos in unserer{" "}
        <a href="/privacy" className="underline hover:text-foreground transition-colors">Datenschutzerklärung</a>.
      </p>
    </form>
  );
}
