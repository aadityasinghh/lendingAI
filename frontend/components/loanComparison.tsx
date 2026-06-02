"use client";

import { useEffect, useState } from "react";

type LoanOption = {
  id: string;
  source: string;
  productName: string;
};

type ComparisonResult = {
  first: {
    id: string;
    name: string;
    interest_rate: number;
    maximum_amount: number;
    minimum_income: number;
    tenure_range: [number, number];
  };
  second: {
    id: string;
    name: string;
    interest_rate: number;
    maximum_amount: number;
    minimum_income: number;
    tenure_range: [number, number];
  };
  deltas: {
    interest_rate: number;
    max_amount: number;
    minimum_income: number;
  };
};

export function LoanComparison() {
  const [options, setOptions] = useState<LoanOption[]>([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    fetch("/api/loans")
      .then((res) => res.json())
      .then((data: any[]) => {
        setOptions(data);
        if (data.length >= 2) {
          setFirst(data[0].id);
          setSecond(data[1].id);
        }
      });
  }, []);

  async function handleCompare() {
    if (!first || !second || first === second) return;
    const res = await fetch(`/api/compare?first=${first}&second=${second}`);
    const data = await res.json();
    setComparison(data);
  }

  return (
    <section className="panel">
      <div className="panel-inner stack">
        <h2 className="section-title">Compare Loans</h2>

        <div className="field-grid two">
          <div className="field">
            <label>First source</label>
            <select value={first} onChange={(e) => setFirst(e.target.value)}>
              {options.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.source} - {item.productName}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Second source</label>
            <select value={second} onChange={(e) => setSecond(e.target.value)}>
              {options.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.source} - {item.productName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="button button-primary" onClick={handleCompare} type="button">
          Compare
        </button>

        {comparison && (
          <div className="insight-card">
            <h3 style={{ margin: 0, fontSize: "0.95rem" }}>Comparison summary</h3>
            <p>
              <strong>{comparison.first.name}</strong> vs{" "}
              <strong>{comparison.second.name}</strong>
            </p>
            <p>
              Interest rate: {comparison.first.interest_rate}% vs{" "}
              {comparison.second.interest_rate}% (
              {comparison.deltas.interest_rate.toFixed(2)} difference)
            </p>
            <p>
              Max amount: ₹{comparison.first.maximum_amount.toLocaleString()} vs ₹
              {comparison.second.maximum_amount.toLocaleString()}
            </p>
            <p>
              Min income: ₹{comparison.first.minimum_income.toLocaleString()} vs ₹
              {comparison.second.minimum_income.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}