"use client";

import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function TiltedScrollPage() {
    return (
        <ComponentDocTemplate
            slug="tilted-scroll"
            title="Tilted Scroll"
            description="A 3D skewed list component that creates a unique scrolling perspective."
            packageName="@/components/ui/TiltedScroll"
            props={[
                { name: "children", type: "React.ReactNode", description: "The list items to scroll", required: true },
                { name: "className", type: "string", defaultValue: "''", description: "Additional CSS classes" },
                { name: "tiltAngle", type: "number", defaultValue: "-15", description: "The angle of the tilt in degrees" },
            ]}
            componentCode={`
import { useRef, useState } from "react";

interface TiltedScrollProps {
  children: React.ReactNode;
  className?: string;
  tiltAngle?: number;
}

export default function TiltedScroll({ 
  children, 
  className = "",
  tiltAngle = -15 
}: TiltedScrollProps) {
  return (
    <div className={\`relative overflow-hidden \${className}\`}>
        <div 
            className="flex flex-col gap-4 will-change-transform"
            style={{
                transform: \`rotate(\${tiltAngle}deg) translateZ(0)\`,
                transformOrigin: "center center",
            }}
        >
            {children}
        </div>
        
        {/* Gradient Masks for fading edges */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
}`}
            usageCode={`
import TiltedScroll from '@/components/ui/TiltedScroll';

export default function List() {
  return (
    <TiltedScroll className="h-[400px] w-full" tiltAngle={-10}>
      <div className="p-4 bg-white/5 rounded">Item 1</div>
      <div className="p-4 bg-white/5 rounded">Item 2</div>
      <div className="p-4 bg-white/5 rounded">Item 3</div>
    </TiltedScroll>
  );
}`}
        />
    );
}
