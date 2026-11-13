import { useState, useRef, useEffect } from "react";
import { taylorStats, TRANSACTIONS_CLOSED_LABEL } from "@/config/taylorStats";

const useCountUp = (target: number, duration = 2600, from = 0, decimals = 0) => {
  const [count, setCount] = useState(target);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      cancelAnimationFrame(frame);
      if (reduced) {
        setCount(target);
        return;
      }
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Number((from + (target - from) * eased).toFixed(decimals)));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    };
    // Re-runs on every entry, so the counters animate whenever the strip
    // scrolls into view from either direction.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCount(Number(from.toFixed(decimals)));
        setInView(true);
        run();
      } else {
        cancelAnimationFrame(frame);
        setCount(target);
        setInView(false);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, from, decimals]);
  return { count, ref, inView };
};

const stats = [
  { ...taylorStats[1], prefix: "$", suffix: "M+", from: 50 },
  { ...taylorStats[2], prefix: "", suffix: "+", label: TRANSACTIONS_CLOSED_LABEL, from: 100 },
  { ...taylorStats[0], prefix: "", suffix: "+", label: "Years of Experience", from: 1 },
  { value: 1.6, suffix: "B+", prefix: "$", label: "Off-Market Access", from: 0.5, decimals: 1 },
];

const StatItem = ({ stat }: { stat: typeof stats[number] }) => {
  const { count, ref, inView } = useCountUp(stat.value, 3500, stat.from, (stat as any).decimals ?? 0);
  return (
    <div ref={ref} className="text-center group/stat">
      <p aria-label={`${stat.prefix}${stat.value}${stat.suffix} ${stat.label}`} style={{
        fontFamily: '"Cinzel", serif', fontWeight: 400,
        fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1, color: "#F5F3EF",
      }}>
        <span className="sr-only">{stat.prefix}{stat.value}{stat.suffix}</span>
        <span aria-hidden="true" className="tabular-nums">{stat.prefix}{count}</span>
        <span style={{
          fontFamily: '"Cinzel", serif', fontWeight: 400,
          fontSize: "0.6em", color: "hsl(38 39% 61%)", verticalAlign: "super",
        }} aria-hidden="true">
          {stat.suffix}
        </span>
      </p>
      <div className="relative inline-block mt-2 pb-3">
        <p style={{
          fontFamily: '"Jost", sans-serif', fontWeight: 300,
          fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#9A9690",
        }}>
          {stat.label}
        </p>
        <div
          className="absolute bottom-0 left-0 h-px"
          style={{
            background: "hsl(38 39% 61%)",
            width: inView ? "100%" : "0%",
            transition: "width 3.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </div>
  );
};

const StatsStrip = () => (
  <section className="bg-primary" style={{ padding: "clamp(64px, 10vw, 120px) 0" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default StatsStrip;
