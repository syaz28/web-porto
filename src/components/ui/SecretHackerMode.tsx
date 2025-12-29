"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// TYPES & CONFIGURATION
// ============================================
type HackState = "idle" | "breach" | "success" | "exit";

const HEX_CHARS = "0123456789ABCDEF";
const SYSTEM_WARNINGS = [
    "WARNING: FIREWALL BREACH DETECTED",
    "ALERT: UNAUTHORIZED ACCESS ATTEMPT",
    "CRITICAL: ENCRYPTION KEY EXPOSED",
    "NOTICE: PROXY CHAIN ESTABLISHED",
    "SYSTEM: ROOT PRIVILEGES ESCALATING",
    "DANGER: INTRUSION COUNTERMEASURES ACTIVE",
    "STATUS: DECRYPTION IN PROGRESS",
    "ALERT: TRACE ROUTE BLOCKED",
];

// Generate random hex value
const generateHex = () => `0x${Array.from({ length: 2 }, () => HEX_CHARS[Math.floor(Math.random() * 16)]).join("")}`;

// Generate hex data line
const generateHexLine = () => {
    const hexCount = Math.floor(Math.random() * 8) + 8;
    return Array.from({ length: hexCount }, generateHex).join(" ");
};

// ============================================
// LOCK ICON SVG COMPONENT
// ============================================
const LockIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

