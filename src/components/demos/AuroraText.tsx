"use client";

import { AuroraText } from "@/components/ui/AuroraText";

export function AuroraTextDemo() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 bg-black/90 p-8">
            <div className="text-5xl md:text-7xl font-bold tracking-tight">
                <AuroraText className="opacity-90">
                    AURORA
                </AuroraText>
            </div>

            <div className="text-3xl font-semibold">
                <AuroraText
                    colors={["#00ff99", "#00ccff", "#00ff99"]}
                    speed={4}
                >
                    Nebula Stream
                </AuroraText>
            </div>

            <div className="text-xl">
                <AuroraText
                    colors={["#ff1b6b", "#45caff", "#ff1b6b"]}
                    speed={10}
                    className="tracking-widest uppercase text-sm"
                >
                    Slow Plasma Flow
                </AuroraText>
            </div>
        </div>
    );
}
