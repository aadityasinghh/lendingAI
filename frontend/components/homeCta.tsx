"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function HomeChatCta() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("loan_advisor_token") ?? "";
    setToken(storedToken);
  }, []);

  return (
    <section className="panel cta-panel">
      <div className="panel-inner cta-inner">
        <div className="stack">
          <span className="eyebrow">Need guidance?</span>
          <h2 className="section-title">Talk to the chatbot for personalized loan advice.</h2>
          <p>
            Loan browsing, EMI calculation, and lender comparison are public.
            Chat access is available only for logged-in users.
          </p>
        </div>

        <div className="button-row">
          {token ? (
            <Link className="button button-primary" href="/chat">
              Open chatbot workspace
            </Link>
          ) : (
            <>
              <Link className="button button-primary" href="/auth">
                Login to chat
              </Link>
              <Link className="button button-secondary" href="/auth">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}