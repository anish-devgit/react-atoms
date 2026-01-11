import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { PopularComponents } from "@/components/landing/PopularComponents";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* 1. Hero - Bold, centered headline */}
      <Hero />

      {/* 2. Features - 2x2 value proposition grid */}
      <Features />

      {/* 3. Popular Components - Quick discovery */}
      <PopularComponents />

      {/* 4. Testimonials - Social proof */}
      <Testimonials />

      {/* 5. Final CTA */}
      <FinalCTA />

      {/* 6. Footer */}
      <Footer />
    </>
  );
}
