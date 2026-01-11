"use client";

export default function GradientMeshDemo() {
    return (
        <div className="relative h-full w-full overflow-hidden flex items-center justify-center bg-black/20">
            {/* Main gradient blob 1 */}
            <div
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl opacity-60"
                style={{
                    background: "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(168,85,247,0) 70%)",
                    animation: "gradient-shift 8s ease infinite"
                }}
            />
            {/* Main gradient blob 2 */}
            <div
                className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full blur-2xl opacity-60"
                style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0) 70%)",
                    animation: "gradient-shift-reverse 8s ease infinite"
                }}
            />
            {/* Accent blob */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-xl opacity-40"
                style={{
                    background: "radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(236,72,153,0) 70%)",
                    animation: "pulse 4s ease-in-out infinite"
                }}
            />
        </div>
    );
}
