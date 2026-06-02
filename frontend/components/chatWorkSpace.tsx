
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChatApp } from "./chat-app";

export function ChatWorkspace() {
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    setMounted(true);
    setToken(window.localStorage.getItem("loan_advisor_token") ?? "");
  }, []);

  if (!mounted) {
    return (
      <main className="shell">
        <section className="panel">
          <div className="panel-inner">Loading workspace...</div>
        </section>
      </main>
    );
  }

  if (!token) {
    return (
      <main className="shell restricted-shell">
        <section className="panel">
          <div className="panel-inner stack">
            <span className="eyebrow">Restricted access</span>
            <h1 className="section-title">You need to log in to use the chatbot.</h1>
            <p>
              You can still use the EMI calculator, compare lenders, and review loan options
              on the home page without signing in.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/auth">
                Go to login
              </Link>
              <Link className="button button-secondary" href="/">
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="shell chat-shell">
      <section className="hero hero-chat">
        <div className="hero-copy">
          <span className="eyebrow">Advisor workspace</span>
          <h1>Continue your loan conversations with saved sessions.</h1>
          <p>
            Manage sessions, upload supporting documents, and inspect grounded insights
            generated from your backend tools.
          </p>
        </div>
      </section>

      <ChatApp />
    </main>
  );
}