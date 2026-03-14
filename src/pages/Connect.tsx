import SEOHead from "@/components/SEOHead";
import taylorHeadshot from "@/assets/taylor-headshot.jpg";
import echelonLogo from "@/assets/echelon-logo-gold.png";
import { ExternalLink } from "lucide-react";

const links = [
  { label: "Complimentary Property Valuation", href: "https://www.echelonpropertygroup.com/sell", featured: false },
  { label: "Featured Austin Luxury Listing", href: "https://www.villagovernorshill.com", featured: false },
  { label: "Search Austin Homes", href: "https://taylorsherwood.realscout.com/homesearch/map", featured: false },
  { label: "Work With Taylor", href: "https://www.echelonpropertygroup.com/contact", featured: true },
  { label: "Instagram", href: "https://www.instagram.com/TheInvestorBroker", featured: false },
];

const Connect = () => {
  return (
    <>
      <SEOHead
        title="Taylor Sherwood | Austin Luxury Real Estate"
        description="Connect with Austin luxury real estate advisor Taylor Sherwood. Browse listings, search homes, or request a private consultation."
      />
      <div
        className="min-h-screen flex flex-col items-center justify-start px-6 py-16 sm:py-20"
        style={{ backgroundColor: "hsl(233, 50%, 9%)" }}
      >
        <div className="w-full max-w-[420px] mx-auto flex flex-col items-center">

          {/* ── Headshot ── */}
          <div className="relative mt-10">
            {/* outer glow */}
            <div
              className="absolute -inset-3 rounded-full opacity-25 blur-2xl"
              style={{ background: "radial-gradient(circle, hsl(42 37% 57% / 0.35), transparent 70%)" }}
            />
            {/* double ring */}
            <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] rounded-full p-[3px]"
              style={{ background: "linear-gradient(135deg, hsl(42 37% 57% / 0.45), hsl(42 37% 57% / 0.12))" }}
            >
              <div className="w-full h-full rounded-full p-[2px] bg-[hsl(233,50%,9%)]">
                <div
                  className="w-full h-full rounded-full p-[1px]"
                  style={{ background: "linear-gradient(135deg, hsl(42 37% 57% / 0.25), transparent)" }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={taylorHeadshot}
                      alt="Taylor Sherwood – Austin Luxury Real Estate Advisor"
                      className="w-full h-full object-cover object-[50%_30%]"
                      fetchPriority="high"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Logo ── */}
          <img
            src={echelonLogo}
            alt="Echelon Property Group"
            className="mt-9 opacity-50"
            style={{ height: "100px" }}
            loading="eager"
          />

          {/* ── Name & subtitle ── */}
          <div className="text-center mt-7">
            <h1
              className="font-display font-medium tracking-[-0.015em] leading-none"
              style={{ fontSize: "1.85rem", color: "hsl(0 0% 100%)" }}
            >
              Taylor Sherwood
            </h1>
            <p
              className="font-display leading-[1.7] mt-4"
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "hsl(0 0% 100% / 0.4)",
              }}
            >
              Austin Luxury Real Estate
              <br />
              Land&ensp;·&ensp;Investment Property
            </p>
          </div>

          {/* ── Divider ── */}
          <div className="w-16 mx-auto mt-11 mb-11">
            <div
              className="h-px"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(42 37% 57% / 0.35), transparent)",
              }}
            />
          </div>

          {/* ── Links ── */}
          <nav className="w-full flex flex-col gap-[14px]" aria-label="Quick links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full text-center transition-all duration-500 ease-smooth"
                style={{
                  borderRadius: "16px",
                  padding: "18px 28px",
                  fontSize: "10.5px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: link.featured ? "hsl(42 37% 57%)" : "hsl(0 0% 100% / 0.8)",
                  border: link.featured
                    ? "1px solid hsl(42 37% 57% / 0.3)"
                    : "1px solid hsl(0 0% 100% / 0.06)",
                  background: link.featured
                    ? "linear-gradient(170deg, hsl(42 37% 57% / 0.08) 0%, hsl(233 50% 9% / 0.9) 100%)"
                    : "linear-gradient(170deg, hsl(0 0% 100% / 0.04) 0%, hsl(0 0% 100% / 0.015) 100%)",
                  boxShadow: link.featured
                    ? "0 4px 24px hsl(42 37% 57% / 0.08), inset 0 1px 0 hsl(42 37% 57% / 0.06)"
                    : "0 2px 16px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.03)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "hsl(42 37% 57% / 0.35)";
                  el.style.color = "hsl(0 0% 100%)";
                  el.style.boxShadow = "0 8px 32px hsl(42 37% 57% / 0.12), inset 0 1px 0 hsl(42 37% 57% / 0.08)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = link.featured
                    ? "hsl(42 37% 57% / 0.3)"
                    : "hsl(0 0% 100% / 0.06)";
                  el.style.color = link.featured
                    ? "hsl(42 37% 57%)"
                    : "hsl(0 0% 100% / 0.8)";
                  el.style.boxShadow = link.featured
                    ? "0 4px 24px hsl(42 37% 57% / 0.08), inset 0 1px 0 hsl(42 37% 57% / 0.06)"
                    : "0 2px 16px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.03)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span className="font-sans relative z-10">{link.label}</span>
                <ExternalLink
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                  style={{ color: "hsl(0 0% 100%)" }}
                />
              </a>
            ))}
          </nav>

          {/* ── Footer ── */}
          <p
            className="mt-16 font-sans"
            style={{
              fontSize: "8px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "hsl(0 0% 100% / 0.12)",
            }}
          >
            Echelon Property Group
          </p>
        </div>
      </div>
    </>
  );
};

export default Connect;
