import HeroProfile from "@/components/sections/HeroProfile";
import TechArsenal from "@/components/sections/TechArsenal";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import ExperienceLog from "@/components/sections/ExperienceLog";
import CursorSpotlight from "@/components/ui/CursorSpotlight";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* === CINEMATIC ATMOSPHERE LAYERS === */}

      {/* Mouse-following Spotlight */}
      <CursorSpotlight />

      {/* Noise Texture */}
      <div className="noise-overlay" />

      {/* CRT Scanlines */}
      <div className="scanline-overlay" />

      {/* Vignette Effect */}
      <div className="vignette-overlay" />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      {/* === CONTENT SECTIONS === */}
      <HeroProfile />
      <TechArsenal />
      <ProjectShowcase />
      <ExperienceLog />

      {/* Footer with Certifications */}
      <footer className="relative py-20 px-6 border-t border-neon-cyan/20">
        <div className="container mx-auto max-w-6xl">
          {/* Certifications Section */}
          <div className="mb-12 text-center">
            <h3 className="terminal-text text-gray-500 text-xs tracking-widest mb-6">
              [CERTIFICATIONS]
            </h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {/* Cisco */}
              <div className="group px-5 py-3 bg-[#0a0a0a]/80 border border-gray-800 hover:border-neon-cyan transition-all duration-300">
                <span className="text-gray-400 group-hover:text-neon-cyan text-sm font-mono transition-colors">
                  CISCO
                </span>
                <span className="block text-xs text-gray-600 mt-1">Network Security</span>
              </div>
              {/* Huawei */}
              <div className="group px-5 py-3 bg-[#0a0a0a]/80 border border-gray-800 hover:border-neon-red transition-all duration-300">
                <span className="text-gray-400 group-hover:text-neon-red text-sm font-mono transition-colors">
                  HUAWEI
                </span>
                <span className="block text-xs text-gray-600 mt-1">HCIA Certified</span>
              </div>
              {/* Microsoft */}
              <div className="group px-5 py-3 bg-[#0a0a0a]/80 border border-gray-800 hover:border-neon-cyan transition-all duration-300">
                <span className="text-gray-400 group-hover:text-neon-cyan text-sm font-mono transition-colors">
                  MICROSOFT
                </span>
                <span className="block text-xs text-gray-600 mt-1">Azure Fundamentals</span>
              </div>
              {/* Google */}
              <div className="group px-5 py-3 bg-[#0a0a0a]/80 border border-gray-800 hover:border-neon-yellow transition-all duration-300">
                <span className="text-gray-400 group-hover:text-neon-yellow text-sm font-mono transition-colors">
                  GOOGLE
                </span>
                <span className="block text-xs text-gray-600 mt-1">IT Support</span>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-gray-800/50">
            {/* Logo/Name */}
            <div className="terminal-text text-sm">
              <span className="text-neon-cyan font-bold">SYAZ_PROTOCOL</span>{" "}
              <span className="text-gray-600">v2.0.0</span>
            </div>

            {/* Links */}
            <div className="flex gap-8 text-xs font-mono">
              <a
                href="https://github.com/syaz28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-cyan transition-all duration-300"
              >
                [GITHUB]
              </a>
              <a
                href="https://www.linkedin.com/in/syahrindra-rafli-santosa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-cyan transition-all duration-300"
              >
                [LINKEDIN]
              </a>
              <a
                href="mailto:rafli.santosa28@gmail.com"
                className="text-gray-400 hover:text-neon-red transition-all duration-300"
              >
                [EMAIL]
              </a>
            </div>

            {/* Copyright */}
            <div className="terminal-text text-gray-600 text-xs">
              © {new Date().getFullYear()} // CRAFTED_WITH_PRECISION
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
