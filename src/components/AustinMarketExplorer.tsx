import { Link } from "react-router-dom";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

type Tile = {
  name: string;
  slug: string;
  insight: string;
  meta: string;
};

const TILES: Tile[] = [
  {
    name: "Westlake",
    slug: "westlake-hills",
    meta: "Hill Country · Eanes ISD",
    insight:
      "Tightly held inventory and Eanes ISD demand keep values resilient through cycles. Buyers should expect competition above $3M.",
  },
  {
    name: "Tarrytown",
    slug: "tarrytown",
    meta: "Central · Old Austin",
    insight:
      "Lot value drives most transactions here. Renovation versus tear-down math is the conversation worth having before you bid.",
  },
  {
    name: "Downtown Austin",
    slug: "downtown-austin",
    meta: "High-Rise · Walkable",
    insight:
      "Building selection matters more than view. HOA reserves, rental policies, and floor stack pricing separate strong assets from soft ones.",
  },
  {
    name: "Lake Austin",
    slug: "lake-austin",
    meta: "Waterfront · Estate",
    insight:
      "Waterfront is a narrow, illiquid market. Dock rights, frontage, and flood elevation drive far more value than square footage.",
  },
  {
    name: "Barton Creek",
    slug: "barton-creek",
    meta: "Gated · Golf · Privacy",
    insight:
      "Gated estate sections trade quietly. Off-market access and club membership status often shape pricing more than public comps.",
  },
];

const MapBackdrop = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 1600 900"
  >
    <defs>
      <pattern id="grid-fine" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.04"
          strokeWidth="0.5"
        />
      </pattern>
      <radialGradient id="fade-center" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0" />
        <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.85" />
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#grid-fine)" />
    {/* Faint contour-style lines suggesting Hill Country / Lake */}
    <g
      fill="none"
      stroke="hsl(var(--foreground))"
      strokeOpacity="0.05"
      strokeWidth="1"
    >
      <path d="M -50 320 Q 200 260 420 300 T 880 280 T 1320 320 T 1700 300" />
      <path d="M -50 380 Q 220 330 460 360 T 920 340 T 1360 380 T 1700 360" />
      <path d="M -50 460 Q 260 410 500 440 T 980 420 T 1420 460 T 1700 440" />
      <path d="M -50 540 Q 240 500 480 520 T 940 500 T 1400 540 T 1700 520" />
      <path d="M -50 620 Q 280 580 520 600 T 1000 580 T 1440 620 T 1700 600" />
    </g>
    {/* Lake Austin suggestion */}
    <g
      fill="none"
      stroke="#b9a06c"
      strokeOpacity="0.10"
      strokeWidth="1.25"
    >
      <path d="M 200 480 Q 380 420 560 480 T 940 500 Q 1080 520 1180 470" />
      <path d="M 220 500 Q 400 440 580 500 T 960 520 Q 1100 540 1200 490" />
    </g>
    <rect width="1600" height="900" fill="url(#fade-center)" />
  </svg>
);

const MarketTile = ({ tile, index }: { tile: Tile; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <Link
      to={`/communities/${tile.slug}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={(e) => {
        // On touch devices, first tap reveals insight; second tap navigates
        if (window.matchMedia("(hover: none)").matches && !open) {
          e.preventDefault();
          setOpen(true);
        }
      }}
      className="group relative block border border-border/50 bg-background/70 backdrop-blur-[1px] transition-colors duration-500 hover:border-gold focus:border-gold focus:outline-none"
      style={{ minHeight: 220 }}
    >
      <div className="relative h-full p-6 md:p-7 flex flex-col justify-between">
        <div>
          <p
            className="text-gold mb-3"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {String(index + 1).padStart(2, "0")} · {tile.meta}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-normal text-architectural leading-[1.1] tracking-[0.02em]">
            {tile.name}
          </h3>
        </div>

        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: open ? 200 : 0,
            opacity: open ? 1 : 0,
            marginTop: open ? 16 : 0,
          }}
        >
          <p
            className="text-muted-foreground leading-[1.65]"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "12.5px",
              letterSpacing: "0.01em",
            }}
          >
            {tile.insight}
          </p>
        </div>

        <div
          className="mt-5 flex items-center justify-between transition-opacity duration-500"
          style={{ opacity: open ? 1 : 0.55 }}
        >
          <span
            className="text-foreground/70 group-hover:text-gold transition-colors duration-300"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "9.5px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            View Advisory
          </span>
          <span
            aria-hidden="true"
            className="text-gold transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </div>

        {/* Bottom accent rule */}
        <span
          aria-hidden="true"
          className="absolute left-0 bottom-0 h-[1px] bg-gold transition-all duration-500"
          style={{ width: open ? "100%" : "0%" }}
        />
      </div>
    </Link>
  );
};

const AustinMarketExplorer = () => {
  return (
    <section
      className="relative bg-background overflow-hidden"
      style={{ padding: "clamp(56px, 8vw, 96px) 0" }}
      aria-labelledby="market-explorer-heading"
    >
      <MapBackdrop />

      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4 tracking-[0.25em]">
              AUSTIN MARKET EXPLORER
            </p>
            <h2
              id="market-explorer-heading"
              className="text-3xl md:text-[2.5rem] lg:text-[2.75rem] font-display font-normal text-architectural leading-[1.1] tracking-[0.02em] mb-5"
            >
              Explore Austin Through An{" "}
              <span className="text-gold italic">Advisory Lens</span>
            </h2>
            <p
              className="text-muted-foreground mx-auto leading-[1.7] max-w-2xl"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "15px",
                letterSpacing: "0.015em",
              }}
            >
              From lakefront estates to walkable urban enclaves, each Austin
              micro-market behaves differently. Echelon helps buyers, sellers,
              and investors understand the nuance before making a move.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop / tablet grid */}
        <ScrollReveal delay={120}>
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-[6px] max-w-6xl mx-auto">
            {TILES.map((tile, i) => (
              <MarketTile key={tile.slug} tile={tile} index={i} />
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide">
          <div
            className="flex gap-3 pb-2"
            style={{ width: "max-content" }}
          >
            {TILES.map((tile, i) => (
              <div key={tile.slug} className="w-[78vw] max-w-[320px] flex-shrink-0">
                <MarketTile tile={tile} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <ScrollReveal delay={200}>
          <div className="mt-12 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/communities"
              className="inline-block text-center px-7 py-[14px]"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
                border: "2px solid #b9a06c",
                color: "#fff",
                background: "#b9a06c",
                transition:
                  "transform 250ms ease, background 250ms ease, color 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#b9a06c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#b9a06c";
                e.currentTarget.style.color = "#fff";
              }}
            >
              Explore Austin Communities
            </Link>
            <Link
              to="/austin-luxury-homes-for-sale"
              className="inline-block text-center px-7 py-[14px]"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 400,
                border: "1px solid hsl(var(--foreground) / 0.35)",
                color: "hsl(var(--foreground))",
                background: "transparent",
                transition:
                  "background 250ms ease, border-color 250ms ease, color 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(var(--foreground))";
                e.currentTarget.style.color = "hsl(var(--background))";
                e.currentTarget.style.borderColor = "hsl(var(--foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "hsl(var(--foreground))";
                e.currentTarget.style.borderColor =
                  "hsl(var(--foreground) / 0.35)";
              }}
            >
              View Active Listings
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AustinMarketExplorer;
