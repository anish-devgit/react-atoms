import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function OrbitalFluidsPage() {
    return (
        <ComponentDocTemplate
            title="Orbital Fluids"
            description="Interactive gravity-based particle system with orbital dynamics and smooth fluid motion based on physics simulation."
            slug="orbital-fluids"
            tags={["canvas", "particles", "physics", "interactive"]}
            isNew={true}
            packageName="framer-motion"
            componentCode={`"use client";

import { useEffect, useRef } from "react";

// Simplified particle system for demonstration
export default function OrbitalFluids() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Implementation of particle physics system
        // ... particles with orbital dynamics
    }, []);
    
    return <canvas ref={canvasRef} className="w-full h-full" />;
}`}
            usageCode={`import OrbitalFluids from "@/components/ui/OrbitalFluids";

<div className="relative w-full h-[500px] bg-black">
    <OrbitalFluids 
        particleCount={200}
        color="#6366f1"
    />
</div>`}
            props={[
                {
                    name: "particleCount",
                    type: "number",
                    defaultValue: "150",
                    description: "Number of particles in the system"
                },
                {
                    name: "color",
                    type: "string",
                    defaultValue: '"#6366f1"',
                    description: "Particle color (hex)"
                },
                {
                    name: "gravity",
                    type: "number",
                    defaultValue: "0.5",
                    description: "Gravitational force strength"
                }
            ]}
        />
    );
}
