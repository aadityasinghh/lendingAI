"use client";

import { useEffect, useState } from "react";

export function LoanComparison() {
  const [options, setOptions] = useState<any[]>([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [comparison, setComparison] = useState<any>(null);

  useEffect(() => {
    fetch("/api/loans")
      .then((res) => res.json())
      .then((data) => {
        setOptions(data);
        if (data.length >= 2) {
          setFirst(data[0].id);
          setSecond(data[1].id);
        }
      });
  }, []);

  async function handleCompare() {
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

        {comparison ? (
          <div className="insight-card">
            <pre>{JSON.stringify(comparison, null, 2)}</pre>
          </div>
        ) : null}
      </div>
    </section>
  );
}