import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function GridVortexPage() {
    return (
        <ComponentDocTemplate
            title="Grid Vortex"
            description="Geometric warping grid background with vortex distortion effect and 3D perspective transforms."
            slug="grid-vortex"
            tags={["grid", "warp", "3d", "canvas"]}
            isNew={true}
            packageName="framer-motion"
            componentCode={`"use client";

import { useEffect, useRef } from "react";

export default function GridVortex() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Grid rendering with vortex distortion
        // ... warping calculations
    }, []);
    
    return <canvas ref={canvasRef} className="w-full h-full" />;
}`}
            usageCode={`import GridVortex from "@/components/ui/GridVortex";

<div className="relative w-full h-[500px] bg-slate-950">
    <GridVortex 
        gridSize={50}
        lineColor="rgba(0, 255, 255, 0.3)"
    />
</div>`}
            props={[
                {
                    name: "gridSize",
                    type: "number",
                    defaultValue: "50",
                    description: "Grid cell size in pixels"
                },
                {
                    name: "lineColor",
                    type: "string",
                    defaultValue: '"rgba(0, 255, 255, 0.3)"',
                    description: "Grid line color (rgba)"
                },
                {
                    name: "warpIntensity",
                    type: "number",
                    defaultValue: "1.0",
                    description: "Vortex distortion intensity"
                }
            ]}
        />
    );
}
