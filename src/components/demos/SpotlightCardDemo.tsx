"use client";

import SpotlightCard from "@/components/ui/SpotlightCard";

export default function SpotlightCardDemo() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl p-8">
            <SpotlightCard className="p-6 h-[200px] flex flex-col justify-center items-center text-center cursor-pointer group hover:bg-white/5 transition-colors">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Fast Performance</h3>
                <p className="text-white/60 text-sm">Optimized for speed with zero runtime overhead.</p>
            </SpotlightCard>

            <SpotlightCard className="p-6 h-[200px] flex flex-col justify-center items-center text-center cursor-pointer group hover:bg-white/5 transition-colors" spotlightColor="rgba(0, 229, 255, 0.2)">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Customizable</h3>
                <p className="text-white/60 text-sm">Fully themeable with CSS variables and Tailwind.</p>
            </SpotlightCard>

            <SpotlightCard className="p-6 h-[200px] flex flex-col justify-center items-center text-center cursor-pointer group hover:bg-white/5 transition-colors" spotlightColor="rgba(255, 0, 128, 0.2)">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Loved by Devs</h3>
                <p className="text-white/60 text-sm">Trusted by thousands of developers worldwide.</p>
            </SpotlightCard>
        </div>
    );
}
