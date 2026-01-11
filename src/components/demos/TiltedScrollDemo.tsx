"use client";

import TiltedScroll from "@/components/ui/TiltedScroll";

export default function TiltedScrollDemo() {
    const items = [
        { id: "1", text: "React", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
        { id: "2", text: "Next.js", color: "bg-white/10 text-white border-white/20" },
        { id: "3", text: "TypeScript", color: "bg-blue-600/10 text-blue-500 border-blue-600/20" },
        { id: "4", text: "Tailwind", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
        { id: "5", text: "Framer Motion", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
        { id: "6", text: "Three.js", color: "bg-green-500/10 text-green-400 border-green-500/20" },
        { id: "7", text: "WebGL", color: "bg-red-500/10 text-red-400 border-red-500/20" },
        { id: "8", text: "Figma", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    ];

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-background">
            <TiltedScroll className="w-64 h-full" tiltAngle={-10}>
                {[...items, ...items, ...items].map((item, i) => (
                    <div
                        key={i}
                        className={`p-4 rounded-xl border ${item.color} flex items-center justify-center font-bold text-lg backdrop-blur-sm`}
                    >
                        {item.text}
                    </div>
                ))}
            </TiltedScroll>
        </div>
    );
}
