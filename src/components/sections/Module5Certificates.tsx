"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════
// IMMUTABLE DATA SOURCE
// ═══════════════════════════════════════════════════════════════════════
const LEGENDARY_ITEM = {
    id: "GOV_AWARD_2025",
    title: "GOVERNMENT-RECOGNIZED SECURITY RESEARCHER",
    subtitle: "Certificate of Appreciation from Surakarta City Government (2025)",
    description: "Awarded for the responsible disclosure of a Critical Information Disclosure vulnerability affecting the Surakarta City Government's digital infrastructure. Successfully identified and reported a sensitive data leak (PII) involving citizen records, ensuring compliance with data privacy regulations.",
    issuer: "GOV_SURAKARTA",
    tier: "LEGENDARY",
    image: "/certificates/surakarta-award.jpeg",
    stats: ["CRITICAL_VULN_PATCHED", "PII_SECURED", "ETHICAL_DISCLOSURE"]
};

const CERTIFICATE_DATABASE = [
    { id: "C01", title: "Cisco CCNA", issuer: "Cisco Networking Academy", type: "NETWORKING", rarity: "EPIC" },
    { id: "C02", title: "Introduction to Microsoft 365 Copilot", issuer: "Microsoft", type: "AI", rarity: "RARE" },
    { id: "C03", title: "Introduction to Generative AI", issuer: "Microsoft", type: "AI", rarity: "RARE" },
    { id: "C04", title: "Get Started Building with Power BI", issuer: "Microsoft", type: "DATA", rarity: "RARE" },
    { id: "C05", title: "Explore Generative AI", issuer: "Microsoft", type: "AI", rarity: "RARE" },
    { id: "C06", title: "AI Basics: Overview of AI", issuer: "Huawei", type: "AI", rarity: "RARE" },
    { id: "C07", title: "HCIA-AI V3.5", issuer: "Huawei", type: "AI", rarity: "EPIC" },
    { id: "C08", title: "Overview of AI", issuer: "Huawei", type: "AI", rarity: "RARE" },
    { id: "C09", title: "Cyber Security Fundamental", issuer: "RWID (Udemy)", type: "SECURITY", rarity: "RARE" },
    { id: "C10", title: "Certified Cybersecurity Educator Professional (CCEP)", issuer: "CCEP", type: "SECURITY", rarity: "EPIC" },
    { id: "C11", title: "Overview of IoT Technologies (CRA)", issuer: "Huawei", type: "IOT", rarity: "RARE" },
    { id: "C12", title: "HCIA-IoT V3.0 Course", issuer: "Huawei", type: "IOT", rarity: "EPIC" },
    { id: "C13", title: "HCIA-Security V4.0 Course", issuer: "Huawei", type: "SECURITY", rarity: "EPIC" },
    { id: "C14", title: "Internet of Things Technology & Applications", issuer: "Huawei", type: "IOT", rarity: "RARE" },
    { id: "C15", title: "Overview of IoT Technologies", issuer: "Huawei", type: "IOT", rarity: "RARE" }
];

// ═══════════════════════════════════════════════════════════════════════
// TYPE COLORS & RARITY CONFIG
// ═══════════════════════════════════════════════════════════════════════
const TYPE_COLORS: Record<string, { border: string; glow: string; text: string }> = {
    AI: { border: "#00FFFF", glow: "rgba(0, 255, 255, 0.4)", text: "text-neon-cyan" },
    SECURITY: { border: "#FF0055", glow: "rgba(255, 0, 85, 0.4)", text: "text-neon-red" },
    NETWORKING: { border: "#FFD700", glow: "rgba(255, 215, 0, 0.4)", text: "text-neon-yellow" },
    IOT: { border: "#39FF14", glow: "rgba(57, 255, 20, 0.4)", text: "text-neon-green" },
    DATA: { border: "#9B59B6", glow: "rgba(155, 89, 182, 0.4)", text: "text-purple-400" },
};

const RARITY_STYLES: Record<string, { bg: string; badge: string }> = {
    EPIC: { bg: "bg-purple-900/20", badge: "bg-purple-500/30 border-purple-500 text-purple-300" },
    RARE: { bg: "bg-cyan-900/10", badge: "bg-cyan-500/20 border-cyan-500 text-cyan-300" },
};

// ═══════════════════════════════════════════════════════════════════════
// GLITCH TEXT COMPONENT
// ═══════════════════════════════════════════════════════════════════════
const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEF";

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
    const [displayText, setDisplayText] = useState(text);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated) return;

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text.split("").map((char, index) => {
                    if (char === " ") return " ";
                    if (index < iteration) return text[index];
                    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                }).join("")
            );

            iteration += 0.5;
            if (iteration >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
                setHasAnimated(true);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [text, hasAnimated]);

    return <span className={className}>{displayText}</span>;
}

