"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeroProfile from "@/components/sections/HeroProfile";
import TechArsenal from "@/components/sections/TechArsenal";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import ExperienceLog from "@/components/sections/ExperienceLog";
import Module5Certificates from "@/components/sections/Module5Certificates";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import SecretHackerMode from "@/components/ui/SecretHackerMode";
import HeroXBackground from "@/components/ui/HeroXBackground";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading Screen - 2.5 seconds */}
      {isLoading && (
        <LoadingScreen
          duration={2500}
          onLoadingComplete={() => setIsLoading(false)}
        />
      )}

      <main className="relative min-h-screen bg-transparent overflow-x-hidden">
        {/* === CINEMATIC ATMOSPHERE (HeroXBackground handles all layers) === */}
        <HeroXBackground />

        {/* Mouse-following Spotlight */}
        <CursorSpotlight />

        {/* === CONTENT SECTIONS === */}
        <HeroProfile />
        <TechArsenal />
        <ProjectShowcase />
        <ExperienceLog />
        <Module5Certificates />

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* FOOTER - CYBER-ANIME HUD TERMINAL CLOSURE */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative py-16 md:py-20 px-6 overflow-hidden"
        >
          {/* Slash Divider Top with Neon Glow */}
          <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-r from-neon-cyan/5 via-neon-cyan/10 to-neon-cyan/5 -skew-y-1 origin-left" />
          <div
            className="absolute top-3 md:top-4 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent -skew-y-1 origin-left"
            style={{ boxShadow: "0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(0,255,255,0.4), 0 0 60px rgba(0,255,255,0.2)" }}
          />

          {/* Halftone Dot Pattern Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, #00FFFF 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
            }}
          />

          {/* Japanese Kanji Watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            style={{ transform: "rotate(-5deg)" }}
          >
            <span
              className="text-[20vw] md:text-[15vw] font-black opacity-[0.03]"
              style={{
                fontFamily: "'Noto Sans JP', Impact, sans-serif",
                WebkitTextStroke: "2px rgba(0,255,255,0.2)",
                color: "transparent",
              }}
            >
              終了
            </span>
          </div>

          {/* Main Container with HUD Frame */}
          <div className="container mx-auto max-w-6xl relative z-10">
            {/* HUD Frame - Tech Corner Brackets */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-neon-cyan" style={{ boxShadow: "-2px -2px 10px rgba(0,255,255,0.3)" }} />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan" style={{ boxShadow: "2px -2px 10px rgba(0,255,255,0.3)" }} />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-neon-red" style={{ boxShadow: "-2px 2px 10px rgba(255,0,85,0.3)" }} />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-neon-red" style={{ boxShadow: "2px 2px 10px rgba(255,0,85,0.3)" }} />

            {/* Footer Content Grid */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 px-4 md:px-8 border border-white/5 bg-black/40 backdrop-blur-sm">

              {/* Left: Brand with System Heartbeat */}
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                {/* System Heartbeat Indicator */}
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      animate={{
                        backgroundColor: ["#39FF14", "#39FF1480", "#39FF14"],
                        boxShadow: ["0 0 6px #39FF14", "0 0 2px #39FF14", "0 0 6px #39FF14"],
                      }}
                      transition={{
                        duration: 0.5 + i * 0.1,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
                <div className="terminal-text">
                  <span
                    className="font-bold text-sm md:text-base bg-gradient-to-r from-neon-cyan via-neon-cyan to-neon-red bg-clip-text text-transparent"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(0,255,255,0.6))",
                    }}
                  >
                    SYAZ_PROTOCOL
                  </span>{" "}
                  <span className="bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent text-xs">v2.0.26</span>
                </div>
              </motion.div>

              {/* Center: Social Links with Glitch Hover */}
              <div className="flex gap-6 md:gap-8 text-xs font-mono">
                {[
                  { label: "GITHUB", href: "https://github.com/syaz28", color: "neon-cyan" },
                  { label: "LINKEDIN", href: "https://www.linkedin.com/in/syahrindra-rafli-santosa", color: "neon-cyan" },
                  { label: "EMAIL", href: "mailto:rafli.santosa28@gmail.com", color: "neon-red" },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.label !== "EMAIL" ? "_blank" : undefined}
                    rel={link.label !== "EMAIL" ? "noopener noreferrer" : undefined}
                    className={`terminal-text text-gray-400 hover:text-${link.color} transition-all duration-200 relative group`}
                    whileHover={{
                      scale: 1.05,
                      textShadow: link.color === "neon-cyan"
                        ? "0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.4)"
                        : "0 0 10px rgba(255,0,85,0.8), 0 0 20px rgba(255,0,85,0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ textShadow: "none" }}
                  >
                    [{link.label}]
                    {/* Glitch underline on hover */}
                    <motion.div
                      className={`absolute -bottom-1 left-0 h-px bg-${link.color} origin-left`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        width: "100%",
                        boxShadow: link.color === "neon-cyan"
                          ? "0 0 8px rgba(0,255,255,0.6)"
                          : "0 0 8px rgba(255,0,85,0.6)"
                      }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Right: Copyright */}
              <div className="terminal-text text-gray-600 text-xs text-center md:text-right">
                <span className="text-gray-500">©</span> {new Date().getFullYear()}{" "}
                <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent font-medium">SYAHRINDRA RAFLI SANTOSA</span>
                <br />
                <span className="text-[10px] bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">// CRAFTED_WITH_PRECISION</span>
              </div>
            </div>

            {/* Bottom HUD Status Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-xs font-mono text-gray-600">
              <div className="flex items-center gap-4">
                <span className="text-neon-green">
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ●
                  </motion.span>
                  {" "}SYS_STATUS: ONLINE
                </span>
                <span className="text-gray-700">|</span>
                <span>UPTIME: 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent" style={{ filter: "drop-shadow(0 0 4px rgba(0,255,255,0.5))" }}>[TRANSMISSION_END]</span>
                <motion.span
                  className="text-neon-red"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ▮
                </motion.span>
              </div>
            </div>
          </div>

          {/* Bottom Accent Lines */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-red/50 to-transparent" />
        </motion.footer>

        {/* Easter Egg - Secret Hacker Mode */}
        <SecretHackerMode />
      </main>
    </>
  );
}
