"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export default function CyberCursor() {
    // Mouse position (instant)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Outer ring with spring physics delay
    const springConfig = { damping: 25, stiffness: 400 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    // States
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true to prevent flash

    // Detect touch device
    useEffect(() => {
        const checkTouchDevice = () => {
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            setIsTouchDevice(isTouch);
        };

        checkTouchDevice();

        // Also check on resize (tablets can change orientation)
        window.addEventListener("resize", checkTouchDevice);
        return () => window.removeEventListener("resize", checkTouchDevice);
    }, []);

    // Interactive elements selector
    const interactiveSelector = 'a, button, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor-hover]';

    // Mouse move handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [mouseX, mouseY, isVisible]);

    // Check if element is interactive
    const checkInteractive = useCallback((target: EventTarget | null) => {
        if (!target || !(target instanceof Element)) return false;

        // Check if target or any parent matches interactive selector
        const isInteractive = target.closest(interactiveSelector) !== null;

        // Also check for cursor-pointer in computed style
        const computedStyle = window.getComputedStyle(target);
        const hasCursorPointer = computedStyle.cursor === "pointer";

        return isInteractive || hasCursorPointer;
    }, []);

    // Mouse over/out handlers for hover detection
    const handleMouseOver = useCallback((e: MouseEvent) => {
        if (checkInteractive(e.target)) {
            setIsHovering(true);
        }
    }, [checkInteractive]);

    const handleMouseOut = useCallback((e: MouseEvent) => {
        if (checkInteractive(e.target)) {
            setIsHovering(false);
        }
    }, [checkInteractive]);

    // Hide cursor when mouse leaves window
    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsVisible(true);
    }, []);

    // Setup event listeners
    useEffect(() => {
        if (isTouchDevice) return;

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isTouchDevice, handleMouseMove, handleMouseOver, handleMouseOut, handleMouseLeave, handleMouseEnter]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[99999]"
            style={{ overflow: "hidden" }}
        >
            {/* ═══ OUTER RING (Spring Physics) ═══ */}
            <motion.div
                className="fixed pointer-events-none"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    rotate: isHovering ? 90 : 0,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 400, damping: 25 },
                    rotate: { type: "spring", stiffness: 300, damping: 20 },
                    opacity: { duration: 0.15 },
                }}
            >
                {/* Ring Border */}
                <div
                    className="relative w-10 h-10 rounded-full border-2 transition-colors duration-200"
                    style={{
                        borderColor: isHovering ? "#FF0055" : "#00FFFF",
                        boxShadow: isHovering
                            ? "0 0 15px rgba(255, 0, 85, 0.5), inset 0 0 10px rgba(255, 0, 85, 0.1)"
                            : "0 0 15px rgba(0, 255, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.1)",
                    }}
                >
                    {/* Crosshair Lines */}
                    <div
                        className="absolute top-1/2 left-0 w-2 h-[1px] -translate-y-1/2 transition-colors duration-200"
                        style={{ backgroundColor: isHovering ? "#FF0055" : "#00FFFF" }}
                    />
                    <div
                        className="absolute top-1/2 right-0 w-2 h-[1px] -translate-y-1/2 transition-colors duration-200"
                        style={{ backgroundColor: isHovering ? "#FF0055" : "#00FFFF" }}
                    />
                    <div
                        className="absolute top-0 left-1/2 w-[1px] h-2 -translate-x-1/2 transition-colors duration-200"
                        style={{ backgroundColor: isHovering ? "#FF0055" : "#00FFFF" }}
                    />
                    <div
                        className="absolute bottom-0 left-1/2 w-[1px] h-2 -translate-x-1/2 transition-colors duration-200"
                        style={{ backgroundColor: isHovering ? "#FF0055" : "#00FFFF" }}
                    />

                    {/* Corner Brackets (Target Lock) - Only visible on hover */}
                    <motion.div
                        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                    >
                        {/* Top-Left */}
                        <div className="absolute -top-1 -left-1">
                            <div className="w-2 h-[2px] bg-neon-red" style={{ backgroundColor: "#FF0055" }} />
                            <div className="w-[2px] h-2 bg-neon-red" style={{ backgroundColor: "#FF0055" }} />
                        </div>
                        {/* Top-Right */}
                        <div className="absolute -top-1 -right-1">
                            <div className="w-2 h-[2px] bg-neon-red ml-auto" style={{ backgroundColor: "#FF0055" }} />
                            <div className="w-[2px] h-2 bg-neon-red ml-auto" style={{ backgroundColor: "#FF0055" }} />
                        </div>
                        {/* Bottom-Left */}
                        <div className="absolute -bottom-1 -left-1">
                            <div className="w-[2px] h-2 bg-neon-red" style={{ backgroundColor: "#FF0055" }} />
                            <div className="w-2 h-[2px] bg-neon-red" style={{ backgroundColor: "#FF0055" }} />
                        </div>
                        {/* Bottom-Right */}
                        <div className="absolute -bottom-1 -right-1">
                            <div className="w-[2px] h-2 bg-neon-red ml-auto" style={{ backgroundColor: "#FF0055" }} />
                            <div className="w-2 h-[2px] bg-neon-red ml-auto" style={{ backgroundColor: "#FF0055" }} />
                        </div>
                    </motion.div>
                </div>

                {/* Optional: Rotating Dashed Ring (subtle) */}
                <motion.div
                    className="absolute inset-0 w-10 h-10 rounded-full border border-dashed opacity-30"
                    style={{
                        borderColor: isHovering ? "#FF0055" : "#00FFFF",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* ═══ CENTER DOT (Instant Follow) ═══ */}
            <motion.div
                className="fixed pointer-events-none"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    mixBlendMode: "difference",
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 500, damping: 30 },
                    opacity: { duration: 0.15 },
                }}
            >
                <div
                    className="w-2 h-2 rounded-full"
                    style={{
                        backgroundColor: "#ffffff",
                        boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
                    }}
                />
            </motion.div>

            {/* ═══ HOVER INDICATOR TEXT (Optional) ═══ */}
            <motion.div
                className="fixed pointer-events-none font-mono text-[8px] tracking-wider"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "calc(-50% + 30px)",
                    color: "#FF0055",
                    textShadow: "0 0 10px rgba(255, 0, 85, 0.5)",
                }}
                animate={{
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
            >
                [TARGET_LOCKED]
            </motion.div>
        </div>
    );
}
