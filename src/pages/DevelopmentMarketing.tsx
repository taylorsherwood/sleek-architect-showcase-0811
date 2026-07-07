import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import OptimizedImage from "@/components/OptimizedImage";

import heroImg from "@/assets/development-marketing/arbors-hero.jpg";
import detailImg from "@/assets/development-marketing/arbors-detail.jpg";
import interiorImg from "@/assets/development-marketing/arbors-interior.jpg";
import brandImg from "@/assets/development-marketing/brand-package.jpg";
import signageImg from "@/assets/development-marketing/site-signage.jpg";
import renderingImg from "@/assets/development-marketing/arbors-rendering.jpg";
import fenceImg from "@/assets/development-marketing/construction-fence.jpg";
import sitePlanImg from "@/assets/development-marketing/site-plan.jpg";

/* ── Palette (scoped locally to this page only) ──
   Deep Olive   #3F4A2A
   Warm Ivory   #F6F1E6
   Bronze       #A87C4F
   Limestone    #E7DFCB
   Charcoal     #1F1D1A
   Muted Sage   #8B9179
*/
const C = {
  olive: "#3F4A2A",
  oliveDeep: "#2E361E",
  ivory: "#F6F1E6",
  ivoryDeep: "#EFE7D4",
  bronze: "#A87C4F",
  limestone: "#E7DFCB",
  charcoal: "#1F1D1A",
  sage: "#8B9179",
};

const eyebrow = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "0.65rem",
  letterSpacing: "0.42em",
  textTransform: "uppercase" as const,
  fontWeight: 500,
};

const serif = { fontFamily: '"Cinzel", "Cormorant Garamond", serif' };

/* ─────────────────────────────────────────────
   Inline SVG: Arbors identity mark
   ───────────────────────────────────────────── */
const ArborsMark = ({ size = 48, color = C.bronze }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
    <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round">
      <path d="M32 6 L32 58" />
      <path d="M32 18 C 20 20, 14 30, 18 44" />
      <path d="M32 18 C 44 20, 50 30, 46 44" />
      <path d="M32 30 C 24 32, 22 40, 26 50" />
      <path d="M32 30 C 40 32, 42 40, 38 50" />
      <circle cx="32" cy="58" r="1.6" fill={color} stroke="none" />
    </g>
  </svg>
);

/* ─────────────────────────────────────────────
   Interactive site plan (14 lots)
   ───────────────────────────────────────────── */
const LOTS = [
  { id: 1, x: 120, y: 140, status: "reserved", beds: 4, sqft: 3820 },
  { id: 2, x: 200, y: 120, status: "available", beds: 4, sqft: 3960 },
  { id: 3, x: 285, y: 130, status: "available", beds: 5, sqft: 4210 },
  { id: 4, x: 370, y: 155, status: "sold", beds: 4, sqft: 3720 },
  { id: 5, x: 455, y: 180, status: "available", beds: 5, sqft: 4380 },
  { id: 6, x: 540, y: 215, status: "reserved", beds: 4, sqft: 3910 },
  { id: 7, x: 610, y: 265, status: "available", beds: 5, sqft: 4520 },
  { id: 8, x: 610, y: 350, status: "available", beds: 4, sqft: 3860 },
  { id: 9, x: 540, y: 400, status: "sold", beds: 4, sqft: 3780 },
  { id: 10, x: 455, y: 435, status: "available", beds: 5, sqft: 4290 },
  { id: 11, x: 370, y: 460, status: "reserved", beds: 4, sqft: 3900 },
  { id: 12, x: 285, y: 485, status: "available", beds: 5, sqft: 4460 },
  { id: 13, x: 200, y: 470, status: "available", beds: 4, sqft: 3810 },
  { id: 14, x: 130, y: 430, status: "available", beds: 5, sqft: 4340 },
];
const statusColor = (s: string) =>
  s === "sold" ? C.charcoal : s === "reserved" ? C.bronze : C.olive;

