import { ComponentDocTemplate } from "@/components/ui/ComponentDocTemplate";

export default function GradientMeshPage() {
    return (
        <ComponentDocTemplate
            title="Gradient Mesh"
            description="Animated gradient mesh background with smooth colorful blobs and transitions."
            slug="gradient-mesh"
            tags={["gradient", "mesh", "animated", "colorful"]}
            packageName="framer-motion"
            componentCode={`"use client";

export default function GradientMesh() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl opacity-60 bg-purple-500 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full blur-2xl opacity-60 bg-blue-500 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full blur-xl opacity-40 bg-pink-500 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
    );
}`}
            usageCode={`import GradientMesh from "@/components/ui/GradientMesh";

<div className="relative w-full h-[500px] bg-black">
    <GradientMesh />
</div>`}
            props={[
                {
                    name: "colors",
                    type: "string[]",
                    defaultValue: '["#a855f7", "#6366f1", "#ec4899"]',
                    description: "Array of gradient colors"
                },
                {
                    name: "speed",
                    type: "number",
                    defaultValue: "1.0",
                    description: "Animation speed multiplier"
                }
            ]}
        />
    );
}
