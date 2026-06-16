import { Link } from "react-router-dom";
import zebraImg from "@/assets/exotic-zebra.jpg.asset.json";
import liveWaterImg from "@/assets/live-water-ranch-aerial.jpg.asset.json";
import axisImg from "@/assets/exotic-axis-deer.jpg.asset.json";
import legacyImg from "@/assets/land-ranch-editorial.jpg";
import investmentImg from "@/assets/investment-acreage-aerial.jpg.asset.json";
import familyCompoundImg from "@/assets/legacy-family-compound.jpg.asset.json";

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

type Profile = {
  name: string;
  positioning: string;
  image: string;
  href?: string;
};

const profiles: Profile[] = [
  {
    name: "Live Water Ranches",
    image: liveWaterImg.url,
    positioning:
      "Properties featuring rivers, creeks, springs, and valuable water resources.",
  },
  {
    name: "Recreational Ranches",
    image: axisImg.url,
    positioning: "Hunting, fishing, trail systems, and outdoor recreation.",
  },
  {
    name: "Legacy Holdings",
    image: legacyImg,
    positioning:
      "Multi-generational ranches focused on stewardship and preservation.",
  },
  {
    name: "Investment Acreage",
    image: investmentImg.url,
    positioning:
      "Land positioned for appreciation, development, and long-term value creation.",
  },
  {
    name: "\n\nMulti-generational Compounds",
    image: familyCompoundImg.url,
    positioning:
      "Multi-generational ranches for long-term family stewardship.",
  },
  {
    name: "Exotic Wildlife Ranches",
    image: zebraImg.url,
    positioning:
      "Managed species including axis, blackbuck, zebra, and oryx across Texas ranchland.",
    href: "/land-ranch/exotic-wildlife-ranches",
  },
];

const Card = ({ p }: { p: Profile }) => {
  const Wrapper: any = p.href ? Link : "div";
  const wrapperProps = p.href ? { to: p.href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="
        group relative overflow-hidden cursor-pointer block
        flex-shrink-0 md:flex-shrink
        w-[78%] sm:w-[56%] md:w-auto
        snap-start md:snap-align-none
        rounded-[2px]
      "
      style={{ height: "clamp(280px, 20vw, 310px)" }}
    >
      <img
        src={p.image}
        alt={`${p.name} on Texas ranchland`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500 group-hover:bg-[rgba(12,15,36,0.24)]"
        style={{ backgroundColor: "rgba(12, 15, 36, 0.12)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(12,15,36,0.82) 0%, rgba(12,15,36,0.48) 45%, rgba(12,15,36,0) 100%)",
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-end p-5 text-white">
        <h3 className="font-display text-[1.05rem] md:text-[1.1rem] lg:text-[1.15rem] font-normal leading-[1.15] mb-2">
          {p.name}
        </h3>
        <span
          aria-hidden="true"
          className="block h-px w-8 mb-2.5 origin-left transition-transform duration-700 ease-out group-hover:scale-x-[2.2]"
          style={{ backgroundColor: "#b9a06c" }}
        />
        <p
          className="text-white/80 text-[0.78rem] md:text-[0.8rem] leading-[1.5] max-w-[38ch]"
          style={{ fontFamily: '"Jost", sans-serif' }}
        >
          {p.positioning}
        </p>
      </div>
    </Wrapper>
  );
};

const ExoticWildlifeGallery = () => {
  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-6">
        {/* Narrow editorial intro */}
        <div className="max-w-[650px] mb-7 md:mb-9">
          <p className="text-gold mb-3" style={labelStyle}>
            Ranch Ownership Profiles
          </p>
          <h2 className="font-display text-[1.5rem] md:text-[1.7rem] lg:text-[1.8rem] font-normal text-architectural leading-[1.2] mb-4">
            Ranch Ownership Profiles
          </h2>
          <p className="text-muted-foreground leading-[1.65] text-[0.95rem]">
            Texas ranch ownership spans a range of profiles, from live water and
            recreational holdings to legacy acreage, investment tracts, and
            specialty operations such as exotic wildlife ranches.
          </p>
        </div>

        {/* Mobile swipe hint */}
        <div className="md:hidden flex justify-start mb-4">
          <div
            className="swipe-hint-pill inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-[#b9a06c] bg-[#b9a06c]/[0.06]"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}
          >
            <span>Swipe to explore</span>
            <span aria-hidden="true" className="swipe-hint-arrow inline-block text-base leading-none">→</span>
          </div>
        </div>

        {/* Mobile: horizontal swipe carousel */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {profiles.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </div>

        {/* Tablet (md): 2 columns */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
          {profiles.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </div>

        {/* Desktop (lg+): 3x2 grid */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {profiles.map((p) => (
            <Card key={p.name} p={p} />
          ))}
        </div>

        {/* Fancy barbed wire divider */}
        <div className="mt-14 md:mt-20 container mx-auto px-6" aria-hidden="true">
          <div className="flex items-center justify-center max-w-3xl mx-auto">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b9a06c]/60" />
            <svg
              viewBox="0 0 240 24"
              className="w-48 h-5 mx-3"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Twisted strands */}
              <path
                d="M0,12 C30,6 60,18 90,12 C120,6 150,18 180,12 C210,6 240,18 240,12"
                stroke="#b9a06c"
                strokeWidth="1"
              />
              <path
                d="M0,12 C30,18 60,6 90,12 C120,18 150,6 180,12 C210,18 240,6 240,12"
                stroke="#b9a06c"
                strokeWidth="1"
              />
              {/* Barbs */}
              {[60, 120, 180].map((x) => (
                <g key={x}>
                  <line x1={x} y1="5" x2={x} y2="19" stroke="#b9a06c" strokeWidth="1" />
                  <line x1={x - 5} y1="9" x2={x + 5} y2="15" stroke="#b9a06c" strokeWidth="1" />
                  <line x1={x + 5} y1="9" x2={x - 5} y2="15" stroke="#b9a06c" strokeWidth="1" />
                  <circle cx={x} cy="12" r="1.5" fill="#b9a06c" />
                </g>
              ))}
            </svg>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b9a06c]/60" />
          </div>
        </div>
      </div>
    </section>

  );
};

export default ExoticWildlifeGallery;
