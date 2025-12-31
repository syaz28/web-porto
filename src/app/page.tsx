import HeroProfile from "@/components/sections/HeroProfile";
import TechArsenal from "@/components/sections/TechArsenal";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import ExperienceLog from "@/components/sections/ExperienceLog";
import Module5Certificates from "@/components/sections/Module5Certificates";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import SecretHackerMode from "@/components/ui/SecretHackerMode";
import HeroXBackground from "@/components/ui/HeroXBackground";

export default function Home() {
  return (
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

      {/* Footer */}
      <footer className="relative py-20 px-6 border-t border-neon-cyan/20">
        <div className="container mx-auto max-w-6xl">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
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

      {/* Easter Egg - Secret Hacker Mode */}
      <SecretHackerMode />
    </main>
  );
}
