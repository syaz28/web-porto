"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorSpotlight() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Smooth spring animation for the spotlight
    const springConfig = { damping: 25, stiffness: 150 };
    const spotlightX = useSpring(cursorX, springConfig);
    const spotlightY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    left: spotlightX,
                    top: spotlightY,
                    background: `radial-gradient(
            circle at center,
            rgba(0, 255, 255, 0.08) 0%,
            rgba(0, 255, 255, 0.04) 25%,
            rgba(0, 255, 255, 0.01) 50%,
            transparent 70%
          )`,
                }}
            />
            {/* Secondary warm glow */}
            <motion.div
                className="absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    left: spotlightX,
                    top: spotlightY,
                    background: `radial-gradient(
            circle at center,
            rgba(255, 0, 85, 0.03) 0%,
            transparent 60%
          )`,
                }}
            />
        </motion.div>
    );
}
