import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";

import heroAsset from "@/assets/developments/developments-mueller-residence-hero.jpg.asset.json";
import brochureAsset from "@/assets/developments/arbors-brochure.jpg.asset.json";
import salesCenterAsset from "@/assets/developments/arbors-sales-center.jpg.asset.json";
import signageAsset from "@/assets/developments/arbors-signage.jpg.asset.json";
import buyerKitAsset from "@/assets/developments/arbors-buyer-kit.jpg.asset.json";
import renderingAsset from "@/assets/developments/arbors-rendering.jpg.asset.json";
import aerialAsset from "@/assets/developments/arbors-aerial.jpg.asset.json";

const Footer = lazy(() => import("@/components/Footer"));

const DEV_URL = "https://developments.echelonpropertygroup.com";
const ARBORS_URL = `${DEV_URL}/communities/the-arbors`;
const GOLD = "#b9a06c";

const eyebrowStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontWeight: 500,
  fontSize: "0.7rem",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
};

const buttonBaseStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontWeight: 500,
  fontSize: "0.7rem",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
};

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "solid" | "outline" | "outline-light";
  className?: string;
}

const PrimaryButton = ({
  href,
  children,
  external = true,
  variant = "solid",
  className = "",
}: PrimaryButtonProps) => {
  const base = "group inline-flex items-center gap-3 px-8 py-4 transition-colors duration-300";
  const style: React.CSSProperties = { ...buttonBaseStyle };

  if (variant === "solid") {
    style.background = GOLD;
    style.color = "#ffffff";
    style.border = `1px solid ${GOLD}`;
  } else if (variant === "outline") {
    style.background = "transparent";
    style.color = GOLD;
    style.border = `1px solid ${GOLD}`;
  } else {
    style.background = "transparent";
    style.color = "#ffffff";
    style.border = "1px solid rgba(255,255,255,0.6)";
  }

  const commonProps = {
    className: `${base} ${className}`,
    style,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      if (variant === "solid") {
        e.currentTarget.style.background = "#a68d5c";
      } else if (variant === "outline") {
        e.currentTarget.style.background = GOLD;
        e.currentTarget.style.color = "#ffffff";
      } else {
        e.currentTarget.style.background = "#ffffff";
        e.currentTarget.style.color = "#0C0F24";
        e.currentTarget.style.borderColor = "#ffffff";
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      if (variant === "solid") {
        e.currentTarget.style.background = GOLD;
      } else if (variant === "outline") {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = GOLD;
      } else {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
      }
    },
  };

  return external ? (
    <a href={href} rel="noopener" {...commonProps}>
      {children}
      <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1">
        →
      </span>
    </a>
  ) : (
    <Link to={href} {...commonProps}>
      {children}
      <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
};

const showcase = [
  {
    title: "Community Brochure",
    caption: "Cover, editorial spreads, and lifestyle positioning.",
    src: brochureAsset.url,
    ratio: "aspect-[4/3]",
  },
  {
    title: "Sales Center",
    caption: "Presentation environment, site model, and buyer journey.",
    src: salesCenterAsset.url,
    ratio: "aspect-[16/11]",
  },
  {
    title: "Construction Branding",
    caption: "Perimeter signage and on-site placemaking.",
    src: signageAsset.url,
    ratio: "aspect-[16/10]",
  },
  {
    title: "Buyer Welcome Kit",
    caption: "Lookbooks, floor plans, material palette, and welcome package.",
    src: buyerKitAsset.url,
    ratio: "aspect-[4/3]",
  },
];

const categories = [
  {
    label: "Residential Communities",
    body: "Master-planned and boutique residential developments across Central Texas.",
    href: `${DEV_URL}/residential-communities`,
  },
  {
    label: "Mixed-Use Development",
    body: "Integrated retail, residential, and hospitality projects along key Austin corridors.",
    href: `${DEV_URL}/mixed-use`,
  },
  {
    label: "Land Acquisition",
    body: "Positioned land holdings, entitlement plays, and long-hold acquisitions.",
    href: `${DEV_URL}/land-acquisition`,
  },
  {
    label: "Builder Representation",
    body: "Lot takedowns, custom builder programs, and finished-lot pipelines.",
    href: `${DEV_URL}/builder-representation`,
  },
  {
    label: "Development Advisory",
    body: "Feasibility, positioning, and go-to-market strategy for principals and landowners.",
    href: `${DEV_URL}/development-advisory`,
  },
  {
    label: "Current Opportunities",
    body: "Active projects, community launches, and pre-market development offerings.",
    href: `${DEV_URL}/opportunities`,
  },
];

const Developments = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://www.echelonpropertygroup.com/" },
    { name: "Developments", url: "https://www.echelonpropertygroup.com/developments" },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Echelon Developments | Central Texas Development Platform"
        description="Land acquisition, residential communities, mixed-use projects, and development advisory across Austin and Central Texas — a dedicated platform from Echelon Property Group."
        canonical="https://www.echelonpropertygroup.com/developments"
      />
      <SchemaMarkup schema={breadcrumbSchema} />
      <Navigation />

      {/* Hero — editorial architectural journal opening */}
      <section className="relative h-[92vh] min-h-[720px] w-full overflow-hidden">
        <img
          src={heroAsset.url}
          alt="Mueller residence streetscape in Austin, Texas"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        {/* Dark wash from the left — keeps the residential scene bright on the right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(12,15,36,0.78) 0%, rgba(12,15,36,0.52) 26%, rgba(12,15,36,0.22) 46%, rgba(12,15,36,0) 60%)",
          }}
        />
        {/* Top scrim for navigation readability over bright sky */}
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,15,36,0.48) 0%, rgba(12,15,36,0) 100%)",
          }}
        />
        {/* Bottom vignette for depth */}
        <div
          className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.32) 100%)",
          }}
        />

        <div className="relative z-10 h-full">
          <div className="container mx-auto h-full px-6 md:px-10 lg:px-14">
            <div className="flex h-full items-start pt-32 md:pt-36 lg:pt-40">
              <div className="max-w-[480px]">
                <p className="mb-8 md:mb-10" style={{ ...eyebrowStyle, color: GOLD }}>
                  Echelon Developments
                </p>

                <h1 className="font-display font-normal text-white text-[1.35rem] sm:text-[1.55rem] lg:text-[1.8rem] xl:text-[2rem] leading-[1.28] tracking-[0.015em] mb-9 md:mb-11">
                  A Platform for Austin's Next Chapter
                </h1>

                <p className="text-white/92 text-[1rem] md:text-[1.05rem] leading-[1.75] font-light max-w-[420px] mb-12 md:mb-14">
                  A dedicated division of Echelon Property Group for landowners, developers, and investors shaping the future of Central Texas.
                </p>

                <div className="flex flex-col items-start gap-5 mb-14 md:mb-16">
                  <PrimaryButton href={DEV_URL} variant="solid">
                    Explore Echelon Developments
                  </PrimaryButton>
                  <a
                    href={DEV_URL}
                    rel="noopener"
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
                    style={{ ...buttonBaseStyle, fontSize: "0.7rem", letterSpacing: "0.22em" }}
                  >
                    <span
                      className="pb-0.5 border-b"
                      style={{ borderColor: "rgba(185,160,108,0.45)" }}
                    >
                      View Concept Communities
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1"
                      style={{ color: GOLD }}
                    >
                      →
                    </span>
                  </a>
                </div>

                {/* Editorial information strip */}
                <div
                  className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white/60"
                  style={{ ...eyebrowStyle, fontSize: "0.65rem", letterSpacing: "0.18em" }}
                >
                  <span>Residential Communities</span>
                  <span style={{ color: GOLD }}>•</span>
                  <span>Mixed-Use</span>
                  <span style={{ color: GOLD }}>•</span>
                  <span>Land Acquisition</span>
                  <span style={{ color: GOLD }}>•</span>
                  <span>Builder Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/45"
          style={{ ...eyebrowStyle, fontSize: "0.6rem", letterSpacing: "0.2em" }}
        >
          <span>Scroll to Explore</span>
          <span className="block w-px h-7 bg-white/25" />
        </div>
      </section>






      {/* Showcase intro */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="mb-6 text-gold" style={eyebrowStyle}>
              Development Marketing
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-architectural font-normal mb-8">
              Every successful community begins with a compelling story.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              From branding and presentation to market positioning and sales strategy, our development platform is
              designed to help projects launch with the same level of refinement expected by today's buyers and
              investors.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial gallery */}
      <section className="pb-24 md:pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-24">
            {showcase.map((item, i) => (
              <figure
                key={item.title}
                className={i % 2 === 1 ? "md:mt-24" : ""}
              >
                <div className={`overflow-hidden bg-secondary/40 ${item.ratio}`}>
                  <img
                    src={item.src}
                    alt={`The Arbors — ${item.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-6">
                  <p className="text-gold mb-2" style={eyebrowStyle}>
                    {item.title}
                  </p>
                  <p className="text-muted-foreground text-[0.95rem] leading-relaxed max-w-md">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Community — The Arbors */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="aspect-[16/10] overflow-hidden bg-background">
                <img
                  src={renderingAsset.url}
                  alt="The Arbors — Hill Country residence rendering"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={aerialAsset.url}
                    alt="The Arbors — masterplan aerial"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={signageAsset.url}
                    alt="The Arbors — community branding"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <p className="mb-5 text-gold" style={eyebrowStyle}>
                Featured Community
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] text-architectural font-normal mb-6">
                The Arbors
              </h2>
              <p className="text-muted-foreground leading-relaxed text-[1.0625rem] mb-5">
                A Hill Country community designed around preserved landscape, considered architecture, and a
                deliberate sense of place — minutes from Austin.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[1.0625rem] mb-9">
                Explore the full community presentation, site plan, residence collection, and current opportunities
                within our dedicated development platform.
              </p>
              <PrimaryButton href={ARBORS_URL} variant="solid">
                View The Arbors
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16 md:mb-20">
            <p className="mb-6 text-gold" style={eyebrowStyle}>
              Development Platform
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-architectural font-normal">
              A full-spectrum development practice.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {categories.map((c) => (
              <a
                key={c.label}
                href={c.href}
                rel="noopener"
                className="group bg-background p-10 md:p-12 flex flex-col justify-between min-h-[280px] transition-colors duration-300 hover:bg-secondary/30"
              >
                <div>
                  <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight text-architectural font-normal mb-4">
                    {c.label}
                  </h3>
                  <p className="text-muted-foreground text-[0.95rem] leading-relaxed">{c.body}</p>
                </div>
                <span
                  className="mt-8 inline-flex items-center gap-2 text-gold"
                  style={eyebrowStyle}
                >
                  Learn More
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Internal linking strip */}
      <section className="py-20 bg-secondary/40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-5 text-gold" style={eyebrowStyle}>
              Related from Echelon
            </p>
            <p className="text-muted-foreground leading-relaxed text-[1.0625rem]">
              Development complements our broader advisory across{" "}
              <Link to="/land-development" className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold hover:text-foreground transition-colors">
                Austin land development
              </Link>
              ,{" "}
              <Link to="/land-ranch" className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold hover:text-foreground transition-colors">
                land and ranch acquisition
              </Link>
              ,{" "}
              <Link to="/invest" className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold hover:text-foreground transition-colors">
                real estate investment
              </Link>
              , and{" "}
              <Link to="/private-opportunities" className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold hover:text-foreground transition-colors">
                private off-market opportunities
              </Link>
              . For market context, read our{" "}
              <Link to="/austin-land-development-opportunities" className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold hover:text-foreground transition-colors">
                Austin land development outlook
              </Link>{" "}
              and{" "}
              <Link to="/blog/austin-population-growth" className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold hover:text-foreground transition-colors">
                analysis of Austin population growth
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative py-28 md:py-40 overflow-hidden" style={{ background: "#0C0F24" }}>
        <img
          src={aerialAsset.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,15,36,0.85) 0%, rgba(12,15,36,0.92) 100%)" }} />
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <p className="mb-6" style={{ ...eyebrowStyle, color: GOLD }}>
              A Dedicated Platform
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-normal mb-8">
              Enter Echelon Developments
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-12 font-light">
              Explore current opportunities, community launches, development intelligence, builder resources, and
              project marketing within our dedicated development platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
              <PrimaryButton href={DEV_URL} variant="solid">
                Explore Echelon Developments
              </PrimaryButton>
              <PrimaryButton href={`${DEV_URL}/communities`} variant="outline-light">
                View Featured Communities
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Developments;
