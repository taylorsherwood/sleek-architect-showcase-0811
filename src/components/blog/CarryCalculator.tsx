import { useState } from "react";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

const fields = [
  { key: "value", label: "Current home value", prefix: "$", def: 1200000 },
  { key: "balance", label: "Mortgage balance", prefix: "$", def: 711000 },
  { key: "piti", label: "Monthly PITI", prefix: "$", def: 5375 },
  { key: "months", label: "Months of overlap", prefix: "", def: 4 },
  { key: "rate", label: "HELOC rate (%)", prefix: "", def: 7.75 },
] as const;

type Key = (typeof fields)[number]["key"];

const CarryCalculator = () => {
  const [v, setV] = useState<Record<Key, string>>(
    Object.fromEntries(fields.map((f) => [f.key, f.def.toLocaleString("en-US")])) as Record<Key, string>
  );
  const num = (k: Key) => Number(v[k].replace(/[^0-9.]/g, "")) || 0;
  const value = num("value");
  const line = Math.max(0, value * 0.8 - num("balance"));
  const carry = num("piti") * num("months");
  const pct = value > 0 ? (carry / value) * 100 : 0;
  const interest = ((line * num("rate")) / 100 / 12) * num("months");

  const outputs = [
    ["Maximum Texas HELOC", `$${fmt(line)}`],
    ["Total overlap carry", `$${fmt(carry)}`],
    ["Carry as % of home value", `${pct.toFixed(1)}%`],
    ["HELOC interest over the overlap", `$${fmt(interest)}`],
  ];

  return (
    <section aria-label="Double-carry calculator" className="my-12 border-y border-border/60 py-10">
      <p className="mb-6 text-[11px] uppercase tracking-[0.25em] text-accent">Double-carry calculator</p>
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((f) => (
          <label key={f.key} className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground">{f.label}</span>
            <div className="flex items-baseline border-b border-border focus-within:border-accent transition-colors">
              {f.prefix && <span className="mr-1 text-foreground/60">{f.prefix}</span>}
              <input
                inputMode="decimal"
                value={v[f.key]}
                onChange={(e) => setV((s) => ({ ...s, [f.key]: e.target.value }))}
                onBlur={() => setV((s) => ({ ...s, [f.key]: num(f.key).toLocaleString("en-US") }))}
                className="w-full bg-transparent py-2 text-lg text-foreground outline-none"
              />
            </div>
          </label>
        ))}
      </div>
      <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {outputs.map(([k, val]) => (
          <div key={k}>
            <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{k}</dt>
            <dd className="mt-2 font-serif text-2xl text-foreground">{val}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-sm text-muted-foreground">
        Texas caps home-equity liens at 80% of value (Art. XVI, Sec. 50(a)(6)). Estimates only.
      </p>
    </section>
  );
};

export default CarryCalculator;
