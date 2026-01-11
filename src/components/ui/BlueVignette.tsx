"use client";

import { memo } from "react";

function CosmicVignetteComponent() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Deep space vignette - all edges */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.8) 100%)"
                }}
            />

            {/* Subtle center glow - very faint white */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] opacity-10"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 50%)"
                }}
            />
        </div>
    );
}

export const BlueVignette = memo(CosmicVignetteComponent);
