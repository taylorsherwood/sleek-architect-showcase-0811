import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import westlakeDusk from "@/assets/community-westlake-hills-hero.webp";
import privateInventoryHero from "@/assets/hero-luxury-austin.webp";

import desktopNote from "@/assets/testimonial-westlake-living-room.webp";

import clarksvilleImg from "@/assets/off-market-reveal-estate.webp";
import taylorSignature from "@/assets/taylor-sherwood-signature.png";
import testimonialSplitImg from "@/assets/testimonial-split-lake-austin.webp";
import austinSkylineParallax from "@/assets/austin-skyline-parallax.webp";

gsap.registerPlugin(ScrollTrigger);

const labelStyle = {
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontFamily: '"Jost", sans-serif',
};

const THESIS = "The best Austin homes don't get listed. They get introduced.";


interface Props {
  formNode: ReactNode;
}

// Tablet (>=768px) and desktop both receive the full pinned cinematic
// sequence. Only true mobile viewports fall back to the stacked compact
// layout. Lenis + ScrollTrigger handle touch scrolling on tablets via
// `syncTouch`, so the pinned sections animate identically to desktop.
const COMPACT_MAX_WIDTH = 768;

const useIsCompact = () => {
  const [isCompact, setIsCompact] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < COMPACT_MAX_WIDTH;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${COMPACT_MAX_WIDTH - 1}px)`);
    const onChange = () => setIsCompact(window.innerWidth < COMPACT_MAX_WIDTH);
    mql.addEventListener("change", onChange);
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isCompact;
};

const CinematicSections = ({ formNode }: Props) => {
  const isMobile = useIsCompact();
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
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      lerp: 0.08,
      syncTouch: true,
      syncTouchLerp: 0.075,
      gestureOrientation: "vertical",
    } as ConstructorParameters<typeof Lenis>[0]);
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Re-enable lag smoothing so dropped frames don't jolt timelines
    gsap.ticker.lagSmoothing(500, 33);
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
          scrub: 0.6,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });
      words.forEach((w) => {
        thesisTl.to(w, { opacity: 1, y: 0, ease: "power3.out", duration: 1, force3D: true });
      });
      // Hold the final state briefly before releasing the pin
      thesisTl.to({}, { duration: 0.3 });

      // ── Section 2.5: Image Split Reveal
      // Phase 1 (0 → 0.30): image locks full-screen, subtle settle (slight zoom-out).
      // Phase 2 (0.30 → 0.70): the two halves split apart vertically,
      //   revealing the skyline behind them.
      // Phase 3 (0.75 → 1.30): stat lines clear blur and rise over the
      //   revealed skyline in the same restrained cadence as the testimonial reveal.
      gsap.set([".split-top-half", ".split-bottom-half"], { yPercent: 0 });
      gsap.set(".split-cover-image", { scale: 1.08 });
      gsap.set(".split-stat", { opacity: 0, y: 28, filter: "blur(14px)" });

      const splitTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".split-section",
          start: "top top",
          end: "+=240%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });

      splitTl
        // Phase 1 — lock & settle
        .to(".split-cover-image", { scale: 1, ease: "none", duration: 0.30, force3D: true }, 0)
        // Phase 2 — elegant split, revealing the skyline behind
        .to(
          ".split-top-half",
          { yPercent: -100, ease: "power2.inOut", duration: 0.4, force3D: true },
          0.30
        )
        .to(
          ".split-bottom-half",
          { yPercent: 100, ease: "power2.inOut", duration: 0.4, force3D: true },
          0.30
        )
        // Brief hold so the revealed image breathes before text appears
        .to({}, { duration: 0.10 })
        // Phase 3 — stat lines clear blur and rise over the revealed image
        .to(
          ".split-stat",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            stagger: 0.22,
            duration: 0.60,
            force3D: true,
          },
          ">"
        )
        // Hold the open + revealed state briefly before unpin
        .to({}, { duration: 0.20 });


      // ── Section 3 (new): Drone Video — pin section, reveal text on scroll
      const droneEls = gsap.utils.toArray<HTMLElement>(".drone-reveal");
      gsap.set(droneEls, { opacity: 0, y: 30 });
      const droneTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".drone-section",
          start: "top top",
          end: "+=70%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });
      droneTl.to(droneEls, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.4,
        force3D: true,
      });

      // ── Section 3: Parallax Image Reveal — REMOVED

      // ── Section 3.5: Cinematic Parallax Bridge — pin and reveal headline
      const bridgeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".bridge-section",
          start: "top top",
          end: "+=80%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });
      bridgeTl
        .fromTo(".bridge-image", { yPercent: -8, scale: 1.08 }, { yPercent: 8, scale: 1, ease: "none", force3D: true }, 0)
        .fromTo(".bridge-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.4, force3D: true }, 0.15)
        .fromTo(".bridge-headline", { opacity: 0, y: 50 }, { opacity: 1, y: 0, ease: "power2.out", duration: 0.6, force3D: true }, 0.25)
        .fromTo(".bridge-rule", { width: 0, opacity: 0 }, { width: 120, opacity: 1, ease: "power2.out", duration: 0.5 }, 0.5)
        .to({}, { duration: 0.3 });

      // ── Section 4: Horizontal Scroll Gallery — REMOVED

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
      gsap.set(".testimonial-line", { opacity: 0, y: 24 });
      gsap.set(".testimonial-attribution", { opacity: 0, y: 12 });

      const testimonialTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonial-section",
          start: "top top",
          end: "+=160%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });

      testimonialTl
        // Phase 1 — slow Ken Burns settle
        .to(".testimonial-split-image", { scale: 1, ease: "power1.out", duration: 0.35, force3D: true }, 0)
        // Phase 2 — right half drifts away on a long, refined curve
        .to(".testimonial-split-right", { xPercent: 100, ease: "expo.inOut", duration: 0.60, force3D: true }, 0.35)
        // Phase 3 — testimonial copy rises in measured cadence (no blur — too expensive on scrub)
        .to(".testimonial-line", { opacity: 1, y: 0, ease: "power3.out", stagger: 0.20, duration: 0.70, force3D: true }, 0.65)
        .to(".testimonial-attribution", { opacity: 1, y: 0, ease: "power2.out", duration: 0.55, force3D: true }, 1.05)
        .to({}, { duration: 0.15 });

      // ── Section 7: Form — elegant cinematic reveal as user scrolls
      // past the testimonial. Filter blurs removed (GPU thrash on scrub).
      const formEls = gsap.utils.toArray<HTMLElement>(".form-field");
      gsap.set(formEls, { opacity: 0, y: 60 });
      gsap.set(".form-panel", { opacity: 0, y: 80, scale: 0.96 });

      const formTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".form-section",
          start: "top 85%",
          end: "top 30%",
          scrub: 0.8,
          fastScrollEnd: true,
        },
      });

      formTl
        .to(formEls[0], {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.6,
          force3D: true,
        }, 0)
        .to(formEls[1], {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.6,
          force3D: true,
        }, 0.25)
        .to(".form-panel", {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          duration: 0.9,
          force3D: true,
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
        {/* ── Section 2 — Editorial Thesis ── */}
        <section className="relative px-7 pt-20 pb-24 bg-[hsl(220,15%,8%)] overflow-hidden">
          {/* Gold quotation mark */}
          <span
            aria-hidden="true"
            className="absolute top-6 left-7 text-[hsl(var(--gold))]/20 font-display select-none pointer-events-none"
            style={{ fontSize: "8rem", lineHeight: 1, fontStyle: "italic" }}
          >
            "
          </span>
          <p className="relative text-[hsl(var(--gold))] mb-6 font-bold" style={labelStyle}>
            THE THESIS
          </p>
          <p
            className="relative font-display text-[hsl(40,30%,92%)] leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(1.85rem, 8vw, 2.6rem)" }}
          >
            The best Austin homes don't get listed.{" "}
            <span className="italic text-[hsl(var(--gold))]">They get introduced.</span>
          </p>
          {/* Gold rule */}
          <div className="mt-10 h-[1px] w-16 bg-[hsl(var(--gold))]/60" />
        </section>

        {/* ── Section 2.5 — Full-bleed editorial image with caption overlay ── */}
        <section className="relative">
          <div className="relative w-full h-[78vh] overflow-hidden">
            <img
              src={privateInventoryHero}
              alt="Private Austin estate"
              className="w-full h-full object-cover"
              decoding="async"
            />
            {/* Bottom-up gradient for caption legibility */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,11,28,0.92) 0%, rgba(8,11,28,0.55) 35%, rgba(8,11,28,0.15) 65%, transparent 100%)",
              }}
            />
            {/* Caption overlay */}
            <div className="absolute inset-x-0 bottom-0 px-7 pb-12">
              <p className="text-[hsl(var(--gold))] mb-4 font-bold" style={labelStyle}>
                THE INVITATION
              </p>
              <h2
                className="font-display text-[#F5F1EA] leading-[1.1] tracking-tight whitespace-pre-line"
                style={{ fontSize: "clamp(1.85rem, 8vw, 2.6rem)" }}
              >
                What happens <span className="italic">{"\n"}before</span> it's listed.
              </h2>
              <div className="mt-6 h-[1px] w-12 bg-[hsl(var(--gold))]/60" />
            </div>
          </div>
        </section>

        {/* ── Section 3 — Drone video with editorial caption ── */}
        <section className="relative">
          <div className="relative w-full h-[80vh] overflow-hidden">
            <video
              ref={droneVideoRef}
              muted
              playsInline
              preload="auto"
              className="hero-video absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "20% center" }}
            >
              <source src="/video/barton-creek-drone.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: "rgba(12, 15, 36, 0.35)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,11,28,0.92) 0%, rgba(8,11,28,0.4) 40%, transparent 75%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 px-7 pb-12">
              <p className="mb-4 font-bold" style={{ ...labelStyle, color: "#BAA26A" }}>
                OFF-MARKET
              </p>
              <h2
                className="font-display text-[#F5F1EA] leading-[1.1] tracking-tight mb-5 whitespace-pre-line"
                style={{ fontSize: "clamp(1.85rem, 8vw, 2.6rem)" }}
              >
                Austin, from the <span className="italic">{"\n"}inside.</span>
              </h2>
              <p className="text-white/75 font-light leading-relaxed text-base max-w-md">
                The city you're moving to. The homes no one else will show you.
              </p>
              <div className="mt-6 h-[1px] w-12 bg-[hsl(var(--gold))]/60" />
            </div>
          </div>
        </section>

        {/* ── Section 6 — Editorial testimonial ── */}
        <section className="bg-[hsl(220,15%,6%)]">
          <div className="relative w-full h-[55vh] overflow-hidden">
            <img
              src={testimonialSplitImg}
              alt="Lake Austin luxury waterfront estate"
              className="w-full h-full object-cover"
              decoding="async"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(8,11,28,0.3) 60%, rgba(8,11,28,0.85) 100%)",
              }}
            />
          </div>
          <div className="px-7 py-16 relative">
            <span
              aria-hidden="true"
              className="absolute -top-2 left-7 text-[hsl(var(--gold))]/25 font-display select-none pointer-events-none"
              style={{ fontSize: "6rem", lineHeight: 1, fontStyle: "italic" }}
            >
              "
            </span>
            <p
              className="relative font-display italic text-white/90 leading-[1.35] mb-7"
              style={{ fontSize: "clamp(1.35rem, 5.5vw, 1.7rem)" }}
            >
              Taylor brought us a Westlake home before it ever hit the market. We never would have seen it without him.
            </p>
            <div className="h-[1px] w-10 bg-[hsl(var(--gold))]/60 mb-4" />
            <p className="text-[hsl(var(--gold))] text-[0.65rem] tracking-[0.3em] uppercase font-sans font-medium">
              Private Buyer · Westlake Hills
            </p>
          </div>
        </section>

        {/* ── Section 7 — Form ── */}
        <section id="section-7-form" className="py-20 px-6 bg-[hsl(220,15%,8%)]">
          <div className="max-w-xl mx-auto">
            <p className="text-[hsl(var(--gold))] mb-4 font-bold text-center" style={labelStyle}>
              ECHELON INSIDER
            </p>
            <h2
              className="font-display font-light text-[#F5F1EA] mb-4 text-center leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 7vw, 2.25rem)" }}
            >
              See you on the <span className="italic">inside,</span>
            </h2>
            <div className="flex justify-center mb-6">
              <img
                src={taylorSignature}
                alt="Taylor Sherwood signature"
                className="h-14 w-auto"
                decoding="async"
              />
            </div>
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
        {/* Stat overlay — sits above bg image but BELOW the split halves so it
            only becomes visible after the halves slide away. Then the lines
            blur-reveal in over the revealed skyline. */}
        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center px-8 pointer-events-none">
          {/* Subtle dark scrim for legibility against bright skyline */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(12,15,36,0.55) 0%, rgba(12,15,36,0.25) 55%, rgba(12,15,36,0) 100%)",
            }}
          />
          <div className="relative flex flex-col items-center justify-center w-full">
          <p
            className="split-stat font-display font-light leading-[1.15] mb-5 max-w-[90vw] will-change-[opacity,transform,filter]"
            style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)", color: "#F5F1EA" }}
          >
            <span style={{ color: "#BAA26A" }}>$1.2B</span> in active private luxury inventory
          </p>
          <p
            className="split-stat font-display font-light leading-[1.15] mb-5 max-w-[90vw] will-change-[opacity,transform,filter]"
            style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)", color: "#F5F1EA" }}
          >
            <span style={{ color: "#BAA26A" }}>15–20%</span> of $2M+ homes close off-market
          </p>
          <p
            className="split-stat font-display font-light leading-[1.15] max-w-[90vw] will-change-[opacity,transform,filter]"
            style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)", color: "#F5F1EA" }}
          >
            <span style={{ color: "#BAA26A" }}>$4.6B</span> in Austin luxury sales 2025
          </p>
          </div>
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
            className="drone-reveal font-display font-light leading-[1.05] mb-6 max-w-[90vw] whitespace-pre-line"
            style={{ fontSize: "7vw", color: "#F5F1EA" }}
          >
            Austin, from the {"\n"}inside.
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

      {/* ── Section 4: Horizontal Scroll Gallery — REMOVED ─ */}

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
              className="h-20 md:h-28 w-auto"
              decoding="async"
            />
          </div>
          <div className="h-6 md:h-8" aria-hidden="true" />
          <div className="form-panel border border-white/10 p-10 bg-white/[0.02] will-change-transform">
            {formNode}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CinematicSections;
