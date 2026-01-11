"use client";

import AuroraBackground from "@/components/ui/AuroraBackground";

export default function AuroraBackgroundDemo() {
    return (
        <div className="relative w-full h-[500px] overflow-hidden rounded-xl bg-black flex flex-col items-center justify-center">
            <AuroraBackground
                colorStops={["#5227FF", "#7cff67", "#5227FF"]}
                speed={0.5}
            />

            <div className="relative z-10 text-center pointer-events-none p-6">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl tracking-tighter">
                    AURORA
                </h1>
                <p className="text-white/80 text-lg max-w-md mx-auto">
                    Fluid WebGL gradient animation with organic noise movement.
                </p>
            </div>
        </div>
    );
}
