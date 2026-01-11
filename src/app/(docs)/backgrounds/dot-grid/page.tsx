import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function DotGridPage() {
    return (
        <ComponentDocTemplate
            title="Dot Grid"
            description="Subtle animated dot pattern background perfect for adding texture without distraction."
            slug="dot-grid"
            tags={["dots", "grid", "pattern", "minimal"]}
            packageName="framer-motion"
            componentCode={`"use client";

export default function DotGrid() {
    return (
        <div 
            className="w-full h-full"
            style={{
                backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.6) 2px, transparent 2px)",
                backgroundSize: "20px 20px"
            }}
        />
    );
}`}
            usageCode={`import DotGrid from "@/components/ui/DotGrid";

<div className="relative w-full h-[500px] bg-black/10">
    <DotGrid />
</div>`}
            props={[
                {
                    name: "dotSize",
                    type: "number",
                    defaultValue: "2",
                    description: "Size of dots in pixels"
                },
                {
                    name: "dotColor",
                    type: "string",
                    defaultValue: '"rgba(168,85,247,0.6)"',
                    description: "Dot color (rgba)"
                },
                {
                    name: "spacing",
                    type: "number",
                    defaultValue: "20",
                    description: "Grid spacing in pixels"
                }
            ]}
        />
    );
}
