import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { CodePreviewSection } from "@/components/landing/CodePreviewSection";
import { PopularComponents } from "@/components/landing/PopularComponents";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/layout/Footer";
import { BlueVignette } from "@/components/ui/BlueVignette";

export default function Home() {
  return (
    <>
      {/* Blue vignette background effect */}
      <BlueVignette />

      {/* 1. Hero - Left-aligned, two-column */}
      <Hero />

      {/* 2. Features - 2x2 value proposition grid */}
      <Features />

      {/* 3. Code Preview - Copy/Paste showcase */}
      <CodePreviewSection />

      {/* 4. Popular Components - Quick discovery */}
      <PopularComponents />

      {/* 5. Testimonials - Social proof */}
      <Testimonials />

      {/* 6. Footer */}
      <Footer />
    </>
  );
}
