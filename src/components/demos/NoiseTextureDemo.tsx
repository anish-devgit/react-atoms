"use client";

export default function NoiseTextureDemo() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-slate-900/50">
            {/* Stronger, more visible noise texture */}
            <div
                className="absolute inset-0 opacity-70"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "100px 100px"
                }}
            />
            {/* Subtle purple tint overlay */}
            <div
                className="absolute inset-0 mix-blend-overlay"
                style={{
                    background: "radial-gradient(circle at center, rgba(168,85,247,0.15) 0%, transparent 70%)"
                }}
            />
        </div>
    );
}
