"use client";

export function GridVortexDemo() {
    return (
        <div className="relative w-full h-full min-h-[400px] bg-slate-950 overflow-hidden flex items-center justify-center">
            {/* Bright animated grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                    transformOrigin: 'center',
                    animation: 'vortex 8s ease-in-out infinite'
                }}
            ></div>

            {/* Bright center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-48 h-48 bg-cyan-500/30 rounded-full blur-3xl"></div>
            </div>

            {/* Additional accent glows */}
            <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Bright text overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-600 tracking-tighter drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                    VORTEX
                </h2>
            </div>

            <style jsx>{`
                @keyframes vortex {
                    0%, 100% {
                        transform: scale(1) rotate(0deg);
                    }
                    50% {
                        transform: scale(1.15) rotate(8deg);
                    }
                }
            `}</style>
        </div>
    );
}
