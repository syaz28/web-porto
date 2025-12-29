"use client";

import { useScramble } from "@/hooks/useScramble";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function HeroProfile() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax transforms (disabled on mobile via CSS)
    const bgTextRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const { displayText: scrambledName } = useScramble("SYAHRINDRA", {
        speed: 50,
        scramble: 6,
        step: 2,
        overflow: true,
    });

    const { displayText: scrambledSurname } = useScramble("RAFLI SANTOSA", {
        speed: 40,
        scramble: 4,
        step: 1,
    });

    const { displayText: scrambledTitle } = useScramble("SECURITY & DEVOPS ENGINEER", {
        speed: 35,
        scramble: 4,
        step: 1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const snapVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        }
    };

    return (
        <section ref={containerRef} className="relative min-h-screen overflow-hidden">
            {/* Giant "SYAZ" Watermark - Hidden on mobile */}
            <motion.div
                style={{ rotate: bgTextRotate, y: bgTextY }}
                className="absolute inset-0 items-center justify-center pointer-events-none select-none z-0 hidden md:flex"
            >
                <span
                    className="text-[25vw] font-black tracking-tighter opacity-[0.03] text-white"
                    style={{ fontFamily: "Impact, 'Arial Black', sans-serif" }}
                >
                    SYAZ
                </span>
            </motion.div>

            {/* Halftone Pattern - Less visible on mobile */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5 md:opacity-10 z-0"
                style={{
                    backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                    backgroundSize: "8px 8px",
                }}
            />

            {/* Caution Tape - Hidden on mobile */}
            <div className="hidden md:block absolute top-20 -left-20 w-[400px] h-8 -rotate-12 overflow-hidden opacity-50 z-10">
                <div className="caution-tape" />
            </div>
            <div className="hidden md:block absolute bottom-40 -right-20 w-[350px] h-8 rotate-12 overflow-hidden opacity-30 z-10">
                <div className="caution-tape" />
            </div>

            {/* Main Content */}
            <div className="relative z-50 container mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-20 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">

                    {/* Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="order-2 lg:order-1 text-center lg:text-left"
                    >
                        {/* Terminal Header */}
                        <motion.div variants={snapVariants} className="mb-3 md:mb-4">
                            <span className="terminal-text text-neon-cyan/80 text-[10px] md:text-xs">
                                [SYS.INIT] &gt; LOADING_PROFILE...
                            </span>
                        </motion.div>

                        {/* Main Name */}
                        <motion.h1
                            variants={snapVariants}
                            className="mb-3 md:mb-4 leading-[0.9]"
                        >
                            <span
                                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight uppercase"
                                style={{
                                    fontFamily: "Impact, 'Arial Black', sans-serif",
                                    color: "#ffffff",
                                    WebkitTextStroke: "1px #00FFFF",
                                    textShadow: "3px 3px 0px #000000, 4px 4px 0px rgba(0,255,255,0.3)",
                                    filter: "drop-shadow(0 0 8px rgba(0,255,255,0.4))"
                                }}
                            >
                                {scrambledName}
                            </span>

                            <span
                                className="block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide mt-2 md:mt-3 uppercase"
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: "#e0e0e0",
                                    textShadow: "2px 2px 0px #000000"
                                }}
                            >
                                {scrambledSurname}
                            </span>
                        </motion.h1>

                        {/* Role */}
                        <motion.div variants={snapVariants} className="mb-6 md:mb-8">
                            <h2
                                className="terminal-text text-sm sm:text-base md:text-lg lg:text-xl tracking-wider md:tracking-widest"
                                style={{
                                    color: "#FF0055",
                                    textShadow: "0 0 8px rgba(255,0,85,0.6), 2px 2px 0px #000"
                                }}
                            >
                                {scrambledTitle}
                                <span className="cursor-blink" />
                            </h2>
                        </motion.div>

                        {/* Bio Block */}
                        <motion.div
                            variants={snapVariants}
                            className="relative bg-[#0a0a0a]/95 border-l-4 border-neon-cyan p-4 md:p-6 font-mono text-xs sm:text-sm text-left"
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
                                boxShadow: "6px 6px 0px rgba(0,255,255,0.2)"
                            }}
                        >
                            <div className="text-neon-cyan mb-2 md:mb-3 font-bold text-xs md:text-sm">$ whoami</div>
                            <p className="text-gray-200 leading-relaxed text-xs sm:text-sm">
                                Passionate about building secure, scalable infrastructure.
                                Specializing in <span className="text-neon-yellow font-bold">penetration testing</span>,
                                <span className="text-neon-cyan font-bold"> container orchestration</span>, and
                                <span className="text-neon-green font-bold"> automation pipelines</span>.
                            </p>
                            <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs">
                                <span className="text-neon-green font-bold">[STATUS: ACTIVE]</span>
                                <span className="text-gray-600 hidden sm:inline">|</span>
                                <span className="text-gray-300">Based in Indonesia</span>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div variants={snapVariants} className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4">
                            <a
                                href="#experience"
                                className="px-6 md:px-8 py-3 md:py-4 bg-neon-cyan text-black font-black uppercase tracking-wider text-xs md:text-sm transition-all duration-200 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] text-center"
                                style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}
                            >
                                VIEW_LOGS
                            </a>
                            <a
                                href="mailto:rafli.santosa28@gmail.com"
                                className="px-6 md:px-8 py-3 md:py-4 border-2 border-neon-red bg-transparent text-neon-red font-black uppercase tracking-wider text-xs md:text-sm transition-all duration-200 hover:bg-neon-red hover:text-black text-center"
                                style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}
                            >
                                CONTACT_ME
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        style={{ y: imageY }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                        className="order-1 lg:order-2 relative z-40"
                    >
                        {/* Speed Lines - Hidden on mobile */}
                        <div className="absolute inset-0 -z-10 items-center justify-center hidden md:flex">
                            <div className="speed-lines" />
                        </div>

                        {/* Hero Image Container */}
                        <div className="relative mx-auto max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg">
                            {/* Red accent shape */}
                            <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full bg-neon-red/20 -z-10"
                                style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 20%)" }} />

                            <div className="relative aspect-[3/4] overflow-hidden border-2 border-neon-cyan/30">
                                <Image
                                    src="/hero-syaz.png"
                                    alt="Syahrindra Rafli Santosa"
                                    fill
                                    className="object-cover object-top"
                                    style={{
                                        filter: "drop-shadow(0 0 30px rgba(0,0,0,0.8))"
                                    }}
                                    priority
                                />
                            </div>

                            {/* Overlapping Name */}
                            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 z-20">
                                <span
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter"
                                    style={{
                                        fontFamily: "Impact, 'Arial Black', sans-serif",
                                        color: "#ffffff",
                                        WebkitTextStroke: "1px #FF0055",
                                        textShadow: "3px 3px 0px #000000"
                                    }}
                                >
                                    SYAZ
                                </span>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-neon-red px-3 md:px-5 py-1.5 md:py-2 text-black text-[10px] md:text-xs font-black tracking-wider z-30"
                                style={{
                                    clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                                    boxShadow: "2px 2px 0px #000"
                                }}
                            >
                                AUTHENTICATED
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator - Smaller on mobile */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                >
                    <span className="terminal-text text-neon-cyan text-[10px] md:text-xs tracking-widest">SCROLL</span>
                    <div className="w-px h-8 md:h-12 bg-gradient-to-b from-neon-cyan to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}
