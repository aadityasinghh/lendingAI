export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number,
) {
  if (!principal || !annualRate || !tenureMonths) return 0;

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return principal / tenureMonths;
  }

  const emi =
    principal *
    ((monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1));

  return emi;
}

export function calculateLoanSummary(
  principal: number,
  annualRate: number,
  tenureMonths: number,
) {
  const emi = calculateEMI(principal, annualRate, tenureMonths);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return {
    emi,
    totalPayment,
    totalInterest,
  };
}