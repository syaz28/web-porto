"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
    onLoadingComplete?: () => void;
    duration?: number;
}

export default function LoadingScreen({
    onLoadingComplete,
    duration = 2500,
}: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [hardRgbSplit, setHardRgbSplit] = useState(false);

    // Refs for precise timing
    const startTimeRef = useRef<number>(0);
    const hasCompletedRef = useRef(false);

    // Client mount
    useEffect(() => {
        setIsMounted(true);
        startTimeRef.current = Date.now();
    }, []);

    // Hard RGB Split effect every 300ms for 30ms (snappier)
    useEffect(() => {
        if (!isMounted || isExiting) return;

        const interval = setInterval(() => {
            setHardRgbSplit(true);
            setTimeout(() => setHardRgbSplit(false), 30);
        }, 300);

        return () => clearInterval(interval);
    }, [isMounted, isExiting]);

    // Strict progress calculation with clamping
    const calculateProgress = useCallback((elapsed: number, total: number) => {
        const rawProgress = (elapsed / total) * 100;
        return Math.min(100, Math.max(0, rawProgress));
    }, []);

    // Optimized progress using useAnimationFrame
    useAnimationFrame(() => {
        if (!isMounted || !startTimeRef.current || hasCompletedRef.current) return;

        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = calculateProgress(elapsed, duration);

        // Update state with reduced frequency
        if (Math.abs(newProgress - progress) > 1) {
            setProgress(newProgress);
        }

        // Strict completion at 100%
        if (newProgress >= 100 && !hasCompletedRef.current) {
            hasCompletedRef.current = true;
            setProgress(100);
            setIsExiting(true);

            // Exit after 200ms
            setTimeout(() => {
                setIsVisible(false);
                onLoadingComplete?.();
            }, 200);
        }
    });

    if (!isVisible) return null;

    // Pulsing glow intensity (synced with progress)
    const glowIntensity = 15 + Math.sin((progress / 100) * Math.PI * 4) * 8;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[99999] flex items-center justify-center"
                style={{ backgroundColor: "#000000" }}
                initial={{ opacity: 1 }}
                animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {/* === RADIAL PULSE BACKDROP === */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        width: "400px",
                        height: "400px",
                        background: "radial-gradient(circle, rgba(255,0,50,0.15) 0%, rgba(255,0,50,0.05) 40%, transparent 70%)",
                    }}
                    animate={{
                        scale: isExiting ? 4 : [1, 1.1, 1],
                        opacity: isExiting ? 0 : 1,
                    }}
                    transition={{
                        duration: isExiting ? 0.2 : 1.5,
                        repeat: isExiting ? 0 : Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* === THE CORE (icon.png) - Sharp Trident Glow === */}
                <motion.div
                    className="relative z-10 w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
                    // Micro-jitter + exit animation
                    animate={
                        isExiting
                            ? { scale: 15, opacity: 0, filter: "brightness(2)" }
                            : {
                                x: [0, -0.8, 0.8, -0.5, 0.5, 0],
                                y: [0, 0.4, -0.4, 0.3, -0.3, 0],
                            }
                    }
                    transition={
                        isExiting
                            ? { duration: 0.2, ease: "easeOut" }
                            : {
                                duration: 0.1,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "linear",
                            }
                    }
                    style={{
                        // Sharp drop-shadow glow that follows the trident shape
                        filter: hardRgbSplit
                            ? `
                                drop-shadow(-4px 0 0 rgba(255,0,0,0.9))
                                drop-shadow(4px 0 0 rgba(0,255,255,0.9))
                                drop-shadow(0 0 ${glowIntensity}px #FF0032)
                            `
                            : `
                                drop-shadow(0 0 ${glowIntensity}px #FF0032)
                                drop-shadow(0 0 ${glowIntensity * 2}px rgba(255,0,50,0.5))
                            `,
                        // Horizontal offset during glitch
                        transform: hardRgbSplit ? "translateX(2px)" : undefined,
                    }}
                >
                    {/* Main Icon - Fully Transparent */}
                    <Image
                        src="/icon.png"
                        alt="Loading"
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
