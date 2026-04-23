import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useIsMobile } from "@/hooks/use-mobile";

import westlakeDusk from "@/assets/community-westlake-hills-hero.webp";
import privateInventoryHero from "@/assets/hero-luxury-austin.webp";

import card78746 from "@/assets/barton-creek-estate-new.webp";
import cardTarrytown from "@/assets/community-tarrytown.webp";
import cardOldEnfield from "@/assets/pemberton-heights.webp";
import cardWestlake from "@/assets/community-westlake-new.webp";
import cardDavenport from "@/assets/davenport-ranch-estate.webp";
import cardSpanishOaks from "@/assets/spanish-oaks-estate.webp";
import desktopNote from "@/assets/testimonial-westlake-living-room.webp";

import clarksvilleImg from "@/assets/off-market-reveal-estate.webp";
import taylorSignature from "@/assets/taylor-sherwood-signature.png";
import testimonialSplitImg from "@/assets/testimonial-split-lake-austin.webp";

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

  // Testimonial / split-reveal video playback is driven by ScrollTrigger
  // inside the GSAP context (see Section 2.5 below). It fires the moment the
  // split is fully open and re-triggers each time the user scrolls back into
  // that point — no auto-loop.

  // Lenis smooth scroll (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      gestureOrientation: "vertical",
    } as ConstructorParameters<typeof Lenis>[0]);
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", () => ScrollTrigger.update());

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
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
          end: () => `+=${Math.max(words.length * 110, 800)}`,
          pin: true,
          scrub: 2,
          anticipatePin: 1,
        },
      });
      words.forEach((w) => {
        thesisTl.to(w, { opacity: 1, y: 0, ease: "power3.out", duration: 1 });
      });
      // Hold the final state briefly before releasing the pin
      thesisTl.to({}, { duration: 0.3 });

      // ── Section 2.5: Image Split Reveal
      // Phase 1 (0 → 0.45): image locks full-screen, subtle settle (slight zoom-out).
      // Phase 2 (0.45 → 0.85): the two halves split apart vertically, revealing
      //   the skyline + headline behind them.
      // Phase 3 (0.85 → 1):   headline blooms in at full scale.
      gsap.set([".split-top-half", ".split-bottom-half"], { yPercent: 0 });
      gsap.set(".split-cover-image", { scale: 1.08 });

      const splitTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".split-section",
          start: "top top",
          end: "+=160%",
          pin: true,
          pinSpacing: true,
          scrub: 2,
          anticipatePin: 1,
        },
      });

      splitTl
        // Phase 1 — lock & settle
        .to(".split-cover-image", { scale: 1, ease: "none", duration: 0.45 }, 0)
        // Phase 2 — elegant split
        .to(
          ".split-top-half",
          { yPercent: -100, ease: "power2.inOut", duration: 0.4 },
          0.45
        )
        .to(
          ".split-bottom-half",
          { yPercent: 100, ease: "power2.inOut", duration: 0.4 },
          0.45
        )
        // Hold the open state briefly before unpin
        .to({}, { duration: 0.15 });


      // ── Section 3 (new): Drone Video — pin section, reveal text on scroll
      const droneEls = gsap.utils.toArray<HTMLElement>(".drone-reveal");
      gsap.set(droneEls, { opacity: 0, y: 30 });
      const droneTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".drone-section",
          start: "top top",
          end: "+=70%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });
      droneTl.to(droneEls, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.4,
      });

      // ── Section 3: Parallax Image Reveal — REMOVED

      // ── Section 3.5: Cinematic Parallax Bridge — pin and reveal headline
      const bridgeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".bridge-section",
          start: "top top",
          end: "+=80%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });
      bridgeTl
        .fromTo(".bridge-image", { yPercent: -8, scale: 1.08 }, { yPercent: 8, scale: 1, ease: "none" }, 0)
        .fromTo(".bridge-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.4 }, 0.15)
        .fromTo(".bridge-headline", { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.6 }, 0.25)
        .fromTo(".bridge-rule", { width: 0, opacity: 0 }, { width: 120, opacity: 1, ease: "power2.out", duration: 0.5 }, 0.5)
        .to({}, { duration: 0.3 });

      // ── Section 4: Horizontal Scroll Gallery
      const horizontalTrack = root.querySelector<HTMLDivElement>(".horizontal-track");
      if (horizontalTrack) {
        const getTotalScroll = () => Math.max(horizontalTrack.scrollWidth - window.innerWidth, 0);

        // Cinematic reveal — as the gallery enters viewport (after counter unpins),
        // the first card image scales down from over-zoomed and the entire track
        // eases in. Track opacity is NOT animated post-reveal so cards never
        // re-fade (which previously caused a black flash + re-appearance bug).
        gsap.set(".horizontal-track", { yPercent: 8 });
        gsap.set(".horizontal-card.is-first .horizontal-card-image img", { scale: 1.18 });
        gsap.set(".horizontal-card.is-first .card-content", { opacity: 0, y: 40 });

        const galleryReveal = gsap.timeline({
          scrollTrigger: {
            trigger: ".horizontal-section",
            start: "top bottom",
            end: "top top",
            scrub: 1.2,
          },
        });
        galleryReveal
          .to(".horizontal-track", { yPercent: 0, ease: "none" }, 0)
          .to(".horizontal-card.is-first .horizontal-card-image img", { scale: 1, ease: "none" }, 0)
          .to(".horizontal-card.is-first .card-content", { opacity: 1, y: 0, ease: "none" }, 0.4);

        // Horizontal scroll pin
        const horizontalTween = gsap.to(horizontalTrack, {
          x: () => -getTotalScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-section",
            start: "top top",
            end: () => `+=${getTotalScroll()}`,
            pin: true,
            pinSpacing: true,
            scrub: 2.5,
          },
        });

        // Per-card image parallax — skip the LAST card so it doesn't shift
        // back into frame after the pin releases (which caused the
        // "black screen → Spanish Oaks reappears" flash).
        const cardImages = gsap.utils.toArray<HTMLDivElement>(".horizontal-card-image");
        cardImages.forEach((img, i) => {
          if (i === cardImages.length - 1) return;
          gsap.fromTo(
            img,
            { xPercent: -3 },
            {
              xPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement!,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: 1,
              },
            }
          );
        });
      }

      // ── Section 5: Counter — REMOVED

      // ── Section 6: Cinematic Side-Reveal Testimonial
      // Slow, smooth, deliberate luxury reveal:
      //  Phase 1 (0 → 0.35): the image breathes — gentle Ken Burns settle.
      //  Phase 2 (0.35 → 0.95): the right half drifts off on a long, expo-eased
      //    curve, exposing the testimonial on the right.
      //  Phase 3 (0.65 → 1): each testimonial line clears blur and rises in a
      //    measured cadence; attribution settles last.
      gsap.set(".testimonial-split-right", { xPercent: 0 });
      gsap.set(".testimonial-split-image", { scale: 1.08 });
      gsap.set(".testimonial-line", { opacity: 0, y: 24, filter: "blur(8px)" });
      gsap.set(".testimonial-attribution", { opacity: 0, y: 12, filter: "blur(6px)" });

      const testimonialTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonial-section",
          start: "top top",
          end: "+=160%",
          pin: true,
          pinSpacing: true,
          scrub: 2,
          anticipatePin: 1,
        },
      });

      testimonialTl
        // Phase 1 — slow Ken Burns settle
        .to(".testimonial-split-image", { scale: 1, ease: "power1.out", duration: 0.35 }, 0)
        // Phase 2 — right half drifts away on a long, refined curve
        .to(".testimonial-split-right", { xPercent: 100, ease: "expo.inOut", duration: 0.60 }, 0.35)
        // Phase 3 — testimonial copy clears blur and rises, measured cadence
        .to(".testimonial-line", { opacity: 1, y: 0, filter: "blur(0px)", ease: "power3.out", stagger: 0.20, duration: 0.70 }, 0.65)
        .to(".testimonial-attribution", { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.55 }, 1.05)
        .to({}, { duration: 0.15 });

      // ── Section 7: Form — elegant cinematic reveal as user scrolls
      // past the testimonial. Each element rises into place with a soft
      // blur clearing, finishing with the form panel scaling up.
      const formEls = gsap.utils.toArray<HTMLElement>(".form-field");
      gsap.set(formEls, { opacity: 0, y: 60, filter: "blur(12px)" });
      gsap.set(".form-panel", { opacity: 0, y: 80, scale: 0.96, filter: "blur(14px)" });

      const formTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".form-section",
          start: "top 85%",
          end: "top 30%",
          scrub: 1.2,
        },
      });

      formTl
        .to(formEls[0], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 0.6,
        }, 0)
        .to(formEls[1], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 0.6,
        }, 0.25)
        .to(".form-panel", {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 0.9,
        }, 0.45);
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
            decoding="async"
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
              preload="auto"
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

        {/* Section 3 — REMOVED (Homes That Never Reach The Market) */}

        {/* Section 4 — Stacked neighborhood cards */}
        <section className="px-6 py-12 space-y-8">
          {NEIGHBORHOODS.map((n) => (
            <div key={n.name} className="relative h-[60vh] overflow-hidden">
              <img src={n.image} alt={n.name} className="absolute inset-0 w-full h-full object-cover" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-3xl text-white mb-2">{n.name}</h3>
                <p className="text-[hsl(var(--gold))] text-xs tracking-[0.2em] uppercase font-sans">{n.stat}</p>
              </div>
            </div>
          ))}
        </section>


        {/* Section 6 — Testimonial */}
        <section className="bg-[hsl(220,15%,6%)]">
          <img src={testimonialSplitImg} alt="Lake Austin luxury waterfront estate" className="w-full h-[40vh] object-cover" decoding="async" />
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
                decoding="async"
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
            src={testimonialSplitImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/20" />
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
            className="split-cover-image w-full h-full object-cover will-change-transform"
            decoding="async"
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
            className="split-cover-image w-full h-full object-cover will-change-transform"
            decoding="async"
          />
        </div>
      </section>

      {/* ── Section 3 (new): Drone Video — plays only when in view ── */}
      <section className="drone-section relative h-screen w-full overflow-hidden bg-[hsl(220,15%,8%)]">
        <video
          ref={droneVideoRef}
          muted
          playsInline
          preload="auto"
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

      {/* ── Section 3.5: Cinematic Parallax Bridge ─ */}
      <section className="bridge-section relative h-screen w-full overflow-hidden bg-[hsl(220,15%,6%)]">
        <div className="bridge-image absolute inset-0 will-change-transform" style={{ top: "-10%", height: "120%" }}>
          <img
            src={westlakeDusk}
            alt="Austin luxury estate at golden hour"
            className="w-full h-full object-cover"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsl(220,15%,6%) 0%, rgba(12,15,36,0.5) 30%, rgba(12,15,36,0.45) 70%, hsl(220,15%,6%) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
          <p
            className="bridge-eyebrow mb-6 font-bold opacity-0"
            style={{ ...labelStyle, color: "#b9a06c" }}
          >
            THE INSIDE TRACK
          </p>
          <h2
            className="bridge-headline font-display font-light text-white leading-[1.05] max-w-[18ch] opacity-0"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Where Austin's <span style={{ color: "#b9a06c" }}>quietest</span> homes change hands.
          </h2>
          <div className="bridge-rule mt-10 h-px bg-[#b9a06c] opacity-0" style={{ width: 0 }} />
        </div>
      </section>

      {/* ── Section 4: Horizontal Scroll Gallery ─ */}
      <section className="horizontal-section relative h-screen w-full overflow-hidden bg-[hsl(220,15%,6%)]">
        <div className="horizontal-track absolute top-0 left-0 flex h-full" style={{ width: `${NEIGHBORHOODS.length * 100}vw` }}>
          {NEIGHBORHOODS.map((n, idx) => (
            <div
              key={n.name}
              className={`horizontal-card relative h-screen flex items-end overflow-hidden will-change-transform ${idx === 0 ? "is-first" : ""}`}
              style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
            >
              <div
                className="horizontal-card-image absolute inset-0 will-change-transform"
                style={{ width: "100%", left: "0%" }}
              >
                <img
                  src={n.image}
                  alt={`${n.name} luxury Austin neighborhood`}
                  className="w-full h-full object-cover"
                  decoding="async"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: "rgba(12, 15, 36, 0.2)" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(12, 15, 36, 0.75), rgba(12, 15, 36, 0))",
                }}
              />
              <div className="card-content relative z-10 p-10 lg:p-14 max-w-xl">
                <p className="mb-4 text-xs uppercase tracking-[0.24em] font-sans" style={{ color: "#b9a06c" }}>
                  {n.stat}
                </p>
                <h2 className="font-display text-4xl lg:text-6xl text-white leading-[0.98]">
                  {n.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 6: Vertical Split-Reveal Testimonial ─ */}
      <section className="testimonial-section relative w-full h-screen bg-[hsl(220,15%,6%)] overflow-hidden">
        {/* Testimonial sits behind on the right side */}
        <div className="absolute inset-0 z-0 flex items-center justify-end px-8 md:px-16 lg:px-24">
          <div className="max-w-xl md:w-1/2 md:pl-8">
            <p
              className="font-display italic text-white/90 font-light leading-[1.3] mb-10"
              style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.1rem)" }}
            >
              <span className="testimonial-line block will-change-transform">"Taylor brought us a Westlake home</span>
              <span className="testimonial-line block will-change-transform">before it ever hit the market.</span>
              <span className="testimonial-line block will-change-transform">We never would have seen it without him."</span>
            </p>
            <p
              className="testimonial-attribution text-[hsl(var(--gold))] tracking-[0.28em] uppercase font-sans will-change-transform"
              style={{ fontSize: "0.72rem" }}
            >
              — Private Buyer, Westlake Hills
            </p>
          </div>
        </div>

        {/* Left half — stays in place */}
        <div className="testimonial-split-left absolute inset-y-0 left-0 w-1/2 z-10 overflow-hidden will-change-transform">
          <img
            src={testimonialSplitImg}
            alt="Lake Austin luxury waterfront estate at golden hour"
            className="testimonial-split-image absolute inset-y-0 left-0 h-full w-screen max-w-none object-cover will-change-transform"
            decoding="async"
          />
        </div>

        {/* Right half — slides off to the RIGHT */}
        <div className="testimonial-split-right absolute inset-y-0 right-0 w-1/2 z-10 overflow-hidden will-change-transform">
          <img
            src={testimonialSplitImg}
            alt=""
            aria-hidden="true"
            className="testimonial-split-image absolute inset-y-0 right-0 h-full w-screen max-w-none object-cover will-change-transform"
            decoding="async"
          />
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
              decoding="async"
            />
          </div>
          <div className="h-6 md:h-8" aria-hidden="true" />
          <div className="form-panel border border-white/10 p-10 bg-white/[0.02] backdrop-blur-sm will-change-transform">
            {formNode}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CinematicSections;
