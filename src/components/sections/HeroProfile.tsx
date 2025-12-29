"use client";

import { useScramble } from "@/hooks/useScramble";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";

// ============================================
// GEOMETRIC BURST SHARDS (Like To Be Hero X)
// ============================================
const GeometricBurst = () => {
    const shards = useMemo(() => [
        { rotate: -25, x: -180, y: -80, width: 120, height: 200, color: "#FF0055", delay: 0 },
        { rotate: 35, x: 200, y: -60, width: 80, height: 180, color: "#00FFFF", delay: 0.1 },
        { rotate: -45, x: -220, y: 100, width: 60, height: 160, color: "#FFD700", delay: 0.2 },
        { rotate: 55, x: 180, y: 120, width: 100, height: 140, color: "#00FF00", delay: 0.15 },
        { rotate: 15, x: -100, y: -160, width: 50, height: 120, color: "#FF0055", delay: 0.25 },
        { rotate: -60, x: 120, y: -140, width: 70, height: 100, color: "#00FFFF", delay: 0.3 },
        { rotate: 70, x: -150, y: 180, width: 40, height: 90, color: "#FFD700", delay: 0.1 },
        { rotate: -30, x: 250, y: 50, width: 90, height: 130, color: "#00FF00", delay: 0.2 },
    ], []);

    return (
        <div className="absolute inset-0 pointer-events-none z-5 hidden md:block">
            {shards.map((shard, i) => (
                <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    style={{
                        width: shard.width,
                        height: shard.height,
                        background: `linear-gradient(${shard.rotate}deg, ${shard.color}40, transparent)`,
                        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                        transform: `translate(${shard.x}px, ${shard.y}px) rotate(${shard.rotate}deg)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: 1 }}
                    transition={{
                        opacity: { duration: 2, repeat: Infinity, delay: shard.delay },
                        scale: { duration: 0.5, delay: shard.delay },
                    }}
                />
            ))}
        </div>
    );
};

// ============================================
// DIGITAL PARTICLES (Rising Energy)
// ============================================
const DigitalParticles = () => {
    const particles = useMemo(() =>
        Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 4,
            duration: 3 + Math.random() * 3,
            size: 2 + Math.random() * 6,
            color: ["#00FFFF", "#FF0055", "#FFD700", "#00FF00"][i % 4],
        })),
        []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        bottom: "-20px",
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                    }}
                    animate={{
                        y: [0, -500],
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 180],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
};

// ============================================
// ROTATING TECH RING COMPONENT
// ============================================
interface TechRingProps {
    size: number;
    thickness: number;
    color: string;
    dashArray?: string;
    rotationDuration: number;
    direction: 1 | -1;
    segments?: number;
}

const TechRing = ({ size, thickness, color, dashArray, rotationDuration, direction, segments }: TechRingProps) => {
    const circumference = 2 * Math.PI * (size / 2 - thickness);

    return (
        <motion.svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            width={size}
            height={size}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
            animate={{ rotate: direction > 0 ? [0, 360] : [360, 0] }}
            transition={{ duration: rotationDuration, repeat: Infinity, ease: "linear" }}
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={size / 2 - thickness}
                fill="none"
                stroke={color}
                strokeWidth={thickness}
                strokeDasharray={dashArray || (segments ? `${circumference / segments} ${circumference / segments / 2}` : undefined)}
                opacity={0.8}
            />
        </motion.svg>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function HeroProfile() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Scroll-based parallax
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Mouse position for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for background text inverse parallax
    const springConfig = { damping: 30, stiffness: 100 };
    const bgTextX = useSpring(useTransform(mouseX, [-500, 500], [40, -40]), springConfig);
    const bgTextY = useSpring(useTransform(mouseY, [-500, 500], [25, -25]), springConfig);

    // Scroll-based transforms
    const bgTextRotate = useTransform(scrollYProgress, [0, 1], [-5, 10]);
    const scrollBgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 40]);

    // Mouse tracking handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - (rect.left + rect.width / 2));
            mouseY.set(e.clientY - (rect.top + rect.height / 2));
        }
    }, [mouseX, mouseY]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    // Scramble text hooks
    const { displayText: scrambledName } = useScramble("SYAHRINDRA", {
        speed: 50, scramble: 6, step: 2, overflow: true,
    });
    const { displayText: scrambledSurname } = useScramble("RAFLI SANTOSA", {
        speed: 40, scramble: 4, step: 1,
    });
    const { displayText: scrambledTitle } = useScramble("CYBER SECURITY | DEVOPS ENGINEER | WEB DEVELOPER", {
        speed: 35, scramble: 4, step: 1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
    };

    const snapVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } }
    };

    return (
        <section ref={containerRef} className="relative min-h-screen overflow-hidden">
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            {/* LAYER 0: MASSIVE BACKGROUND TYPOGRAPHY (To Be Hero X Style) */}
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            <motion.div
                style={{ x: bgTextX, y: scrollBgY, rotate: bgTextRotate }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
            >
                {/* Primary Giant Text - "SYAZ" - Magenta Outline Style */}
                <motion.div
                    className="absolute hidden md:flex items-center justify-center"
                    style={{ x: bgTextX, y: bgTextY }}
                >
                    <span
                        className="text-[35vw] font-black tracking-tighter leading-none"
                        style={{
                            fontFamily: "Impact, 'Arial Black', sans-serif",
                            color: "transparent",
                            WebkitTextStroke: "3px rgba(255, 0, 85, 0.25)",
                            textShadow: "0 0 60px rgba(255, 0, 85, 0.15)",
                            transform: "rotate(-8deg) translateY(-5%)",
                        }}
                    >
                        SYAZ
                    </span>
                </motion.div>

                {/* Secondary Text - Japanese Style Accent */}
                <motion.span
                    className="absolute text-[20vw] font-black opacity-[0.06] hidden lg:block"
                    style={{
                        fontFamily: "'Noto Sans JP', Impact, sans-serif",
                        WebkitTextStroke: "2px rgba(0, 255, 255, 0.3)",
                        color: "transparent",
                        transform: "rotate(12deg) translateX(20%) translateY(-30%)",
                        x: bgTextX,
                        y: bgTextY,
                    } as React.CSSProperties}
                >
                    ヒーロー
                </motion.span>

                {/* Tertiary Accent - "PROTOCOL" */}
                <motion.span
                    className="absolute text-[12vw] font-black opacity-[0.04] hidden lg:block"
                    style={{
                        fontFamily: "Impact, 'Arial Black', sans-serif",
                        WebkitTextStroke: "1px rgba(255, 215, 0, 0.2)",
                        color: "transparent",
                        transform: "rotate(-3deg) translateY(40%)",
                        letterSpacing: "0.2em",
                        x: bgTextX,
                        y: bgTextY,
                    } as React.CSSProperties}
                >
                    PROTOCOL
                </motion.span>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════════════ */}
            {/* LAYER 1: HALFTONE DOT PATTERN (Like Reference) */}
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.08] z-[1]"
                style={{
                    backgroundImage: `radial-gradient(circle, #FF0055 1.5px, transparent 1.5px)`,
                    backgroundSize: "12px 12px",
                    maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 70%)",
                }}
            />

            {/* Geometric Burst Shards */}
            <GeometricBurst />

            {/* Caution Tape Decorations */}
            <div className="hidden md:block absolute top-20 -left-20 w-[400px] h-8 -rotate-12 overflow-hidden opacity-50 z-10">
                <div className="caution-tape" />
            </div>
            <div className="hidden md:block absolute bottom-40 -right-20 w-[350px] h-8 rotate-12 overflow-hidden opacity-30 z-10">
                <div className="caution-tape" />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════════ */}
            {/* MAIN CONTENT GRID */}
            {/* ═══════════════════════════════════════════════════════════════════════ */}
            <div className="relative z-50 container mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-20 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">

                    {/* ═══ TEXT CONTENT SIDE ═══ */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="order-2 lg:order-1 text-center lg:text-left"
                    >
                        <motion.div variants={snapVariants} className="mb-3 md:mb-4">
                            <span className="terminal-text text-neon-cyan/80 text-[10px] md:text-xs">
                                [SYS.INIT] &gt; LOADING_PROFILE...
                            </span>
                        </motion.div>

                        <motion.h1 variants={snapVariants} className="mb-3 md:mb-4 leading-[0.9]">
                            <span
                                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight uppercase"
                                style={{
                                    fontFamily: "Impact, 'Arial Black', sans-serif",
                                    color: "#ffffff",
                                    WebkitTextStroke: "1px #00FFFF",
                                    textShadow: "3px 3px 0px #000, 4px 4px 0px rgba(0,255,255,0.3)",
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
                                    textShadow: "2px 2px 0px #000"
                                }}
                            >
                                {scrambledSurname}
                            </span>
                        </motion.h1>

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
                                Informatics Engineering student specializing in <span className="text-neon-cyan font-bold">Cyber Security</span>,
                                <span className="text-neon-yellow font-bold"> Network Infrastructure</span>, and
                                <span className="text-neon-green font-bold"> DevOps Automation</span>. Actively honing skills through CTF competitions
                                and organizational leadership. Dedicated to mastering digital threat landscapes and building secure, resilient deployment pipelines.
                            </p>
                            <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs">
                                <span className="text-neon-green font-bold">[STATUS: ACTIVE]</span>
                                <span className="text-gray-600 hidden sm:inline">|</span>
                                <span className="text-gray-300">Based in Indonesia</span>
                            </div>
                        </motion.div>

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

                    {/* ═══════════════════════════════════════════════════════════════════════ */}
                    {/* HERO IMAGE WITH TECH MACHINERY FRAME */}
                    {/* ═══════════════════════════════════════════════════════════════════════ */}
                    <motion.div
                        style={{ y: imageY }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.3 }}
                        className="order-1 lg:order-2 relative z-40"
                    >
                        <div
                            className="relative mx-auto w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {/* ═══ ROTATING TECH RINGS ═══ */}
                            {isMounted && (
                                <>
                                    {/* Ring 1: Inner - Cyan Dashed */}
                                    <TechRing
                                        size={280}
                                        thickness={2}
                                        color="#00FFFF"
                                        dashArray="15 8"
                                        rotationDuration={20}
                                        direction={1}
                                    />

                                    {/* Ring 2: Middle - Magenta Segmented */}
                                    <TechRing
                                        size={340}
                                        thickness={4}
                                        color="#FF0055"
                                        rotationDuration={15}
                                        direction={-1}
                                        segments={8}
                                    />

                                    {/* Ring 3: Outer - Yellow Thin Dashed */}
                                    <TechRing
                                        size={400}
                                        thickness={1}
                                        color="#FFD700"
                                        dashArray="5 15"
                                        rotationDuration={25}
                                        direction={1}
                                    />

                                    {/* Ring 4: Outermost - White Accents */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-white/20"
                                        animate={{ rotate: [0, 360], scale: [1, 1.02, 1] }}
                                        transition={{
                                            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        style={{ boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
                                    >
                                        {/* Corner Tech Brackets */}
                                        {[0, 90, 180, 270].map((deg) => (
                                            <div
                                                key={deg}
                                                className="absolute w-6 h-6"
                                                style={{
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: `rotate(${deg}deg) translateY(-220px) rotate(-${deg}deg)`,
                                                }}
                                            >
                                                <div className="w-full h-full border-t-2 border-l-2 border-white/50" />
                                            </div>
                                        ))}
                                    </motion.div>
                                </>
                            )}

                            {/* Rising Digital Particles */}
                            <DigitalParticles />

                            {/* ═══ MAIN IMAGE CONTAINER ═══ */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden"
                                style={{
                                    boxShadow: "0 0 40px rgba(0,255,255,0.3), 0 0 80px rgba(255,0,85,0.2)",
                                }}
                            >
                                {/* CRT Scanline Overlay (Permanent) */}
                                <div
                                    className="absolute inset-0 z-30 pointer-events-none"
                                    style={{
                                        background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                                    }}
                                />

                                {/* Vignette Effect */}
                                <div
                                    className="absolute inset-0 z-20 pointer-events-none rounded-full"
                                    style={{
                                        background: "radial-gradient(circle, transparent 50%, rgba(0,0,0,0.6) 100%)",
                                    }}
                                />

                                {/* ═══ CHROMATIC ABERRATION LAYERS ═══ */}
                                <motion.div
                                    className="relative w-full h-full"
                                    animate={isHovering ? { x: [0, -3, 3, -2, 2, 0], y: [0, 2, -2, 1, -1, 0] } : {}}
                                    transition={{ duration: 0.15, repeat: isHovering ? Infinity : 0 }}
                                >
                                    {/* RED CHANNEL (offset left) */}
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={isHovering ? { x: [-4, 4, -3, 5, -4], opacity: 0.6 } : { x: 0, opacity: 0 }}
                                        transition={{ duration: 0.1, repeat: isHovering ? Infinity : 0 }}
                                        style={{ mixBlendMode: "screen" }}
                                    >
                                        <Image
                                            src="/hero-syaz.png"
                                            alt=""
                                            fill
                                            className="object-cover object-top"
                                            style={{ filter: "grayscale(1) brightness(1.5) sepia(1) hue-rotate(-50deg) saturate(6)" }}
                                        />
                                    </motion.div>

                                    {/* BLUE/CYAN CHANNEL (offset right) */}
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={isHovering ? { x: [4, -4, 3, -5, 4], opacity: 0.6 } : { x: 0, opacity: 0 }}
                                        transition={{ duration: 0.1, repeat: isHovering ? Infinity : 0 }}
                                        style={{ mixBlendMode: "screen" }}
                                    >
                                        <Image
                                            src="/hero-syaz.png"
                                            alt=""
                                            fill
                                            className="object-cover object-top"
                                            style={{ filter: "grayscale(1) brightness(1.5) sepia(1) hue-rotate(180deg) saturate(6)" }}
                                        />
                                    </motion.div>

                                    {/* MAIN IMAGE */}
                                    <Image
                                        src="/hero-syaz.png"
                                        alt="Syahrindra Rafli Santosa"
                                        fill
                                        className="object-cover object-top z-10"
                                        priority
                                    />
                                </motion.div>
                            </div>

                            {/* ═══ OVERLAPPING "SYAZ" TEXT ═══ */}
                            <motion.div
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-50"
                                animate={isHovering ? {
                                    textShadow: [
                                        "4px 4px 0px #000, 0 0 20px #FF0055",
                                        "4px 4px 0px #000, 0 0 50px #FF0055, 0 0 80px #FF0055",
                                        "4px 4px 0px #000, 0 0 20px #FF0055",
                                    ],
                                    x: [-2, 2, -1, 1, 0],
                                } : {}}
                                transition={{ duration: 0.3, repeat: isHovering ? Infinity : 0 }}
                            >
                                <span
                                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter"
                                    style={{
                                        fontFamily: "Impact, 'Arial Black', sans-serif",
                                        color: "#fff",
                                        WebkitTextStroke: "2px #FF0055",
                                        textShadow: "4px 4px 0px #000, 0 0 20px rgba(255,0,85,0.5)"
                                    }}
                                >
                                    SYAZ
                                </span>
                            </motion.div>

                            {/* Floating Status Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0], rotate: [0, 2, 0, -2, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 right-4 md:-top-6 md:right-8 bg-neon-red px-4 md:px-6 py-2 md:py-2.5 text-black text-[10px] md:text-xs font-black tracking-wider z-50"
                                style={{
                                    clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
                                    boxShadow: "3px 3px 0px #000, 0 0 25px rgba(255,0,85,0.6)"
                                }}
                            >
                                AUTHENTICATED
                            </motion.div>

                            {/* Online Status Indicator */}
                            <motion.div
                                className="absolute left-0 top-1/2 -translate-y-1/2 md:-left-4"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-neon-green"
                                        animate={{ scale: [1, 1.4, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        style={{ boxShadow: "0 0 15px #00FF00, 0 0 30px #00FF00" }}
                                    />
                                    <span className="text-[10px] md:text-xs font-mono text-neon-green hidden md:block font-bold tracking-wider">
                                        ONLINE
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                >
                    <span className="terminal-text text-neon-cyan text-[10px] md:text-xs tracking-widest font-bold">SCROLL</span>
                    <div className="w-px h-10 md:h-14 bg-gradient-to-b from-neon-cyan to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}
