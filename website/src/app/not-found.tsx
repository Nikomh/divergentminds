import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-sm">
        <Image
          src="/assets/illustrations/404.png"
          alt="Eichhörnchen mit Fragezeichen und Schatzkarte"
          width={300}
          height={300}
          className="mx-auto"
          priority
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Hier ist nichts.</h1>
          <p className="text-muted-foreground">
            Die Seite existiert nicht. Passiert. Selbst mit Karte kommt man manchmal
            ans falsche Ziel.
          </p>
        </div>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
          Zur Startseite <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
