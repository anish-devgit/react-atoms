"use client";

import { MistReveal } from "@/components/ui/MistReveal";
import { useEffect, useState } from "react";

export function MistRevealDemo() {
    const [key, setKey] = useState(0);

    // Auto-replay the animation for the demo card look
    useEffect(() => {
        const interval = setInterval(() => {
            setKey(k => k + 1);
        }, 4000); // Replay every 4 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 h-full bg-gradient-to-b from-gray-900 to-black text-center">
            <div key={key}>
                <div className="mb-8">
                    <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-widest">
                        <MistReveal direction="right" duration={1}>Wind from West</MistReveal>
                    </h3>
                    <div className="text-3xl font-light text-white">
                        <MistReveal direction="right" stagger={0.2} duration={1.5}>
                            Where words condense from the mist
                        </MistReveal>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-widest">
                        <MistReveal direction="up" duration={1}>Updraft</MistReveal>
                    </h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                        <MistReveal direction="up" stagger={0.15} duration={1.2}>
                            Rising Vapor Effect
                        </MistReveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
