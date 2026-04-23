import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useIsMobile } from "@/hooks/use-mobile";

import westlakeDusk from "@/assets/community-westlake-hills-hero.webp";
import privateInventoryHero from "@/assets/hero-luxury-austin.jpg";
import card78746 from "@/assets/barton-creek-estate-new.jpg";
import cardTarrytown from "@/assets/community-tarrytown.jpg";
import cardOldEnfield from "@/assets/pemberton-heights.avif";
import cardWestlake from "@/assets/community-westlake-new.jpg";
import cardDavenport from "@/assets/davenport-ranch-estate.jpg";
import cardSpanishOaks from "@/assets/spanish-oaks-estate.jpg";
import desktopNote from "@/assets/testimonial-westlake-living-room.jpg";
import austinSkylineParallax from "@/assets/austin-skyline-parallax.jpeg";
import clarksvilleImg from "@/assets/off-market-reveal-estate.webp";
import taylorSignature from "@/assets/taylor-sherwood-signature.png";

gsap.registerPlugin(ScrollTrigger);

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const THESIS = "The best Austin homes don't get listed. They get introduced.";

const NEIGHBORHOODS = [
  { name: "Barton creek", image: card78746, stat: "Median sale: $3.2M" },
  { name: "Rollingwood", image: cardTarrytown, stat: "Avg DOM off-market: 14 days" },
  { name: "Old Enfield", image: cardOldEnfield, stat: "60% OF TRADES ARE PRIVATE" },
  { name: "West Lake Hills", image: cardWestlake, stat: "Median sale: $4.1M" },
  { name: "Tarrytown", image: cardDavenport, stat: "CENTRAL ACCESS TO AUSTIN" },
  { name: "Spanish Oaks", image: cardSpanishOaks, stat: "GUARD GATED GOLF ESTATES" },
];

const STATS = [
  { value: 3.2, prefix: "$", suffix: "M", label: "Median private sale price" },
  { value: 41, prefix: "", suffix: "", label: "Off-market deals closed" },
  { value: 60, prefix: "", suffix: "%", label: "Of luxury sales never list publicly" },
];

interface Props {
  formNode: ReactNode;
}

