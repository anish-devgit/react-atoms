import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function NoiseTexturePage() {
    return (
        <ComponentDocTemplate
            title="Noise Texture"
            description="Subtle grain/noise overlay effect for adding film-like texture to backgrounds."
            slug="noise-texture"
            tags={["noise", "grain", "texture", "overlay"]}
            packageName="framer-motion"
            componentCode={`"use client";

export default function NoiseTexture() {
    return (
        <div className="relative w-full h-full bg-slate-900/50">
            <div 
                className="absolute inset-0 opacity-70"
                style={{
                    backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")\`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "100px 100px"
                }}
            />
        </div>
    );
}`}
            usageCode={`import NoiseTexture from "@/components/ui/NoiseTexture";

<div className="relative w-full h-[500px] bg-slate-900">
    <NoiseTexture />
</div>`}
            props={[
                {
                    name: "opacity",
                    type: "number",
                    defaultValue: "0.7",
                    description: "Noise opacity (0-1)"
                },
                {
                    name: "baseFrequency",
                    type: "number",
                    defaultValue: "2",
                    description: "Noise grain size"
                }
            ]}
        />
    );
}
