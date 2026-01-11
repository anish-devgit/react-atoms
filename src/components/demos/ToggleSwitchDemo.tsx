"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ToggleSwitchDemo() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="flex items-center justify-center h-full">
            <button
                onClick={() => setIsOn(!isOn)}
                className={`w-14 h-7 rounded-full p-1 transition-colors ${isOn ? "bg-accent" : "bg-white/20"
                    }`}
            >
                <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: isOn ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </button>
        </div>
    );
}
