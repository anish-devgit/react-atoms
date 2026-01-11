import { Hero } from "@/components/landing/Hero";
import { ValueProposition } from "@/components/landing/ValueProposition";
import { Stats } from "@/components/landing/Stats";
import { PopularComponents } from "@/components/landing/PopularComponents";
import { Testimonials } from "@/components/landing/Testimonials";
import { Sponsors } from "@/components/landing/Sponsors";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* 1. Hero - Stop Building, Start Shipping */}
      <Hero />

      {/* 2. Value Proposition - Time savings comparison */}
      <ValueProposition />

      {/* 3. Stats - Credibility section */}
      <Stats />

      {/* 4. Popular Components - Quick discovery */}
      <PopularComponents />

      {/* 4. Testimonials - Loved by Developers */}
      <Testimonials />

      {/* 5. Sponsors - Community backed */}
      <Sponsors />

      {/* 6. Final CTA */}
      <FinalCTA />

      {/* 7. Footer */}
      <Footer />
    </>
  );
}
