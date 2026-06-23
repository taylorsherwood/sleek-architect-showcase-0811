import { useState } from "react";

/**
 * Shared mortgage estimator. Used on /buy and embedded inside blog posts
 * via the `:::mortgage-calculator` block.
 */
const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(1500000);
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const loanAmount = homePrice * (1 - downPayment / 100);
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;
  const monthly =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  const inputClass =
    "w-full bg-card border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors duration-200";

  return (
    <div className="bg-card border border-border p-8 md:p-10">
      <h3 className="text-2xl font-display font-normal text-architectural mb-2">
        Mortgage Estimator
      </h3>
      <p className="text-muted-foreground text-sm mb-8">
        Get a quick estimate of your monthly payment for Austin luxury homes for sale. Adjust values to match your situation.
      </p>
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="mortgage-home-price" className="text-minimal text-muted-foreground mb-2 block">HOME PRICE</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input id="mortgage-home-price" type="text" inputMode="numeric" value={homePrice.toLocaleString()} onChange={(e) => setHomePrice(Number(e.target.value.replace(/[^0-9]/g, '')) || 0)} className={`${inputClass} pl-8`} />
          </div>
        </div>
        <div>
          <label htmlFor="mortgage-down-payment" className="text-minimal text-muted-foreground mb-2 block">DOWN PAYMENT (%)</label>
          <input id="mortgage-down-payment" type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label htmlFor="mortgage-interest-rate" className="text-minimal text-muted-foreground mb-2 block">INTEREST RATE (%)</label>
          <input id="mortgage-interest-rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label htmlFor="mortgage-loan-term" className="text-minimal text-muted-foreground mb-2 block">LOAN TERM (YEARS)</label>
          <input id="mortgage-loan-term" type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} className={inputClass} />
        </div>
      </div>
      <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-minimal text-muted-foreground mb-1">ESTIMATED MONTHLY PAYMENT</p>
          <p className="text-4xl font-display font-normal text-foreground">
            ${Math.round(monthly).toLocaleString()}
          </p>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs">
          Estimate only. Does not include property taxes, insurance, or HOA fees. Contact us for a personalized analysis.
        </p>
      </div>
    </div>
  );
};

export default MortgageCalculator;
