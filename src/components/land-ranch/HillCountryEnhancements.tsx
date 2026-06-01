import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import parallaxOne from "@/assets/lake-austin-waterfront.jpg";
import parallaxTwo from "@/assets/land-ranch-editorial-v2.jpg";
import liveWaterImg from "@/assets/lake-austin-waterfront.jpg";
import recreationalImg from "@/assets/land-ranch-editorial.jpg";
import legacyImg from "@/assets/land-ranch-home-intro.jpg";

const LandRanchMap = lazy(() => import("@/components/LandRanchMap"));

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

const stats: { value: string; label: string; sub: string }[] = [
  {
    value: "50-500+",
    label: "Acres",
    sub: "Typical acquisition size across the Hill Country.",
  },
  {
    value: "$15K-$100K+",
    label: "Per Acre",
    sub: "Range varies by water, county, and improvements.",
  },
  {
    value: "5",
    label: "Major Ranch Regions",
    sub: "Across Central Texas, anchored by Gillespie, Kerr, Llano, Burnet, and Hays.",
  },
  {
    value: "Live Water",
    label: "Top Value Driver",
    sub: "Rivers, springs, and creek frontage continue to define the top of the market.",
  },
];

const categories: {
  name: string;
  body: string;
  image: string;
  href: string;
  eyebrow: string;
}[] = [
  {
    eyebrow: "DEFINING FEATURE",
    name: "Live Water Ranches",
    body: "Properties anchored by rivers, creeks, springs, and verified water resources.",
    image: liveWaterImg,
    href: "/contact",
  },
  {
    eyebrow: "LIFESTYLE USE",
    name: "Recreational Ranches",
    body: "Hunting, fishing, trail systems, and full-season outdoor recreation.",
    image: recreationalImg,
    href: "/contact",
  },
  {
    eyebrow: "GENERATIONAL",
    name: "Investment & Legacy Ranches",
    body: "Tracts positioned for long-term appreciation, stewardship, and multi-generational ownership.",
    image: legacyImg,
    href: "/contact",
  },
];

/** Top enhancements: parallax break + by-the-numbers + map + categories.
 *  Injected on /land-ranch/hill-country-ranches after the MARKET OVERVIEW. */
export const HillCountryTopEnhancements = () => {
  return (
    <>
      {/* ── PARALLAX VISUAL BREAK 1 ───────────────────────── */}
      <section
        aria-hidden="true"
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(420px, 55vh, 640px)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${parallaxOne})`,
            backgroundAttachment: "fixed",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,15,36,0.05) 0%, rgba(12,15,36,0) 50%, rgba(12,15,36,0.10) 100%)",
          }}
        />
      </section>

      {/* ── BY THE NUMBERS ───────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-gold mb-5" style={labelStyle}>
              BY THE NUMBERS
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.1]">
              The Texas Hill Country at a glance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(12,15,36,0.08)] border border-[rgba(12,15,36,0.08)]">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-8 md:p-10">
                <p
                  className="font-display text-architectural leading-[1.05] mb-4"
                  style={{ fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-gold mb-4"
                  style={{ ...labelStyle, fontSize: "0.55rem" }}
                >
                  {s.label}
                </p>
                <p
                  className="text-muted-foreground text-[0.95rem] leading-[1.65]"
                  style={{ fontFamily: '"Jost", sans-serif' }}
                >
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ───────────────────────── */}
      <section className="py-14 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p className="text-gold mb-5" style={labelStyle}>
              REGIONAL FOOTPRINT
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-normal text-architectural leading-[1.1] mb-5">
              Hill Country Ranch Markets
            </h2>
            <p className="text-muted-foreground leading-[1.75] text-[1.0625rem]">
              Fredericksburg, Kerrville, Johnson City, Llano, Burnet, Mason, and
              Blanco each carry their own land economics, water profile, and
              buyer pool. Echelon Property Group advises across all of them.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="w-full h-[440px] md:h-[600px] lg:h-[660px] bg-secondary/40" />
            }
          >
            <LandRanchMap />
          </Suspense>
        </div>
      </section>

      {/* ── RANCH OWNERSHIP CATEGORIES ───────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-12 md:mb-14">
            <p className="text-gold mb-5" style={labelStyle}>
              OWNERSHIP CATEGORIES
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-architectural leading-[1.1]">
              Three ways buyers acquire in the Hill Country
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {categories.map((c) => (
              <Link
                key={c.name}
                to={c.href}
                className="group block"
                aria-label={`Discuss ${c.name}`}
              >
                <div
                  className="relative overflow-hidden rounded-[2px]"
                  style={{ aspectRatio: "4 / 5" }}
                >
                  <img
                    src={c.image}
                    alt={`${c.name} in the Texas Hill Country`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(12,15,36,0.55) 0%, rgba(12,15,36,0.10) 55%, rgba(12,15,36,0) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
                    <p
                      className="mb-2"
                      style={{ ...labelStyle, color: "#b9a06c", fontSize: "0.55rem" }}
                    >
                      {c.eyebrow}
                    </p>
                    <h3 className="font-display text-[1.4rem] md:text-[1.55rem] leading-[1.15]">
                      {c.name}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-[0.95rem] leading-[1.7] mt-5 max-w-[42ch]">
                  {c.body}
                </p>
                <span
                  className="inline-flex items-center gap-2 mt-4 text-architectural group-hover:text-gold transition-colors duration-300"
                  style={{ ...labelStyle, fontSize: "0.6rem" }}
                >
                  Discuss this category
                  <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX VISUAL BREAK 2 ───────────────────────── */}
      <section
        aria-hidden="true"
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(420px, 50vh, 600px)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${parallaxTwo})`,
            backgroundAttachment: "fixed",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(12,15,36,0.10) 0%, rgba(12,15,36,0) 50%, rgba(12,15,36,0.18) 100%)",
          }}
        />
      </section>
    </>
  );
};

export default HillCountryEnhancements;