// ═══════════════════════════════════════════════════════════════════════
// SCANNING LINE COMPONENT
// ═══════════════════════════════════════════════════════════════════════
function ScanningLine() {
    return (
        <motion.div
            className="h-0.5 w-full"
            style={{
                background: "linear-gradient(90deg, transparent 0%, #00FFFF 20%, #00FFFF 80%, transparent 100%)",
                boxShadow: "0 0 15px #00FFFF, 0 0 30px #00FFFF",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
    );
}

// ═══════════════════════════════════════════════════════════════════════
// LEGENDARY CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════
function LegendaryCard() {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ type: "spring" as const, stiffness: 100, damping: 20, delay: 0.2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative mb-12 md:mb-16"
        >
            {/* Legendary Border Glow */}
            <motion.div
                className="absolute -inset-1 rounded-lg opacity-75"
                style={{
                    background: "linear-gradient(135deg, #FFD700 0%, #FF0055 50%, #FFD700 100%)",
                    filter: "blur(8px)",
                }}
                animate={{
                    opacity: isHovered ? [0.6, 1, 0.6] : 0.4,
                    scale: isHovered ? [1, 1.02, 1] : 1,
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Main Card Container */}
            <div
                className="relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #0a0a0a 0%, #151515 100%)",
                    clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))",
                    border: "2px solid",
                    borderImage: "linear-gradient(135deg, #FFD700, #FF0055) 1",
                }}
            >
                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-neon-yellow" style={{ transform: "translate(1px, -1px)" }} />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-neon-red" style={{ transform: "translate(-1px, 1px)" }} />

                {/* Grid Layout - Stacks on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 p-4 sm:p-6 md:p-8">
                    {/* Text Content - 60% on desktop, full on mobile */}
                    <div className="md:col-span-3 flex flex-col justify-center order-2 md:order-1">
                        {/* Tier Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-3 py-1 mb-4 w-fit"
                            style={{
                                background: "linear-gradient(90deg, rgba(255,215,0,0.2), rgba(255,0,85,0.2))",
                                border: "1px solid #FFD700",
                                clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                            }}
                            animate={{ boxShadow: isHovered ? "0 0 20px rgba(255,215,0,0.5)" : "0 0 10px rgba(255,215,0,0.2)" }}
                        >
                            <span className="w-2 h-2 rounded-full bg-neon-yellow animate-pulse" />
                            <span className="text-neon-yellow font-mono text-xs font-bold tracking-widest">
                                CONFIDENTIAL // DECLASSIFIED
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                            className="text-2xl md:text-3xl lg:text-4xl font-black uppercase mb-3 leading-tight"
                            style={{
                                fontFamily: "Impact, 'Arial Black', sans-serif",
                                color: "#FFD700",
                                textShadow: "2px 2px 0px #000, 0 0 20px rgba(255,215,0,0.4)",
                            }}
                            animate={isHovered ? { x: [-1, 1, -1, 0] } : {}}
                            transition={{ duration: 0.2, repeat: isHovered ? Infinity : 0 }}
                        >
                            {LEGENDARY_ITEM.title}
                        </motion.h3>

                        {/* Subtitle */}
                        <p className="text-gray-300 font-mono text-sm md:text-base mb-4">
                            {LEGENDARY_ITEM.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                            {LEGENDARY_ITEM.description}
                        </p>

                        {/* Stats Tags */}
                        <div className="flex flex-wrap gap-2">
                            {LEGENDARY_ITEM.stats.map((stat, i) => (
                                <motion.span
                                    key={stat}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="px-3 py-1 font-mono text-[10px] md:text-xs font-bold tracking-wider"
                                    style={{
                                        background: "rgba(255,0,85,0.15)",
                                        border: "1px solid #FF0055",
                                        color: "#FF0055",
                                    }}
                                >
                                    +{stat}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Holographic Image - 40% on desktop, full on mobile */}
                    <div className="md:col-span-2 relative order-1 md:order-2">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            {/* Grid Pattern Overlay */}
                            <div
                                className="absolute inset-0 z-10 pointer-events-none opacity-30"
                                style={{
                                    backgroundImage: "linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                }}
                            />

                            {/* Scanning Light Effect */}
                            {isHovered && (
                                <motion.div
                                    className="absolute inset-0 z-20 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(180deg, transparent 0%, rgba(255,215,0,0.3) 50%, transparent 100%)",
                                        height: "30%",
                                    }}
                                    initial={{ y: "-100%" }}
                                    animate={{ y: "400%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            )}

                            {/* Chromatic Aberration Layers (Hover) */}
                            {isHovered && (
                                <>
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ mixBlendMode: "screen" }}
                                        animate={{ x: [-3, 3, -2, 3, -3] }}
                                        transition={{ duration: 0.15, repeat: Infinity }}
                                    >
                                        <Image
                                            src={LEGENDARY_ITEM.image}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            style={{ filter: "grayscale(1) brightness(1.5) sepia(1) hue-rotate(-50deg) saturate(6) opacity(0.5)" }}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ mixBlendMode: "screen" }}
                                        animate={{ x: [3, -3, 2, -3, 3] }}
                                        transition={{ duration: 0.15, repeat: Infinity }}
                                    >
                                        <Image
                                            src={LEGENDARY_ITEM.image}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            style={{ filter: "grayscale(1) brightness(1.5) sepia(1) hue-rotate(180deg) saturate(6) opacity(0.5)" }}
                                        />
                                    </motion.div>
                                </>
                            )}

                            {/* Main Image */}
                            <Image
                                src={LEGENDARY_ITEM.image}
                                alt={LEGENDARY_ITEM.title}
                                fill
                                className="object-cover transition-all duration-500"
                                style={{
                                    filter: isHovered
                                        ? "none"
                                        : "grayscale(100%) sepia(100%) hue-rotate(180deg) opacity(0.8)",
                                }}
                            />

                            {/* CRT Scanlines */}
                            <div
                                className="absolute inset-0 z-30 pointer-events-none opacity-20"
                                style={{
                                    background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                                }}
                            />
                        </div>

                        {/* ID Badge */}
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 border border-neon-yellow font-mono text-[10px] text-neon-yellow">
                            ID: {LEGENDARY_ITEM.id}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// CERTIFICATE CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════
interface CertCardProps {
    cert: typeof CERTIFICATE_DATABASE[0];
    index: number;
}

function CertificateCard({ cert, index }: CertCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [floatOffset, setFloatOffset] = useState(0);
    const typeColor = TYPE_COLORS[cert.type] || TYPE_COLORS.AI;
    const rarityStyle = RARITY_STYLES[cert.rarity] || RARITY_STYLES.RARE;

    // Random float effect
    useEffect(() => {
        const randomDelay = Math.random() * 2;
        const interval = setInterval(() => {
            setFloatOffset(Math.sin((Date.now() / 1000 + randomDelay) * 2) * 3);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring" as const, stiffness: 150, damping: 20, delay: index * 0.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ transform: `translateY(${floatOffset}px)` }}
            className="relative group"
        >
            {/* Glow Effect */}
            <motion.div
                className="absolute -inset-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: typeColor.border,
                    filter: "blur(10px)",
                }}
            />

            {/* Card Container */}
            <div
                className={`relative overflow-hidden ${rarityStyle.bg}`}
                style={{
                    background: "linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.95) 100%)",
                    clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
                    boxShadow: isHovered ? `0 0 30px ${typeColor.glow}` : "2px 2px 0px #000",
                    transition: "box-shadow 0.2s ease",
                }}
            >
                {/* Circuit Line (Left Edge) */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ background: typeColor.border }}
                />

                {/* Content */}
                <div className="p-4 pl-5">
                    {/* Type & Rarity Row */}
                    <div className="flex items-center justify-between mb-3">
                        <span
                            className={`px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider ${typeColor.text}`}
                            style={{ border: `1px solid ${typeColor.border}`, background: `${typeColor.border}15` }}
                        >
                            [{cert.type}]
                        </span>
                        <span className={`px-2 py-0.5 text-[9px] font-mono font-bold border ${rarityStyle.badge}`}>
                            {cert.rarity}
                        </span>
                    </div>

                    {/* Title */}
                    <motion.h4
                        className="text-white font-bold text-sm md:text-base mb-2 leading-tight"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        animate={isHovered ? { x: [-0.5, 0.5, -0.5, 0] } : {}}
                        transition={{ duration: 0.15, repeat: isHovered ? Infinity : 0 }}
                    >
                        {cert.title}
                    </motion.h4>

                    {/* Issuer */}
                    <p className="font-mono text-[11px] text-gray-500 truncate">
                        {cert.issuer}
                    </p>

                    {/* ID */}
                    <div className="mt-3 pt-2 border-t border-gray-800">
                        <span className="font-mono text-[9px] text-gray-600">
                            SYS.ID: {cert.id}
                        </span>
                    </div>
                </div>

                {/* Corner Brackets */}
                <div className="absolute top-0 right-0 w-4 h-4 border-r border-t opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: typeColor.border }} />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: typeColor.border }} />
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════
export default function Module5Certificates() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section ref={sectionRef} id="certificates" className="relative py-16 md:py-24 px-4 sm:px-6">
            {/* Section Header */}
            <div className="container mx-auto max-w-6xl mb-10 md:mb-16">
                {/* Module Tag */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
                >
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-yellow to-transparent" />
                    <span className="terminal-text text-neon-yellow text-[10px] md:text-xs tracking-widest">[MODULE.05]</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-neon-yellow to-transparent" />
                </motion.div>

                {/* Title with Glitch Effect */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ type: "spring" as const, stiffness: 150, damping: 15, delay: 0.1 }}
                    className="text-center mb-4"
                >
                    <span
                        className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase"
                        style={{
                            fontFamily: "Impact, 'Arial Black', sans-serif",
                            color: "#ffffff",
                            WebkitTextStroke: "1px #FFD700",
                            textShadow: "3px 3px 0px #000, 0 0 20px rgba(255,215,0,0.4)"
                        }}
                    >
                        <GlitchText text="NEURAL" />{" "}
                        <span style={{ WebkitTextStroke: "1px #FF0055", textShadow: "3px 3px 0px #000, 0 0 20px rgba(255,0,85,0.4)" }}>
                            <GlitchText text="ARCHIVE" />
                        </span>
                    </span>
                    <span
                        className="block text-lg sm:text-xl md:text-2xl font-bold mt-2 tracking-widest"
                        style={{
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        <span style={{ color: "#00FFFF", textShadow: "2px 2px 0px #000, 0 0 10px rgba(0,255,255,0.4)" }}>
                            <GlitchText text="HALL OF" />
                        </span>{" "}
                        <span style={{ color: "#39FF14", textShadow: "2px 2px 0px #000, 0 0 10px rgba(57,255,20,0.4)" }}>
                            <GlitchText text="RECORDS" />
                        </span>
                    </span>
                </motion.h2>

                {/* Scanning Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                    className="overflow-hidden max-w-md mx-auto"
                >
                    <ScanningLine />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="terminal-text text-gray-400 text-center mt-4 text-xs md:text-sm"
                >
                    &gt; ACCESSING_ENCRYPTED_ARCHIVES // CREDENTIALS_VERIFIED
                </motion.p>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-6xl">
                {/* LEGENDARY CARD */}
                <LegendaryCard />

                {/* Certificate Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Grid Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px flex-1 bg-gray-800" />
                        <span className="terminal-text text-gray-500 text-[10px] tracking-widest">
                            [{CERTIFICATE_DATABASE.length} RECORDS FOUND]
                        </span>
                        <div className="h-px flex-1 bg-gray-800" />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {CERTIFICATE_DATABASE.map((cert, index) => (
                            <CertificateCard key={cert.id} cert={cert} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* Footer Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 md:mt-16"
                >
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] md:text-xs font-mono">
                        <span className="text-gray-400">AI: <span className="text-neon-cyan font-bold">{CERTIFICATE_DATABASE.filter(c => c.type === "AI").length}</span></span>
                        <span className="text-gray-600">|</span>
                        <span className="text-gray-400">SECURITY: <span className="text-neon-red font-bold">{CERTIFICATE_DATABASE.filter(c => c.type === "SECURITY").length}</span></span>
                        <span className="text-gray-600">|</span>
                        <span className="text-gray-400">IOT: <span className="text-neon-green font-bold">{CERTIFICATE_DATABASE.filter(c => c.type === "IOT").length}</span></span>
                        <span className="text-gray-600">|</span>
                        <span className="text-gray-400">TOTAL: <span className="text-white font-bold">{CERTIFICATE_DATABASE.length + 1}</span></span>
                    </div>
                </motion.div>
            </div>

            {/* Slash Divider Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12 md:h-20 bg-gradient-to-r from-neon-yellow/5 via-neon-cyan/10 to-neon-yellow/5 -skew-y-1 origin-left" />
            <div className="absolute bottom-2 md:bottom-3 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-neon-yellow via-neon-cyan to-neon-yellow -skew-y-1 origin-left"
                style={{ boxShadow: "0 0 20px rgba(250,204,21,0.5), 0 0 40px rgba(0,255,255,0.3)" }} />
        </section>
    );
}
