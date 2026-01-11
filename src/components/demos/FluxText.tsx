"use client";

import { FluxText } from "@/components/ui/FluxText";

export function FluxTextDemo() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 p-8 bg-black">
            <div className="text-4xl font-bold text-white/50">
                <FluxText>SYSTEM_READY</FluxText>
            </div>

            <div className="text-6xl font-black tracking-tighter text-white">
                <FluxText>INITIALIZING...</FluxText>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 max-w-sm">
                <p className="text-sm text-gray-400 font-mono leading-relaxed">
                    &gt; Protocol <FluxText className="text-white">v2.4.9</FluxText> active.<br />
                    &gt; Encryption keys <FluxText className="text-green-400">VERIFIED</FluxText>.<br />
                    &gt; Establish secure connection...
                </p>
            </div>
        </div>
    );
}