const InteractiveSitePlan = () => {
  const [active, setActive] = useState<number | null>(3);
  const lot = LOTS.find((l) => l.id === active);
  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
      <div style={{ background: C.ivory, border: `1px solid ${C.limestone}` }} className="p-4 md:p-6">
        <svg viewBox="0 0 740 600" className="w-full h-auto block" role="img" aria-label="Sample interactive site plan">
          {/* topo rings */}
          {[...Array(9)].map((_, i) => (
            <ellipse
              key={i}
              cx="370"
              cy="300"
              rx={340 - i * 30}
              ry={250 - i * 22}
              fill="none"
              stroke={C.limestone}
              strokeWidth="0.6"
            />
          ))}
          {/* drive path */}
          <path
            d="M40 300 C 160 220, 260 200, 370 260 S 620 380, 720 320"
            fill="none"
            stroke={C.sage}
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.7"
          />
          {/* oaks */}
          {[[170, 260], [340, 210], [500, 240], [220, 380], [430, 380], [560, 340]].map(
            ([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="42" fill={C.sage} opacity="0.14" />
            )
          )}
          {/* lots */}
          {LOTS.map((l) => {
            const isActive = active === l.id;
            return (
              <g
                key={l.id}
                transform={`translate(${l.x - 18}, ${l.y - 18})`}
                onMouseEnter={() => setActive(l.id)}
                onFocus={() => setActive(l.id)}
                onClick={() => setActive(l.id)}
                tabIndex={0}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <rect
                  width="36"
                  height="36"
                  fill={statusColor(l.status)}
                  opacity={isActive ? 1 : 0.82}
                  style={{ transition: "opacity 300ms ease" }}
                />
                <text
                  x="18"
                  y="22"
                  textAnchor="middle"
                  fill={C.ivory}
                  fontFamily='"Jost", sans-serif'
                  fontSize="12"
                  fontWeight="500"
                >
                  {l.id}
                </text>
                {isActive && (
                  <rect
                    x="-3"
                    y="-3"
                    width="42"
                    height="42"
                    fill="none"
                    stroke={C.bronze}
                    strokeWidth="1"
                  />
                )}
              </g>
            );
          })}
          {/* compass */}
          <g transform="translate(680, 60)" opacity="0.5">
            <circle r="16" fill="none" stroke={C.charcoal} strokeWidth="0.6" />
            <path d="M0 -14 L3 0 L0 14 L-3 0 Z" fill={C.charcoal} />
            <text y="-20" textAnchor="middle" fontSize="8" fill={C.charcoal} fontFamily='"Jost", sans-serif' letterSpacing="2">
              N
            </text>
          </g>
        </svg>
      </div>

      <div>
        <div style={{ ...eyebrow, color: C.bronze }} className="mb-4">
          Concept Site Plan · 14 Residences
        </div>
        <div className="flex gap-5 mb-8" style={eyebrow}>
          {[
            ["Available", C.olive],
            ["Reserved", C.bronze],
            ["Sold", C.charcoal],
          ].map(([label, color]) => (
            <div key={label} className="flex items-center gap-2" style={{ color: C.charcoal }}>
              <span style={{ width: 10, height: 10, background: color, display: "inline-block" }} />
              {label}
            </div>
          ))}
        </div>

        {lot && (
          <div style={{ borderTop: `1px solid ${C.limestone}` }} className="pt-6">
            <div style={{ ...eyebrow, color: C.sage }}>Residence No.</div>
            <div style={serif} className="text-6xl md:text-7xl leading-none mt-1" >
              {String(lot.id).padStart(2, "0")}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4" style={eyebrow}>
              <div>
                <div style={{ color: C.sage }}>Status</div>
                <div className="mt-1" style={{ color: statusColor(lot.status), letterSpacing: "0.2em" }}>
                  {lot.status}
                </div>
              </div>
              <div>
                <div style={{ color: C.sage }}>Bedrooms</div>
                <div className="mt-1" style={{ color: C.charcoal, letterSpacing: "0.2em" }}>{lot.beds}</div>
              </div>
              <div>
                <div style={{ color: C.sage }}>Sq Ft</div>
                <div className="mt-1" style={{ color: C.charcoal, letterSpacing: "0.2em" }}>
                  {lot.sqft.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-6 text-xs" style={{ color: C.sage, fontFamily: '"Jost", sans-serif', letterSpacing: "0.05em" }}>
              Sample data. Concept experience for demonstration only.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Sticky scroll storytelling: From Dirt To Sold Out
   ───────────────────────────────────────────── */
const PHASES = [
  {
    n: "01",
    title: "Land Acquisition",
    body: "We evaluate topography, entitlement, tree canopy, and buyer psychology before a single lot line is drawn. The community's ceiling is set here.",
    detail: "Feasibility · Yield studies · Positioning brief",
  },
  {
    n: "02",
    title: "Brand Creation",
    body: "A name, a mark, a language. We give the community a voice buyers can repeat before the first foundation is poured.",
    detail: "Naming · Identity · Messaging · Palette",
  },
  {
    n: "03",
    title: "Marketing Production",
    body: "Architectural photography, aerial film, renderings, brochures, signage, and a website that reads like a magazine, not a listing.",
    detail: "Photography · Film · Print · Signage · Web",
  },
  {
    n: "04",
    title: "VIP Launch",
    body: "A curated pre-release to our private buyer network and cooperating agents. Momentum begins before the public knows the name.",
    detail: "Priority list · Broker preview · Private tours",
  },
  {
    n: "05",
    title: "Public Release",
    body: "Coordinated media, paid, social, and search. The community enters the market with a story already in motion.",
    detail: "PR · Paid media · Editorial · SEO",
  },
  {
    n: "06",
    title: "Sellout",
    body: "Absorption monitored weekly. Pricing, messaging, and inventory strategy adjusted with the discipline of an asset manager.",
    detail: "Absorption · Repricing · Broker relations · Final release",
  },
];

const StickyPhases = () => {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24">
      {/* Sticky visual */}
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <div style={{ background: C.ivoryDeep, border: `1px solid ${C.limestone}` }} className="p-8">
            <div style={{ ...eyebrow, color: C.bronze }}>Phase</div>
            <div style={serif} className="text-[9rem] leading-none mt-2" >
              {PHASES[active].n}
            </div>
            <div style={serif} className="text-3xl mt-6" >
              {PHASES[active].title}
            </div>
            <div
              className="mt-6 pt-6"
              style={{ ...eyebrow, color: C.sage, borderTop: `1px solid ${C.limestone}` }}
            >
              {PHASES[active].detail}
            </div>

            {/* progress */}
            <div className="mt-10 flex gap-2">
              {PHASES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 2,
                    flex: 1,
                    background: i <= active ? C.olive : C.limestone,
                    transition: "background 500ms ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling phases */}
      <div className="space-y-32 lg:space-y-56">
        {PHASES.map((p, i) => (
          <div
            key={p.n}
            ref={(el) => (refs.current[i] = el)}
            className="min-h-[40vh]"
          >
            <div style={{ ...eyebrow, color: C.bronze }} className="lg:hidden mb-3">
              Phase {p.n}
            </div>
            <div style={serif} className="text-3xl md:text-5xl leading-[1.05]" >
              {p.title}
            </div>
            <div
              className="mt-6 max-w-lg"
              style={{ color: C.charcoal, fontFamily: '"Jost", sans-serif', fontSize: "1.05rem", lineHeight: 1.7 }}
            >
              {p.body}
            </div>
            <div
              className="mt-8 pt-6 max-w-lg"
              style={{ ...eyebrow, color: C.sage, borderTop: `1px solid ${C.limestone}` }}
            >
              {p.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Everything We Build – 6 cards
   ───────────────────────────────────────────── */
const CAPABILITIES = [
  {
    kicker: "01",
    title: "Brand Strategy",
    items: ["Naming", "Identity", "Messaging", "Positioning"],
  },
  {
    kicker: "02",
    title: "Website Experience",
    items: ["Custom websites", "Interactive site plans", "Availability", "Floor plans", "Neighborhood guides"],
  },
  {
    kicker: "03",
    title: "Photography + Film",
    items: ["Architecture", "Drone", "Lifestyle", "Construction"],
  },
  {
    kicker: "04",
    title: "Launch Campaigns",
    items: ["SEO", "Paid media", "Social", "Email", "Remarketing"],
  },
  {
    kicker: "05",
    title: "Sales Platform",
    items: ["CRM", "Lead routing", "Buyer portal", "Broker portal", "Inventory"],
  },
  {
    kicker: "06",
    title: "Analytics",
    items: ["Traffic", "Conversions", "Absorption", "Lead attribution", "Reporting"],
  },
];

/* ─────────────────────────────────────────────
   Floor plan mockup (inline SVG)
   ───────────────────────────────────────────── */
const FloorPlanMock = () => (
  <svg viewBox="0 0 600 420" className="w-full h-auto" role="img" aria-label="Sample floor plan">
    <rect x="0" y="0" width="600" height="420" fill={C.ivory} />
    {/* outer */}
    <rect x="40" y="40" width="520" height="340" fill="none" stroke={C.charcoal} strokeWidth="2" />
    {/* rooms */}
    <line x1="40" y1="180" x2="360" y2="180" stroke={C.charcoal} strokeWidth="1.2" />
    <line x1="360" y1="40" x2="360" y2="380" stroke={C.charcoal} strokeWidth="1.2" />
    <line x1="200" y1="180" x2="200" y2="380" stroke={C.charcoal} strokeWidth="1.2" />
    <line x1="360" y1="230" x2="560" y2="230" stroke={C.charcoal} strokeWidth="1.2" />

    {/* labels */}
    {[
      [200, 110, "GREAT ROOM"],
      [280, 290, "KITCHEN"],
      [120, 290, "DINING"],
      [460, 130, "PRIMARY"],
      [460, 310, "OFFICE"],
    ].map(([x, y, t], i) => (
      <text
        key={i}
        x={x as number}
        y={y as number}
        textAnchor="middle"
        fill={C.charcoal}
        fontFamily='"Jost", sans-serif'
        fontSize="10"
        letterSpacing="3"
      >
        {t as string}
      </text>
    ))}
    {/* fixtures */}
    <circle cx="440" cy="150" r="14" fill="none" stroke={C.bronze} strokeWidth="1" />
    <rect x="220" y="260" width="60" height="18" fill="none" stroke={C.bronze} strokeWidth="1" />
    <rect x="80" y="250" width="80" height="40" fill="none" stroke={C.bronze} strokeWidth="1" />
    {/* scale */}
    <line x1="40" y1="400" x2="140" y2="400" stroke={C.charcoal} strokeWidth="1" />
    <text x="90" y="415" textAnchor="middle" fontSize="8" fill={C.charcoal} fontFamily='"Jost", sans-serif' letterSpacing="2">
      10 FT
    </text>
  </svg>
);

/* ─────────────────────────────────────────────
   Dashboard mockup
   ───────────────────────────────────────────── */
const DashboardMock = () => (
  <div
    style={{ background: "#141311", border: `1px solid ${C.charcoal}` }}
    className="p-5 md:p-7"
  >
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <ArborsMark size={22} color={C.bronze} />
        <div style={{ ...eyebrow, color: C.limestone }}>Builder Dashboard · The Arbors</div>
      </div>
      <div style={{ ...eyebrow, color: C.sage }}>Live · Sample Data</div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
      {[
        ["Leads (30d)", "184", "+22%"],
        ["Tours", "41", "+9%"],
        ["Reserved", "3 / 14", ""],
        ["Absorption", "1.4 / mo", ""],
      ].map(([k, v, d], i) => (
        <div key={i} style={{ background: "#1C1B18", border: `1px solid #2A2925` }} className="p-4">
          <div style={{ ...eyebrow, color: C.sage }}>{k}</div>
          <div style={serif} className="text-2xl mt-2" >{v}</div>
          {d && (
            <div style={{ ...eyebrow, color: C.bronze }} className="mt-1">{d}</div>
          )}
        </div>
      ))}
    </div>

    <div className="grid md:grid-cols-[2fr_1fr] gap-4">
      <div style={{ background: "#1C1B18", border: `1px solid #2A2925` }} className="p-5">
        <div style={{ ...eyebrow, color: C.sage }} className="mb-4">Weekly Traffic</div>
        <svg viewBox="0 0 320 100" className="w-full h-24">
          <polyline
            fill="none"
            stroke={C.bronze}
            strokeWidth="1.5"
            points="0,80 30,70 60,60 90,72 120,55 150,45 180,50 210,35 240,40 270,25 300,20 320,15"
          />
          <polyline
            fill="none"
            stroke={C.sage}
            strokeWidth="1"
            strokeDasharray="3 4"
            points="0,90 40,85 80,78 120,80 160,72 200,68 240,60 280,55 320,50"
          />
        </svg>
      </div>
      <div style={{ background: "#1C1B18", border: `1px solid #2A2925` }} className="p-5">
        <div style={{ ...eyebrow, color: C.sage }} className="mb-4">Lead Source</div>
        {[
          ["Direct", 42],
          ["Organic", 27],
          ["Paid", 19],
          ["Referral", 12],
        ].map(([label, pct]) => (
          <div key={label as string} className="mb-3 last:mb-0">
            <div className="flex justify-between text-[10px]" style={{ color: C.limestone, fontFamily: '"Jost", sans-serif', letterSpacing: "0.15em", textTransform: "uppercase" }}>
              <span>{label}</span><span>{pct}%</span>
            </div>
            <div style={{ background: "#2A2925", height: 3, marginTop: 4 }}>
              <div style={{ background: C.bronze, height: 3, width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */
const DevelopmentMarketing = () => {
  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.echelonpropertygroup.com/" },
    { name: "Development Marketing", url: "https://www.echelonpropertygroup.com/development-marketing" },
  ]);

  return (
    <div style={{ background: C.ivory, color: C.charcoal }}>
      <SEOHead
        title="Development Marketing"
        description="Echelon Property Group creates complete marketing ecosystems for residential developments — brand, website, photography, sales technology, and launch strategy."
        canonical="/development-marketing"
      />
      <SchemaMarkup schema={breadcrumb} />
      <Navigation />

      {/* ─────────── HERO ─────────── */}
      <section className="relative min-h-[100svh] w-full overflow-hidden pt-32 md:pt-28 lg:pt-[6.5rem]">
        <OptimizedImage
          src={heroImg}
          alt="Sample luxury development in west Austin hill country"
          priority
          width={1920}
          height={1088}
          className="absolute inset-0 w-full h-full"
          objectFit="cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(31,29,26,0.35) 0%, rgba(31,29,26,0.55) 55%, rgba(31,29,26,0.85) 100%)`,
          }}
        />
        <div className="relative container mx-auto px-6 md:px-10 flex h-full items-center pb-16 md:pb-24 lg:pb-32 min-h-[calc(100svh-8rem)]">
          <div className="max-w-4xl">
            <div style={{ ...eyebrow, color: C.limestone }} className="mb-8">
              <span style={{ color: C.bronze }}>◆</span>&nbsp;&nbsp;Development Marketing
            </div>
            <h1
              style={{ ...serif, color: C.ivory }}
              className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight"
            >
              We Don't Just Market Homes.
              <br />
              <span style={{ color: C.bronze }}>We Build Desire</span>
              <br />
              For Entire Communities.
            </h1>
            <p
              className="mt-8 md:mt-10 max-w-2xl"
              style={{ color: "#E7DFCB", fontFamily: '"Jost", sans-serif', fontSize: "1.05rem", lineHeight: 1.75 }}
            >
              From branding and websites to photography, technology, and sales strategy,
              Echelon creates complete marketing ecosystems that help residential
              communities launch stronger, sell faster, and command premium pricing.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="#sample-community"
                className="inline-block px-9 py-4 transition-all duration-500"
                style={{ ...eyebrow, background: C.bronze, color: C.ivory, border: `1px solid ${C.bronze}` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.bronze; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = C.bronze; e.currentTarget.style.color = C.ivory; }}
              >
                Explore Sample Community
              </a>
              <Link
                to="/contact"
                className="inline-block px-9 py-4 transition-all duration-500"
                style={{ ...eyebrow, background: "transparent", color: C.ivory, border: `1px solid ${C.ivory}` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.ivory; e.currentTarget.style.color = C.charcoal; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.ivory; }}
              >
                Schedule Developer Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── SECTION: A Community Begins Long Before Construction ─────────── */}
      <section className="py-28 md:py-40" style={{ background: C.ivory }}>
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <div style={{ ...eyebrow, color: C.bronze }} className="mb-6">
                Chapter One
              </div>
              <h2 style={serif} className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]" >
                A Community Begins
                <br />
                <span style={{ color: C.olive }}>Long Before Construction.</span>
              </h2>
              <div className="mt-10 space-y-6" style={{ color: C.charcoal, fontFamily: '"Jost", sans-serif', fontSize: "1.05rem", lineHeight: 1.8 }}>
                <p>
                  The most successful residential developments aren't collections of
                  homes. They're brands. A story buyers repeat to their friends before
                  the first slab is poured, and a promise that the finished community
                  will live up to.
                </p>
                <p>
                  Echelon partners with builders and developers to design that story
                  from the ground up. We shape identity, positioning, and marketing
                  architecture with the same rigor an architect brings to a plan —
                  so the finished community sells at the price it was designed to
                  command.
                </p>
              </div>
              <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${C.limestone}` }}>
                <div style={{ ...eyebrow, color: C.sage }}>Partnered With</div>
                <div style={serif} className="text-2xl mt-3" >
                  Boutique builders · Custom home builders · Master-planned developers
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="relative">
                <OptimizedImage
                  src={interiorImg}
                  alt="Warm modern interior with limestone fireplace and live oak view"
                  width={1600}
                  height={1000}
                  className="w-full h-auto"
                  objectFit="cover"
                />
                <div
                  className="absolute -bottom-8 -left-8 hidden md:block p-6"
                  style={{ background: C.ivory, border: `1px solid ${C.limestone}`, maxWidth: 260 }}
                >
                  <div style={{ ...eyebrow, color: C.bronze }}>Concept Reference</div>
                  <div style={serif} className="text-lg mt-2 leading-snug" >
                    The Arbors · Residence 03
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─────────── SECTION: Everything We Build ─────────── */}
      <section className="py-28 md:py-40" style={{ background: C.ivoryDeep }}>
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div style={{ ...eyebrow, color: C.bronze }} className="mb-6">
                Capabilities
              </div>
              <h2 style={serif} className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]" >
                Everything We Build.
              </h2>
              <p className="mt-6 max-w-xl" style={{ fontFamily: '"Jost", sans-serif', fontSize: "1.05rem", lineHeight: 1.8, color: C.charcoal }}>
                Six disciplines, one integrated team. Delivered on time, on brand,
                and in service of a single number: absorption.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px mt-16" style={{ background: C.limestone }}>
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="p-8 md:p-10 transition-colors duration-500 group"
                style={{ background: C.ivoryDeep }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.ivory; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = C.ivoryDeep; }}
              >
                <div className="flex items-baseline justify-between">
                  <div style={{ ...eyebrow, color: C.sage }}>{cap.kicker}</div>
                  <ArborsMark size={22} color={C.limestone} />
                </div>
                <div style={serif} className="text-3xl mt-6 leading-tight" >
                  {cap.title}
                </div>
                <ul className="mt-8 space-y-3" style={{ fontFamily: '"Jost", sans-serif', fontSize: "0.85rem", color: C.charcoal, letterSpacing: "0.02em" }}>
                  {cap.items.map((it) => (
                    <li key={it} className="flex items-center gap-3">
                      <span style={{ width: 14, height: 1, background: C.bronze, display: "inline-block" }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SIGNATURE: From Dirt To Sold Out ─────────── */}
      <section className="py-28 md:py-40" style={{ background: C.ivory }}>
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="max-w-3xl mb-20 lg:mb-28">
              <div style={{ ...eyebrow, color: C.bronze }} className="mb-6">
                Signature Process
              </div>
              <h2 style={serif} className="text-4xl md:text-5xl lg:text-7xl leading-[1.02]" >
                From Dirt
                <br />
                <span style={{ color: C.olive }}>To Sold Out.</span>
              </h2>
            </div>
          </ScrollReveal>
          <StickyPhases />
        </div>
      </section>

      {/* ─────────── SHOWCASE: The Arbors ─────────── */}
      <section id="sample-community" className="relative py-28 md:py-40" style={{ background: C.oliveDeep, color: C.ivory }}>
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <div>
                <div style={{ ...eyebrow, color: C.bronze }} className="mb-4 flex items-center gap-3">
                  <ArborsMark size={18} color={C.bronze} />
                  Sample Development Experience
                </div>
                <div style={serif} className="text-5xl md:text-7xl lg:text-8xl leading-[0.95]" >
                  The Arbors
                </div>
                <div className="mt-4" style={{ ...eyebrow, color: C.limestone }}>
                  West Austin · 14 Residences · Concept Experience
                </div>
              </div>
              <div className="max-w-md" style={{ fontFamily: '"Jost", sans-serif', fontSize: "0.95rem", lineHeight: 1.8, color: C.limestone }}>
                A fictional community created to demonstrate what Echelon produces for
                developer partners. Every mockup on this page — brand, website,
                signage, dashboard — is conceptual.
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-8">
              <OptimizedImage src={renderingImg} alt="The Arbors — sample residence rendering" width={1600} height={1000} className="w-full h-auto" objectFit="cover" />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
              <OptimizedImage src={detailImg} alt="Facade detail — sample" width={1400} height={1750} className="w-full h-auto" objectFit="cover" />
              <div style={{ border: `1px solid ${C.bronze}` }} className="p-6">
                <div style={{ ...eyebrow, color: C.bronze }}>Demonstration Project</div>
                <div style={serif} className="text-xl mt-3 leading-snug" >
                  Not an active listing. Created to showcase Echelon's development marketing capability.
                </div>
              </div>
            </div>
          </div>

          {/* Fact strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16" style={{ background: `${C.bronze}55` }}>
            {[
              ["Residences", "14"],
              ["Architecture", "Warm Modern"],
              ["Sq Ft Range", "3,700 – 4,600"],
              ["Concept Range", "$3.4M – $5.9M"],
            ].map(([k, v]) => (
              <div key={k} className="p-6 md:p-8" style={{ background: C.oliveDeep }}>
                <div style={{ ...eyebrow, color: C.bronze }}>{k}</div>
                <div style={serif} className="text-2xl md:text-3xl mt-3" >{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Interactive site plan ─────────── */}
      <section className="py-28 md:py-40" style={{ background: C.ivoryDeep }}>
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="max-w-2xl mb-16">
              <div style={{ ...eyebrow, color: C.bronze }} className="mb-6">Interactive Site Plan</div>
              <h2 style={serif} className="text-3xl md:text-5xl leading-tight" >
                Hover a residence. Watch inventory come to life.
              </h2>
              <p className="mt-6" style={{ fontFamily: '"Jost", sans-serif', fontSize: "1rem", lineHeight: 1.8, color: C.charcoal }}>
                Every Echelon community website ships with a live site plan wired to
                CRM inventory. Availability, floor plans, and pricing update in real
                time — for buyers, brokers, and the builder.
              </p>
            </div>
          </ScrollReveal>
          <InteractiveSitePlan />
        </div>
      </section>

      {/* ─────────── Floor plans + Finish palette ─────────── */}
      <section className="py-28 md:py-40" style={{ background: C.ivory }}>
        <div className="container mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <ScrollReveal>
            <div style={{ ...eyebrow, color: C.bronze }} className="mb-6">Floor Plan · Sample</div>
            <h3 style={serif} className="text-3xl md:text-4xl mb-8" >Residence 03 · The Live Oak</h3>
            <div style={{ background: C.ivoryDeep, border: `1px solid ${C.limestone}` }} className="p-6">
              <FloorPlanMock />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4" style={eyebrow}>
              {[["4", "Beds"], ["4.5", "Baths"], ["4,210", "Sq Ft"]].map(([v, k]) => (
                <div key={k}>
                  <div style={serif} className="text-3xl" >{v}</div>
                  <div style={{ color: C.sage, marginTop: 4 }}>{k}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div style={{ ...eyebrow, color: C.bronze }} className="mb-6">Finish Palette · Sample</div>
            <h3 style={serif} className="text-3xl md:text-4xl mb-8" >Warm Modern · Standard Package</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Natural Limestone", swatch: C.limestone, note: "Exterior base · Fireplace" },
                { name: "White Oak", swatch: "#C9A97A", note: "Flooring · Cabinetry" },
                { name: "Warm Ivory Stucco", swatch: C.ivory, note: "Exterior body" },
                { name: "Black Steel", swatch: C.charcoal, note: "Windows · Doors" },
                { name: "Muted Sage", swatch: C.sage, note: "Landscape accent" },
                { name: "Bronze", swatch: C.bronze, note: "Hardware · Fixtures" },
              ].map((s) => (
                <div key={s.name} style={{ border: `1px solid ${C.limestone}` }} className="p-4">
                  <div style={{ background: s.swatch, height: 90 }} />
                  <div style={serif} className="text-lg mt-4" >{s.name}</div>
                  <div style={{ ...eyebrow, color: C.sage, marginTop: 6 }}>{s.note}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────── Visuals gallery: mockups ─────────── */}
      <section className="py-28 md:py-40" style={{ background: C.ivoryDeep }}>
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="max-w-2xl mb-16">
              <div style={{ ...eyebrow, color: C.bronze }} className="mb-6">Marketing Ecosystem</div>
              <h2 style={serif} className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]" >
                One community.
                <br />
                Every touchpoint.
              </h2>
              <p className="mt-6" style={{ fontFamily: '"Jost", sans-serif', fontSize: "1rem", lineHeight: 1.8, color: C.charcoal }}>
                A cohesive system — from the first Instagram post to the printed
                brochure a buyer takes home from the sales gallery.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Brochure */}
            <div className="col-span-12 lg:col-span-7 relative">
              <OptimizedImage src={brandImg} alt="Sample brand collateral for The Arbors" width={1600} height={1000} className="w-full h-auto" objectFit="cover" />
              <div className="absolute bottom-5 left-5" style={{ background: C.ivory, padding: "10px 16px" }}>
                <div style={{ ...eyebrow, color: C.bronze }}>Brand Collateral</div>
              </div>
            </div>

            {/* Site signage */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-5 relative">
              <OptimizedImage src={signageImg} alt="Sample entrance signage" width={1400} height={1750} className="w-full h-96 lg:h-full" objectFit="cover" />
              <div className="absolute bottom-5 left-5" style={{ background: C.ivory, padding: "10px 16px" }}>
                <div style={{ ...eyebrow, color: C.bronze }}>Entrance Signage</div>
              </div>
            </div>

            {/* Construction fence */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-5 relative">
              <OptimizedImage src={fenceImg} alt="Sample construction fence branding" width={1600} height={1400} className="w-full h-96 lg:h-full" objectFit="cover" />
              <div className="absolute bottom-5 left-5" style={{ background: C.ivory, padding: "10px 16px" }}>
                <div style={{ ...eyebrow, color: C.bronze }}>Construction Fencing</div>
              </div>
            </div>

            {/* Instagram mock */}
            <div className="col-span-12 lg:col-span-7">
              <div style={{ background: C.ivory, border: `1px solid ${C.limestone}` }} className="p-6 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ background: C.olive, width: 40, height: 40, borderRadius: "50%" }} className="flex items-center justify-center">
                    <ArborsMark size={22} color={C.bronze} />
                  </div>
                  <div>
                    <div style={{ ...eyebrow, color: C.charcoal }}>@thearbors.austin</div>
                    <div style={{ ...eyebrow, color: C.sage, fontSize: "0.55rem" }}>West Austin · Boutique Community</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[detailImg, interiorImg, renderingImg, brandImg, signageImg, fenceImg, sitePlanImg, heroImg, detailImg].map((s, i) => (
                    <div key={i} style={{ paddingBottom: "100%", position: "relative", overflow: "hidden" }}>
                      <OptimizedImage src={s} alt="" width={400} height={400} className="absolute inset-0 w-full h-full" objectFit="cover" />
                    </div>
                  ))}
                </div>
                <div className="mt-4" style={{ ...eyebrow, color: C.sage }}>Instagram Feed · Curated Rollout</div>
              </div>
            </div>

            {/* Sales presentation card */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-6">
              <div style={{ background: C.charcoal, color: C.ivory }} className="p-8 md:p-12 h-full flex flex-col justify-between">
                <div>
                  <div style={{ ...eyebrow, color: C.bronze }}>Sales Presentation</div>
                  <div style={serif} className="text-3xl md:text-4xl mt-6" >
                    Live inventory. Priced positioning. Broker-ready in every meeting.
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-4">
                  {["Keynote", "Print", "iPad"].map((f) => (
                    <div key={f} style={{ ...eyebrow, color: C.limestone, borderTop: `1px solid ${C.bronze}55`, paddingTop: 10 }}>{f}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* QR signage */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-6">
              <div style={{ background: C.olive, color: C.ivory }} className="p-8 md:p-12 h-full flex flex-col justify-between">
                <div>
                  <div style={{ ...eyebrow, color: C.limestone }}>QR Campaigns</div>
                  <div style={serif} className="text-3xl md:text-4xl mt-6" >
                    Signage that closes the loop between a drive-by and a scheduled tour.
                  </div>
                </div>
                <div className="mt-10 flex items-center gap-6">
                  {/* stylized QR */}
                  <svg viewBox="0 0 80 80" width="88" height="88">
                    <rect width="80" height="80" fill={C.ivory} />
                    {Array.from({ length: 100 }).map((_, i) => {
                      const x = (i % 10) * 8;
                      const y = Math.floor(i / 10) * 8;
                      const on = (i * 37) % 5 < 2;
                      return on ? <rect key={i} x={x} y={y} width="8" height="8" fill={C.charcoal} /> : null;
                    })}
                    <rect x="0" y="0" width="24" height="24" fill={C.ivory} />
                    <rect x="4" y="4" width="16" height="16" fill={C.charcoal} />
                    <rect x="8" y="8" width="8" height="8" fill={C.ivory} />
                  </svg>
                  <div style={{ ...eyebrow, color: C.limestone }}>Scan · Tour · Reserve</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── TECHNOLOGY DARK SECTION ─────────── */}
      <section className="py-28 md:py-40" style={{ background: "#0F0E0C", color: C.ivory }}>
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24">
            <ScrollReveal>
              <div style={{ ...eyebrow, color: C.bronze }} className="mb-6">Technology</div>
              <h2 style={serif} className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]" >
                The engine
                <br />
                <span style={{ color: C.bronze }}>behind the brand.</span>
              </h2>
              <p className="mt-8 max-w-md" style={{ fontFamily: '"Jost", sans-serif', fontSize: "1rem", lineHeight: 1.8, color: C.limestone }}>
                Every Echelon community runs on the same platform we've refined
                across our own luxury practice. Purpose-built for developers who
                measure marketing in absorption, not impressions.
              </p>
              <ul className="mt-10 space-y-3" style={{ ...eyebrow, color: C.limestone }}>
                {[
                  "Interactive availability",
                  "Buyer portal",
                  "Broker portal",
                  "RealScout integration",
                  "CRM · Lead routing",
                  "Analytics · Attribution",
                  "AI search optimization",
                  "QR campaigns",
                  "Construction updates",
                ].map((it) => (
                  <li key={it} className="flex items-center gap-3">
                    <span style={{ width: 14, height: 1, background: C.bronze }} />
                    {it}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <DashboardMock />
              <div className="mt-4" style={{ ...eyebrow, color: C.sage }}>Sample dashboard · Concept data</div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─────────── WHY ECHELON ─────────── */}
      <section className="py-28 md:py-40" style={{ background: C.ivory }}>
        <div className="container mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="max-w-2xl mb-16">
              <div style={{ ...eyebrow, color: C.bronze }} className="mb-6">Why Echelon</div>
              <h2 style={serif} className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]" >
                Three disciplines,
                <br />
                one team.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                k: "01",
                t: "Brand",
                b: "We operate like a creative studio, not a listing brokerage. The community's identity is written before its street names.",
              },
              {
                k: "02",
                t: "Sales",
                b: "A working luxury practice with real absorption experience — not a marketing agency guessing at buyer behavior.",
              },
              {
                k: "03",
                t: "Technology",
                b: "In-house platform tuned across dozens of communities. No agency middleware, no rented tools, no dead ends.",
              },
            ].map((c) => (
              <div key={c.k}>
                <div style={{ ...eyebrow, color: C.bronze }}>{c.k}</div>
                <div style={serif} className="text-4xl mt-4 leading-tight" >{c.t}</div>
                <div className="mt-6" style={{ fontFamily: '"Jost", sans-serif', fontSize: "1rem", lineHeight: 1.8, color: C.charcoal }}>
                  {c.b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FINAL CTA ─────────── */}
      <section className="relative py-32 md:py-48 overflow-hidden" style={{ background: C.oliveDeep, color: C.ivory }}>
        <OptimizedImage src={sitePlanImg} alt="" width={1600} height={1200} className="absolute inset-0 w-full h-full" objectFit="cover" style={{ opacity: 0.08 }} />
        <div className="relative container mx-auto px-6 md:px-10 text-center max-w-5xl">
          <div style={{ ...eyebrow, color: C.bronze }} className="mb-8">Development Partnership</div>
          <h2 style={serif} className="text-4xl md:text-6xl lg:text-7xl leading-[1.05]" >
            Great Communities Are Remembered
            <br />
            <span style={{ color: C.bronze }}>Long Before They're Finished.</span>
          </h2>
          <p className="mt-10 mx-auto max-w-2xl" style={{ fontFamily: '"Jost", sans-serif', fontSize: "1.05rem", lineHeight: 1.8, color: C.limestone }}>
            Whether you're building six luxury residences or an entire master-planned
            community, Echelon creates the strategy, identity, technology, and
            marketing experience that transforms projects into destinations.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block px-10 py-4 transition-all duration-500"
              style={{ ...eyebrow, background: C.bronze, color: C.ivory, border: `1px solid ${C.bronze}` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.bronze; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = C.bronze; e.currentTarget.style.color = C.ivory; }}
            >
              Start A Conversation
            </Link>
            <Link
              to="/about"
              className="inline-block px-10 py-4 transition-all duration-500"
              style={{ ...eyebrow, background: "transparent", color: C.ivory, border: `1px solid ${C.ivory}` }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.ivory; e.currentTarget.style.color = C.charcoal; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.ivory; }}
            >
              View Additional Capabilities
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DevelopmentMarketing;
