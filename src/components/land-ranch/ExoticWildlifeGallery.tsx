import { Link } from "react-router-dom";
import zebraImg from "@/assets/exotic-zebra.jpg.asset.json";
import liveWaterImg from "@/assets/live-water-ranch-aerial.jpg.asset.json";
import axisImg from "@/assets/exotic-axis-deer.jpg.asset.json";
import legacyImg from "@/assets/land-ranch-editorial.jpg";
import investmentImg from "@/assets/land-ranch-home-intro.jpg";
import familyCompoundImg from "@/assets/legacy-family-compound.jpg";

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
    name: "Legacy Family Compounds",
    image: familyCompoundImg,
    positioning:
      "Multi-generational ranches featuring guest residences, gathering spaces, equestrian amenities, and long-term family stewardship.",
  },
  {
    name: "Investment Acreage",
    image: investmentImg,
    positioning:
      "Land positioned for appreciation, development, and long-term value creation.",
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

        {/* Fancy gold divider */}
        <div className="mt-14 md:mt-20 flex items-center justify-center gap-4 md:gap-6" aria-hidden="true">
          <span className="h-px flex-1 max-w-[260px] md:max-w-[360px]" style={{ background: "linear-gradient(to right, rgba(185,160,108,0), #b9a06c)" }} />
          <span className="inline-block w-2 h-2 rotate-45" style={{ backgroundColor: "#b9a06c" }} />
          <span className="inline-block w-1.5 h-1.5 rotate-45" style={{ backgroundColor: "#b9a06c" }} />
          <span className="inline-block w-2 h-2 rotate-45" style={{ backgroundColor: "#b9a06c" }} />
          <span className="h-px flex-1 max-w-[260px] md:max-w-[360px]" style={{ background: "linear-gradient(to left, rgba(185,160,108,0), #b9a06c)" }} />
        </div>
      </div>
    </section>

  );
};

export default ExoticWildlifeGallery;
