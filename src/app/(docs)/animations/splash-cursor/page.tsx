"use client";

import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function SplashCursorPage() {
    return (
        <ComponentDocTemplate
            slug="splash-cursor"
            title="Splash Cursor"
            description="A playful cursor effect that generates fluid splashes and ripples on movement."
            packageName="@/components/ui/SplashCursor"
            props={[
                { name: "splashColor", type: "string", defaultValue: "'rgba(100, 200, 255, 0.5)'", description: "Color of the splash ripples" },
                { name: "size", type: "number", defaultValue: "20", description: "Size of the ripples" },
                { name: "splashForce", type: "number", defaultValue: "5", description: "Force/speed of the ripples" },
                { name: "dissipation", type: "number", defaultValue: "0.95", description: "Rate at which ripples fade (0-1)" },
            ]}
            componentCode={`
import { useEffect, useRef } from "react";

interface SplashCursorProps {
  splashColor?: string;
  size?: number;
  splashForce?: number;
  dissipation?: number;
}

export default function SplashCursor({
  splashColor = "rgba(100, 200, 255, 0.5)",
  size = 20,
  splashForce = 5,
  dissipation = 0.95,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, down: false });
  const ripplesRef = useRef<{ x: number; y: number; r: number; opacity: number }[]>([]);

  useEffect(() => {
    // Canvas setup and animation logic...
    // (See full implementation in source)
  }, [splashColor, size, splashForce, dissipation]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-50" />;
}`}
            usageCode={`
import SplashCursor from '@/components/ui/SplashCursor';

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      <SplashCursor />
      {/* Rest of your content */}
    </div>
  );
}`}
        />
    );
}
