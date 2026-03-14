import SEOHead from "@/components/SEOHead";
import taylorHeadshot from "@/assets/taylor-headshot.jpg";
import echelonLogo from "@/assets/echelon-logo-gold.png";
import { Instagram, Mail, Phone } from "lucide-react";

const links = [
  { label: "Search Austin Homes", href: "https://taylorsherwood.realscout.com/homesearch/map" },
  { label: "Featured Austin Luxury Listing", href: "https://www.villagovernorshill.com" },
  { label: "Complimentary Property Valuation", href: "https://www.echelonpropertygroup.com/sell" },
  { label: "Work With Taylor", href: "https://www.echelonpropertygroup.com/contact", featured: true },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/TheInvestorBroker", label: "Instagram" },
  { icon: Mail, href: "mailto:taylor@echelonpropertygroup.com", label: "Email" },
  { icon: Phone, href: "tel:+15126613843", label: "Phone" },
];

const Connect = () => {
  return (
    <>
      <SEOHead
        title="Taylor Sherwood | Austin Luxury Real Estate"
        description="Connect with Austin luxury real estate advisor Taylor Sherwood. Browse listings, search homes, or request a private consultation."
      />
      <div
        className="min-h-screen flex flex-col items-center px-4 py-4"
        style={{ backgroundColor: "hsl(233, 50%, 9%)" }}
      >
        <div className="w-full max-w-[440px] mx-auto flex flex-col">

          {/* ── Hero Profile Card ── */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "24px",
              boxShadow:
                "0 24px 64px hsl(0 0% 0% / 0.5), 0 8px 24px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.04)",
            }}
          >
            <div className="relative w-full" style={{ aspectRatio: "3 / 4.2" }}>
              <img
                src={taylorHeadshot}
                alt="Taylor Sherwood – Austin Luxury Real Estate Advisor"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "50% 12%" }}
                fetchPriority="high"
              />

              {/* Deep cinematic gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(233 50% 9% / 0.15) 0%, transparent 15%, transparent 25%, hsl(233 50% 9% / 0.08) 40%, hsl(233 50% 9% / 0.35) 55%, hsl(233 50% 9% / 0.8) 72%, hsl(233 50% 9% / 0.97) 85%, hsl(233 50% 9%) 100%)",
                }}
              />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 pb-6 flex flex-col items-center text-center">
                {/* Name */}
                <h1
                  className="font-display font-medium leading-none"
                  style={{
                    fontSize: "2.1rem",
                    letterSpacing: "-0.02em",
                    color: "hsl(0 0% 100%)",
                  }}
                >
                  Taylor Sherwood
                </h1>

                {/* Gold accent divider */}
                <div
                  className="mt-4 mb-3"
                  style={{
                    width: "40px",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, hsl(42 37% 57% / 0.5), transparent)",
                  }}
                />

                {/* Subtitle block */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontVariant: "all-small-caps",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: "hsl(42 37% 67%)",
                  }}
                >
                  Austin Luxury Real Estate
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "11.5px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    marginTop: "2px",
                    color: "hsl(0 0% 100% / 0.38)",
                  }}
                >
                  Land&ensp;·&ensp;Investment Property
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-4 mt-7">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex items-center justify-center transition-all duration-300"
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "14px",
                        background: "hsl(0 0% 100% / 0.06)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid hsl(0 0% 100% / 0.07)",
                        boxShadow:
                          "0 4px 16px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.04)",
                        color: "hsl(0 0% 100% / 0.65)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "hsl(42 37% 57% / 0.15)";
                        el.style.borderColor = "hsl(42 37% 57% / 0.28)";
                        el.style.color = "hsl(42 37% 67%)";
                        el.style.boxShadow =
                          "0 6px 24px hsl(42 37% 57% / 0.1), inset 0 1px 0 hsl(42 37% 57% / 0.06)";
                        el.style.transform = "translateY(-2px) scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "hsl(0 0% 100% / 0.06)";
                        el.style.borderColor = "hsl(0 0% 100% / 0.07)";
                        el.style.color = "hsl(0 0% 100% / 0.65)";
                        el.style.boxShadow =
                          "0 4px 16px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.04)";
                        el.style.transform = "translateY(0) scale(1)";
                      }}
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Logo between sections ── */}
          <div className="flex justify-center my-8">
            <img
              src={echelonLogo}
              alt="Echelon Property Group"
              style={{ height: "100px", opacity: 0.55 }}
              loading="eager"
            />
          </div>

          {/* ── Action Buttons ── */}
          <nav className="flex flex-col gap-4" aria-label="Quick links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between w-full transition-all duration-500"
                style={{
                  borderRadius: "18px",
                  padding: "24px 28px",
                  background: link.featured
                    ? "linear-gradient(145deg, hsl(233 42% 15%) 0%, hsl(233 50% 11%) 100%)"
                    : "linear-gradient(145deg, hsl(233 42% 14%) 0%, hsl(233 50% 10%) 100%)",
                  border: link.featured
                    ? "1px solid hsl(42 37% 57% / 0.2)"
                    : "1px solid hsl(0 0% 100% / 0.045)",
                  boxShadow: link.featured
                    ? "0 6px 28px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.04), inset 0 0 24px hsl(42 37% 57% / 0.025)"
                    : "0 4px 20px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.025), inset 0 0 20px hsl(0 0% 100% / 0.008)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "hsl(42 37% 57% / 0.28)";
                  el.style.boxShadow =
                    "0 10px 40px hsl(42 37% 57% / 0.07), inset 0 1px 0 hsl(42 37% 57% / 0.05), inset 0 0 28px hsl(42 37% 57% / 0.025)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = link.featured
                    ? "hsl(42 37% 57% / 0.2)"
                    : "hsl(0 0% 100% / 0.045)";
                  el.style.boxShadow = link.featured
                    ? "0 6px 28px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.04), inset 0 0 24px hsl(42 37% 57% / 0.025)"
                    : "0 4px 20px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.025), inset 0 0 20px hsl(0 0% 100% / 0.008)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span
                  className="font-sans w-full text-center"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: link.featured ? "hsl(42 37% 67%)" : "hsl(0 0% 100% / 0.78)",
                  }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* ── Footer ── */}
          <div className="flex flex-col items-center gap-3 mt-12 mb-4">
            <div
              className="w-10 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(42 37% 57% / 0.18), transparent)",
              }}
            />
            <p
              className="font-sans"
              style={{
                fontSize: "8px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "hsl(0 0% 100% / 0.1)",
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
