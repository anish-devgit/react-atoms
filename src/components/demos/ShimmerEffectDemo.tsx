"use client";

export default function ShimmerEffectDemo() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-24 h-16 space-y-3">
                <div className="h-4 bg-gradient-to-r from-white/5 via-white/30 to-white/5 rounded animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                <div className="h-4 w-16 bg-gradient-to-r from-white/5 via-white/30 to-white/5 rounded animate-shimmer" style={{ backgroundSize: '200% 100%', animationDelay: '0.3s' }} />
            </div>
        </div>
    );
}
