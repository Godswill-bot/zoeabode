import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ThemeSync } from "@/components/theme-sync";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const displayFont = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zoe's BookSphere | Curated books, guides, and knowledge systems",
  description:
    "A premium book and knowledge platform for discovery, self-development, curated reading, and digital content.",
  metadataBase: new URL("https://zoesbooksphere.com"),
  openGraph: {
    title: "Zoe's BookSphere",
    description:
      "Curated books, guides, and knowledge systems for readers who want more than a bookstore.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} scroll-smooth`}>
      <body className="min-h-screen bg-(--page) text-(--text) antialiased">
        <ThemeSync />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
