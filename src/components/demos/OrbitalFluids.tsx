"use client";

export function OrbitalFluidsDemo() {
    return (
        <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900 flex items-center justify-center overflow-hidden">
            {/* Bright floating particles */}
            <div className="absolute inset-0">
                {/* Main particles with strong colors */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50 animate-ping"></div>
                <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50 animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-violet-400 rounded-full shadow-lg shadow-violet-500/50 animate-ping" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-indigo-400 rounded-full shadow-lg shadow-indigo-500/50 animate-ping" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Bright orbital rings */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-cyan-400/40 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                <div className="absolute w-24 h-24 border-2 border-purple-400/40 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                <div className="absolute w-16 h-16 border-2 border-blue-400/40 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
            </div>

            {/* Bright center dot with glow */}
            <div className="relative z-10 w-6 h-6 bg-gradient-to-br from-cyan-300 via-purple-400 to-blue-500 rounded-full shadow-2xl shadow-purple-500/80 animate-pulse"></div>
        </div>
    );
}
