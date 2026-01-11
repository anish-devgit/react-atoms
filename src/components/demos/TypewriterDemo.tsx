"use client";

import { Typewriter } from "@/components/ui/Typewriter";

export default function TypewriterDemo() {
    return (
        <div className="flex items-center justify-center h-full">
            <Typewriter
                text="Hello World!"
                speed={100}
            />
        </div>
    );
}
