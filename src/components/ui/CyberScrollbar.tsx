"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";

export default function CyberScrollbar() {
    // ═══════════════════════════════════════════════════════════════════
    // ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP
    // ═══════════════════════════════════════════════════════════════════

    const { scrollYProgress } = useScroll();
    const [scrollPercent, setScrollPercent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Detect mobile on mount
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Spring animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        restDelta: 0.0001,
    });

    const yPosition = useTransform(smoothProgress, [0, 1], ["5vh", "85vh"]);
    const thumbColor = useTransform(scrollYProgress, [0, 1], ["#00FFFF", "#FF0055"]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollPercent(Math.round(latest * 100));
    });

    // ALL useCallback hooks MUST be called unconditionally
    const scrollToProgress = useCallback((progress: number) => {
        if (typeof window === "undefined") return;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetY = scrollHeight * Math.max(0, Math.min(1, progress));
        window.scrollTo(0, targetY);
    }, []);

    const getProgressFromY = useCallback((clientY: number) => {
        if (!trackRef.current) return 0;
        const rect = trackRef.current.getBoundingClientRect();
        const trackStart = rect.height * 0.05;
        const trackEnd = rect.height * 0.95;
        const trackRange = trackEnd - trackStart;
        const relativeY = clientY - rect.top - trackStart;
        return Math.max(0, Math.min(1, relativeY / trackRange));
    }, []);

    const handleTrackClick = useCallback((e: React.MouseEvent) => {
        if (isDragging) return;
        const progress = getProgressFromY(e.clientY);
        scrollToProgress(progress);
    }, [isDragging, getProgressFromY, scrollToProgress]);

    const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    // Drag handling effect
    useEffect(() => {
        if (!isDragging) return;

        let rafId: number;
        let lastY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            lastY = e.clientY;
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const progress = getProgressFromY(lastY);
                scrollToProgress(progress);
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
            cancelAnimationFrame(rafId);
        };

        document.body.style.cursor = "grabbing";
        document.body.style.userSelect = "none";

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            cancelAnimationFrame(rafId);
        };
    }, [isDragging, getProgressFromY, scrollToProgress]);

    // ═══════════════════════════════════════════════════════════════════
    // CONDITIONAL RENDERING - ONLY AFTER ALL HOOKS ARE CALLED
    // ═══════════════════════════════════════════════════════════════════

    // Don't render on mobile or during SSR
    if (isMobile === null || isMobile === true) {
        return null;
    }

    return (
        <div
            ref={trackRef}
            className="fixed right-0 top-0 h-screen w-10 z-[100] flex justify-end pr-2 hidden md:flex"
            onClick={handleTrackClick}
        >
            <div className="absolute top-[5vh] bottom-[5vh] right-3 w-px bg-white/10" />

            <motion.div
                className={`absolute flex items-center gap-2 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ y: yPosition }}
                onMouseDown={handleThumbMouseDown}
            >
                <motion.span
                    className="font-mono text-[9px] font-medium tracking-wider tabular-nums select-none"
                    style={{ color: thumbColor }}
                >
                    {scrollPercent < 10 ? `0${scrollPercent}` : scrollPercent}
                </motion.span>

                <motion.div
                    className="w-[3px] h-16 rounded-sm"
                    style={{
                        backgroundColor: thumbColor,
                        boxShadow: useTransform(thumbColor, (c) => `0 0 8px ${c}, 0 0 16px ${c}50`),
                    }}
                />
            </motion.div>
        </div>
    );
}
