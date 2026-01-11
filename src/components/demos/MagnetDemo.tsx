"use client";

import Magnet from "@/components/ui/Magnet";
import { Move } from "lucide-react";

export default function MagnetDemo() {
    return (
        <div className="relative w-full h-[300px] flex items-center justify-center bg-transparent">
            <Magnet padding={200} magnetStrength={3}>
                <button className="group relative px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                    <Move className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span>Magnetic Button</span>
                </button>
            </Magnet>
        </div>
    );
}
