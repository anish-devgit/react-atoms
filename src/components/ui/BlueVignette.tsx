"use client";

import { memo } from "react";

function BlueVignetteComponent() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {/* Top vignette */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-500/10 to-transparent" />

            {/* Bottom vignette */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-500/10 to-transparent" />

            {/* Left vignette */}
            <div className="absolute top-0 left-0 h-full w-64 bg-gradient-to-r from-blue-500/10 to-transparent" />

            {/* Right vignette */}
            <div className="absolute top-0 right-0 h-full w-64 bg-gradient-to-l from-blue-500/10 to-transparent" />
        </div>
    );
}

export const BlueVignette = memo(BlueVignetteComponent);
