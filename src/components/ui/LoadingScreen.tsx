"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AtomicLogo } from "./AtomicLogo";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [stage, setStage] = useState<'loading' | 'transitioning' | 'done'>('loading');

    useEffect(() => {
        // 1.5 second loading duration
        const loadingTimer = setTimeout(() => {
            setStage('transitioning');
        }, 1500);

        const transitionTimer = setTimeout(() => {
            setStage('done');
            setIsLoading(false);
        }, 2300); // 1500ms loading + 800ms transition

        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(transitionTimer);
        };
    }, []);

    // Calculate exact navbar position
    const getNavbarPosition = () => {
        if (typeof window === 'undefined') return { x: 0, y: 0 };

        // Navbar logo is at: ~60px from left (4px padding + ~28px logo + gap), ~28px from top
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;

        // Target position (navbar logo position)
        const navbarX = 60; // approximate left position of navbar logo
        const navbarY = 28; // approximate top position

        // Calculate offset from center
        const offsetX = navbarX - viewportCenterX;
        const offsetY = navbarY - viewportCenterY;

        return { x: offsetX, y: offsetY };
    };

    const navbarPos = getNavbarPosition();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: stage === 'transitioning' ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            className="flex items-center gap-4"
                            animate={
                                stage === 'loading'
                                    ? {
                                        x: 0,
                                        y: 0,
                                        scale: 1
                                    }
                                    : {
                                        x: navbarPos.x,
                                        y: navbarPos.y,
                                        scale: 0.44 // Scale from 64px to 28px (28/64 = 0.4375)
                                    }
                            }
                            transition={{
                                duration: stage === 'loading' ? 0 : 0.8,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0
                            }}
                        >
                            {/* Atomic Logo - Large on loading (64px), scales to navbar size (28px) */}
                            <motion.div
                                animate={{ rotate: stage === 'loading' ? 360 : 0 }}
                                transition={{
                                    duration: 3,
                                    repeat: stage === 'loading' ? Infinity : 0,
                                    ease: "linear"
                                }}
                            >
                                <AtomicLogo size={64} className="text-white" />
                            </motion.div>

                            {/* Text - Large on loading (text-5xl), matches navbar when scaled */}
                            <h1 className="text-5xl font-semibold text-white whitespace-nowrap">
                                ReactAtoms
                            </h1>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
