"use client";

import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function SpotlightCardPage() {
  return (
    <ComponentDocTemplate
      slug="spotlight-card"
      title="Spotlight Card"
      description="A card component that reveals a radial gradient spotlight effect following the mouse cursor."
      packageName="@/components/ui/SpotlightCard"
      props={[
        { name: "children", type: "React.ReactNode", description: "The content of the card", required: true },
        { name: "className", type: "string", defaultValue: "''", description: "Additional CSS classes" },
        { name: "spotlightColor", type: "string", defaultValue: "'rgba(255, 255, 255, 0.25)'", description: "Color of the spotlight effect" },
      ]}
      componentCode={`
import { useRef, useState, MouseEvent } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={\`relative rounded-xl border border-white/10 bg-white/5 overflow-hidden \${className}\`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, \${spotlightColor}, transparent 40%)\`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}`}
      usageCode={`
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function Cards() {
  return (
    <SpotlightCard className="p-8 h-64" spotlightColor="rgba(0, 229, 255, 0.2)">
      <h3 className="text-2xl font-bold mb-4">Hover Me</h3>
      <p className="text-gray-400">
        Move your mouse over this card to see the spotlight effect.
      </p>
    </SpotlightCard>
  );
}`}
    />
  );
}
