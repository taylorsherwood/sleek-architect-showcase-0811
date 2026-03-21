import { useState, useEffect, lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";

const PrivateOpportunities = lazy(() => import("@/components/PrivateOpportunities"));
import taylorHeadshot from "@/assets/taylor-headshot.jpg";
import combinedLogo from "@/assets/exp-echelon-combined-logo.png";
import { Instagram, Mail, Phone, Home, Search, Mountain } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useHeroScroll } from "@/hooks/useHeroScroll";

const links = [
  { label: "Complimentary Property Valuation", href: "https://www.echelonpropertygroup.com/sell" },
  { label: "Blogs and Press Releases", href: "https://www.echelonpropertygroup.com/blog" },
  { label: "Work With Taylor", href: "/about", gold: true },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/TheInvestorBroker", label: "Instagram" },
  { icon: Mail, href: "mailto:taylor@echelonpropertygroup.com", label: "Email" },
  { icon: Phone, href: "tel:+15126613843", label: "Phone" },
];

const Connect = () => {
  const scrollProgress = useHeroScroll();
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const heroEl = document.getElementById("connect-hero");
      if (heroEl) setHeroHeight(heroEl.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const heroProgress = heroHeight > 0 ? Math.min(window.scrollY / (heroHeight * 0.6), 1) : 0;

  return (
    <>
      <SEOHead
        title="Connect With Taylor Sherwood | Echelon Property Group"
        description="Connect with Austin luxury real estate advisor Taylor Sherwood. Browse listings, search homes, or request a private consultation."
      />
      <div
        className="min-h-screen flex flex-col items-center bg-warm-cream"
      >
        <div className="w-full max-w-[440px] mx-auto flex flex-col">

          {/* ── Hero Profile Card ── */}
          <div
            id="connect-hero"
            className="relative overflow-hidden"
            style={{
              borderRadius: "0 0 24px 24px",
              boxShadow:
                "0 24px 64px hsl(0 0% 0% / 0.12), 0 8px 24px hsl(0 0% 0% / 0.08)",
            }}
          >
            {/* Darken overlay on scroll */}
            <div
              className="absolute inset-0 bg-black pointer-events-none"
              style={{
                opacity: scrollProgress * 0.4,
                zIndex: 2,
                borderRadius: "0 0 24px 24px",
              }}
            />

            <div className="relative w-full" style={{ aspectRatio: "3 / 4.2" }}>
              <img
                src={taylorHeadshot}
                alt="Taylor Sherwood – Austin Luxury Real Estate Advisor"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "50% 12%" }}
                fetchPriority="high"
              />

              {/* Cinematic gradient overlay — fades to warm cream */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(40 30% 96% / 0.05) 0%, transparent 15%, transparent 25%, hsl(40 30% 96% / 0.08) 40%, hsl(40 30% 96% / 0.35) 55%, hsl(40 30% 96% / 0.8) 72%, hsl(40 30% 96% / 0.97) 85%, hsl(40 30% 96%) 100%)",
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
                    color: "hsl(233 50% 9%)",
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
                      "linear-gradient(90deg, transparent, hsl(42 37% 57% / 0.6), transparent)",
                  }}
                />

                {/* Subtitle block */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: "16px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontVariant: "all-small-caps",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: "#baa26a",
                  }}
                >
                  Austin Luxury Real Estate
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    marginTop: "1px",
                    color: "hsl(233 50% 9% / 0.45)",
                  }}
                >
                  Land&nbsp;·&nbsp;Investment Specialists
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-2.5 mt-5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: "hsl(233 50% 9% / 0.05)",
                        border: "1px solid hsl(233 50% 9% / 0.08)",
                        color: "hsl(233 50% 9% / 0.45)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "hsl(42 37% 57% / 0.1)";
                        el.style.borderColor = "hsl(42 37% 57% / 0.25)";
                        el.style.color = "hsl(42 37% 45%)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "hsl(233 50% 9% / 0.05)";
                        el.style.borderColor = "hsl(233 50% 9% / 0.08)";
                        el.style.color = "hsl(233 50% 9% / 0.45)";
                      }}
                    >
                      <s.icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ── Logo between sections ── */}
          <ScrollReveal>
            <div className="flex flex-col items-center -mb-2 px-4">
              <img
                src={echelonLogo}
                alt="Echelon Property Group"
                style={{ height: "140px" }}
                loading="eager"
              />
              {/* Scroll indicator */}
              <div
                className="flex flex-col items-center -mt-2"
                style={{
                  opacity: 1 - scrollProgress * 5,
                  pointerEvents: "none",
                  transition: "opacity 150ms ease-out",
                }}
              >
                <div className="scroll-indicator-line" />
              </div>
            </div>
          </ScrollReveal>

          {/* ── CTA Strip ── */}
          <div className="px-8 mb-3">
            <div className="flex flex-col gap-2.5">
              {[
                { title: "EXPLORE ECHELON LISTINGS", href: "https://www.echelonpropertygroup.com/listings", icon: Home },
                { title: "SEARCH ALL AUSTIN OPPORTUNITIES", href: "https://taylorsherwood.realscout.com/", icon: Search },
                { title: "Land & Investment Property", href: "/land", icon: Mountain },
              ].map((card, i) => (
                <ScrollReveal key={card.href} delay={i * 120}>
                  <a
                    href={card.href}
                    className="flex items-center gap-3.5 w-full h-[52px] px-6 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "hsl(0 0% 100% / 0.55)",
                      border: "1px solid hsl(42 37% 57% / 0.2)",
                      boxShadow: "0 2px 8px hsl(0 0% 0% / 0.03)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "hsl(42 37% 57% / 0.45)";
                      el.style.boxShadow = "0 4px 16px hsl(0 0% 0% / 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "hsl(42 37% 57% / 0.2)";
                      el.style.boxShadow = "0 2px 8px hsl(0 0% 0% / 0.03)";
                    }}
                  >
                    <card.icon
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                      style={{ color: "hsl(42 37% 50%)" }}
                    />
                    <span
                      className="font-sans font-medium uppercase"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        color: "hsl(233 50% 9% / 0.65)",
                      }}
                    >
                      {card.title}
                    </span>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Spacer between Land & Investment and Property Valuation */}
          <div className="h-4" />

          <nav className="flex flex-col gap-2.5 px-8" aria-label="Quick links">
            {links.map((link, i) => (
              <ScrollReveal key={link.label} delay={i * 100}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-[52px] rounded-full transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: (link as any).transparent ? "transparent" : "hsl(0 0% 100% / 0.55)",
                    border: (link as any).transparent ? "1px solid hsl(233 50% 9% / 0.06)" : (link as any).gold ? "1.5px solid hsl(42 37% 57% / 0.6)" : "1px solid hsl(42 37% 57% / 0.2)",
                    boxShadow: (link as any).transparent ? "none" : "0 2px 8px hsl(0 0% 0% / 0.03)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "hsl(42 37% 57% / 0.45)";
                    el.style.boxShadow = "0 4px 16px hsl(0 0% 0% / 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "hsl(42 37% 57% / 0.2)";
                    el.style.boxShadow = "0 2px 8px hsl(0 0% 0% / 0.03)";
                  }}
                >
                  <span
                    className="font-sans font-medium uppercase text-center transition-colors duration-200"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      color: (link as any).gold ? "#baa26a" : "hsl(233 50% 9% / 0.65)",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </nav>


          {/* ── CTA ── */}
          <ScrollReveal delay={100}>
            <div className="px-8 mt-4 mb-2">
              <a
                href="https://www.echelonpropertygroup.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-14 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "hsl(233 50% 9%)",
                  border: "1px solid hsl(233 50% 12%)",
                  boxShadow: "0 4px 20px hsl(0 0% 0% / 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 28px hsl(0 0% 0% / 0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 20px hsl(0 0% 0% / 0.1)";
                }}
              >
                <span
                  className="font-sans uppercase"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    color: "hsl(42 37% 65%)",
                    fontWeight: 800,
                  }}
                >
                  Schedule a Consultation
                </span>
              </a>
            </div>
          </ScrollReveal>

          {/* ── IABS Link ── */}
          <ScrollReveal delay={150}>
            <div className="px-8 mt-2 mb-2">
              <a
                href="https://www.dropbox.com/scl/fi/ism1gkeqt0bol9srh3b0a/IABS-1-2.pdf?rlkey=l05zn9bqqmg8e1ru4qjzsnd1o&dl=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-[52px] rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "transparent",
                  border: "1px solid hsl(233 50% 9% / 0.06)",
                }}
              >
                <span
                  className="font-sans font-medium uppercase text-center"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    color: "hsl(233 50% 9% / 0.65)",
                  }}
                >
                  Information About Brokerage Services
                </span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-2 mt-8 mb-4 px-4">
              <div
                className="w-10 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(42 37% 57% / 0.3), transparent)",
                }}
              />
              <a
                href="https://www.echelonpropertygroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans transition-opacity duration-300 hover:opacity-80"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#baa26a",
                }}
              >
                Echelon Property Group
              </a>
              <p
                className="font-sans"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "hsl(233 50% 9% / 0.4)",
                }}
              >
                Brokered by eXp Realty
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
};

export default Connect;
