"use client";

export default function GlassCardDemo() {
    return (
        <div className="flex items-center justify-center h-full p-4">
            <div className="w-32 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <div className="text-xs font-semibold mb-1">Glass Card</div>
                <div className="text-[10px] text-white/60">Frosted glass effect</div>
            </div>
        </div>
    );
}
