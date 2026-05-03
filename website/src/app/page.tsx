import { Hero }          from "@/components/sections/hero";
import { Recognition }   from "@/components/sections/recognition";
import { WhatIsDM }      from "@/components/sections/what-is-dm";
import { MeetupSection } from "@/components/sections/meetup";
import { TeamSection }   from "@/components/sections/team";
import { RadarSection }  from "@/components/sections/radar";
import { CommunityCTA }  from "@/components/sections/community-cta";
import { Separator }     from "@/components/ui/separator";

export default function HomePage() {
  return (
    <>
      {/* Hero CTA sentinel — watched by MobileCTA to know when hero scrolls out */}
      <div id="hero-cta-sentinel" aria-hidden />

      <Hero />
      <Recognition />
      <Separator />
      <WhatIsDM />
      <MeetupSection />
      <Separator />
      <TeamSection />
      <RadarSection />
      <CommunityCTA />
    </>
  );
}
