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
              <source src="/video/barton-creek-drone.mp4" type="video/mp4" />
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
              <p className="text-white/50 text-sm tracking-[0.2em] uppercase font-sans">{s.label}</p>
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
            <h2 className="font-display text-2xl font-light text-white mb-6 text-center">
              See you on the inside,
            </h2>
// ... keep existing code
            <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
              See you on the inside,
            </h2>
          </div>
          <div className="form-field flex justify-center mb-6">
            <img
              src={taylorSignature}
              alt="Taylor Sherwood signature"
              className="h-16 md:h-20 w-auto"
              loading="lazy"
            />
          </div>
          <div className="form-field border border-white/10 p-10 bg-white/[0.02] backdrop-blur-sm">
            {formNode}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CinematicSections;
