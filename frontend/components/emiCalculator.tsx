"use client";

import { useState } from "react";
import { calculateLoanSummary } from "../lib/emi";
import { NumericField } from "./numeric-feild";

type EmiResult = {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  tenureMonths: number;
} | null;

export function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(13);
  const [years, setYears] = useState(2);
  const [extraMonths, setExtraMonths] = useState(0);
  const [result, setResult] = useState<EmiResult>(null);

  function handleCalculate() {
    const tenureMonths = years * 12 + extraMonths;

    if (!loanAmount || !interestRate || tenureMonths <= 0) {
      setResult(null);
      return;
    }

    const summary = calculateLoanSummary(loanAmount, interestRate, tenureMonths);

    setResult({
      emi: summary.emi,
      totalPayment: summary.totalPayment,
      totalInterest: summary.totalInterest,
      tenureMonths,
    });
  }

  return (
    <section className="panel tool-panel">
      <div className="panel-inner stack">
        <div className="section-heading">
          <h2 className="section-title">EMI calculator</h2>
          <p className="section-copy">
            Enter your loan amount, tenure, and annual interest rate to estimate repayment.
          </p>
        </div>

       <div className="emi-input-row">
  <NumericField id="loan-amount" label="Loan amount" value={loanAmount} onChange={setLoanAmount} />
  <NumericField id="interest-rate" label="Interest rate (%)" value={interestRate} onChange={setInterestRate} step={0.1} />
  <NumericField id="years" label="Years" value={years} onChange={setYears} />
  <NumericField id="extra-months" label="Extra months" value={extraMonths} onChange={setExtraMonths} />
</div>

        <div className="button-row">
          <button className="button button-primary" type="button" onClick={handleCalculate}>
            Calculate EMI
          </button>
        </div>

        <div className="result-box">
          {result ? (
            <div className="result-grid">
              <div className="metric-card">
                <span className="metric-label">Tenure: </span>
                <strong>{result.tenureMonths} months</strong>
              </div>
              <div className="metric-card featured">
                <span className="metric-label">Monthly EMI: </span>
                <strong>₹{result.emi.toFixed(2)}</strong>
              </div>
              <div className="metric-card">
                <span className="metric-label">Total interest: </span>
                <strong>₹{result.totalInterest.toFixed(2)}</strong>
              </div>
              <div className="metric-card">
                <span className="metric-label">Total payment: </span>
                <strong>₹{result.totalPayment.toFixed(2)}</strong>
              </div>
            </div>
          ) : (
            <p className="empty-result">Fill the inputs and click Calculate EMI to view the estimate.</p>
          )}
        </div>
      </div>
    </section>
  );
}