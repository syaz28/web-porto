"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// Matrix rain effect for background
function MatrixRain() {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const columns = 40;

    // Generate stable random values on client-side only to avoid hydration mismatch
    const [matrixData, setMatrixData] = useState<Array<{ char: string; duration: number; delay: number }>>([]);

    useEffect(() => {
        const data = Array.from({ length: columns }).map(() => ({
            char: chars[Math.floor(Math.random() * chars.length)],
            duration: 5 + Math.random() * 10,
            delay: Math.random() * 5,
        }));
        setMatrixData(data);
    }, []);

    // Don't render until client-side data is ready
    if (matrixData.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
            {matrixData.map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute text-neon-green font-mono text-xs"
                    style={{ left: `${(i / columns) * 100}%` }}
                    animate={{
                        y: ["0vh", "100vh"],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: item.delay,
                    }}
                >
                    {item.char}
                </motion.div>
            ))}
        </div>
    );
}


// Lock/Unlock icons floating
function FloatingLocks() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-3xl"
                    style={{
                        left: `${10 + i * 15}%`,
                        top: `${20 + (i % 3) * 30}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {i % 2 === 0 ? "🔒" : "🔓"}
                </motion.div>
            ))}
        </div>
    );
}

export default function ProjectShowcase() {
    const [isHovered, setIsHovered] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring" as const, stiffness: 100, damping: 15 },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 100, rotateY: -15 },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: { type: "spring" as const, stiffness: 80, damping: 20 },
        },
    };

    return (
        <section className="relative py-16 md:py-24 overflow-hidden">
            {/* Background Effects */}
            <MatrixRain />
            <FloatingLocks />

            {/* Diagonal Accent Lines */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-neon-cyan to-purple-500 opacity-50"
                style={{ boxShadow: "0 0 20px rgba(139,92,246,0.5)" }} />
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-neon-cyan via-purple-500 to-neon-cyan opacity-50"
                style={{ boxShadow: "0 0 20px rgba(0,255,255,0.5)" }} />

            {/* Section Header */}
            <div className="container mx-auto px-4 sm:px-6 mb-10 md:mb-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
                >
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                    <span className="terminal-text text-purple-400 text-[10px] md:text-xs tracking-widest">[MODULE.03]</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-purple-500 to-transparent" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: "spring" as const, stiffness: 150, damping: 15 }}
                    className="text-center"
                >
                    <span
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase"
                        style={{
                            fontFamily: "Impact, 'Arial Black', sans-serif",
                            color: "#ffffff",
                            WebkitTextStroke: "1px #8B5CF6",
                            textShadow: "3px 3px 0px #000000, 0 0 15px rgba(139,92,246,0.5)"
                        }}
                    >
                        FEATURED{" "}
                        <span style={{ WebkitTextStroke: "1px #00FFFF", textShadow: "3px 3px 0px #000000, 0 0 15px rgba(0,255,255,0.5)" }}>
                            PROJECT
                        </span>
                    </span>
                </motion.h2>
            </div>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="container mx-auto px-4 sm:px-6 max-w-7xl"
            >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Left: Text Content */}
                    <motion.div variants={textVariants} className="order-2 lg:order-1 space-y-6">
                        {/* Glassmorphism Panel */}
                        <div
                            className="relative bg-black/40 backdrop-blur-md border border-purple-500/30 p-6 md:p-8"
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
                                boxShadow: "0 8px 32px rgba(139,92,246,0.15), inset 0 0 20px rgba(0,255,255,0.05)"
                            }}
                        >
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-500" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-neon-cyan" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-neon-cyan" />

                            {/* Project Badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.3 }}
                                className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-purple-500/20 border border-purple-500 text-purple-300 font-mono text-xs tracking-wider"
                            >
                                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                FLAGSHIP_PROJECT.EXE
                            </motion.div>

                            {/* Title */}
                            <h3
                                className="text-3xl md:text-4xl lg:text-5xl font-black mb-3"
                                style={{
                                    fontFamily: "Impact, 'Arial Black', sans-serif",
                                    background: "linear-gradient(135deg, #8B5CF6 0%, #00FFFF 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    textShadow: "0 0 30px rgba(139,92,246,0.3)"
                                }}
                            >
                                AES FORGE
                            </h3>

                            {/* Subtitle */}
                            <p className="text-neon-cyan text-sm md:text-base font-mono mb-6 tracking-wide">
                                Advanced Cryptographic Research Platform
                            </p>

                            {/* Description */}
                            <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                                A <span className="text-purple-400 font-bold">full-stack cryptographic suite</span> designed to analyze and modify{" "}
                                <span className="text-neon-cyan font-bold">AES-128 S-boxes</span>. Features real-time image encryption,
                                dynamic S-box generation, and comprehensive security metrics{" "}
                                <span className="text-neon-yellow font-mono text-xs">(Nonlinearity, SAC, Entropy)</span> to test
                                encryption strength against statistical attacks.
                            </p>

                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {["React", "Next.js", "FastAPI", "Python", "Cryptography", "Real-time Analysis"].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-black/50 border border-purple-500/30 text-purple-300 font-mono text-xs"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <motion.a
                                href="https://aesxforge.netlify.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-neon-cyan text-black font-black uppercase tracking-wider text-sm transition-all duration-200 group"
                                style={{
                                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                                    boxShadow: "0 0 20px rgba(139,92,246,0.5), 4px 4px 0px #000"
                                }}
                            >
                                <span>LAUNCH_APP</span>
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </motion.a>
                        </div>

                        {/* Security Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-3 text-xs font-mono text-gray-500"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-neon-green">✓</span>
                                <span>AES-128 Compliant</span>
                            </div>
                            <span>|</span>
                            <div className="flex items-center gap-2">
                                <span className="text-neon-green">✓</span>
                                <span>Entropy Tested</span>
                            </div>
                            <span>|</span>
                            <div className="flex items-center gap-2">
                                <span className="text-neon-cyan">⚡</span>
                                <span>Real-time Processing</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Project Screenshot in Futuristic Monitor */}
                    <motion.div
                        variants={imageVariants}
                        className="order-1 lg:order-2 relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* 3D Monitor Frame */}
                        <div
                            className="relative"
                            style={{
                                perspective: "1000px",
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotateY: isHovered ? -5 : 0,
                                    scale: isHovered ? 1.02 : 1,
                                }}
                                transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                                className="relative"
                            >
                                {/* Monitor Outer Frame */}
                                <div
                                    className="relative border-4 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-3 md:p-4"
                                    style={{
                                        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 30px rgba(139,92,246,0.1)"
                                    }}
                                >
                                    {/* Status Lights */}
                                    <div className="absolute -top-2 left-4 flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" style={{ boxShadow: "0 0 10px #39FF14" }} />
                                        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style={{ boxShadow: "0 0 10px #8B5CF6", animationDelay: "0.5s" }} />
                                    </div>

                                    {/* Screen Container */}
                                    <div className="relative bg-black overflow-hidden">
                                        {/* CRT Scanlines */}
                                        <div
                                            className="absolute inset-0 pointer-events-none z-10"
                                            style={{
                                                background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.15) 3px)",
                                            }}
                                        />

                                        {/* Glitch Effect on Hover */}
                                        {isHovered && (
                                            <motion.div
                                                className="absolute inset-0 z-20 pointer-events-none"
                                                animate={{
                                                    opacity: [0, 0.3, 0],
                                                    x: [-5, 5, -5],
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    repeat: Infinity,
                                                    repeatDelay: 2,
                                                }}
                                                style={{
                                                    background: "linear-gradient(90deg, rgba(255,0,85,0.3) 0%, transparent 50%, rgba(0,255,255,0.3) 100%)",
                                                }}
                                            />
                                        )}

                                        {/* Screenshot */}
                                        <div className="relative aspect-video">
                                            <Image
                                                src="/images/aes-forge.png"
                                                alt="AES Forge Application Screenshot"
                                                fill
                                                className="object-cover"
                                                style={{
                                                    filter: isHovered ? "brightness(1.1) contrast(1.1)" : "brightness(1)",
                                                }}
                                            />
                                        </div>

                                        {/* Screen Glow */}
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)",
                                            }}
                                        />
                                    </div>

                                    {/* Monitor Label */}
                                    <div className="mt-3 flex items-center justify-between px-2">
                                        <span className="font-mono text-xs text-gray-600">SECURE_TERMINAL_01</span>
                                        <div className="flex gap-1">
                                            <div className="w-1 h-1 bg-gray-700" />
                                            <div className="w-1 h-1 bg-gray-700" />
                                            <div className="w-1 h-1 bg-gray-700" />
                                        </div>
                                    </div>
                                </div>

                                {/* Monitor Stand */}
                                <div className="mx-auto w-20 h-3 bg-gray-800 mt-2" style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }} />
                                <div className="mx-auto w-32 h-2 bg-gray-900 rounded-sm" />
                            </motion.div>
                        </div>

                        {/* Floating "Encrypted" Badge */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -top-4 -right-4 bg-neon-cyan px-4 py-2 text-black text-xs font-black tracking-wider z-30"
                            style={{
                                clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
                                boxShadow: "3px 3px 0px #000, 0 0 20px rgba(0,255,255,0.5)"
                            }}
                        >
                            🔐 ENCRYPTED
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
