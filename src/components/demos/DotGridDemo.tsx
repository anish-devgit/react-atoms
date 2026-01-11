"use client";

export default function DotGridDemo() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-black/10">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.6) 2px, transparent 2px)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "center center"
                }}
            />
            {/* Add a subtle glow effect in the center */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
                }}
            />
        </div>
    );
}
