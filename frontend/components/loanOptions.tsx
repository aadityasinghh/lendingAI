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
        <h2 className="section-title">Loan options</h2>

        <div className="loan-card-row">
          {options.map((loan) => (
            <article key={loan.id} className="loan-card">
              <header className="loan-card-header">
                <h3>{loan.productName}</h3>
                <span className="loan-source">{loan.source}</span>
              </header>

              <dl className="loan-card-body">
                <div>
                  <dt>Rate</dt>
                  <dd>{loan.interestRate}% p.a.</dd>
                </div>
                <div>
                  <dt>Max amount</dt>
                  <dd>₹{loan.maxAmount.toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Processing fee</dt>
                  <dd>₹{loan.processingFee.toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Tenure</dt>
                  <dd>
                    {Math.min(...loan.tenureMonths)}–{Math.max(...loan.tenureMonths)} months
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}