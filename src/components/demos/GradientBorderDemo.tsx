"use client";

export default function GradientBorderDemo() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="relative p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent-secondary to-accent rounded-lg animate-spin-slow" style={{ animationDuration: "3s" }} />
                <div className="relative bg-background rounded-lg px-4 py-2 m-[2px]">
                    <span className="text-xs font-semibold">Gradient</span>
                </div>
            </div>
        </div>
    );
}
