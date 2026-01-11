"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function AnimatedCounterDemo() {
    const [count, setCount] = useState(0);
    const spring = useSpring(0, { stiffness: 100, damping: 30 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        spring.set(count);
    }, [count, spring]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => (prev >= 100 ? 0 : prev + 1));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                <motion.span>{display}</motion.span>
            </div>
        </div>
    );
}
