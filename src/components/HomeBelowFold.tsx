import React, { lazy, Suspense, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { formatPhoneNumber, getPhoneDigits, getTimestamp } from "@/lib/formUtils";
import ScrollingCredibilityStrip from "@/components/ScrollingCredibilityStrip";
import ExpertiseSection from "@/components/ExpertiseSection";
import FeaturedCommunities from "@/components/FeaturedCommunities";

// Dynamic image imports — only loaded when this chunk is loaded
import taylorBoatImg from "@/assets/taylor-headshot.jpeg";
import taylorAboutHeadshot from "@/assets/taylor-about-headshot.jpeg";
import taylorSignature from "@/assets/taylor-signature.png";
import echelonWatermark from "@/assets/echelon-watermark.png";
import echelonWatermarkLogo from "@/assets/echelon-watermark-logo.png";
import blogRollingwoodVsWestlake from "@/assets/blog-rollingwood-vs-westlake.jpg";
import blogTarrytownVsBrykerWoods from "@/assets/tarrytown-bryker-woods.avif";
import blogLakeAustinVsLakeTravis from "@/assets/lake-travis-sunset.jpg";

const Footer = lazy(() => import("@/components/Footer"));

/* ─────────────────────────────────────────────
   SECTION 2 — MICRO-TRUST STRIP
   ───────────────────────────────────────────── */

const TrustStrip = () => (
  <section className="hidden lg:block bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <div className="border-t border-border/15" />
        <div className="flex items-center justify-center gap-16 py-5 mt-4">
        {["EXP LUXURY DIVISION", "CERTIFIED COMMERCIAL INVESTMENT MEMBER (CCIM) CANDIDATE", "$125M+ CAREER SALES VOLUME"].map((text, i) => (
            <span key={i} className="text-muted-foreground/65" style={{
              fontFamily: '"Jost", sans-serif', fontWeight: 400, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase"
            }}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 3 — ADVISOR POSITIONING
   ───────────────────────────────────────────── */

const AdvisorSection = () => (
  <section className="bg-background pt-12 md:pt-20">
    <div className="max-w-[1400px] mx-auto">
       <div className="grid lg:grid-cols-[minmax(480px,520px)_1fr] items-start" style={{ gap: 0 }}>
         {/* Left — editorial portrait */}
          <div className="relative flex flex-col items-center bg-background w-full overflow-hidden">
            <div className="relative w-full p-4 md:pt-14">
              <img
                src={taylorBoatImg}
                alt="Taylor Sherwood — Austin luxury real estate advisor and founder of Echelon Property Group"
                title="Taylor Sherwood, Echelon Property Group"
                className="w-full h-[400px] md:h-[700px] object-cover object-center rounded-sm"
                loading="lazy" decoding="async"
                sizes="(max-width: 1024px) 100vw, 480px"
                width={520}
                height={693}
                style={{ filter: "brightness(0.96) contrast(1.03)" }}
              />
              <div className="absolute inset-4 rounded-sm pointer-events-none" style={{
                boxShadow: "inset 0 0 60px 20px hsl(var(--background) / 0.15)",
              }} />
            </div>

            {/* Social links */}
            <div className="w-full flex flex-col items-center pt-5 pb-2 px-4">
              <div className="w-12 h-px bg-gold mb-5" />
              <div className="flex items-center justify-center gap-6 max-w-[360px]">
                <a
                  href="https://www.instagram.com/theinvestorbroker/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold group/ig"
                  style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 400 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  <span className="relative leading-none">
                    @THEINVESTORBROKER
                    <span className="absolute left-0 -bottom-0.5 w-full h-px bg-gold scale-x-0 group-hover/ig:scale-x-100 transition-transform duration-500 origin-center" />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/taylorsherwood/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 text-gold group/li"
                  style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 400 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="flex-shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="relative leading-none">
                    TAYLOR SHERWOOD
                    <span className="absolute left-0 -bottom-0.5 w-full h-px bg-gold scale-x-0 group-hover/li:scale-x-100 transition-transform duration-500 origin-center" />
                  </span>
                </a>
              </div>
            </div>
          </div>

        {/* Right — content */}
        <div className="flex flex-col justify-center bg-secondary lg:-mt-14" style={{ padding: "clamp(36px, 5vw, 64px)" }}>
          <ScrollReveal>
            <p className="text-minimal text-gold mb-6">
              TAYLOR SHERWOOD, FOUNDER
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2 className="font-display text-[1.85rem] md:text-[2.6rem] font-normal text-foreground leading-[1.06] tracking-[0.03em] mb-6">
              Access Meets Expertise
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p className="text-foreground text-lg md:text-[1.3rem] font-medium leading-[1.4] mb-7 tracking-[-0.01em]" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 400 }}>
              Most people search for properties. My clients acquire them.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="relative overflow-visible">
              <img
                src={echelonWatermarkLogo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute pointer-events-none select-none hidden md:block"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-32%, -72%)',
                  height: '100%',
                  width: 'auto',
                  opacity: 0.06,
                }}
              />
              <div className="relative space-y-4 mb-8" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>
                  <p className="text-foreground/70 text-[16px] leading-[1.8]">
                    In Austin's upper tier, the best opportunities are rarely public. They are negotiated, sourced, and secured through relationships, timing, and leverage- not search portals.
                  </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  I operate in that space.
                </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  I work with a select group of buyers, sellers, and investors to navigate high-value real estate with precision. That includes private and off-market opportunities, strategic acquisitions, and positioning properties to command maximum value.
                </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  This is not a volume business. It's a strategy business.
                </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  Every move is intentional, from how a property is sourced, to how it's negotiated, to how it's presented to the market. The difference isn't subtle. It's measurable in outcomes.
                </p>
                <p className="text-foreground/70 text-[16px] leading-[1.8]">
                  If you're looking for <em>access</em>, <em>clarity</em>, and <em>execution</em> at a higher level, you're ready to be in the <em>upper echelon</em>. 
                  You don't need more listings, you need a <em>smarter approach</em>.
                </p>
                 <p className="text-foreground/70 text-[16px] leading-[1.8] mt-4 font-serif italic">
                     Buy. Sell. Invest.
                     <br /><br />
                     <span className="font-bold">Let's get to work,</span>
                  </p>
                 <div className="!mt-0 !pt-0 -mb-8"><img src={taylorSignature} alt="Taylor Sherwood signature" className="block h-[140px] opacity-80 -translate-y-4" loading="lazy" decoding="async" /></div>
              </div>
            </div>


            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link to="/contact" className="cta-luxury">
                WORK WITH ME
              </Link>
              <Link to="/past-transactions"
                className="relative inline-flex items-center text-muted-foreground/55 hover:text-gold transition-colors duration-[400ms] pt-3 sm:pt-0 sm:self-center sm:ml-2 group/link"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 400 }}>
                VIEW PAST TRANSACTIONS →
                <span className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 3B — STATS STRIP
   ───────────────────────────────────────────── */

const useCountUp = (target: number, duration = 2600, from = 0) => {
  const [count, setCount] = useState(from);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animId = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setCount(from);
          const startTime = performance.now();
          const id = ++animId.current;
          const step = (now: number) => {
            if (id !== animId.current) return;
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(from + eased * (target - from)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        } else {
          setCount(from);
          setInView(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, from]);

  return { count, ref, inView };
};

const stats = [
  { value: 125, suffix: "M+", prefix: "$", label: "Career Sales Volume", from: 50 },
  { value: 200, suffix: "+", prefix: "", label: "Transactions Closed", from: 100 },
  { value: 11, suffix: "+", prefix: "", label: "Years of Experience", from: 1 },
  { value: 250, suffix: "M+", prefix: "$", label: "Off-Market Access", from: 150 },
];

const StatItem = ({ stat }: { stat: typeof stats[number] }) => {
  const { count, ref, inView } = useCountUp(stat.value, 3500, stat.from);
  return (
    <div ref={ref} className="text-center group/stat">
      <p style={{
        fontFamily: '"Cinzel", serif', fontWeight: 400,
        fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1, color: "#F5F3EF",
      }}>
        {stat.prefix}{count}
        <span style={{
          fontFamily: '"Cinzel", serif', fontWeight: 400,
          fontSize: "0.6em", color: "hsl(38 39% 61%)", verticalAlign: "super",
        }}>
          {stat.suffix}
        </span>
      </p>
      <div className="relative inline-block mt-2 pb-3">
        <p style={{
          fontFamily: '"Jost", sans-serif', fontWeight: 300,
          fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#9A9690",
        }}>
          {stat.label}
        </p>
        <div
          className="absolute bottom-0 left-0 h-px"
          style={{
            background: "hsl(38 39% 61%)",
            width: inView ? "100%" : "0%",
            transition: "width 3.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </div>
  );
};

const StatsStrip = () => (
  <section style={{ background: "#080B1A", padding: "clamp(64px, 10vw, 120px) 0" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 4 — FEATURED PROPERTIES
   ───────────────────────────────────────────── */

const properties = [
  {
    image: "/lovable-uploads/0fc79a0b-1fde-439f-bb08-6062e50770b7.jpg",
    address: "2300 Barton Creek Boulevard #15",
    location: "Barton Creek, Austin",
    price: "$3,495,000",
    beds: 4, baths: 4, sqft: "4,147",
    link: "https://www.bartoncreekvilla.com",
    badge: "Private Listing",
  },
  {
    image: "/static-assets/listing-3.jpg",
    address: "Ranch Estate on 42 Acres",
    location: "Texas Hill Country",
    price: "$5M+",
    beds: 4, baths: 5, sqft: "5,800",
    link: "#",
    badge: "Private Market Opportunity",
  },
];

const FeaturedProperties = () => (
  <section className="bg-secondary" style={{ padding: "clamp(64px, 10vw, 120px) 0" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-10 h-px mx-auto mb-5" style={{ background: "hsl(38 39% 61%)" }} />
            <p className="text-minimal text-gold mb-5">FEATURED LISTINGS</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-normal text-foreground/90 mb-4 leading-[1.1] tracking-[0.03em]">
              Exceptional Properties
            </h2>
            <div className="w-[60px] h-px mx-auto" style={{ background: "hsl(38 39% 61%)" }} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((p, i) => {
              const isExternal = p.link.startsWith("http");
              const Wrapper = isExternal ? "a" : "div";
              const wrapperProps = isExternal ? { href: p.link, target: "_blank" as const, rel: "noopener noreferrer" } : {};
              return (
                <Wrapper key={i} {...wrapperProps} className="group block cursor-pointer">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", background: "#12162E" }}>
                    <img src={p.image} alt={p.address}
                      className="community-tile-img w-full h-full object-cover"
                      loading="lazy" decoding="async"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      width={600}
                      height={800}
                    />
                    <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 pointer-events-none flex items-center justify-center [transition:opacity_0.6s_cubic-bezier(0.16,1,0.3,1)]">
                      <span className="text-gold tracking-[0.2em] uppercase font-normal" style={{ fontFamily: '"Jost", sans-serif', fontSize: "0.75rem" }}>
                        EXPLORE &rarr;
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-8"
                      style={{ background: "linear-gradient(to top, rgba(12,15,36,0.92) 0%, transparent 100%)" }}>
                      <p style={{
                        fontFamily: '"Cinzel", serif', fontWeight: 400,
                        fontSize: "22px", color: "#F5F3EF", marginBottom: "4px",
                      }}>
                        {p.price}
                      </p>
                      <p style={{
                        fontFamily: '"Jost", sans-serif', fontWeight: 300,
                        fontSize: "13px", color: "rgba(245,243,239,0.8)",
                      }}>
                        {p.address}
                      </p>
                      <p style={{
                        fontFamily: '"Jost", sans-serif', fontSize: "11px",
                        color: "#9A9690", marginTop: "6px", letterSpacing: "0.05em",
                      }}>
                        {p.beds} Beds · {p.baths} Baths · {p.sqft} Sq Ft
                      </p>
                    </div>
                  </div>
                </Wrapper>
              );
            })}

            {/* Off-market card */}
            <Link to="/off-market-real-estate-austin" className="group block">
              <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: "3/4", background: "#0C0F24" }}>
                <img src="/static-assets/echelon-logo-gold-square.png" alt="Echelon Property Group"
                  className="w-1/2 h-auto object-contain group-hover:scale-[1.03] will-change-transform [transition:transform_1.8s_cubic-bezier(0.19,1,0.22,1)]"
                  loading="lazy" decoding="async"
                  width={400}
                  height={400}
                />
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-8 text-center"
                  style={{ background: "linear-gradient(to top, rgba(12,15,36,0.92) 0%, transparent 100%)" }}>
                  <p style={{
                    fontFamily: '"Cinzel", serif', fontWeight: 400,
                    fontSize: "20px", color: "#F5F3EF", marginBottom: "4px",
                  }}>
                    Off-Market Opportunities
                  </p>
                  <p style={{
                    fontFamily: '"Jost", sans-serif', fontWeight: 300,
                    fontSize: "13px", color: "rgba(245,243,239,0.6)",
                  }}>
                    Exclusive private listings →
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="text-center mt-16">
            <Link to="/austin-luxury-homes-for-sale" className="cta-luxury">
              EXPLORE ALL LISTINGS
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 5 — TESTIMONIALS
   ───────────────────────────────────────────── */

const testimonials = [
  {
    quote: "Taylor made selling our Barton Creek home seamless. His market knowledge and marketing strategy brought us multiple offers above asking within the first week.",
    name: "James & Sarah Mitchell",
    context: "Sold in Barton Creek",
  },
  {
    quote: "Taylor was fantastic to work with! He really understood what I was looking for and showed me great options that fit my specific criteria. When I was ready to make an offer, he helped things move quickly to meet a tight closing date.",
    name: "Meredith Taylor",
    context: "Purchased in Austin",
  },
  {
    quote: "Taylor's deep understanding of Austin's investment landscape helped us identify a property that exceeded our return expectations. His analysis was institutional-grade and his negotiation saved us significantly on the acquisition.",
    name: "David Chen",
    context: "Investment Property, Austin",
  },
  {
    quote: "Taylor was incredible to work with! He's knowledgeable, responsive, and genuinely cares about getting the best results for his clients. Highly recommend him to anyone buying or selling in Austin.",
    name: "Yaniv Dotan",
    context: "Purchased and sold in Barton Creek",
  },
  {
    quote: "Taylor's attention to detail and marketing approach are truly exceptional. From staging to photography to negotiation, every step reflected true professionalism and commitment. Highly recommend! Will absolutely use him for future endeavors no question about it.",
    name: "Cynthia Hampton",
    context: "Purchased and sold in Austin",
  },
  {
    quote: "I had a very good experience with Taylor on the purchase of my home in the Austin area. He provided several options to visit until I found the perfect home. Taylor was very knowledgeable, professional and patient with all of the questions I had along the way. I highly recommend him for your real estate needs!",
    name: "Wayne French",
    context: "Purchased in Bastrop",
  },
  {
    quote: "Taylor did not just help us find a home. He brought us opportunities we never would have seen otherwise. His off market access made all the difference.",
    name: "Alexandra Morgan",
    context: "Purchased in Spanish Oaks",
  },
  {
    quote: "The level of service and communication was exceptional. Taylor operates with a level of professionalism you rarely see in this industry.",
    name: "Priya Shah",
    context: "Purchased in Tarrytown",
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!sectionRef.current || !watermarkRef.current) { ticking = false; return; }
        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = 1 - (rect.bottom / (vh + rect.height));
        const clamped = Math.max(0, Math.min(1, progress));
        const y = (clamped - 0.5) * 18;
        const x = (clamped - 0.5) * -6;
        watermarkRef.current.style.transform = `translate(calc(1% + ${x}px), calc(4% + ${y}px))`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className="bg-secondary relative overflow-hidden" style={{ padding: "clamp(48px, 7vw, 90px) 0" }}>
      <div ref={watermarkRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true"
        style={{ transform: "translate(1%, 4%)", transition: "transform 0.15s linear", willChange: "transform" }}>
        <div style={{
          width: "600px",
          maxWidth: "90vw",
          aspectRatio: "1",
          maskImage: "radial-gradient(ellipse 60% 60% at center, black 0%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at center, black 0%, black 40%, transparent 85%)",
        }}>
          <img src={echelonWatermark} alt="" className="w-full h-full object-contain"
            loading="lazy" decoding="async"
            style={{ opacity: 0.09, filter: "blur(0.8px) saturate(0.85) brightness(1.02)" }} />
        </div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[800px] mx-auto text-center relative" style={{ minHeight: "320px" }}>
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4">CLIENT EXPERIENCES</p>
            <h2 className="font-display text-2xl md:text-[2.2rem] font-normal text-foreground leading-[1.15] tracking-[0.02em] mb-8">
              clients first. <span className="italic">Proven Results.</span>
            </h2>
          </ScrollReveal>

          <div style={{ minHeight: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p key={active} className="mb-6" style={{
              fontFamily: '"Jost", sans-serif', fontWeight: 300,
              fontSize: "clamp(15px, 1.8vw, 20px)", lineHeight: 1.85, letterSpacing: "0.01em",
              color: "hsl(var(--foreground) / 0.8)",
              animation: "fadeUp 0.6s ease both",
            }}>
              <span style={{ color: "hsl(38 39% 61%)", marginRight: "0.15em" }}>&ldquo;</span>
              {t.quote}
              <span style={{ color: "hsl(38 39% 61%)", marginLeft: "0.15em" }}>&rdquo;</span>
            </p>
          </div>

          <p key={`name-${active}`} style={{
            fontFamily: '"Jost", sans-serif', fontSize: "13px", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "hsl(38 39% 61%)", marginTop: "24px",
            animation: "fadeUp 0.6s ease 0.15s both",
          }}>
            {t.name}
          </p>
          <p key={`ctx-${active}`} style={{
            fontFamily: '"Jost", sans-serif', fontSize: "12px", letterSpacing: "0.12em",
            textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginTop: "6px",
            animation: "fadeUp 0.6s ease 0.25s both",
          }}>
            {t.context}
          </p>

          <div className="flex items-center justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background: i === active ? "hsl(38 39% 61%)" : "hsl(var(--border))",
                  transform: i === active ? "scale(1.2)" : "scale(1)",
                }}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 6 — COMMUNITIES
   ───────────────────────────────────────────── */

const communities = [
  { name: "Barton Creek", descriptor: "Golf, privacy, Hill Country estates", image: "/static-assets/community-barton-creek.jpg", slug: "barton-creek", priceFrom: "From $2M+" },
  { name: "Lake Austin", descriptor: "Waterfront living at its finest", image: "/static-assets/community-lake-austin.jpg", slug: "lake-austin", priceFrom: "From $3.5M+" },
  { name: "Rollingwood", descriptor: "Intimate enclave near Zilker", image: "/static-assets/community-rollingwood.jpg", slug: "rollingwood", priceFrom: "From $1.2M+" },
  { name: "Spanish Oaks", descriptor: "Gated Hill Country luxury", image: "/static-assets/community-spanish-oaks.jpg", slug: "spanish-oaks", priceFrom: "From $2.5M+" },
  { name: "Tarrytown", descriptor: "Old Austin charm, central location", image: "/static-assets/community-tarrytown.jpg", slug: "tarrytown", priceFrom: "From $1.5M+" },
  { name: "Westlake Hills", descriptor: "Scenic bluffs, top-rated schools", image: "/static-assets/community-westlake-hills.jpg", slug: "westlake-hills", priceFrom: "From $1.8M+" },
];

const CommunitiesSection = () => (
  <section className="bg-background" style={{ padding: "clamp(32px, 5vw, 64px) 0 clamp(64px, 10vw, 120px)" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-10 h-px mx-auto mb-5" style={{ background: "hsl(38 39% 61%)" }} />
            <p className="text-minimal text-gold mb-5">SELECT COMMUNITIES</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-normal text-foreground/90 leading-[1.1] tracking-[0.03em]">
              Explore Austin's Most Sought-After Communities
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} stagger={60}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-5 lg:gap-4">
            {communities.map((c) => (
              <Link key={c.slug} to={`/communities/${c.slug}`} className="group relative overflow-hidden aspect-[3/4] sm:aspect-[3/4] lg:aspect-[4/3] transition-shadow duration-[500ms] hover:shadow-[0_12px_30px_-8px_hsl(var(--foreground)/0.1)]">
                <img src={c.image} alt={`Luxury homes in ${c.name}, Austin`}
                  className="community-tile-img absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                  loading="lazy" decoding="async" />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 sm:from-foreground/65 via-foreground/20 sm:via-foreground/15 via-[45%] to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span style={{
                    fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.18em",
                    textTransform: "uppercase", color: "hsl(38 39% 61%)", fontWeight: 400,
                  }}>
                    Explore →
                  </span>
                </div>

                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10" style={{
                  background: "rgba(12,15,36,0.8)", border: "1px solid hsl(38 39% 61%)",
                }}>
                  <span className="block px-2 py-[3px] sm:px-2 sm:py-[2px] lg:px-[10px] lg:py-1" style={{
                    fontFamily: '"Jost", sans-serif', letterSpacing: "0.12em",
                    color: "hsl(38 39% 61%)",
                    fontSize: "clamp(8px, 1.8vw, 10px)",
                  }}>
                    {c.priceFrom}
                  </span>
                </div>

                <div className="absolute bottom-6 left-5 right-5 sm:bottom-5 z-10 group-hover:opacity-0 transition-opacity duration-500">
                  <h3 className="font-display text-base sm:text-[1.05rem] lg:text-xl font-medium tracking-[0.03em] leading-[1.1] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] mb-2 sm:mb-1.5" style={{ color: "#F5F3EF" }}>
                    {c.name}
                  </h3>
                  <p className="line-clamp-1 hidden sm:block" style={{
                    fontFamily: '"Jost", sans-serif', fontSize: "10px", fontWeight: 300,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "rgba(250,250,248,0.72)",
                  }}>
                    {c.descriptor}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="text-center mt-16">
            <Link to="/communities" className="cta-luxury">
              VIEW ALL COMMUNITIES
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 7 — INSIGHTS
   ───────────────────────────────────────────── */

const insights = [
  { to: "/blog/austin-luxury-real-estate-market-forecast", title: "Austin Luxury Market Forecast", excerpt: "Expert analysis of pricing trends, inventory, and investment outlook across Austin's luxury segments.", category: "Market Insights" },
  { to: "/blog/best-luxury-neighborhoods-austin-texas", title: "Best Luxury Neighborhoods in Austin", excerpt: "A comprehensive guide to Austin's most prestigious communities and what makes each one unique.", category: "Neighborhoods" },
  { to: "/blog/top-investment-neighborhoods-austin", title: "Top Investment Neighborhoods", excerpt: "Data-driven analysis of appreciation trends, rental yields, and growth potential across Austin.", category: "Investment" },
  { to: "/blog/best-waterfront-homes-austin", title: "Best Waterfront Homes in Austin", excerpt: "Lake Austin estates, Lake Travis retreats, and what to know before buying waterfront property.", category: "Waterfront" },
  { to: "/blog/moving-to-austin-texas-from-california", title: "Moving to Austin from California", excerpt: "Everything California residents need to know about relocating — taxes, neighborhoods, and lifestyle.", category: "Relocation" },
  { to: "/blog/austin-property-taxes-explained", title: "Austin Property Taxes Explained", excerpt: "Rates, exemptions, protest strategies, and how property taxes affect luxury real estate decisions.", category: "Market Insights" },
];

const InsightsSection = () => (
  <section id="insights-section" className="bg-secondary" style={{ padding: "clamp(64px, 10vw, 120px) 0 clamp(32px, 5vw, 56px)" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-10 h-px mx-auto mb-5" style={{ background: "hsl(38 39% 61%)" }} />
            <p className="text-minimal text-gold mb-5">MARKET INTELLIGENCE</p>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-normal text-foreground/90 leading-[1.1] tracking-[0.03em]">
              Insights & Market Intelligence
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} stagger={70}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((article) => (
              <Link key={article.to} to={article.to} className="group block bg-card border border-border/30 overflow-hidden
                shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-[500ms] hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)]">
                <div className="p-7 flex flex-col h-full">
                  <p className="text-gold mb-2.5" style={{ fontFamily: '"Jost", sans-serif', fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 400 }}>{article.category}</p>
                  <h3 className="font-display text-[17px] font-medium text-foreground/90 mb-3 leading-[1.35] group-hover:text-gold transition-colors duration-[400ms] tracking-[0.01em]">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground/70 text-[13.5px] leading-[1.85] flex-1" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>{article.excerpt}</p>
                  <span className="mt-5 text-gold group-hover:text-gold transition-colors duration-[400ms]" style={{ fontFamily: '"Jost", sans-serif', fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 400 }}>
                    READ MORE →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="text-center mt-16">
            <Link to="/blog" className="cta-luxury">
              EXPLORE ALL INSIGHTS
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SECTION 8 — LEAD CAPTURE
   ───────────────────────────────────────────── */

const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/";

const LeadCapture = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const body = new URLSearchParams({
        name, email, lead_source: "Homepage Off-Market CTA",
        page_url: window.location.href, submitted_at: getTimestamp(),
      });
      await fetch(ZAPIER_WEBHOOK, { method: "POST", body });
      setSubmitted(true);
    } catch { /* silent */ }
    setLoading(false);
  };

  return (
    <section className="bg-background" style={{ padding: "clamp(64px, 10vw, 120px) 0" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-[460px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-3">EXCLUSIVE ACCESS</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="font-display text-2xl md:text-[1.85rem] font-normal mb-3 leading-[1.15] tracking-[0.03em] text-foreground">
              Private Opportunities, Before They're Public
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-[14px] leading-[1.7] mb-7 max-w-[380px] mx-auto text-muted-foreground" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>
              Be the first to see private listings and exclusive opportunities before they hit the market.
            </p>

            {submitted ? (
              <div className="py-6">
                <p className="font-display text-lg text-gold">Thank you for requesting access.</p>
                <p className="text-sm mt-2 text-muted-foreground" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>We'll be in touch shortly with exclusive opportunities.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-[420px] mx-auto">
                <div className="flex flex-col gap-2.5 mb-3">
                  <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-[13px] focus:outline-none transition-all duration-300"
                    style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "0", color: "#0C0F24" }} />
                  <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-[13px] focus:outline-none transition-all duration-300"
                    style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "0", color: "#0C0F24" }} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 text-white disabled:opacity-50 transition-all duration-[250ms] ease-out hover:-translate-y-[1px] active:translate-y-0"
                  style={{
                    fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.15em", fontWeight: 400, textTransform: "uppercase",
                    background: "#0C0F24", borderRadius: "0",
                  }}
                  onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = "hsl(38 39% 61%)"; }}}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#0C0F24"; }}>
                  {loading ? "Sending..." : "Unlock Private Access"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION 9 — FINAL CTA
   ───────────────────────────────────────────── */

const linkGroups = [
  {
    heading: "Buy & Sell",
    links: [
      { to: "/buy", label: "Buy a Home" },
      { to: "/sell", label: "Sell Your Home" },
      { to: "/austin-luxury-homes-for-sale", label: "Austin Luxury Homes" },
      { to: "/luxury-real-estate-austin", label: "Luxury Real Estate" },
    ],
  },
  {
    heading: "Invest",
    links: [
      { to: "/invest", label: "Investment Advisory" },
      { to: "/austin-real-estate-investment", label: "Real Estate Investment" },
      { to: "/austin-commercial-real-estate", label: "Commercial Real Estate" },
      { to: "/land-for-sale-austin", label: "Land for Sale" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { to: "/communities", label: "Communities" },
      { to: "/best-luxury-neighborhoods-austin", label: "Best Neighborhoods" },
      { to: "/moving-to-austin-texas", label: "Moving to Austin" },
      { to: "/off-market-real-estate-austin", label: "Off-Market Access" },
    ],
  },
];

const FinalCTA = () => (
  <>
    <section id="final-cta-section" data-nav-dark-zone style={{ padding: "clamp(32px, 5vw, 56px) 0 clamp(64px, 10vw, 120px)" }} className="bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-5">GET STARTED</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="font-display text-3xl md:text-[2.75rem] font-normal mb-5 leading-[1.1] tracking-[0.03em] text-architectural">
              Work With
              <br />
              Echelon Property Group
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p className="text-[15px] mb-12 max-w-[400px] mx-auto text-muted-foreground" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, lineHeight: 1.8 }}>
              Luxury real estate, redefined through strategy, access, and execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/buy" className="cta-luxury">
                BUY PROPERTY
              </Link>
              <Link to="/sell" className="cta-luxury cta-luxury--ghost">
                SELL PROPERTY
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Priority internal links */}
    <section className="bg-secondary" style={{ padding: "clamp(48px, 7vw, 76px) 0" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-[760px] mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p
              className="text-gold mb-2"
              style={{ fontFamily: '"Jost", sans-serif', fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}
            >
              EXPLORE AUSTIN REAL ESTATE
            </p>
            <div className="w-6 h-px mx-auto" style={{ background: "#b9a06c" }} />
          </div>

          <div className="hidden sm:grid sm:grid-cols-[1fr_1px_1fr_1px_1fr] gap-x-0 items-start">
            {linkGroups.map((group, i) => (
              <React.Fragment key={group.heading}>
                {i > 0 && (
                  <div className="self-stretch flex items-center justify-center">
                    <div className="w-px h-full" style={{ background: "rgba(184,160,109,0.12)" }} />
                  </div>
                )}
                <div className="px-8 text-center group/col transition-opacity duration-300 hover:opacity-100" style={{ opacity: 0.88 }}>
                  <h4
                    className="text-foreground/70 mb-4"
                    style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}
                  >
                    {group.heading}
                  </h4>
                  <div className="space-y-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block text-muted-foreground/55 hover:text-gold transition-all duration-300 hover:translate-x-0.5"
                        style={{ fontFamily: '"Jost", sans-serif', fontSize: "13px", fontWeight: 300, lineHeight: 2, letterSpacing: "0.015em" }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="sm:hidden space-y-8">
            {linkGroups.map((group) => (
              <div key={group.heading} className="text-center">
                <h4
                  className="text-foreground/70 mb-3"
                  style={{ fontFamily: '"Jost", sans-serif', fontSize: "9.5px", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}
                >
                  {group.heading}
                </h4>
                <div className="space-y-1.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block text-muted-foreground/55 hover:text-gold transition-colors duration-300"
                      style={{ fontFamily: '"Jost", sans-serif', fontSize: "13px", fontWeight: 300, lineHeight: 2, letterSpacing: "0.015em" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <div className="bg-background" style={{ height: "clamp(40px, 6vw, 80px)" }} />
  </>
);

/* ─────────────────────────────────────────────
   SECTION 9B — EDITORIAL INSIGHTS
   ───────────────────────────────────────────── */

const editorialArticles = [
  {
    title: "Rollingwood vs Westlake Hills",
    description: "How two of Austin's most prestigious neighborhoods compare for luxury buyers.",
    image: blogRollingwoodVsWestlake,
    href: "/blog/rollingwood-vs-westlake-hills",
  },
  {
    title: "Tarrytown vs Bryker Woods",
    description: "A closer look at Austin's most sought-after 78703 neighborhoods.",
    image: blogTarrytownVsBrykerWoods,
    href: "/blog/tarrytown-vs-bryker-woods",
  },
  {
    title: "Lake Austin vs Lake Travis",
    description: "Waterfront lifestyles compared — proximity, pricing, and daily experience.",
    image: blogLakeAustinVsLakeTravis,
    href: "/blog/lake-austin-vs-lake-travis",
  },
];

const EditorialInsights = () => (
  <section className="bg-secondary" style={{ padding: "clamp(64px, 9vw, 110px) 0" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <ScrollReveal>
            <p className="text-minimal text-gold mb-4 tracking-[0.25em]">CURATED KNOWLEDGE</p>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h2 className="font-display text-[1.65rem] md:text-[2.25rem] font-normal text-architectural leading-[1.1] tracking-[0.03em] mb-4">
              Austin Real Estate Insights
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, fontSize: "15px", lineHeight: 1.75 }}>
              Strategic guidance, neighborhood comparisons, and market insights for buyers and sellers navigating Austin's luxury real estate market.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {editorialArticles.map((article, i) => (
            <ScrollReveal key={article.href} delay={i * 80}>
              <Link to={article.href} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-5">
                  <img
                    src={article.image}
                    alt={`${article.title} — Austin luxury real estate`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3
                  className="font-display text-lg md:text-xl font-normal text-architectural leading-[1.2] tracking-[0.02em] mb-2 group-hover:text-gold transition-colors duration-300"
                >
                  {article.title}
                </h3>
                <p className="text-muted-foreground" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, fontSize: "14px", lineHeight: 1.65 }}>
                  {article.description}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const NoscriptFallback = () => (
  <noscript>
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-light mb-6">Austin Luxury Real Estate Services</h2>
        <p className="mb-4">Echelon Property Group provides strategic luxury real estate advisory across Austin, Texas.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Luxury residential sales in Westlake Hills, Barton Creek, Lake Austin, Tarrytown, and Rollingwood</li>
          <li>Off-market and private listing opportunities</li>
          <li>Commercial real estate and multifamily investment</li>
          <li>Land acquisition and development advisory</li>
        </ul>
        <p>2105 East MLK Blvd Ste 227, Austin, Texas 78702</p>
        <p>Email: <a href="mailto:taylor@echelonpropertygroup.com">Send an Email</a></p>
        <p>Phone: <a href="tel:+15126613843">(512) 661-3843</a></p>
      </div>
    </section>
  </noscript>
);

/* ─────────────────────────────────────────────
   COMPOSED BELOW-FOLD CONTENT
   ───────────────────────────────────────────── */

const HomeBelowFold = () => (
  <>
    <TrustStrip />
    <div className="h-10 md:h-16 bg-secondary" aria-hidden="true" />
    <ScrollingCredibilityStrip />
    <div className="h-5 md:h-8 bg-background" aria-hidden="true" />
    <AdvisorSection />
    <StatsStrip />

    <div className="parallax-break" style={{ backgroundImage: "url('/images/parallax-skyline.jpg')" }} aria-hidden="true" />

    <FeaturedProperties />

    <NoscriptFallback />

    <CommunitiesSection />

    <ExpertiseSection />

    <TestimonialsSection />
    <div className="h-16 md:h-24 bg-secondary flex items-center justify-center" aria-hidden="true">
      <div className="w-16 h-px bg-gold" />
    </div>
    <div className="h-12 md:h-20 bg-secondary" aria-hidden="true" />

    <div className="parallax-break" style={{ backgroundImage: "url('/images/parallax-lakefront.jpg')" }} aria-hidden="true" />


    <div className="parallax-break" style={{ backgroundImage: "url('/images/parallax-interior.jpg')" }} aria-hidden="true" />

    <LeadCapture />
    <InsightsSection />
    <EditorialInsights />
    <FeaturedCommunities />
    <FinalCTA />

    <Suspense fallback={<div className="min-h-[100px]" />}>
      <Footer />
    </Suspense>
  </>
);

export default HomeBelowFold;
