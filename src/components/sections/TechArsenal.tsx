"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// Tech icons with brand colors - ALL ICONS
const TECH_ICONS = [
    // === SECURITY & HACKING ===
    { name: "kalilinux.svg", color: "#557C94" },
    { name: "metasploit.svg", color: "#2596CD" },
    { name: "burpsuite.svg", color: "#FF6633" },
    { name: "wireshark.svg", color: "#1679A7" },
    { name: "hackthebox.svg", color: "#9FEF00" },
    { name: "tryhackme.svg", color: "#FF0055" },
    { name: "cyberdefenders.svg", color: "#00D4FF" },
    { name: "owasp.svg", color: "#ffffff" },
    { name: "torbrowser.svg", color: "#7D4698" },
    { name: "openvpn.svg", color: "#EA7E20" },

    // === DEVOPS & INFRASTRUCTURE ===
    { name: "docker.svg", color: "#2496ED" },
    { name: "kubernetes.svg", color: "#326CE5" },
    { name: "jenkins.svg", color: "#D24939" },
    { name: "nginx.svg", color: "#009639" },
    { name: "grafana.svg", color: "#F46800" },

    // === PROGRAMMING LANGUAGES ===
    { name: "python.svg", color: "#3776AB" },
    { name: "typescript.svg", color: "#3178C6" },
    { name: "javascript.svg", color: "#F7DF1E" },
    { name: "php.svg", color: "#777BB4" },
    { name: "cplusplus.svg", color: "#00599C" },
    { name: "gnubash.svg", color: "#4EAA25" },
    { name: "assemblyscript.svg", color: "#007AAC" },

    // === WEB FRAMEWORKS ===
    { name: "react.svg", color: "#61DAFB" },
    { name: "nextdotjs.svg", color: "#ffffff" },
    { name: "nodedotjs.svg", color: "#5FA04E" },
    { name: "laravel.svg", color: "#FF2D20" },
    { name: "tailwindcss.svg", color: "#06B6D4" },
    { name: "bootstrap.svg", color: "#7952B3" },
    { name: "html5.svg", color: "#E34F26" },

    // === DATABASES ===
    { name: "postgresql.svg", color: "#4169E1" },
    { name: "mysql.svg", color: "#4479A1" },

    // === OPERATING SYSTEMS ===
    { name: "linux.svg", color: "#FCC624" },
    { name: "archlinux.svg", color: "#1793D1" },
    { name: "ubuntu.svg", color: "#E95420" },

    // === TOOLS & PLATFORMS ===
    { name: "git.svg", color: "#F05032" },
    { name: "github.svg", color: "#ffffff" },
    { name: "vercel.svg", color: "#ffffff" },
    { name: "figma.svg", color: "#F24E1E" },
    { name: "wordpress.svg", color: "#21759B" },
    { name: "unity.svg", color: "#ffffff" },
    { name: "tensorflow.svg", color: "#FF6F00" },
    { name: "xampp.svg", color: "#FB7A24" },
    { name: "laragon.svg", color: "#0E83CD" },
];

const HEXAGON_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.1,
        },
    },
};

// Simpler animation for mobile performance
const hexagonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 200,
            damping: 20,
        },
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

interface HexagonCardProps {
    icon: { name: string; color: string };
}

function HexagonCard({ icon }: HexagonCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={hexagonVariants}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 500)}
            whileHover={{ scale: 1.1, zIndex: 20 }}
            whileTap={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            {/* Hexagon - Visible by default with glow */}
            <div
                className="relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-28 lg:h-32 flex items-center justify-center cursor-pointer transition-all duration-300"
                style={{
                    clipPath: HEXAGON_CLIP,
                    background: isHovered ? icon.color : `linear-gradient(135deg, ${icon.color}30, #0a0a0a)`,
                    boxShadow: isHovered
                        ? `0 0 25px ${icon.color}80, inset 0 0 20px ${icon.color}40`
                        : `0 0 12px ${icon.color}25, 2px 2px 0px #000`,
                }}
            >
                <div
                    className="absolute inset-[2px] flex items-center justify-center"
                    style={{
                        clipPath: HEXAGON_CLIP,
                        background: isHovered
                            ? `linear-gradient(135deg, ${icon.color}50, #0a0a0a 60%)`
                            : `linear-gradient(135deg, ${icon.color}15, #0a0a0a 70%)`,
                    }}
                >
                    <Image
                        src={`/icons/${icon.name}`}
                        alt={icon.name.replace(".svg", "")}
                        width={40}
                        height={40}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 relative z-10 transition-all duration-300"
                        style={{
                            filter: isHovered
                                ? `brightness(1.3) drop-shadow(0 0 10px ${icon.color})`
                                : `brightness(1) drop-shadow(0 0 4px ${icon.color}80)`,
                        }}
                    />
                </div>
            </div>

            {/* Tooltip - Hidden on mobile touch */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                    bg-black border px-2 py-0.5
                    text-[10px] font-mono font-bold whitespace-nowrap
                    pointer-events-none z-30 hidden sm:block"
                style={{
                    borderColor: icon.color,
                    color: icon.color,
                }}
            >
                {icon.name.replace(".svg", "").toUpperCase()}
            </motion.div>
        </motion.div>
    );
}

