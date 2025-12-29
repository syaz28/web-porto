"use client";

import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ExperienceEntry {
    id: string;
    role: string;
    organization: string;
    period: string;
    status: "RUNNING" | "ACTIVE" | "COMPLETED" | "AWARD";
    type: "WORK" | "ORG" | "EVENT" | "CTF";
}

// REAL CV DATA with CTF Competitions
const EXPERIENCE_DATA: ExperienceEntry[] = [
    {
        id: "WRK_001",
        role: "DevOps Intern",
        organization: "PT Wiyora",
        period: "Oct 2025 - Jan 2026",
        status: "RUNNING",
        type: "WORK",
    },
    {
        id: "WRK_002",
        role: "Bug Hunter",
        organization: "Independent Project",
        period: "Nov 2023 - Present",
        status: "ACTIVE",
        type: "WORK",
    },
    {
        id: "ORG_001",
        role: "Cyber Security Staff",
        organization: "UKM RIPTEK",
        period: "Jan 2025 - Dec 2025",
        status: "ACTIVE",
        type: "ORG",
    },
    {
        id: "ORG_002",
        role: "Daily Administrator",
        organization: "The Bus Factor Is 1 - UNNES",
        period: "Nov 2025 - Present",
        status: "ACTIVE",
        type: "ORG",
    },
    {
        id: "ORG_003",
        role: "UI/UX Division",
        organization: "Technoday 2025",
        period: "Sep 2025",
        status: "COMPLETED",
        type: "EVENT",
    },
    {
        id: "ORG_004",
        role: "Technical Committee",
        organization: "Genius Talk Series",
        period: "May 2024",
        status: "COMPLETED",
        type: "EVENT",
    },
    {
        id: "CTF_001",
        role: "CTF Participant",
        organization: "Hology 7.0 CTF - UB",
        period: "2024",
        status: "AWARD",
        type: "CTF",
    },
    {
        id: "CTF_002",
        role: "CTF Participant",
        organization: "COMPFEST - UI",
        period: "2024",
        status: "AWARD",
        type: "CTF",
    },
    {
        id: "CTF_003",
        role: "CTF Participant",
        organization: "Techomfest - POLINES",
        period: "2024",
        status: "AWARD",
        type: "CTF",
    },
    {
        id: "CTF_004",
        role: "CTF Participant",
        organization: "Cyber Jawara",
        period: "2024",
        status: "AWARD",
        type: "CTF",
    },
    {
        id: "CTF_005",
        role: "CTF Participant",
        organization: "Cyber Strike - TNI",
        period: "2024",
        status: "AWARD",
        type: "CTF",
    },
];

function getStatusStyles(status: ExperienceEntry["status"]) {
    switch (status) {
        case "RUNNING":
            return { text: "text-neon-green", bg: "bg-neon-green/20", border: "border-neon-green" };
        case "ACTIVE":
            return { text: "text-neon-cyan", bg: "bg-neon-cyan/20", border: "border-neon-cyan" };
        case "COMPLETED":
            return { text: "text-gray-400", bg: "bg-gray-500/20", border: "border-gray-500" };
        case "AWARD":
            return { text: "text-neon-yellow", bg: "bg-neon-yellow/20", border: "border-neon-yellow" };
        default:
            return { text: "text-gray-500", bg: "", border: "" };
    }
}

function getTypeLabel(type: ExperienceEntry["type"]) {
    switch (type) {
        case "WORK": return { label: "WORK", color: "text-neon-cyan", barColor: "bg-neon-cyan" };
        case "ORG": return { label: "ORG", color: "text-neon-green", barColor: "bg-neon-green" };
        case "EVENT": return { label: "EVENT", color: "text-neon-red", barColor: "bg-neon-red" };
        case "CTF": return { label: "CTF", color: "text-neon-yellow", barColor: "bg-neon-yellow" };
        default: return { label: "MISC", color: "text-gray-500", barColor: "bg-gray-500" };
    }
}

