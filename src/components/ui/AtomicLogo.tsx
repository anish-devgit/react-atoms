import React from "react";

export function AtomicLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Nucleus */}
            <circle cx="50" cy="50" r="8" className="fill-current" />

            {/* Electron orbits */}
            <ellipse
                cx="50"
                cy="50"
                rx="40"
                ry="20"
                className="stroke-current"
                strokeWidth="2"
                fill="none"
            />
            <ellipse
                cx="50"
                cy="50"
                rx="40"
                ry="20"
                className="stroke-current"
                strokeWidth="2"
                fill="none"
                transform="rotate(60 50 50)"
            />
            <ellipse
                cx="50"
                cy="50"
                rx="40"
                ry="20"
                className="stroke-current"
                strokeWidth="2"
                fill="none"
                transform="rotate(120 50 50)"
            />

            {/* Electrons */}
            <circle cx="90" cy="50" r="4" className="fill-current" />
            <circle cx="25" cy="65" r="4" className="fill-current" />
            <circle cx="25" cy="35" r="4" className="fill-current" />
        </svg>
    );
}
