import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CyberScrollbar from "@/components/ui/CyberScrollbar";
import CyberCursor from "@/components/ui/CyberCursor";
import HeroNav from "@/components/ui/HeroNav";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SYAZ PORTOFOLIO PROJECT",
  description:
    "Portfolio of Syahrindra Rafli Santosa",
  keywords: [
    "Security Engineer",
    "DevOps",
    "Penetration Testing",
    "Docker",
    "Kubernetes",
    "Cyber Security",
    "Portfolio",
  ],
  authors: [{ name: "Syahrindra Rafli Santosa" }],
  openGraph: {
    title: "SYAZ PORTOFOLIO PROJECT",
    description: "Portfolio of Syahrindra Rafli Santosa",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <HeroNav />
        <CyberCursor />
        <CyberScrollbar />
        {children}
      </body>
    </html>
  );
}
