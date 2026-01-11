"use client";

import { memo, useRef, useState, useEffect, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
}

function MagneticButtonComponent({ children, className = "", href, onClick }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    useEffect(() => {
        if (!ref.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            if (isHovered) {
                x.set(distanceX * 0.3);
                y.set(distanceY * 0.3);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isHovered, x, y]);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const Wrapper = href ? "a" : "div";

    return (
        <div ref={ref} className="inline-block">
            <motion.div
                style={{ x, y }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="will-change-transform"
            >
                <Wrapper
                    {...(href ? { href } : {})}
                    {...(onClick ? { onClick } : {})}
                    className={className}
                >
                    {children}
                </Wrapper>
            </motion.div>
        </div>
    );
}

export const MagneticButton = memo(MagneticButtonComponent);
