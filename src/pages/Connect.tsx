import SEOHead from "@/components/SEOHead";
import taylorHeadshot from "@/assets/taylor-headshot.jpg";
import { ExternalLink, Instagram, Mail, Phone } from "lucide-react";

const links = [
  { label: "Search Austin Homes", href: "https://taylorsherwood.realscout.com/homesearch/map" },
  { label: "Featured Austin Luxury Listing", href: "https://www.villagovernorshill.com" },
  { label: "Complimentary Property Valuation", href: "https://www.echelonpropertygroup.com/sell" },
  { label: "Work With Taylor", href: "https://www.echelonpropertygroup.com/contact", featured: true },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/TheInvestorBroker", label: "Instagram" },
  { icon: Mail, href: "mailto:taylor@echelonpropertygroup.com", label: "Email" },
  { icon: Phone, href: "tel:+15127869672", label: "Phone" },
];

const Connect = () => {
  return (
    <>
      <SEOHead
        title="Taylor Sherwood | Austin Luxury Real Estate"
        description="Connect with Austin luxury real estate advisor Taylor Sherwood. Browse listings, search homes, or request a private consultation."
      />
      <div
        className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10"
        style={{ backgroundColor: "hsl(233, 50%, 9%)" }}
      >
        <div className="w-full max-w-[440px] mx-auto flex flex-col gap-5">

          {/* ── Hero Profile Card ── */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "24px",
              boxShadow:
                "0 24px 64px hsl(0 0% 0% / 0.5), 0 8px 24px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.04)",
            }}
          >
            {/* Portrait image */}
            <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
              <img
                src={taylorHeadshot}
                alt="Taylor Sherwood – Austin Luxury Real Estate Advisor"
                className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
                fetchPriority="high"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 30%, hsl(233 50% 9% / 0.15) 50%, hsl(233 50% 9% / 0.7) 75%, hsl(233 50% 9% / 0.95) 100%)",
                }}
              />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-7 pb-8">
                <h1
                  className="font-display font-medium tracking-[-0.02em] leading-none"
                  style={{ fontSize: "2rem", color: "hsl(0 0% 100%)" }}
                >
                  Taylor Sherwood
                </h1>
                <p
                  className="mt-2.5 font-sans font-light"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "hsl(42 37% 67%)",
                  }}
                >
                  Licensed Real Estate Advisor
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-4 mt-5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex items-center justify-center transition-all duration-300"
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "12px",
                        background: "hsl(0 0% 100% / 0.08)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid hsl(0 0% 100% / 0.08)",
                        color: "hsl(0 0% 100% / 0.75)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "hsl(42 37% 57% / 0.2)";
                        e.currentTarget.style.borderColor = "hsl(42 37% 57% / 0.3)";
                        e.currentTarget.style.color = "hsl(42 37% 67%)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "hsl(0 0% 100% / 0.08)";
                        e.currentTarget.style.borderColor = "hsl(0 0% 100% / 0.08)";
                        e.currentTarget.style.color = "hsl(0 0% 100% / 0.75)";
                      }}
                    >
                      <s.icon className="w-[17px] h-[17px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Action Buttons ── */}
          <nav className="flex flex-col gap-3" aria-label="Quick links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between w-full transition-all duration-500"
                style={{
                  borderRadius: "18px",
                  padding: "20px 24px",
                  background: link.featured
                    ? "linear-gradient(135deg, hsl(42 37% 57% / 0.12) 0%, hsl(42 37% 57% / 0.04) 100%)"
                    : "linear-gradient(135deg, hsl(0 0% 100% / 0.05) 0%, hsl(0 0% 100% / 0.02) 100%)",
                  border: link.featured
                    ? "1px solid hsl(42 37% 57% / 0.25)"
                    : "1px solid hsl(0 0% 100% / 0.06)",
                  boxShadow:
                    "0 4px 20px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.03)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "hsl(42 37% 57% / 0.35)";
                  el.style.boxShadow =
                    "0 8px 32px hsl(42 37% 57% / 0.1), inset 0 1px 0 hsl(42 37% 57% / 0.06)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = link.featured
                    ? "hsl(42 37% 57% / 0.25)"
                    : "hsl(0 0% 100% / 0.06)";
                  el.style.boxShadow =
                    "0 4px 20px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.03)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span
                  className="font-sans font-medium"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.06em",
                    color: link.featured ? "hsl(42 37% 67%)" : "hsl(0 0% 100% / 0.85)",
                  }}
                >
                  {link.label}
                </span>
                <ExternalLink
                  className="w-4 h-4 opacity-20 group-hover:opacity-40 transition-opacity duration-400"
                  style={{ color: "hsl(0 0% 100%)" }}
                />
              </a>
            ))}
          </nav>

          {/* ── Footer ── */}
          <div className="flex flex-col items-center gap-3 mt-6 mb-4">
            <div
              className="w-12 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(42 37% 57% / 0.25), transparent)",
              }}
            />
            <p
              className="font-sans"
              style={{
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "hsl(0 0% 100% / 0.15)",
              }}
            >
              Echelon Property Group
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connect;
