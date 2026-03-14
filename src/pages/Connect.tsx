import SEOHead from "@/components/SEOHead";
import taylorHeadshot from "@/assets/taylor-headshot.jpg";
import echelonLogo from "@/assets/echelon-logo-gold.png";
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
                style={{ objectPosition: "50% 15%" }}
                fetchPriority="high"
              />

              {/* Deep cinematic gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 20%, hsl(233 50% 9% / 0.05) 35%, hsl(233 50% 9% / 0.3) 55%, hsl(233 50% 9% / 0.75) 72%, hsl(233 50% 9% / 0.95) 85%, hsl(233 50% 9%) 100%)",
                }}
              />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-7 pb-8 flex flex-col items-start">
                {/* Logo */}
                <img
                  src={echelonLogo}
                  alt="Echelon Property Group"
                  className="mb-5 opacity-60"
                  style={{ height: "55px" }}
                  loading="eager"
                />

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

                {/* Subtitle line 1 */}
                <p
                  className="mt-3 font-sans"
                  style={{
                    fontSize: "11.5px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontVariant: "all-small-caps",
                    fontWeight: 500,
                    color: "hsl(42 37% 67%)",
                  }}
                >
                  Austin Luxury Real Estate
                </p>

                {/* Subtitle line 2 */}
                <p
                  className="mt-1 font-sans"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                    color: "hsl(0 0% 100% / 0.4)",
                  }}
                >
                  Land&ensp;·&ensp;Investment Property
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-3.5 mt-6">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex items-center justify-center transition-all duration-300"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "14px",
                        background: "hsl(0 0% 100% / 0.07)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid hsl(0 0% 100% / 0.08)",
                        boxShadow:
                          "0 4px 16px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
                        color: "hsl(0 0% 100% / 0.7)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "hsl(42 37% 57% / 0.18)";
                        el.style.borderColor = "hsl(42 37% 57% / 0.3)";
                        el.style.color = "hsl(42 37% 67%)";
                        el.style.boxShadow =
                          "0 6px 24px hsl(42 37% 57% / 0.12), inset 0 1px 0 hsl(42 37% 57% / 0.08)";
                        el.style.transform = "translateY(-2px) scale(1.04)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "hsl(0 0% 100% / 0.07)";
                        el.style.borderColor = "hsl(0 0% 100% / 0.08)";
                        el.style.color = "hsl(0 0% 100% / 0.7)";
                        el.style.boxShadow =
                          "0 4px 16px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.05)";
                        el.style.transform = "translateY(0) scale(1)";
                      }}
                    >
                      <s.icon className="w-[18px] h-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Gold Divider ── */}
          <div className="flex justify-center my-6">
            <div
              className="h-px"
              style={{
                width: "60px",
                background:
                  "linear-gradient(90deg, transparent, hsl(42 37% 57% / 0.4), transparent)",
              }}
            />
          </div>

          {/* ── Action Buttons ── */}
          <nav className="flex flex-col gap-3.5" aria-label="Quick links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between w-full transition-all duration-500"
                style={{
                  borderRadius: "18px",
                  padding: "22px 26px",
                  background: link.featured
                    ? "linear-gradient(145deg, hsl(233 45% 14%) 0%, hsl(233 50% 11%) 100%)"
                    : "linear-gradient(145deg, hsl(233 45% 13%) 0%, hsl(233 50% 10%) 100%)",
                  border: link.featured
                    ? "1px solid hsl(42 37% 57% / 0.22)"
                    : "1px solid hsl(0 0% 100% / 0.05)",
                  boxShadow: link.featured
                    ? "0 6px 28px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.04), inset 0 0 20px hsl(42 37% 57% / 0.03)"
                    : "0 4px 20px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.03), inset 0 0 16px hsl(0 0% 100% / 0.01)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "hsl(42 37% 57% / 0.3)";
                  el.style.boxShadow =
                    "0 10px 36px hsl(42 37% 57% / 0.08), inset 0 1px 0 hsl(42 37% 57% / 0.06), inset 0 0 24px hsl(42 37% 57% / 0.03)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = link.featured
                    ? "hsl(42 37% 57% / 0.22)"
                    : "hsl(0 0% 100% / 0.05)";
                  el.style.boxShadow = link.featured
                    ? "0 6px 28px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.04), inset 0 0 20px hsl(42 37% 57% / 0.03)"
                    : "0 4px 20px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.03), inset 0 0 16px hsl(0 0% 100% / 0.01)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span
                  className="font-sans"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: link.featured ? "hsl(42 37% 67%)" : "hsl(0 0% 100% / 0.8)",
                  }}
                >
                  {link.label}
                </span>
                <ExternalLink
                  className="w-4 h-4 opacity-15 group-hover:opacity-35 transition-opacity duration-400"
                  style={{ color: "hsl(0 0% 100%)" }}
                />
              </a>
            ))}
          </nav>

          {/* ── Footer ── */}
          <div className="flex flex-col items-center gap-3 mt-10 mb-4">
            <div
              className="w-10 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(42 37% 57% / 0.2), transparent)",
              }}
            />
            <p
              className="font-sans"
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
      </div>
    </>
  );
};

export default Connect;