function StatusLight({ color, delay = 0 }: { color: "red" | "green" | "yellow"; delay?: number }) {
    const [isOn, setIsOn] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsOn(Math.random() > 0.3);
        }, 500 + delay * 80);
        return () => clearInterval(interval);
    }, [delay]);

    const colorMap = {
        red: isOn ? "bg-neon-red shadow-[0_0_6px_#FF0055]" : "bg-neon-red/20",
        green: isOn ? "bg-neon-green shadow-[0_0_6px_#39FF14]" : "bg-neon-green/20",
        yellow: isOn ? "bg-neon-yellow shadow-[0_0_6px_#FACC15]" : "bg-neon-yellow/20",
    };

    return <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-75 ${colorMap[color]}`} />;
}

// FIXED: Dynamic scanner that travels the full container height
function BootScanner({ isActive, containerRef }: { isActive: boolean; containerRef: React.RefObject<HTMLDivElement> }) {
    const y = useMotionValue("0%");

    useEffect(() => {
        if (isActive) {
            // Use percentage-based animation for dynamic height
            animate(y, "100%", { duration: 0.8, ease: "easeOut" });
        }
    }, [isActive, y]);

    if (!isActive) return null;

    return (
        <motion.div
            className="absolute left-0 right-0 h-0.5 md:h-1 pointer-events-none z-20"
            style={{
                top: y,
                background: "linear-gradient(90deg, transparent, #39FF14, #39FF14, transparent)",
                boxShadow: "0 0 20px #39FF14, 0 0 40px #39FF14",
            }}
        />
    );
}

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 120,
            damping: 20,
            staggerChildren: 0.05,
            delayChildren: 0.3,
        },
    },
};

const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring" as const, stiffness: 200, damping: 20 },
    },
};

const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 150, damping: 15 },
    },
};

export default function ExperienceLog() {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });
    const [bootComplete, setBootComplete] = useState(false);

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setBootComplete(true), 800);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section id="experience" className="relative py-16 md:py-24 px-4 sm:px-6">
            {/* Section Header */}
            <div className="container mx-auto max-w-6xl mb-10 md:mb-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
                >
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-red to-transparent" />
                    <span className="terminal-text text-neon-red text-[10px] md:text-xs tracking-widest">[MODULE.03]</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-neon-red to-transparent" />
                </motion.div>

                <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center"
                >
                    <span
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase"
                        style={{
                            fontFamily: "Impact, 'Arial Black', sans-serif",
                            color: "#ffffff",
                            WebkitTextStroke: "1px #FF0055",
                            textShadow: "3px 3px 0px #000000, 0 0 15px rgba(255,0,85,0.4)"
                        }}
                    >
                        EXPERIENCE{" "}
                        <span style={{ WebkitTextStroke: "1px #00FFFF", textShadow: "3px 3px 0px #000000, 0 0 15px rgba(0,255,255,0.4)" }}>
                            LOG
                        </span>
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2 }}
                    className="terminal-text text-gray-400 text-center mt-3 md:mt-4 text-xs md:text-sm"
                >
                    &gt; SYSTEM_BOOT_SEQUENCE // LOADING_CAREER_DATA
                </motion.p>
            </div>

            {/* Terminal Container */}
            <motion.div
                ref={containerRef}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="container mx-auto max-w-6xl"
                style={{ perspective: "1200px" }}
            >
                <div
                    className="relative"
                    style={{
                        transform: "perspective(1000px) rotateX(2deg)",
                        transformOrigin: "center top",
                    }}
                >
                    {/* Main Terminal */}
                    <div
                        ref={listRef}
                        className="relative overflow-hidden border border-neon-cyan/30 md:border-2"
                        style={{
                            background: "rgba(8, 8, 8, 0.95)",
                            boxShadow: "0 20px 60px rgba(0, 255, 255, 0.15)",
                        }}
                    >
                        {/* FIXED: Scanner now uses percentage-based animation */}
                        <BootScanner isActive={isInView} containerRef={listRef} />

                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-3 md:px-5 py-2 md:py-3 bg-[#050505] border-b-2 border-neon-cyan/30">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-neon-red" />
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-neon-yellow" />
                                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-neon-green" />
                                </div>
                                <span className="terminal-text text-gray-400 text-[10px] md:text-xs ml-2 hidden sm:inline">
                                    syaz@protocol:~$ cat experience.log
                                </span>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2">
                                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                                    <StatusLight key={i} color={i % 3 === 0 ? "red" : i % 3 === 1 ? "green" : "yellow"} delay={i} />
                                ))}
                                <span className="terminal-text text-neon-green text-[10px] md:text-xs ml-1 md:ml-2 font-bold">ONLINE</span>
                            </div>
                        </div>

                        {/* Table Header - Desktop Only */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-[#0a0a0a] border-b border-neon-cyan/20 text-xs text-gray-400 font-mono uppercase tracking-wider">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-1">TYPE</div>
                            <div className="col-span-3">ROLE</div>
                            <div className="col-span-3">ORGANIZATION</div>
                            <div className="col-span-2">PERIOD</div>
                            <div className="col-span-2">STATUS</div>
                        </div>

                        {/* Entries */}
                        <div className="divide-y divide-gray-800/50">
                            {bootComplete && EXPERIENCE_DATA.map((entry, index) => {
                                const typeInfo = getTypeLabel(entry.type);
                                const statusStyles = getStatusStyles(entry.status);
                                const isRunning = entry.status === "RUNNING";
                                const isAward = entry.status === "AWARD";

                                return (
                                    <motion.div
                                        key={entry.id}
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.04 }}
                                        className={`
                                            group relative
                                            transition-all duration-150 
                                            hover:bg-neon-cyan/5
                                            ${isRunning ? "bg-neon-green/5" : ""}
                                            ${isAward ? "bg-neon-yellow/5" : ""}
                                        `}
                                    >
                                        {/* MOBILE: Tactical Data Card */}
                                        <div className="md:hidden p-3 relative">
                                            {/* Colored Left Bar */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${typeInfo.barColor}`} />

                                            {/* Card Container */}
                                            <div className="pl-3 flex flex-col gap-2">
                                                {/* Top Row: Type + Status */}
                                                <div className="flex items-center justify-between">
                                                    <span className={`font-mono text-[11px] font-bold ${typeInfo.color} px-2 py-0.5 border ${typeInfo.barColor.replace('bg-', 'border-')}`}>
                                                        [{typeInfo.label}]
                                                    </span>
                                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold border ${statusStyles.text} ${statusStyles.bg} ${statusStyles.border}`}
                                                        style={{ boxShadow: isRunning || isAward ? "2px 2px 0px #000" : "none" }}>
                                                        {isRunning && <span className="w-1 h-1 rounded-full bg-neon-green animate-pulse" />}
                                                        {isAward && <span>🏆</span>}
                                                        {entry.status}
                                                    </span>
                                                </div>

                                                {/* Role */}
                                                <div className="text-white font-mono text-sm font-medium leading-tight">
                                                    {entry.role}
                                                </div>

                                                {/* Organization + Period */}
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-gray-300 font-mono text-xs flex-1 truncate">
                                                        {entry.organization}
                                                    </span>
                                                    <span className="text-gray-500 font-mono text-[10px] whitespace-nowrap">
                                                        {entry.period}
                                                    </span>
                                                </div>

                                                {/* ID Badge */}
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-600 font-mono text-[9px]">
                                                        SYS.ID: {entry.id}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Corner Highlights */}
                                            <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-transparent group-hover:border-neon-cyan/50 transition-colors" />
                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-transparent group-hover:border-neon-red/50 transition-colors" />
                                        </div>

                                        {/* DESKTOP: Table Row */}
                                        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-4 items-center">
                                            {/* Corner Highlights */}
                                            <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-transparent group-hover:border-neon-cyan transition-colors" />
                                            <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-transparent group-hover:border-neon-cyan transition-colors" />
                                            <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-transparent group-hover:border-neon-red transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-transparent group-hover:border-neon-red transition-colors" />

                                            <div className="col-span-1"><span className="text-gray-500 font-mono text-xs">{entry.id}</span></div>
                                            <div className="col-span-1"><span className={`font-mono text-xs font-bold ${typeInfo.color}`}>[{typeInfo.label}]</span></div>
                                            <div className="col-span-3"><span className="text-white font-mono text-sm group-hover:text-neon-cyan transition-colors">{entry.role}</span></div>
                                            <div className="col-span-3"><span className="text-gray-300 font-mono text-sm">{entry.organization}</span></div>
                                            <div className="col-span-2"><span className="text-gray-400 font-mono text-xs">{entry.period}</span></div>
                                            <div className="col-span-2">
                                                <span className={`inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-bold border ${statusStyles.text} ${statusStyles.bg} ${statusStyles.border}`}
                                                    style={{ boxShadow: isRunning || isAward ? "2px 2px 0px #000" : "none" }}>
                                                    {isRunning && <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />}
                                                    {isAward && <span>🏆</span>}
                                                    {entry.status}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="px-3 md:px-5 py-2 md:py-3 bg-[#050505] border-t-2 border-neon-cyan/30 flex items-center justify-between">
                            <span className="terminal-text text-neon-cyan text-[10px] md:text-xs font-bold">
                                [{EXPERIENCE_DATA.length} ENTRIES LOADED]<span className="cursor-blink" />
                            </span>
                            <span className="terminal-text text-neon-green text-[10px] md:text-xs font-bold">
                                BOOT_STATUS: COMPLETE
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.4 }}
                className="container mx-auto max-w-6xl mt-8 md:mt-16"
            >
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16 text-[10px] md:text-xs font-mono">
                    <span className="text-gray-400">WORK: <span className="text-neon-cyan font-bold">{EXPERIENCE_DATA.filter((e) => e.type === "WORK").length}</span></span>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-400">ORG: <span className="text-neon-green font-bold">{EXPERIENCE_DATA.filter((e) => e.type === "ORG" || e.type === "EVENT").length}</span></span>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-400">CTF: <span className="text-neon-yellow font-bold">{EXPERIENCE_DATA.filter((e) => e.type === "CTF").length}</span></span>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-400">TOTAL: <span className="text-white font-bold">{EXPERIENCE_DATA.length}</span></span>
                </div>
            </motion.div>
        </section>
    );
}