// ============================================
// HUD TARGETING FRAME COMPONENT
// ============================================
const TargetingHUD = ({ children }: { children: React.ReactNode }) => (
    <div className="relative p-8">
        {/* Corner Brackets */}
        {/* Top-Left */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-green-400"
            style={{ filter: "drop-shadow(0 0 4px #0f0)" }} />
        {/* Top-Right */}
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-green-400"
            style={{ filter: "drop-shadow(0 0 4px #0f0)" }} />
        {/* Bottom-Left */}
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-green-400"
            style={{ filter: "drop-shadow(0 0 4px #0f0)" }} />
        {/* Bottom-Right */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-green-400"
            style={{ filter: "drop-shadow(0 0 4px #0f0)" }} />

        {/* Scanning Lines */}
        <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: "linear-gradient(transparent 50%, rgba(0, 255, 0, 0.03) 50%)",
                backgroundSize: "100% 4px",
            }}
            animate={{ backgroundPosition: ["0 0", "0 100px"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {children}
    </div>
);

// ============================================
// DATA STREAM COMPONENT
// ============================================
interface DataStreamProps {
    isActive: boolean;
}

const DataStream = ({ isActive }: DataStreamProps) => {
    const [lines, setLines] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) {
            setLines([]);
            return;
        }

        const interval = setInterval(() => {
            setLines((prev) => {
                // Randomly insert system warning or hex data
                const newLine = Math.random() > 0.85
                    ? `[!] ${SYSTEM_WARNINGS[Math.floor(Math.random() * SYSTEM_WARNINGS.length)]}`
                    : `[${String(Date.now()).slice(-6)}] ${generateHexLine()}`;

                const updated = [...prev, newLine];
                // Keep only last 30 lines for performance
                return updated.slice(-30);
            });
        }, 50); // Very fast data stream

        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div
            ref={containerRef}
            className="absolute top-4 left-4 right-4 h-32 overflow-hidden font-vt323 text-sm md:text-base opacity-60"
            style={{
                textShadow: "0 0 8px #0f0, 0 0 12px #0f0",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
        >
            {lines.map((line, i) => (
                <div
                    key={i}
                    className={line.startsWith("[!]") ? "text-red-400" : "text-green-400"}
                    style={{
                        textShadow: line.startsWith("[!]")
                            ? "0 0 8px #f00, 0 0 12px #f00"
                            : "0 0 8px #0f0, 0 0 12px #0f0"
                    }}
                >
                    {line}
                </div>
            ))}
        </div>
    );
};

// ============================================
// BOTTOM DATA STREAM COMPONENT
// ============================================
const BottomDataStream = ({ isActive }: DataStreamProps) => {
    const [lines, setLines] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) {
            setLines([]);
            return;
        }

        const interval = setInterval(() => {
            setLines((prev) => {
                const newLine = `MEM:${generateHex()} CPU:${Math.floor(Math.random() * 100)}% NET:${generateHexLine().slice(0, 30)}`;
                const updated = [...prev, newLine];
                return updated.slice(-20);
            });
        }, 80);

        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div
            ref={containerRef}
            className="absolute bottom-4 left-4 right-4 h-24 overflow-hidden font-vt323 text-xs md:text-sm opacity-40"
            style={{
                textShadow: "0 0 6px #0f0",
                maskImage: "linear-gradient(to top, transparent 0%, black 30%, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 30%, black 70%, transparent 100%)",
            }}
        >
            {lines.map((line, i) => (
                <div key={i} className="text-green-500">{line}</div>
            ))}
        </div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function SecretHackerMode() {
    const [hackState, setHackState] = useState<HackState>("idle");
    const [showFlash, setShowFlash] = useState(false);

    // Audio refs
    const typingAudioRef = useRef<HTMLAudioElement | null>(null);
    const successAudioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio elements
    useEffect(() => {
        typingAudioRef.current = new Audio("/sounds/typing.mp3");
        typingAudioRef.current.loop = true;
        typingAudioRef.current.volume = 0.4;

        successAudioRef.current = new Audio("/sounds/success.mp3");
        successAudioRef.current.volume = 0.6;

        return () => {
            if (typingAudioRef.current) {
                typingAudioRef.current.pause();
                typingAudioRef.current = null;
            }
            if (successAudioRef.current) {
                successAudioRef.current.pause();
                successAudioRef.current = null;
            }
        };
    }, []);

    // Start the hack sequence
    const startHack = useCallback(() => {
        // Reset cursor state to prevent stuck hover effect
        window.dispatchEvent(new CustomEvent("resetCursor"));

        setHackState("breach");

        // Start typing loop sound
        if (typingAudioRef.current) {
            typingAudioRef.current.currentTime = 0;
            typingAudioRef.current.play().catch(() => {
                // Audio autoplay blocked - silent fail
            });
        }

        // Transition to success after breach phase
        setTimeout(() => {
            // Stop typing sound
            if (typingAudioRef.current) {
                typingAudioRef.current.pause();
                typingAudioRef.current.currentTime = 0;
            }

            // White flash effect
            setShowFlash(true);
            setTimeout(() => setShowFlash(false), 150);

            // Play success sound
            if (successAudioRef.current) {
                successAudioRef.current.currentTime = 0;
                successAudioRef.current.play().catch(() => {
                    // Audio autoplay blocked - silent fail
                });
            }

            setHackState("success");

            // Exit after 3 seconds
            setTimeout(() => {
                setHackState("exit");
                setTimeout(() => setHackState("idle"), 500);
            }, 3000);
        }, 4000); // 4 second breach phase
    }, []);

    // Performance optimization - return null when idle
    if (hackState === "idle") {
        return (
            <>
                {/* Google Font Import */}
                <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
          
          .font-vt323 {
            font-family: 'VT323', monospace;
          }
        `}</style>

                {/* Floating Lock Trigger */}
                <motion.button
                    onClick={startHack}
                    className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-black/90 border-2 border-green-500/50 cursor-pointer backdrop-blur-sm group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        boxShadow: [
                            "0 0 10px rgba(0, 255, 0, 0.3), 0 0 20px rgba(0, 255, 0, 0.1)",
                            "0 0 20px rgba(0, 255, 0, 0.5), 0 0 40px rgba(0, 255, 0, 0.2)",
                            "0 0 10px rgba(0, 255, 0, 0.3), 0 0 20px rgba(0, 255, 0, 0.1)",
                        ],
                    }}
                    transition={{
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                    aria-label="Activate Hacker Mode"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <LockIcon className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors" />
                    </motion.div>

                    {/* Pulse Ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-green-500"
                        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                </motion.button>
            </>
        );
    }

    return (
        <>
            {/* Google Font Import */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        
        .font-vt323 {
          font-family: 'VT323', monospace;
        }

        @keyframes scanline-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
          52% { opacity: 1; }
          54% { opacity: 0.9; }
          56% { opacity: 1; }
        }

        @keyframes glitch-image {
          0%, 100% { 
            transform: translate(0) scale(1);
            filter: grayscale(100%) sepia(100%) hue-rotate(90deg) brightness(1.1) contrast(1.2) saturate(300%);
          }
          10% { 
            transform: translate(-2px, 1px) scale(1.01);
            filter: grayscale(100%) sepia(100%) hue-rotate(85deg) brightness(1.3) contrast(1.4) saturate(350%);
          }
          20% { 
            transform: translate(2px, -1px) scale(0.99);
            filter: grayscale(100%) sepia(100%) hue-rotate(95deg) brightness(1.0) contrast(1.1) saturate(280%);
          }
          30% { 
            transform: translate(-1px, 2px) scale(1);
            filter: grayscale(100%) sepia(100%) hue-rotate(90deg) brightness(1.2) contrast(1.3) saturate(320%);
          }
          40% { 
            transform: translate(1px, -2px) scale(1.01);
            filter: grayscale(100%) sepia(100%) hue-rotate(88deg) brightness(0.9) contrast(1.2) saturate(300%);
          }
          50% { 
            transform: translate(0) scale(1);
            opacity: 0.3;
          }
          52% { 
            opacity: 1;
          }
        }

        @keyframes rgb-shift {
          0%, 100% { text-shadow: -1px 0 #ff0000, 1px 0 #00ffff, 0 0 20px #00ff00, 0 0 40px #00ff00; }
          25% { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff, 0 0 25px #00ff00, 0 0 50px #00ff00; }
          50% { text-shadow: -1px 0 #ff0000, 1px 0 #00ffff, 0 0 30px #00ff00, 0 0 60px #00ff00; }
          75% { text-shadow: -3px 0 #ff0000, 3px 0 #00ffff, 0 0 25px #00ff00, 0 0 50px #00ff00; }
        }

        @keyframes screen-shake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2px, -2px); }
          20% { transform: translate(2px, 2px); }
          30% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          50% { transform: translate(-1px, 1px); }
          60% { transform: translate(1px, -1px); }
          70% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
        }
      `}</style>

            <AnimatePresence>
                {(hackState === "breach" || hackState === "success" || hackState === "exit") && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            ...(hackState === "breach" && { animation: "screen-shake 0.3s infinite" })
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] overflow-hidden font-vt323"
                        style={{ backgroundColor: "#000" }}
                    >
                        {/* CRT Monitor Container with Convex Effect */}
                        <div
                            className="relative w-full h-full"
                            style={{
                                animation: hackState === "breach" ? "flicker 0.15s infinite" : "none",
                                borderRadius: "20px",
                                boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.9)",
                            }}
                        >
                            {/* Scanlines Overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none z-30"
                                style={{
                                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)",
                                }}
                            />

                            {/* Moving Scanline */}
                            <motion.div
                                className="absolute left-0 right-0 h-[2px] bg-green-400/20 z-40 pointer-events-none"
                                style={{ boxShadow: "0 0 10px #0f0, 0 0 20px #0f0" }}
                                animate={{ y: ["-10vh", "110vh"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Vignette Effect */}
                            <div
                                className="absolute inset-0 pointer-events-none z-20"
                                style={{
                                    background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
                                }}
                            />

                            {/* CRT Curve/Bulge Effect */}
                            <div
                                className="absolute inset-0 pointer-events-none z-10"
                                style={{
                                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,20,0,0.1) 50%, rgba(0,0,0,0.3) 100%)",
                                }}
                            />

                            {/* Data Streams */}
                            <DataStream isActive={hackState === "breach"} />
                            <BottomDataStream isActive={hackState === "breach"} />

                            {/* Center Content */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                {/* Holographic GIF with Targeting HUD */}
                                <AnimatePresence>
                                    {(hackState === "breach" || hackState === "success") && (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{
                                                scale: 1,
                                                opacity: hackState === "success" ? 1 : [0.6, 1, 0.8, 1, 0.7, 1],
                                            }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            transition={{
                                                duration: hackState === "success" ? 0.3 : 0.5,
                                                opacity: hackState === "breach" ? { duration: 2, repeat: Infinity } : { duration: 0.3 }
                                            }}
                                        >
                                            <TargetingHUD>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src="/images/hacker-asset.gif"
                                                    alt="Hacker Asset"
                                                    className="w-48 h-48 md:w-64 md:h-64 object-contain"
                                                    style={{
                                                        filter: "grayscale(100%) sepia(100%) hue-rotate(90deg) brightness(1.1) contrast(1.2) saturate(300%)",
                                                        animation: hackState === "breach" ? "glitch-image 0.5s infinite" : "none",
                                                        mixBlendMode: "screen",
                                                    }}
                                                />

                                                {/* Hologram Glow */}
                                                <div
                                                    className="absolute inset-0 pointer-events-none"
                                                    style={{
                                                        background: "radial-gradient(circle, rgba(0,255,0,0.1) 0%, transparent 70%)",
                                                        filter: "blur(20px)",
                                                    }}
                                                />
                                            </TargetingHUD>

                                            {/* Status Text Below Image */}
                                            <motion.div
                                                className="text-center mt-4"
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                <span
                                                    className="text-green-400 text-xl tracking-widest"
                                                    style={{ textShadow: "0 0 10px #0f0, 0 0 20px #0f0" }}
                                                >
                                                    {hackState === "breach" ? "[ BREACHING SYSTEM... ]" : "[ SYSTEM COMPROMISED ]"}
                                                </span>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* ACCESS GRANTED Overlay */}
                                <AnimatePresence>
                                    {hackState === "success" && (
                                        <motion.div
                                            initial={{ scale: 3, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            transition={{
                                                type: "spring",
                                                damping: 15,
                                                stiffness: 300,
                                                duration: 0.5
                                            }}
                                            className="absolute inset-0 flex items-center justify-center z-50"
                                        >
                                            <div className="text-center">
                                                <motion.h1
                                                    className="text-5xl md:text-8xl lg:text-9xl font-bold text-green-400 tracking-wider"
                                                    style={{
                                                        textShadow: "-2px 0 #ff0000, 2px 0 #00ffff, 0 0 30px #00ff00, 0 0 60px #00ff00, 0 0 90px #00ff00",
                                                        animation: "rgb-shift 0.2s infinite",
                                                    }}
                                                    animate={{
                                                        scale: [1, 1.02, 1],
                                                    }}
                                                    transition={{ duration: 0.5, repeat: Infinity }}
                                                >
                                                    ACCESS
                                                </motion.h1>
                                                <motion.h1
                                                    className="text-5xl md:text-8xl lg:text-9xl font-bold text-green-400 tracking-wider mt-2"
                                                    style={{
                                                        textShadow: "-2px 0 #ff0000, 2px 0 #00ffff, 0 0 30px #00ff00, 0 0 60px #00ff00, 0 0 90px #00ff00",
                                                        animation: "rgb-shift 0.2s infinite",
                                                    }}
                                                    initial={{ x: -100, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1, scale: [1, 1.02, 1] }}
                                                    transition={{
                                                        x: { delay: 0.1, duration: 0.3 },
                                                        scale: { duration: 0.5, repeat: Infinity, delay: 0.2 }
                                                    }}
                                                >
                                                    GRANTED
                                                </motion.h1>

                                                <motion.div
                                                    className="mt-8 text-2xl md:text-3xl text-green-300/80 tracking-[0.3em]"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 }}
                                                    style={{ textShadow: "0 0 10px #0f0" }}
                                                >
                                                    WELCOME, OPERATOR
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Corner HUD Elements */}
                            <div
                                className="absolute top-4 left-4 text-green-500 text-sm md:text-base z-20"
                                style={{ textShadow: "0 0 8px #0f0" }}
                            >
                                <div>SYSTEM://BREACH_PROTOCOL</div>
                                <div className="text-green-400/60">NODE: 192.168.X.X</div>
                                <div className="text-green-400/60">PROXY: [ACTIVE]</div>
                            </div>

                            <div
                                className="absolute top-4 right-4 text-green-500 text-sm md:text-base text-right z-20"
                                style={{ textShadow: "0 0 8px #0f0" }}
                            >
                                <div>STATUS: {hackState === "breach" ? "BREACHING" : "COMPLETE"}</div>
                                <div className="text-green-400/60">ENCRYPTION: AES-256</div>
                                <div className="text-green-400/60">TRACE: BLOCKED</div>
                            </div>

                            <div
                                className="absolute bottom-4 left-4 text-green-600 text-xs z-20"
                                style={{ textShadow: "0 0 6px #0f0" }}
                            >
                                {">"} SYAZ_PROTOCOL v3.0 // CLASSIFIED
                            </div>

                            <div
                                className="absolute bottom-4 right-4 text-green-600 text-xs z-20"
                                style={{ textShadow: "0 0 6px #0f0" }}
                            >
                                [TERMINAL SESSION ACTIVE]
                            </div>

                            {/* White Flash Effect */}
                            <AnimatePresence>
                                {showFlash && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.1 }}
                                        className="absolute inset-0 bg-white z-[100]"
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
