"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════════════
// BOKEH PARTICLE DATA
// ═══════════════════════════════════════════════════════════════════════
interface BokehParticle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    duration: number;
    delay: number;
}

// ═══════════════════════════════════════════════════════════════════════
// BOKEH PARTICLE COMPONENT - Soft floating circles
// ═══════════════════════════════════════════════════════════════════════
function BokehParticle({ particle }: { particle: BokehParticle }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                opacity: particle.opacity,
                filter: `blur(${particle.size / 3}px)`,
                willChange: "transform",
            }}
            animate={{
                y: [0, -40, 0, 30, 0],
                x: [0, 15, 0, -15, 0],
                scale: [1, 1.15, 1, 0.9, 1],
            }}
            transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

// ═══════════════════════════════════════════════════════════════════════
// PERSPECTIVE GRID - The floor grid scrolling forward
// ═══════════════════════════════════════════════════════════════════════
function PerspectiveGrid() {
    return (
        <div
            className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden"
            style={{
                perspective: "400px",
                perspectiveOrigin: "50% 0%",
            }}
        >
            <motion.div
                className="absolute inset-0"
                style={{
                    transform: "rotateX(70deg)",
                    transformOrigin: "center top",
                }}
                animate={{ y: [0, 50] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {/* Horizontal grid lines - MORE VISIBLE */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            0deg,
                            transparent 0px,
                            transparent 38px,
                            rgba(255, 0, 85, 0.15) 39px,
                            rgba(255, 0, 85, 0.15) 40px
                        )`,
                    }}
                />
                {/* Vertical grid lines - MORE VISIBLE */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            90deg,
                            transparent 0px,
                            transparent 58px,
                            rgba(255, 0, 85, 0.12) 59px,
                            rgba(255, 0, 85, 0.12) 60px
                        )`,
                    }}
                />
            </motion.div>

            {/* Fade to black at top */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to bottom, #050508 0%, transparent 70%)",
                }}
            />
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// CROSS-LIGHT BEAMS - Soft X composition - MORE VISIBLE
// ═══════════════════════════════════════════════════════════════════════
function CrossLightBeams() {
    return (
        <>
            {/* Beam A: Top-Left to Bottom-Right (Cyan) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(
                        135deg,
                        rgba(0, 255, 255, 0.15) 0%,
                        rgba(0, 255, 255, 0.05) 30%,
                        transparent 50%,
                        rgba(0, 255, 255, 0.03) 70%,
                        rgba(0, 255, 255, 0.12) 100%
                    )`,
                }}
            />

            {/* Beam B: Top-Right to Bottom-Left (Magenta) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(
                        -135deg,
                        rgba(255, 0, 85, 0.15) 0%,
                        rgba(255, 0, 85, 0.05) 30%,
                        transparent 50%,
                        rgba(255, 0, 85, 0.03) 70%,
                        rgba(255, 0, 85, 0.12) 100%
                    )`,
                }}
            />

            {/* Center intersection glow */}
            <div
                className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 50%)",
                }}
            />
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════
export default function HeroXBackground() {
    const [isMounted, setIsMounted] = useState(false);

    // Generate bokeh particles on client only
    const particles = useMemo<BokehParticle[]>(() => {
        if (typeof window === "undefined") return [];

        const colors = ["#00FFFF", "#FF0055", "#00FFFF", "#FF0055"];
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: 5 + Math.random() * 90,
            y: 10 + Math.random() * 80,
            size: 60 + Math.random() * 100,
            color: colors[i % colors.length],
            opacity: 0.15 + Math.random() * 0.15, // More visible: 15-30%
            duration: 6 + Math.random() * 5,
            delay: Math.random() * 3,
        }));
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{
                zIndex: 0,
                backgroundColor: "#050508",
                willChange: "transform",
            }}
        >
            {/* ═══ HALFTONE DOT TEXTURE ═══ */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                    backgroundSize: "6px 6px",
                }}
            />

            {/* ═══ PERSPECTIVE GRID (Floor) ═══ */}
            <PerspectiveGrid />

            {/* ═══ CROSS-LIGHT BEAMS ═══ */}
            <CrossLightBeams />

            {/* ═══ BOKEH PARTICLES ═══ */}
            {isMounted && particles.map((particle) => (
                <BokehParticle key={particle.id} particle={particle} />
            ))}

            {/* ═══ FOCUS VIGNETTE ═══ */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(
                        ellipse 70% 60% at 50% 50%,
                        transparent 0%,
                        transparent 35%,
                        rgba(5, 5, 8, 0.5) 60%,
                        rgba(5, 5, 8, 0.85) 80%,
                        rgba(5, 5, 8, 0.98) 100%
                    )`,
                }}
            />

            {/* ═══ CORNER GRADIENTS ═══ */}
            <div
                className="absolute top-0 left-0 w-[35%] h-[35%] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 0% 0%, rgba(0,255,255,0.08) 0%, transparent 60%)",
                }}
            />
            <div
                className="absolute top-0 right-0 w-[35%] h-[35%] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 100% 0%, rgba(255,0,85,0.08) 0%, transparent 60%)",
                }}
            />
            <div
                className="absolute bottom-0 left-0 w-[35%] h-[35%] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 0% 100%, rgba(255,0,85,0.06) 0%, transparent 60%)",
                }}
            />
            <div
                className="absolute bottom-0 right-0 w-[35%] h-[35%] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 100% 100%, rgba(0,255,255,0.06) 0%, transparent 60%)",
                }}
            />

            {/* ═══ SCAN LINES ═══ */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent 0px,
                        transparent 2px,
                        rgba(255,255,255,0.5) 2px,
                        rgba(255,255,255,0.5) 4px
                    )`,
                }}
            />
        </div>
    );
}
