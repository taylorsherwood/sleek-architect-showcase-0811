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
  { label: "Work With Taylor", href: "/about" },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/TheInvestorBroker", label: "Instagram" },
  { icon: Mail, href: "mailto:taylor@echelonpropertygroup.com", label: "Email" },
  { icon: Phone, href: "tel:+15126613843", label: "Phone" },
];

const Connect = () => {
  const scrollProgress = useHeroScroll();
  const [heroHeight, setHeroHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      const heroEl = document.getElementById("connect-hero");
      if (heroEl) setHeroHeight(heroEl.offsetHeight);
      setIsMobile(window.innerWidth <= 430);
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const heroProgress = heroHeight > 0 ? Math.min(window.scrollY / (heroHeight * 0.6), 1) : 0;

  return (
    <>
      <SEOHead
        title="Connect With Taylor Sherwood | Echelon Property Group"
        description="Connect with Austin luxury real estate advisor Taylor Sherwood. Browse listings, search homes, or schedule a private consultation with Echelon Property Group."
      />
      <div
        className="min-h-screen flex flex-col items-center bg-secondary"
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
                    loading="lazy" decoding="async"
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
                    background: "#b8a06d",
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
                      rel="noopener noreferrer nofollow"
                      aria-label={s.label}
                      className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: "hsl(233 50% 9% / 0.05)",
                        border: "1px solid hsl(233 50% 9% / 0.08)",
                        color: "hsl(233 50% 9% / 0.45)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "hsl(var(--gold) / 0.1)";
                        el.style.borderColor = "hsl(var(--gold) / 0.25)";
                        el.style.color = "hsl(var(--gold-deep))";
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
            <div className="flex flex-col items-center px-4" style={{ marginTop: isMobile ? "-4px" : "8px" }}>
              <img
                src={combinedLogo}
                alt="eXp Realty and Echelon Property Group combined brokerage logo"
                className="w-full"
                style={{ height: isMobile ? "110px" : "300px", marginBottom: "8px", objectFit: "contain", objectPosition: "53.25% center" }}
                loading="eager"
              />
            </div>
          </ScrollReveal>

          {/* ── CTA Strip ── */}
          <div className="px-8 mb-3 mt-6">
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
                      border: "1.5px solid hsl(var(--gold) / 0.5)",
                      boxShadow: "0 2px 8px hsl(0 0% 0% / 0.03)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "hsl(var(--gold) / 0.75)";
                      el.style.boxShadow = "0 4px 16px hsl(0 0% 0% / 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "hsl(var(--gold) / 0.5)";
                      el.style.boxShadow = "0 2px 8px hsl(0 0% 0% / 0.03)";
                    }}
                  >
                    <card.icon
                      className="w-4 h-4 flex-shrink-0"
                      strokeWidth={1.5}
                      style={{ color: "hsl(var(--gold-deep))" }}
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

          {/* Gold ornamental spacer */}
          <div className="flex items-center justify-center gap-3 my-6 px-12">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #b8a06d)" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#b8a06d" }} />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #b8a06d, transparent)" }} />
          </div>

          <nav className="flex flex-col gap-2.5 px-8 mt-2" aria-label="Quick links">
            {links.map((link, i) => (
              <ScrollReveal key={link.label} delay={i * 100}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-center w-full h-[52px] rounded-full transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "hsl(0 0% 100% / 0.55)",
                    border: "1.5px solid hsl(var(--gold) / 0.5)",
                    boxShadow: "0 2px 8px hsl(0 0% 0% / 0.03)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "hsl(var(--gold) / 0.75)";
                    el.style.boxShadow = "0 4px 16px hsl(0 0% 0% / 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "hsl(var(--gold) / 0.5)";
                    el.style.boxShadow = "0 2px 8px hsl(0 0% 0% / 0.03)";
                  }}
                >
                  <span
                    className="font-sans font-medium uppercase text-center transition-colors duration-200"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      color: "hsl(233 50% 9% / 0.65)",
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
                rel="noopener noreferrer nofollow"
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
                    color: "white",
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
                rel="noopener noreferrer nofollow"
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
                  INFORMATION ABOUT BROKERAGE SERVICES (IABS)
                </span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center gap-2 mt-8 mb-4 px-4">
              <div
                className="w-10 h-px"
                style={{
                  background: "#b8a06d",
                }}
              />
              <a
                href="https://www.echelonpropertygroup.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
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
