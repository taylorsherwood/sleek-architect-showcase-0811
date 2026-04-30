import { useEffect, useRef, useState } from "react";
import echelonWatermark from "@/assets/echelon-watermark.webp";

const testimonials = [
  {
    quote:
      "After a failed listing experience I was hesitant. Taylor showed me exactly what went wrong before and what he would do differently. That honesty earned my trust, and the sale.",
    name: "Cameron Miller",
    type: "Seller Client",
    context: "Sold in Northwest Hills",
  },
  {
    quote:
      "Taylor made selling our Barton Creek home seamless. His market knowledge and marketing strategy brought us multiple offers above asking within the first week.",
    name: "James & Sarah Mitchell",
    type: "Seller Client",
    context: "Sold in Barton Creek",
  },
  {
    quote:
      "Taylor was fantastic to work with! He really understood what I was looking for and showed me great options that fit my specific criteria. When I was ready to make an offer, he helped things move quickly to meet a tight closing date. I've already recommended Taylor to my friends!",
    name: "Meredith Taylor",
    type: "Buyer Client",
    context: "Purchased in Austin",
  },
  {
    quote:
      "From staging to close, every step was handled with professionalism and care. We couldn't have asked for a better experience. We'd recommend anyone thinking about buying or selling in Austin to call Taylor first.",
    name: "Katherine & Robert Ellis",
    type: "Seller Client",
    context: "Sold in Westlake Hills",
  },
  {
    quote:
      "Taylor's deep understanding of Austin's investment landscape helped us identify a property that exceeded our return expectations. His analysis was institutional-grade and his negotiation saved us significantly on the acquisition.",
    name: "David Chen",
    type: "Investor Client",
    context: "Investment Property, Austin",
  },
  {
    quote:
      "Taylor's knowledge of the Austin luxury market is exceptional. He knew the comps, the trends, and which streets were commanding premiums before we even asked.",
    name: "Chris and Anne Brown",
    type: "Seller Client",
    context: "Sold in Tarrytown",
  },
  {
    quote:
      "Taylor was incredible to work with! He's knowledgable, responsive, and genuinely cares about getting the best results for his clients. The entire process was smooth and stress-free. You can tell he really loves what he does and we couldn't have asked for a better experience! Highly recommend him to anyone buying or selling in Austin.",
    name: "Yaniv Dotan",
    type: "BUYER & SELLER CLIENT",
    context: "Purchased and sold in Barton Creek",
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReleased, setIsReleased] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  // Pin window: 2 viewport heights (one per scroll-revealed testimonial)
  // After that, the section "releases" and continues normal page scroll.
  // While pinned and after both have shown, an auto-rotation through the
  // remaining testimonials begins.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setIsReleased(true);
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) {
          ticking = false;
          return;
        }
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Total scrollable distance for the pin (= 2 viewports)
        const total = el.offsetHeight - vh;
        // How far into the pin range we are (0 → 1)
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const progress = total > 0 ? scrolled / total : 0;

        const pinned = rect.top <= 0 && rect.bottom >= vh;
        setIsPinned(pinned);

        // First half = testimonial 0, second half = testimonial 1
        if (progress < 0.5) {
          setActiveIndex(0);
        } else if (progress < 1) {
          setActiveIndex(1);
        }

        // Released once we've scrolled past the full pin range
        setIsReleased(progress >= 1);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Auto-rotate once released OR while still pinned at the end of the scroll range
  useEffect(() => {
    if (!isReleased && !(isPinned && activeIndex >= 1)) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [isReleased, isPinned, activeIndex]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: "200vh" }}
      aria-label="Client testimonials"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={echelonWatermark}
            alt=""
            className="object-contain opacity-[0.04]"
            style={{ width: "min(520px, 90vw)", height: "auto", filter: "grayscale(20%)" }}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Header */}
            <p className="text-minimal text-gold mb-4 font-extrabold">
              CLIENT EXPERIENCES
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-10 md:mb-12">
              Trusted by Buyers, Sellers, and Investors Across Austin
            </h2>

            {/* Featured testimonial slot */}
            <div className="relative min-h-[320px] md:min-h-[300px]">
              {testimonials.map((t, i) => {
                const active = i === activeIndex;
                return (
                  <figure
                    key={i}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? "translateY(0)" : "translateY(16px)",
                      transition:
                        "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
                      pointerEvents: active ? "auto" : "none",
                    }}
                    aria-hidden={!active}
                  >
                    <blockquote className="text-foreground/[0.9] text-lg md:text-2xl leading-[1.7] font-light italic max-w-2xl">
                      <span>&ldquo;{t.quote}&rdquo;</span>
                    </blockquote>
                    <figcaption className="mt-8">
                      <p className="font-display text-base md:text-lg text-foreground tracking-tight">
                        {t.name}
                      </p>
                      <p className="text-minimal text-gold mt-1">{t.type}</p>
                      {t.context && (
                        <p className="text-xs text-muted-foreground/80 mt-1 font-light">
                          {t.context}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-500"
                  style={{
                    width: i === activeIndex ? 22 : 6,
                    height: 2,
                    background:
                      i === activeIndex ? "#b9a06c" : "rgba(0,0,0,0.18)",
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
