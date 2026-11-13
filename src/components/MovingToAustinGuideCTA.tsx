import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import cover from "@/assets/guide-opening-01.webp.asset.json";

export default function MovingToAustinGuideCTA() {
  return (
    <Link
      to="/austin-relocation-guide"
      className="group relative flex w-full max-w-3xl flex-col items-center gap-8 overflow-hidden bg-primary px-6 py-10 text-left text-primary-foreground sm:flex-row sm:gap-10 sm:px-10 md:py-12 mx-auto"
    >
      <img
        src={cover.url}
        alt="Cover of the Austin Relocation Guide 2026-2027 Edition"
        width={1082}
        height={1400}
        loading="lazy"
        className="w-32 shrink-0 object-cover shadow-[0_18px_40px_-18px_hsl(var(--foreground)/0.6)] transition-transform duration-700 group-hover:-translate-y-1 sm:w-36 md:w-40"
      />
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <p className="text-gold text-[11px] uppercase tracking-[0.25em]">The Official Austin Relocation Guide 2026-2027 Edition</p>
        <h3 className="mt-4 font-serif text-2xl leading-snug md:text-3xl">Moving to Austin, in one considered edition.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/75">Neighborhoods, schools, property taxes and the details that shape a move, from Echelon Property Group.</p>
        <span className="mt-6 inline-flex items-center gap-3 border border-gold px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-500 group-hover:bg-gold group-hover:text-primary">
          Get the full 2026 Moving to Austin Guide
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
