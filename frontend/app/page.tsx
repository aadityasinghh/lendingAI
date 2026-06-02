import { EmiCalculator } from "../components/emiCalculator";
import { HomeChatCta } from "../components/homeCta";
import { LoanComparison } from "../components/loanComparison";
import { LoanOptions } from "../components/loanOptions";

export default function Page() {
  return (
    <main className="shell landing-shell">
      <section className="hero hero-landing">
        <div className="hero-copy">
          <span className="eyebrow">AI Loan Advisor</span>
          <h1>Explore loan options before you start the conversation.</h1>
          <p>
            View offers from the backend, estimate your EMI, and compare two loan products
            side by side before using the advisor chat.
          </p>
        </div>
      </section>

      <section className="stack landing-stack">
        <LoanOptions />
        <div className="tool-grid">
          <EmiCalculator />
          <LoanComparison />
        </div>
        <HomeChatCta />
      </section>
    </main>
  );
}