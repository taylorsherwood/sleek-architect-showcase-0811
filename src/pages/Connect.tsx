import { useState, useEffect, lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";

const PrivateOpportunities = lazy(() => import("@/components/PrivateOpportunities"));
import taylorHeadshot from "@/assets/taylor-headshot.jpg";
import echelonLogo from "@/assets/echelon-logo-gold.png";
import { Instagram, Mail, Phone, Home, Search, Mountain } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useHeroScroll } from "@/hooks/useHeroScroll";

const links = [
  { label: "Complimentary Property Valuation", href: "https://www.echelonpropertygroup.com/sell" },
  { label: "Blog", href: "https://www.echelonpropertygroup.com/blog" },
  { label: "Work With Taylor", href: "https://www.echelonpropertygroup.com/contact", featured: true },
  { label: "Information About Brokerage Services", href: "https://www.dropbox.com/scl/fi/ism1gkeqt0bol9srh3b0a/IABS-1-2.pdf?rlkey=l05zn9bqqmg8e1ru4qjzsnd1o&dl=0" },
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
                <div className="flex items-center gap-3 mt-5">
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
                        background: "hsl(233 50% 9% / 0.06)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid hsl(233 50% 9% / 0.1)",
                        boxShadow:
                          "0 4px 16px hsl(0 0% 0% / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
                        color: "hsl(233 50% 9% / 0.55)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "hsl(42 37% 57% / 0.12)";
                        el.style.borderColor = "hsl(42 37% 57% / 0.3)";
                        el.style.color = "hsl(42 37% 45%)";
                        el.style.boxShadow =
                          "0 6px 24px hsl(42 37% 57% / 0.12), inset 0 1px 0 hsl(0 0% 100% / 0.3)";
                        el.style.transform = "translateY(-2px) scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "hsl(233 50% 9% / 0.06)";
                        el.style.borderColor = "hsl(233 50% 9% / 0.1)";
                        el.style.color = "hsl(233 50% 9% / 0.55)";
                        el.style.boxShadow =
                          "0 4px 16px hsl(0 0% 0% / 0.06), inset 0 1px 0 hsl(0 0% 100% / 0.3)";
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
          <ScrollReveal>
            <div className="flex flex-col items-center my-1 px-4">
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



          {/* ── Footer ── */}
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
