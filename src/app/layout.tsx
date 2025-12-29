import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CyberScrollbar from "@/components/ui/CyberScrollbar";
import CyberCursor from "@/components/ui/CyberCursor";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SYAZ PROTOCOL | Security & DevOps Engineer",
  description:
    "Portfolio of Syahrindra Rafli Santosa - Security & DevOps Engineer specializing in penetration testing, container orchestration, and automation pipelines.",
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
    title: "SYAZ PROTOCOL | Security & DevOps Engineer",
    description: "Portfolio of Syahrindra Rafli Santosa - Security & DevOps Engineer",
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
        <CyberCursor />
        <CyberScrollbar />
        {children}
      </body>
    </html>
  );
}
