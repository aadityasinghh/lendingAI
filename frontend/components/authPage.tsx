
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError, AuthMode, LoginPayload, SignupPayload } from "../lib/api";

const defaultAuth = {
  username: "",
  password: "",
};

export function AuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authForm, setAuthForm] = useState(defaultAuth);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");
    setBusy(true);

    try {
      if (authMode === "signup") {
        const signupPayload: SignupPayload = { ...authForm };
        await apiFetch("/auth/signup", {
          method: "POST",
          body: signupPayload,
        });
        setStatus("Account created successfully. Please sign in.");
        setAuthMode("login");
        setAuthForm(defaultAuth);
        return;
      }

      const loginPayload: LoginPayload = { ...authForm };
      const response = await apiFetch<{ access_token: string }>("/auth/login", {
        method: "POST",
        body: loginPayload,
      });

      window.localStorage.setItem("loan_advisor_token", response.access_token);
      window.localStorage.setItem("loan_advisor_username", authForm.username);
      router.push("/chat");
    } catch (caught) {
      if (caught instanceof ApiError) {
        setError(caught.message);
      } else {
        setError("Could not complete authentication.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell auth-shell">
      <section className="auth-hero">
        <div className="auth-copy">
          <span className="eyebrow">Secure access</span>
          <h1>Login to chat with the AI loan advisor.</h1>
          <p>
            You can explore loan options, compare lenders, and calculate EMI on the home page.
            Sign in only when you want session-based advisory chat.
          </p>
          <div className="button-row">
            <Link className="button button-secondary" href="/">
              Back to home
            </Link>
          </div>
        </div>

        <div className="panel auth-panel">
          <div className="panel-inner stack">
            <div className="tab-row">
              <button
                className={`tab ${authMode === "login" ? "active" : ""}`}
                onClick={() => setAuthMode("login")}
                type="button"
              >
                Login
              </button>
              <button
                className={`tab ${authMode === "signup" ? "active" : ""}`}
                onClick={() => setAuthMode("signup")}
                type="button"
              >
                Register
              </button>
            </div>

            <form className="stack" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="auth-username">Username</label>
                <input
                  id="auth-username"
                  value={authForm.username}
                  onChange={(event) =>
                    setAuthForm((current) => ({ ...current, username: event.target.value }))
                  }
                />
              </div>

              <div className="field">
                <label htmlFor="auth-password">Password</label>
                <input
                  id="auth-password"
                  type="password"
                  value={authForm.password}
                  onChange={(event) =>
                    setAuthForm((current) => ({ ...current, password: event.target.value }))
                  }
                />
              </div>

              {error ? <div className="notice">{error}</div> : null}
              {status ? <div className="success">{status}</div> : null}

              <button className="button button-primary" disabled={busy} type="submit">
                {busy ? "Please wait..." : authMode === "signup" ? "Create account" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}