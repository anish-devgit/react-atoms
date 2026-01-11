"use client";

import SplashCursor from "@/components/ui/SplashCursor";

export default function SplashCursorDemo() {
    return (
        <div className="relative w-full h-[400px] bg-black flex items-center justify-center overflow-hidden">
            <SplashCursor />
            <div className="z-10 text-center pointer-events-none">
                <h1 className="text-4xl font-bold text-white mb-2">Splash Cursor</h1>
                <p className="text-gray-400">Move your mouse around to create splashes.</p>
            </div>
        </div>
    );
}
