import Link from "next/link";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "AI Loan Advisor",
  description: "Compare loan offers, calculate EMI, and chat with an AI advisor.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable}`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        <header className="topbar">
          <nav className="topbar-inner">
            <Link href="/" className="brand">
              <span className="brand-mark">AI</span>
              <span className="brand-text">
                <span className="brand-title">Loan Advisor</span>
                <span className="brand-subtitle">Compare · Calculate · Decide</span>
              </span>
            </Link>

            <div className="topbar-links">
              <Link href="/">Home</Link>
              <Link href="/auth">Login / Register</Link>
              <Link href="/chat" className="nav-cta">
                Chat Advisor
              </Link>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}