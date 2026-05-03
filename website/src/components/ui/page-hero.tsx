import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  photo?: string | null;
  photoAlt?: string;
  accent?: "primary" | "teal" | "amber";
  backHref?: string;
  backLabel?: string;
  className?: string;
}

const accentMap = {
  primary: "from-primary/10 via-background to-background",
  teal:    "from-teal-500/10 via-background to-background",
  amber:   "from-amber-500/10 via-background to-background",
};

export function PageHero({
  label,
  title,
  subtitle,
  photo,
  photoAlt = "",
  accent = "primary",
  backHref,
  backLabel = "Zurück",
  className,
}: PageHeroProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient background */}
      <div className={cn("absolute inset-0 bg-gradient-to-b", accentMap[accent])} />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back link */}
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            {backLabel}
          </Link>
        )}

        <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
          {/* Photo */}
          {photo && (
            <div className="shrink-0">
              <div className="relative size-32 md:size-40 rounded-2xl overflow-hidden ring-4 ring-background shadow-soft-xl">
                <Image
                  src={photo}
                  alt={photoAlt}
                  fill
                  className="object-cover"
                  sizes="160px"
                  priority
                />
              </div>
            </div>
          )}

          {/* Text */}
          <div className="text-center md:text-left space-y-3">
            {label && (
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {label}
              </p>
            )}
            <h1 className="text-display-md font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-xl">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
