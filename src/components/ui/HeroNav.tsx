"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════
// NAV ITEMS DATA
// ═══════════════════════════════════════════════════════════════════════
const NAV_ITEMS = [
    { id: "hero", label: "HOME", icon: "◈" },
    { id: "tech", label: "ARSENAL", icon: "⚡" },
    { id: "projects", label: "PROJECT", icon: "◆" },
    { id: "experience", label: "LOG", icon: "▣" },
    { id: "certificates", label: "ARCHIVE", icon: "◎" },
];

// ═══════════════════════════════════════════════════════════════════════
// GLITCH TEXT COMPONENT
// ═══════════════════════════════════════════════════════════════════════
function GlitchBrand() {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 150);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="relative cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            {/* Main Text */}
            <span
                className="text-lg md:text-xl font-black tracking-tighter"
                style={{
                    fontFamily: "Impact, 'Arial Black', sans-serif",
                    color: "#00FFFF",
                    textShadow: isGlitching
                        ? "-2px 0 #FF0055, 2px 0 #00FFFF"
                        : "0 0 10px rgba(0,255,255,0.5)",
                }}
            >
                SYAZ
            </span>
            <span
                className="text-lg md:text-xl font-black tracking-tighter ml-1"
                style={{
                    fontFamily: "Impact, 'Arial Black', sans-serif",
                    color: "#FF0055",
                    textShadow: isGlitching
                        ? "2px 0 #00FFFF, -2px 0 #FF0055"
                        : "0 0 10px rgba(255,0,85,0.5)",
                }}
            >
                .PROTOCOL
            </span>

            {/* Glitch Layers */}
            {isGlitching && (
                <>
                    <span
                        className="absolute top-0 left-0 text-lg md:text-xl font-black tracking-tighter opacity-70"
                        style={{
                            fontFamily: "Impact, 'Arial Black', sans-serif",
                            color: "#FF0055",
                            clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                            transform: "translateX(-2px)",
                        }}
                    >
                        SYAZ.PROTOCOL
                    </span>
                    <span
                        className="absolute top-0 left-0 text-lg md:text-xl font-black tracking-tighter opacity-70"
                        style={{
                            fontFamily: "Impact, 'Arial Black', sans-serif",
                            color: "#00FFFF",
                            clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                            transform: "translateX(2px)",
                        }}
                    >
                        SYAZ.PROTOCOL
                    </span>
                </>
            )}

            {/* Status Indicator */}
            <motion.div
                className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-neon-green"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ boxShadow: "0 0 8px #39FF14" }}
            />
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// NAV LINK COMPONENT
// ═══════════════════════════════════════════════════════════════════════
function NavLink({ item, isActive, onClick }: {
    item: typeof NAV_ITEMS[0];
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            className={`relative group px-3 py-2 font-mono text-xs tracking-wider transition-all duration-200 ${isActive ? "text-neon-cyan" : "text-gray-400 hover:text-white"
                }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Icon */}
            <span className={`mr-1.5 ${isActive ? "text-neon-cyan" : "text-gray-600 group-hover:text-neon-red"}`}>
                {item.icon}
            </span>

            {/* Label */}
            <span className="font-bold">{item.label}</span>

            {/* Active Indicator */}
            {isActive && (
                <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-cyan"
                    style={{ boxShadow: "0 0 10px #00FFFF, 0 0 20px #00FFFF" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}

            {/* Hover Glow */}
            <motion.div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(0,255,255,0.1) 0%, transparent 70%)",
                }}
            />
        </motion.button>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// MOBILE MENU COMPONENT
// ═══════════════════════════════════════════════════════════════════════
function MobileMenu({ isOpen, onClose, activeSection }: {
    isOpen: boolean;
    onClose: () => void;
    activeSection: string;
}) {
    const handleNavClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998]"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-72 z-[999] overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, rgba(5,5,8,0.98) 0%, rgba(10,10,15,0.98) 100%)",
                            borderLeft: "1px solid rgba(0,255,255,0.2)",
                            boxShadow: "-10px 0 40px rgba(0,0,0,0.5)",
                        }}
                    >
                        {/* Close Button */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-neon-red transition-colors"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <span className="text-2xl font-light">✕</span>
                        </motion.button>

                        {/* Header */}
                        <div className="pt-16 px-6 pb-6 border-b border-gray-800">
                            <div className="font-mono text-xs text-gray-500 mb-2">NAVIGATION_SYSTEM</div>
                            <div className="font-mono text-neon-cyan text-sm">// SELECT_MODULE</div>
                        </div>

                        {/* Nav Items */}
                        <div className="py-4">
                            {NAV_ITEMS.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`w-full px-6 py-4 flex items-center gap-4 text-left transition-all duration-200 ${activeSection === item.id
                                            ? "bg-neon-cyan/10 text-neon-cyan border-l-2 border-neon-cyan"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                                        }`}
                                >
                                    <span className={`text-lg ${activeSection === item.id ? "text-neon-cyan" : "text-gray-600"}`}>
                                        {item.icon}
                                    </span>
                                    <div>
                                        <div className="font-mono text-xs text-gray-600 mb-0.5">
                                            [{String(index + 1).padStart(2, "0")}]
                                        </div>
                                        <div className="font-bold tracking-wide">{item.label}</div>
                                    </div>
                                    {activeSection === item.id && (
                                        <motion.div
                                            className="ml-auto w-2 h-2 rounded-full bg-neon-cyan"
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
                            <div className="font-mono text-[10px] text-gray-600 mb-2">SYSTEM_STATUS</div>
                            <div className="flex items-center gap-2">
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-neon-green"
                                    animate={{ opacity: [1, 0.4, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="font-mono text-xs text-neon-green">ONLINE</span>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-1/2 h-1 bg-gradient-to-r from-neon-cyan to-transparent" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-l from-neon-red to-transparent" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN NAVBAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════
export default function HeroNav() {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

    // Hide/Show navbar on scroll
    useMotionValueEvent(scrollY, "change", (latest) => {
        const direction = latest > lastScrollY ? "down" : "up";

        if (latest > 100) {
            setIsScrolled(true);
            if (direction === "down" && latest > 200) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        } else {
            setIsScrolled(false);
            setIsVisible(true);
        }

        setLastScrollY(latest);
    });

    // Track active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_ITEMS.map(item => ({
                id: item.id,
                element: document.getElementById(item.id),
            }));

            const currentSection = sections.find(section => {
                if (!section.element) return false;
                const rect = section.element.getBoundingClientRect();
                return rect.top <= 200 && rect.bottom >= 200;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 right-0 z-[900] px-4 md:px-8 py-3"
            >
                <div
                    className={`max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-2 md:py-3 transition-all duration-300 ${isScrolled ? "backdrop-blur-xl" : ""
                        }`}
                    style={{
                        background: isScrolled
                            ? "linear-gradient(135deg, rgba(5,5,10,0.9) 0%, rgba(10,10,20,0.85) 100%)"
                            : "transparent",
                        border: isScrolled ? "1px solid rgba(0,255,255,0.1)" : "1px solid transparent",
                        borderRadius: "4px",
                        boxShadow: isScrolled ? "0 10px 40px rgba(0,0,0,0.3)" : "none",
                    }}
                >
                    {/* Logo */}
                    <GlitchBrand />

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.id}
                                item={item}
                                isActive={activeSection === item.id}
                                onClick={() => handleNavClick(item.id)}
                            />
                        ))}
                    </div>

                    {/* CTA Button - Desktop */}
                    <motion.a
                        href="mailto:rafli.santosa28@gmail.com"
                        className="hidden lg:flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold tracking-wider text-black bg-neon-cyan"
                        style={{
                            clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)",
                            boxShadow: "0 0 15px rgba(0,255,255,0.4)",
                        }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,255,255,0.6)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>CONTACT</span>
                        <span>→</span>
                    </motion.a>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setMobileMenuOpen(true)}
                        className="lg:hidden flex flex-col gap-1.5 p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.div
                            className="w-6 h-0.5 bg-neon-cyan"
                            style={{ boxShadow: "0 0 8px #00FFFF" }}
                        />
                        <motion.div
                            className="w-4 h-0.5 bg-neon-red ml-auto"
                            style={{ boxShadow: "0 0 8px #FF0055" }}
                        />
                        <motion.div
                            className="w-5 h-0.5 bg-neon-cyan ml-auto"
                            style={{ boxShadow: "0 0 8px #00FFFF" }}
                        />
                    </motion.button>
                </div>

                {/* Bottom Accent Line */}
                {isScrolled && (
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                    />
                )}
            </motion.nav>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                activeSection={activeSection}
            />
        </>
    );
}
