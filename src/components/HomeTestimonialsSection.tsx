import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lakeAustinTestimonialImg from "@/assets/lake-austin-luxury-testimonials.webp";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Taylor's knowledge of the Austin luxury market is exceptional. He knew the comps, the trends, and which streets were commanding premiums before we even asked.",
    name: "Chris and Anne Brown",
    context: "Sold in Tarrytown",
  },
  {
    quote: "After a failed listing experience I was hesitant. Taylor showed me exactly what went wrong before and what he would do differently. That honesty earned my trust, and the sale.",
    name: "Cameron Miller",
    context: "Sold in Northwest Hills",
  },
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
  {
    quote: "Taylor was a pleasure to work with. He was professional, responsive, and always had our best interests in mind throughout the entire process. His communication, honesty, and dedication made the transaction smooth from start to finish. I highly recommend him and look forward to working together again.",
    name: "Shahar Keinan",
    context: "Purchased in Austin, TX",
  },
  {
    quote: "Taylor helped us in a downturn Austin market when we had to sell and we already had a preexisting realtor. We were not getting any offers without lowering pricing. Taylor offered us an alternative approach, improve where it mattered and then sell. We ended up getting 2 offers after making a smaller investment into our home. A practical approach and strategy is better than waiting for offers, and that's what he led us through and we're grateful for him coming through for us as an advisor and partner we could depend on.",
    name: "Kris Gonzalez",
    context: "Sold in Dripping Springs",
  },
  {
    quote: "After showing us a home that didn't align with our priorities, Taylor showed us a number of homes that met our criteria. He really listened to us. He showed us what we wanted to see, not what he wanted to sell. Once we found the \"right\" home, Taylor guided us through every aspect of the process. He was always available, attentive to detail, and used his decade of experience to advocate for us every step of the process. My wife and I have bought and sold several homes and this was by far the most user-friendly experience we've had. We owe much of this to Taylor's exceptional service.",
    name: "Matthew and Esra Berchuck",
    context: "Purchased in Rob Roy",
  },

];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const splitRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);

  const handleDotClick = (i: number) => {
    setActive(i);
    setUserPaused(true);
  };

  // Mobile-only auto-rotation for the centered single-quote layout
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) return;
    if (userPaused) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, [userPaused]);

  // Desktop / iPad, auto-rotate AFTER the scroll-driven walk has reached
  // testimonial #4 (active >= 3). Scroll governs the first four, then
  // auto-rotation continues for users who linger or scroll past.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    if (!revealed) return;
    if (active < 2) return;
    if (userPaused) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, [revealed, userPaused, active]);

  // Desktop / iPad, GSAP horizontal split-reveal (image opens left/right)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setRevealed(true);
      return;
    }
    const root = splitRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set(".tsplit-right", { xPercent: 0 });
      gsap.set(".tsplit-image", { scale: 1.08 });
      gsap.set(".tsplit-line", { opacity: 0, y: 24, filter: "blur(8px)" });
      gsap.set(".tsplit-attribution", { opacity: 0, y: 12, filter: "blur(6px)" });
      gsap.set(".tsplit-overlay", { opacity: 1, y: 0, filter: "blur(0px)" });

      // Pin runs through three testimonials, then releases. First ~30% of
      // progress drives the split-reveal, remaining ~70% walks through the
      // first three testimonials before the page is released. Auto-rotation
      // takes over for any user who lingers in the pinned end-state.
      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=380%",
          pin: true,
          pinSpacing: true,
          scrub: 2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // One-way reveal: once opened, stay open (prevents stuck blur on slow scroll-back)
            if (self.progress >= 0.22 && !hasOpenedRef.current) {
              hasOpenedRef.current = true;
              setRevealed(true);
            }
            // Scroll-driven walk through first three testimonials.
            // 0.00 – 0.22 = split-reveal phase (testimonial 0 visible)
            // 0.22 – 0.50 = testimonial 0 holds
            // 0.50 – 0.75 = testimonial 1
            // 0.75 – 1.00 = testimonial 2, then release
            const p = self.progress;
            let target = 0;
            if (p >= 0.75) target = 2;
            else if (p >= 0.50) target = 1;
            else target = 0;
            setActive((prev) => (prev > 2 ? prev : target));
          },
        },
      })
        .to(".tsplit-overlay", { opacity: 0, y: -16, filter: "blur(8px)", ease: "power2.in", duration: 0.3 }, 0.05)
        .to(".tsplit-image", { scale: 1, ease: "power1.out", duration: 0.35 }, 0)
        .to(".tsplit-right", { xPercent: 100, ease: "expo.inOut", duration: 0.6 }, 0.35)
        .to(".tsplit-line", { opacity: 1, y: 0, filter: "blur(0px)", ease: "power3.out", stagger: 0.15, duration: 0.6 }, 0.65)
        .to(".tsplit-attribution", { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.5 }, 1.05)
        // Tail keeps the section pinned long enough for testimonials
        // 0 → 2 to each have time to read before release.
        .to({}, { duration: 2.2 });
    }, root);

    return () => {
      // Kill any ScrollTriggers tied to this root before reverting the gsap context.
      // This ensures GSAP unwraps its pin-spacer BEFORE React tries to unmount the
      // section, preventing "removeChild ... not a child of this node" crashes
      // when sibling sections (FeaturedListings, etc.) re-render around it.
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root || (st.trigger && root?.contains(st.trigger as Node))) {
          st.kill(true);
        }
      });
      ctx.revert();
    };
  }, []);


  const t = testimonials[active];

  return (
    <>
      {/* Stable wrapper, GSAP ScrollTrigger pin-spacer goes inside this div,
          so React's parent only ever sees this wrapper as its child. Prevents
          "removeChild" crashes when sibling sections re-render. */}
      <div className="hidden md:block">
        <section
          ref={splitRef}
          className="tsplit-section relative w-full h-screen bg-secondary overflow-hidden"
          aria-label="Client experiences"
        >
        <div className="absolute inset-0 z-0 flex items-start">
          {/* Spacer holds the copy in the right half, anchored to the image edge */}
          <div aria-hidden="true" className="hidden md:block w-1/2 shrink-0" />
          <div className="max-w-xl md:w-1/2 md:pl-12 lg:pl-16 md:pr-8 lg:pr-14" style={{ paddingTop: "clamp(140px, 22vh, 260px)" }}>
            {/* Eyebrow with gold hairline rule, magazine masthead treatment */}
            <div
              className="tsplit-attribution flex items-center gap-4 mb-12 will-change-transform"
              style={{ opacity: 0 }}
            >
              <span
                aria-hidden="true"
                style={{ display: "block", width: "28px", height: "1px", background: "#b9a06c" }}
              />
              <p
                className="text-gold m-0"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                }}
              >
                Client Experiences
              </p>
            </div>

            <div className="relative" style={{ maxWidth: "34rem" }}>
              {/* Oversized watermark quote glyph, sits behind text, far top-right */}
              <span
                aria-hidden="true"
                className="select-none pointer-events-none"
                style={{
                  position: "absolute",
                  top: "-0.42em",
                  right: "-0.08em",
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 400,
                  fontSize: "clamp(7rem, 11vw, 11rem)",
                  lineHeight: 1,
                  color: "#b9a06c",
                  opacity: revealed ? 0.12 : 0,
                  transition: "opacity 0.9s ease 0.1s",
                  zIndex: 0,
                }}
              >
                &ldquo;
              </span>

              <p
                key={`quote-${active}`}
                className="relative mb-12"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(1.2rem, 1.55vw, 1.55rem)",
                  lineHeight: 1.55,
                  letterSpacing: "-0.005em",
                  color: "hsl(var(--foreground) / 0.92)",
                  zIndex: 1,
                  whiteSpace: "pre-wrap",
                  minHeight: "clamp(220px, 26vh, 300px)",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <span
                  className="tsplit-line block will-change-transform"
                  style={{
                    opacity: revealed ? undefined : 0,
                    transform: revealed ? undefined : "translateY(20px)",
                    animation: revealed ? "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both" : undefined,
                  }}
                >
                  {t.quote}
                </span>
              </p>

              {/* Gold hairline divider before attribution */}
              <div
                key={`rule-${active}`}
                style={{
                  width: "40px",
                  height: "1px",
                  background: "#b9a06c",
                  opacity: revealed ? 1 : 0,
                  marginBottom: "1.5rem",
                  transition: "opacity 0.6s ease 0.25s",
                  position: "relative",
                  zIndex: 1,
                }}
              />

              <p
                key={`name-${active}`}
                className="tsplit-attribution will-change-transform relative"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "hsl(var(--foreground))",
                  opacity: revealed ? undefined : 0,
                  transform: revealed ? undefined : "translateY(10px)",
                  animation: revealed ? "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" : undefined,
                  zIndex: 1,
                }}
              >
                {t.name}
              </p>
              <p
                key={`ctx-${active}`}
                className="tsplit-attribution will-change-transform relative"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "hsl(var(--muted-foreground))",
                  marginTop: "0.65rem",
                  animation: revealed ? "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both" : undefined,
                  opacity: revealed ? undefined : 0,
                  transform: revealed ? undefined : "translateY(10px)",
                  zIndex: 1,
                }}
              >
                {t.context}
              </p>


              {revealed && (
                <div style={{ opacity: 0, animation: "fadeUp 0.6s ease 0.4s both", zIndex: 2 }} className="mt-8 flex items-center gap-3 relative">
                  <div className="flex items-center gap-3 relative">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className="group relative cursor-pointer flex items-center justify-center"
                        style={{
                          width: i === active ? "32px" : "14px",
                          height: "20px",
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          transition: "width 500ms ease",
                        }}
                        aria-label={`View testimonial ${i + 1}`}
                      >
                        <span
                          aria-hidden="true"
                          className="block transition-all duration-500"
                          style={{
                            width: i === active ? "24px" : "6px",
                            height: "1px",
                            background: i === active ? "#b9a06c" : "hsl(var(--border))",
                          }}
                        />
                      </button>
                    ))}
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>

        <Link
          to="/reviews"
          className="absolute bottom-10 left-1/2 ml-12 lg:ml-16 z-[18] inline-flex items-center text-gold transition-colors duration-[450ms] group/link"
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: "11px",
            lineHeight: "1.4",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s",
            pointerEvents: revealed ? "auto" : "none",
          }}
        >
          MORE CLIENT EXPERIENCES
          <span aria-hidden="true" className="ml-1.5 inline-block transition-transform duration-500 ease-out group-hover/link:translate-x-1">→</span>
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gold scale-x-100 transition-transform duration-500 origin-left" />
        </Link>

        <div className="tsplit-left absolute inset-y-0 left-0 w-1/2 z-10 overflow-hidden will-change-transform">
          <img
            src={lakeAustinTestimonialImg}
            alt="Lake Austin luxury waterfront estate at golden hour"
            className="tsplit-image absolute inset-y-0 left-0 h-full w-screen max-w-none object-cover will-change-transform"
            decoding="async"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="tsplit-right absolute inset-y-0 right-0 w-1/2 z-10 overflow-hidden will-change-transform">
          <img
            src={lakeAustinTestimonialImg}
            alt=""
            aria-hidden="true"
            className="tsplit-image absolute inset-y-0 right-0 h-full w-screen max-w-none object-cover will-change-transform"
            decoding="async"
            loading="eager"
          />
        </div>

        {/* Faint dark tint, improves overlay text readability, fades with overlay */}
        <div
          className="tsplit-overlay absolute inset-0 z-[15] pointer-events-none will-change-[opacity]"
          style={{ background: "rgba(0, 0, 0, 0.32)" }}
          aria-hidden="true"
        />

        {/* Overlay verbiage, fades out as the split begins */}
        <div className="tsplit-overlay absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6 will-change-transform">
          <div className="text-center">
            <h2
              className="font-display font-normal leading-[1.05] tracking-[0.02em]"
              style={{
                fontFamily: '"Cinzel", serif',
                color: "#F5F3EF",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                textTransform: "uppercase",
                textShadow: "0 0 32px rgba(0,0,0,0.55), 0 0 12px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              clients first.{" "}
              <span style={{ color: "#b9a06c" }}>Proven Results.</span>
            </h2>
          </div>
        </div>
      </section>
      </div>

      {/* MOBILE, centered rotating quote */}
      <section className="md:hidden bg-secondary relative overflow-hidden" style={{ padding: "clamp(48px, 7vw, 90px) 0" }}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-[900px] mx-auto text-center mb-10">
            <ScrollReveal>
              <p className="text-minimal text-gold mb-4">CLIENT EXPERIENCES</p>
              <h2 className="font-display text-2xl font-normal text-foreground leading-[1.15] tracking-[0.02em]">
                clients first. <span className="italic">Proven Results.</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="max-w-[800px] mx-auto text-center relative">
            <div style={{ minHeight: "clamp(220px, 34vw, 300px)", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
              <p key={active} className="mb-6" style={{
                fontFamily: '"Jost", sans-serif', fontWeight: 300,
                fontSize: "clamp(15px, 1.8vw, 20px)", lineHeight: 1.85, letterSpacing: "0.01em",
                color: "hsl(var(--foreground) / 0.8)",
                animation: "fadeUp 0.6s ease both",
                whiteSpace: "pre-wrap",
              }}>
                <span style={{ color: "hsl(38 39% 61%)", marginRight: "0.15em" }}>&ldquo;</span>
                {t.quote}
                <span style={{ color: "hsl(38 39% 61%)", marginLeft: "0.15em" }}>&rdquo;</span>
              </p>
            </div>

            <p key={`m-name-${active}`} style={{
              fontFamily: '"Jost", sans-serif', fontSize: "13px", letterSpacing: "0.18em",
              textTransform: "uppercase", color: "hsl(38 39% 61%)", marginTop: "24px",
              animation: "fadeUp 0.6s ease 0.15s both",
            }}>
              {t.name}
            </p>
            <p key={`m-ctx-${active}`} style={{
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
                  onClick={() => handleDotClick(i)}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    background: i === active ? "hsl(38 39% 61%)" : "hsl(var(--border))",
                    transform: i === active ? "scale(1.2)" : "scale(1)",
                  }}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/reviews"
                className="relative inline-flex items-center text-gold transition-colors duration-[450ms] group/link text-right"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "11px", lineHeight: "1.4", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 400 }}
              >
                MORE CLIENT EXPERIENCES
                <span aria-hidden="true" className="ml-1.5 inline-block transition-transform duration-500 ease-out group-hover/link:translate-x-1">→</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-gold scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
