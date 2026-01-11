"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function RippleButton() {
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prev => prev + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            <button className="relative overflow-hidden px-6 py-3 rounded-lg bg-blue-600 text-white font-medium">
                Ripple Effect
                {/* Ripple */}
                <motion.span
                    key={key}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-white rounded-lg"
                />
            </button>
        </div>
    );
}
