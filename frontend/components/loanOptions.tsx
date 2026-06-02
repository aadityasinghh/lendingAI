"use client";

import { useEffect, useState } from "react";

type LoanOption = {
  id: string;
  source: string;
  productName: string;
  interestRate: number;
  processingFee: number;
  maxAmount: number;
  tenureMonths: number[];
};

export function LoanOptions() {
  const [options, setOptions] = useState<LoanOption[]>([]);

  useEffect(() => {
    fetch("/api/loans")
      .then((res) => res.json())
      .then(setOptions);
  }, []);

  return (
    <section className="panel">
      <div className="panel-inner stack">
        <h2 className="section-title">Loan Options</h2>

        <div className="session-list">
          {options.map((loan) => (
            <article key={loan.id} className="session-card">
              <h3>{loan.source}</h3>
              <p>{loan.productName}</p>
              <p>Rate: {loan.interestRate}%</p>
              <p>Processing fee: ₹{loan.processingFee}</p>
              <p>Max amount: ₹{loan.maxAmount}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}