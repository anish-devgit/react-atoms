"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AtomicLogo } from "./AtomicLogo";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [stage, setStage] = useState<'loading' | 'transitioning' | 'done'>('loading');

    useEffect(() => {
        // Faster loading - 1 second
        const loadingTimer = setTimeout(() => {
            setStage('transitioning');
        }, 1000);

        const transitionTimer = setTimeout(() => {
            setStage('done');
            setIsLoading(false);
        }, 1600);

        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(transitionTimer);
        };
    }, []);

    // Calculate position to move logo to (top-left where navbar logo is)
    const getTargetPosition = () => {
        if (typeof window === 'undefined') return { x: 0, y: 0 };

        // Navbar logo position: approximately 24px from left, 16-20px from top
        const targetX = -(window.innerWidth / 2 - 60); // Move to left side
        const targetY = -(window.innerHeight / 2 - 28); // Move to top

        return { x: targetX, y: targetY };
    };

    const targetPos = getTargetPosition();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: stage === 'transitioning' ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <motion.div
                        className="fixed top-1/2 left-1/2 flex items-center gap-2.5"
                        style={{ x: '-50%', y: '-50%' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={
                            stage === 'loading'
                                ? {
                                    opacity: 1,
                                    scale: 1,
                                    x: '-50%',
                                    y: '-50%'
                                }
                                : {
                                    opacity: 1,
                                    scale: 1,
                                    x: targetPos.x,
                                    y: targetPos.y
                                }
                        }
                        transition={{
                            duration: stage === 'loading' ? 0.5 : 0.6,
                            ease: [0.16, 1, 0.3, 1],
                            delay: stage === 'loading' ? 0.1 : 0
                        }}
                    >
                        {/* Atomic Logo - Same size as navbar (28px) */}
                        <motion.div
                            animate={{ rotate: stage === 'loading' ? 360 : 0 }}
                            transition={{
                                duration: 2,
                                repeat: stage === 'loading' ? Infinity : 0,
                                ease: "linear"
                            }}
                        >
                            <AtomicLogo size={28} className="text-white" />
                        </motion.div>

                        {/* Text - Same as navbar: text-base font-semibold */}
                        <span className="text-base font-semibold text-white">
                            ReactAtoms
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