export default function TechArsenal() {
    return (
        <section id="tech" className="relative py-16 md:py-24 overflow-hidden">
            {/* Slash Divider Top */}
            <div className="absolute top-0 left-0 right-0 h-10 md:h-16 bg-gradient-to-r from-neon-cyan/5 via-neon-red/10 to-neon-cyan/5 -skew-y-2 origin-left" />
            <div className="absolute top-1 md:top-2 left-0 right-0 h-1 md:h-2 bg-gradient-to-r from-neon-cyan via-neon-red to-neon-cyan -skew-y-2 origin-left"
                style={{ boxShadow: "0 0 15px rgba(0,255,255,0.5), 0 0 30px rgba(255,0,85,0.3)" }} />

            {/* Section Header */}
            <div className="container mx-auto px-4 sm:px-6 mb-10 md:mb-16 pt-6 md:pt-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
                >
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
                    <span className="terminal-text text-neon-cyan text-[10px] md:text-xs tracking-widest">[MODULE.02]</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-neon-cyan to-transparent" />
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
                            WebkitTextStroke: "1px #00FFFF",
                            textShadow: "3px 3px 0px #000000, 0 0 15px rgba(0,255,255,0.4)"
                        }}
                    >
                        TECH{" "}
                        <span style={{ WebkitTextStroke: "1px #FF0055", textShadow: "3px 3px 0px #000000, 0 0 15px rgba(255,0,85,0.4)" }}>
                            ARSENAL
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
                    &gt; WEAPONS_OF_CHOICE // TAP_TO_ACTIVATE
                </motion.p>
            </div>

            {/* Honeycomb Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="container mx-auto px-2 sm:px-4 md:px-6"
            >
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
                    {TECH_ICONS.map((icon) => (
                        <HexagonCard key={icon.name} icon={icon} />
                    ))}
                </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3 }}
                className="container mx-auto px-4 sm:px-6 mt-12 md:mt-20"
            >
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-24">
                    <div className="text-center">
                        <div
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
                            style={{
                                fontFamily: "Impact, 'Arial Black', sans-serif",
                                color: "#ffffff",
                                WebkitTextStroke: "1px #00FFFF",
                                textShadow: "2px 2px 0px #000"
                            }}
                        >
                            {TECH_ICONS.length}+
                        </div>
                        <div className="terminal-text text-gray-400 text-[10px] md:text-xs mt-1 md:mt-2 tracking-widest">TECHNOLOGIES</div>
                    </div>
                    <div className="text-center">
                        <div
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
                            style={{
                                fontFamily: "Impact, 'Arial Black', sans-serif",
                                color: "#FACC15",
                                textShadow: "2px 2px 0px #000"
                            }}
                        >
                            3+
                        </div>
                        <div className="terminal-text text-gray-400 text-[10px] md:text-xs mt-1 md:mt-2 tracking-widest">YEARS_EXP</div>
                    </div>
                    <div className="text-center">
                        <div
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
                            style={{
                                fontFamily: "Impact, 'Arial Black', sans-serif",
                                color: "#ffffff",
                                WebkitTextStroke: "1px #FF0055",
                                textShadow: "2px 2px 0px #000"
                            }}
                        >
                            ∞
                        </div>
                        <div className="terminal-text text-gray-400 text-[10px] md:text-xs mt-1 md:mt-2 tracking-widest">LEARNING</div>
                    </div>
                </div>
            </motion.div>

            {/* Slash Divider Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12 md:h-20 bg-gradient-to-r from-neon-green/5 via-neon-cyan/10 to-neon-green/5 skew-y-1 origin-right" />
            <div className="absolute bottom-2 md:bottom-3 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-green skew-y-1 origin-right"
                style={{ boxShadow: "0 0 20px rgba(57,255,20,0.5), 0 0 40px rgba(0,255,255,0.3)" }} />
        </section>
    );
}