const CinematicSections = ({ formNode }: Props) => {
  const isMobile = useIsMobile();
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const droneVideoRef = useRef<HTMLVideoElement>(null);

  // Play drone video only while its section is in view; pause + reset when it leaves.
  useEffect(() => {
    const video = droneVideoRef.current;
    if (!video) return;
    const section = video.closest("section");
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [isMobile]);

  // Lenis smooth scroll (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [isMobile]);

  // GSAP scroll-linked animations (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // ── Section 2: Pinned Thesis word-by-word reveal
      // Pin the section and reveal each word as the user scrolls.
      // The user cannot scroll past until every word has appeared.
      const words = gsap.utils.toArray<HTMLSpanElement>(".thesis-word");
      gsap.set(words, { opacity: 0, y: 40 });
      const thesisTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".thesis-section",
          start: "top top",
          // Allocate scroll distance per word so the reveal fills the pin
          end: () => `+=${Math.max(words.length * 180, 1200)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
      words.forEach((w) => {
        thesisTl.to(w, { opacity: 1, y: 0, ease: "power3.out", duration: 1 });
      });
      // Hold the final state briefly before releasing the pin
      thesisTl.to({}, { duration: 0.6 });

      // ── Section 2.5: Image Split Reveal
      gsap.to(".split-top-half", {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".split-section",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });
      gsap.to(".split-bottom-half", {
        yPercent: 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".split-section",
          start: "top top",
          end: "+=200%",
          scrub: 1,
        },
      });
      gsap.fromTo(
        ".split-text",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".split-section",
            start: "top top-=120%",
            end: "top top-=200%",
            scrub: 1,
          },
        }
      );

      // ── Section 3 (new): Autoplay drone video, play-on-enter text reveal
      const droneEls = gsap.utils.toArray<HTMLElement>(".drone-reveal");
      gsap.set(droneEls, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: ".drone-section",
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.to(droneEls, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
          });
        },
      });

      // ── Section 3: Parallax Image Reveal — gentle parallax within oversized container
      gsap.fromTo(
        ".parallax-image",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".parallax-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        ".parallax-headline",
        { scale: 0.9 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".parallax-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // ── Section 4: Horizontal Scroll Gallery
      const horizontalTrack = document.querySelector<HTMLDivElement>(".horizontal-track");
      if (horizontalTrack) {
        const totalScroll = horizontalTrack.scrollWidth - window.innerWidth;
        gsap.to(horizontalTrack, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-section",
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Per-card image parallax
        gsap.utils.toArray<HTMLDivElement>(".horizontal-card-image").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -3 },
            {
              xPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement!,
                containerAnimation: gsap.getTweensOf(horizontalTrack)[0],
                start: "left right",
                end: "right left",
                scrub: 1,
              },
            }
          );
        });
      }

      // ── Section 5: Pinned Counter
      const statEls = gsap.utils.toArray<HTMLSpanElement>(".stat-number");
      const counterObj = STATS.map((s) => ({ value: 0, target: s.value }));
      gsap.to(counterObj, {
        value: (i) => counterObj[i].target,
        ease: "none",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          onUpdate: () => {
            statEls.forEach((el, i) => {
              const stat = STATS[i];
              const v = counterObj[i].value;
              const formatted =
                stat.suffix === "M"
                  ? v.toFixed(1)
                  : Math.round(v).toString();
              el.textContent = `${stat.prefix}${formatted}${stat.suffix}`;
            });
          },
        },
      });
      gsap.from(".stat-label", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top top+=100",
          toggleActions: "play none none reverse",
        },
      });

      // ── Section 6: Split Parallax Testimonial — pin so user can't fly past.
      gsap.to(".testimonial-image", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ".testimonial-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Pinned scrub timeline: each line reveals progressively as the user scrolls,
      // forcing them to slow down and absorb the testimonial.
      const testimonialTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonial-section",
          start: "top top",
          end: "+=1400",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      testimonialTl
        .from(".testimonial-line", {
          opacity: 0,
          y: 30,
          stagger: 0.8,
          ease: "power2.out",
          duration: 1,
        })
        .from(
          ".testimonial-attribution",
          {
            opacity: 0,
            y: 15,
            ease: "power2.out",
            duration: 0.8,
          },
          "+=0.4"
        );

      // ── Section 7: Form reveal
      gsap.from(".form-field", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".form-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isMobile]);

  // ─────────────────────────────────────────────
  // MOBILE: stacked, no GSAP / Lenis, simple fades
  // ─────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="bg-[hsl(220,15%,8%)] text-white">
        {/* Section 2 — Thesis (static) */}
        <section className="py-24 px-6 bg-[hsl(220,15%,8%)] text-center">
          <p className="font-display text-3xl sm:text-4xl leading-tight text-[hsl(40,30%,90%)]">
            The best Austin homes don't get listed. They get{" "}
            <span className="italic text-[hsl(var(--gold))]">introduced</span>.
          </p>
        </section>

        {/* Section 2.5 (mobile static) — Image Split fallback */}
        <section className="relative">
          <img
            src={privateInventoryHero}
            alt="Private Austin estate"
            className="w-full h-[50vh] object-cover"
            loading="lazy"
          />
          <div className="px-6 py-12 text-center bg-[hsl(220,15%,8%)]">
            <p className="text-[hsl(var(--gold))] mb-4 font-bold" style={labelStyle}>
              THE INVITATION
            </p>
            <h2 className="font-display text-3xl text-[hsl(40,30%,92%)]">
              What happens before it's listed.
            </h2>
          </div>
        </section>

        {/* Section 3 (mobile) — Drone video, plays only in view */}
        <section className="relative">
          <div className="relative w-full h-[60vh] overflow-hidden">
            <video
              ref={droneVideoRef}
              muted
              playsInline
              preload="metadata"
              className="hero-video absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video/bart-creek-drone.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: "rgba(12, 15, 36, 0.3)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 0%, rgba(12,15,36,0.4) 70%, rgba(12,15,36,0.7) 100%)",
              }}
            />
          </div>
          <div className="px-6 py-12 text-center bg-[hsl(220,15%,8%)]">
            <p className="mb-4 font-bold" style={{ ...labelStyle, color: "#BAA26A" }}>
              OFF-MARKET
            </p>
            <h2 className="font-display text-3xl text-[hsl(40,30%,92%)] leading-tight mb-4">
              Austin, from the inside.
            </h2>
            <p className="text-white/80 font-sans max-w-md mx-auto">
              The city you're moving to. The homes no one else will show you.
            </p>
          </div>
        </section>

        {/* Section 3 — Image + headline */}
        <section className="relative">
          <img
            src={privateInventoryHero}
            alt="Westlake estate at dusk"
            className="w-full h-[60vh] object-cover"
            loading="lazy"
          />
          <div className="px-6 py-12 text-center">
            <p className="text-[hsl(var(--gold))] mb-4 font-bold" style={labelStyle}>
              OFF-MARKET
            </p>
            <h2 className="font-display text-3xl text-white">
              Homes That Never Reach The Market
            </h2>
          </div>
        </section>

        {/* Section 4 — Stacked neighborhood cards */}
        <section className="px-6 py-12 space-y-8">
          {NEIGHBORHOODS.map((n) => (
            <div key={n.name} className="relative h-[60vh] overflow-hidden">
              <img src={n.image} alt={n.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-3xl text-white mb-2">{n.name}</h3>
                <p className="text-[hsl(var(--gold))] text-xs tracking-[0.2em] uppercase font-sans">{n.stat}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Section 5 — Stats */}
        <section className="py-20 px-6 text-center space-y-12">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-6xl text-white mb-3">
                {s.prefix}
                {s.suffix === "M" ? s.value.toFixed(1) : s.value}
                {s.suffix}
              </p>
              <p className="text-sm tracking-[0.2em] uppercase font-sans" style={{ color: "#b9a06c" }}>{s.label}</p>
            </div>
          ))}
        </section>

        {/* Section 6 — Testimonial */}
        <section className="bg-[hsl(220,15%,6%)]">
          <img src={desktopNote} alt="Handwritten note on desk" className="w-full h-[40vh] object-cover" loading="lazy" />
          <div className="px-6 py-12 text-center">
            <p className="font-display italic text-2xl text-white/90 leading-snug mb-6">
              "Taylor brought us a Westlake home before it ever hit the market. We never would have seen it without him."
            </p>
            <p className="text-[hsl(var(--gold))] text-xs tracking-[0.2em] uppercase font-sans">
              — Private Buyer, Westlake Hills
            </p>
          </div>
        </section>

        {/* Section 7 — Form */}
        <section id="section-7-form" className="py-16 px-6 bg-[hsl(220,15%,8%)]">
          <div className="max-w-xl mx-auto">
            <p className="text-[hsl(var(--gold))] mb-3 font-bold text-center" style={labelStyle}>
              ECHELON INSIDER
            </p>
            <h2 className="font-display text-2xl font-light text-white mb-3 text-center whitespace-pre-line">
              {"\n"}See you on the inside,
            </h2>
            <div className="flex justify-center mb-3">
              <img
                src={taylorSignature}
                alt="Taylor Sherwood signature"
                className="h-14 w-auto"
                loading="lazy"
              />
            </div>
            <div className="h-4" aria-hidden="true" />
            <div className="border border-white/10 p-6 bg-white/[0.02]">
              {formNode}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // DESKTOP: full cinematic experience
  // ─────────────────────────────────────────────
  return (
    <div ref={rootRef} className="bg-[hsl(220,15%,8%)] text-white">
      {/* ── Section 2: Pinned Thesis ───────────── */}
      <section className="thesis-section relative h-screen w-full bg-[hsl(220,15%,8%)] flex items-center justify-center overflow-hidden">
        <h2
          className="font-display text-[hsl(40,30%,92%)] text-center px-8 max-w-[90vw] leading-[1.15] font-light"
          style={{ fontSize: "6vw" }}
        >
          {THESIS.split(" ").map((word, i) => {
            const isIntroduced = word.replace(/[.,]/g, "").toLowerCase() === "introduced";
            return (
              <span
                key={i}
                className={`thesis-word inline-block mr-[0.25em] will-change-transform ${
                  isIntroduced ? "italic text-[hsl(var(--gold))]" : ""
                }`}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </section>

      {/* ── Section 2.5: Image Split Reveal ────── */}
      <section className="split-section relative h-screen w-full overflow-hidden bg-[hsl(220,15%,8%)]">
        {/* Revealed background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={austinSkylineParallax}
            alt="Austin downtown skyline at sunset over Lady Bird Lake"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        {/* Pinned text behind */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-0">
          <div className="split-text will-change-transform relative z-10">
            <p className="text-[hsl(var(--gold))] mb-6 font-bold" style={labelStyle}>
              THE INVITATION
            </p>
            <h2
              className="font-display text-[hsl(40,30%,92%)] font-light leading-[1.05] max-w-[90vw]"
              style={{ fontSize: "6vw" }}
            >
              What happens before it's listed.
            </h2>
          </div>
        </div>
        {/* Top half */}
        <div
          className="split-top-half absolute inset-0 z-10 will-change-transform"
          style={{ clipPath: "inset(0 0 50% 0)" }}
        >
          <img
            src={clarksvilleImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {/* Bottom half */}
        <div
          className="split-bottom-half absolute inset-0 z-10 will-change-transform"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        >
          <img
            src={clarksvilleImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* ── Section 3 (new): Drone Video — plays only when in view ── */}
      <section className="drone-section relative h-screen w-full overflow-hidden bg-[hsl(220,15%,8%)]">
        <video
          ref={droneVideoRef}
          muted
          playsInline
          preload="metadata"
          className="hero-video absolute inset-0 w-full h-full object-cover will-change-transform"
        >
          <source src="/video/barton-creek-drone.mp4" type="video/mp4" />
        </video>
        {/* Faint dark tint (matches hero) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ backgroundColor: "rgba(12, 15, 36, 0.3)" }}
        />
        {/* Legibility radial gradient */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(12,15,36,0.4) 70%, rgba(12,15,36,0.7) 100%)",
          }}
        />
        {/* Overlay text */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8">
          <p className="drone-reveal mb-6 font-bold" style={{ ...labelStyle, color: "#BAA26A", fontSize: "0.9rem", letterSpacing: "0.2em" }}>
            OFF-MARKET
          </p>
          <h2
            className="drone-reveal font-display font-light leading-[1.05] mb-6 max-w-[90vw]"
            style={{ fontSize: "7vw", color: "#F5F1EA" }}
          >
            Austin, from the inside.
          </h2>
          <p
            className="drone-reveal font-sans"
            style={{ fontSize: "1.2rem", maxWidth: "500px", color: "rgba(245,241,234,0.8)" }}
          >
            The city you're moving to. The homes no one else will show you.
          </p>
        </div>
      </section>

      {/* ── Section 5: Pinned Counter ──────────── */}
      <section className="stats-section relative h-screen w-full bg-[hsl(220,15%,8%)] flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid grid-cols-3 gap-12 lg:gap-16 items-end">
            {STATS.map((s, i) => (
              <div key={s.label} className="text-center min-w-0 overflow-hidden">
                <span
                  className="stat-number block font-display text-white font-light leading-[0.95] mb-6 whitespace-nowrap"
                  style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
                >
                  {s.prefix}
                  {s.suffix === "M" ? "0.0" : "0"}
                  {s.suffix}
                </span>
                <p className="stat-label tracking-[0.25em] uppercase font-sans" style={{ fontSize: "0.75rem", color: "#b9a06c" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Parallax Image Reveal ───── */}
      <section className="parallax-section relative h-screen w-full overflow-hidden bg-[hsl(220,15%,8%)]">
        <div
          className="absolute left-0 right-0"
          style={{ top: "-20%", height: "140%" }}
        >
          <img
            src={privateInventoryHero}
            alt="Westlake estate at dusk — private Austin luxury home"
            className="parallax-image w-full h-full object-cover will-change-transform"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(12,15,36,0.55) 0%, rgba(12,15,36,0.4) 60%, rgba(12,15,36,0.25) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
          <p className="mb-6 font-bold" style={{ ...labelStyle, color: "#BAA26A" }}>
            OFF-MARKET
          </p>
          <h2
            className="parallax-headline font-display font-light leading-[1.05] max-w-[90vw] will-change-transform"
            style={{ fontSize: "5vw", color: "#BAA26A", textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
          >
            Homes That Never<br />Reach The Market
          </h2>
        </div>
      </section>

      {/* ── Section 4: Horizontal Scroll Gallery ─ */}
      <section className="horizontal-section relative h-screen w-full overflow-hidden bg-[hsl(220,15%,6%)]">
        <div className="horizontal-track absolute top-0 left-0 h-full flex" style={{ width: "max-content" }}>
          {NEIGHBORHOODS.map((n) => (
            <div
              key={n.name}
              className="relative h-screen flex items-end overflow-hidden"
              style={{ width: "80vw" }}
            >
              <div
                className="horizontal-card-image absolute inset-0 will-change-transform"
                style={{ width: "100%", left: "0%" }}
              >
                <img
                  src={n.image}
                  alt={`${n.name} luxury Austin neighborhood`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="relative z-10 p-12 lg:p-16 max-w-2xl">
                <h3 className="font-display text-white font-light leading-tight mb-4" style={{ fontSize: "4vw" }}>
                  {n.name}
                </h3>
                <p className="text-[hsl(var(--gold))] tracking-[0.25em] uppercase font-sans" style={{ fontSize: "0.75rem" }}>
                  {n.stat}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── Section 6: Split Parallax Testimonial ─ */}
      <section className="testimonial-section relative w-full bg-[hsl(220,15%,6%)] grid grid-cols-2 min-h-screen overflow-hidden">
        <div className="relative overflow-hidden h-full">
          <img
            src={desktopNote}
            alt="Handwritten note on a desk"
            className="testimonial-image absolute inset-0 w-full h-[120%] object-cover will-change-transform"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center px-12 lg:px-20 py-24">
          <p className="font-display italic text-white/90 font-light leading-[1.3] mb-10" style={{ fontSize: "2.4vw" }}>
            <span className="testimonial-line block">"Taylor brought us a</span>
            <span className="testimonial-line block">Westlake home before</span>
            <span className="testimonial-line block">it ever hit the market.</span>
            <span className="testimonial-line block">We never would have seen it without him."</span>
          </p>
          <p className="testimonial-attribution text-[hsl(var(--gold))] tracking-[0.25em] uppercase font-sans" style={{ fontSize: "0.7rem" }}>
            — Private Buyer, Westlake Hills
          </p>
        </div>
      </section>

      {/* ── Section 7: Form ────────────────────── */}
      <section
        id="section-7-form"
        className="form-section relative w-full py-32 px-8 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top, hsl(220,18%,12%) 0%, hsl(220,15%,6%) 70%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="form-field text-center mb-4">
            <p className="text-[hsl(var(--gold))] mb-4 font-bold" style={labelStyle}>
              ECHELON INSIDER
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight whitespace-pre-line">
              {"\n"}See you on the inside,
            </h2>
          </div>
          <div className="form-field flex justify-center mb-4">
            <img
              src={taylorSignature}
              alt="Taylor Sherwood signature"
              className="h-16 md:h-20 w-auto"
              loading="lazy"
            />
          </div>
          <div className="h-6 md:h-8" aria-hidden="true" />
          <div className="form-field border border-white/10 p-10 bg-white/[0.02] backdrop-blur-sm">
            {formNode}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CinematicSections;
