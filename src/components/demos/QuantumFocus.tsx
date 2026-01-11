"use client";

import { QuantumFocus } from "@/components/ui/QuantumFocus";
import { useEffect, useState } from "react";

export function QuantumFocusDemo() {
    // Simulate hover for the live preview if needed, but the component is interactive
    // To make it auto-play, we can simulate hovering

    // Actually, for the demo card preview, let's keep it interactive or auto-play
    // Let's make a wrapper that auto-plays
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            {/* We can disable manual interaction layer if we want strict auto-play, 
                 but QuantumFocus handles mouse events. 
                 Let's stick to the component itself for the preview. 
                 Since the user requested strict auto-play for previews: */}
            <div className="pointer-events-none">
                <AutoMovingFocus />
            </div>
        </div>
    );
}

function AutoMovingFocus() {
    // A version of QuantumFocus that programmatically hovers words
    // We need to customize the component slightly to accept forced hover state or just mock it here
    // Since I can't easily modify the component props to force hover without changing API significantly,
    // I will inline a simplified auto-playing version just for the demo preview visual.
    // Wait, better to update QuantumFocus to accept 'forcedIndex' prop? No, keep it clean.
    // I'll rebuild a mini-version here for the preview to ensure it loops.

    const words = ["Quantum", "Field", "Active"];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % words.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    // Reusing the visual logic but controlled
    return (
        <div className="flex gap-x-3">
            {words.map((word, i) => {
                const isFocused = i === activeIndex;
                const isNeighbor = Math.abs(i - activeIndex) === 1;

                return (
                    <div
                        key={i}
                        className="relative transition-all duration-500 ease-spring"
                        style={{
                            transform: isFocused ? 'scale(1.2)' : 'scale(0.9)',
                            filter: isFocused ? 'none' : 'blur(4px)',
                            opacity: isFocused ? 1 : 0.5,
                            margin: isFocused ? '0 10px' : '0' // Repulsion simulation
                        }}
                    >
                        <span className={`font-bold text-xl ${isFocused ? "text-white" : "text-white/70"}`}>
                            {word}
                        </span>

                        {isFocused && (
                            <div className="absolute inset-0 -z-10 bg-purple-500/30 blur-lg rounded-full scale-150 animate-pulse" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
