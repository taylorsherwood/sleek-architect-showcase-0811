import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const VIDEO_URL =
  "https://res.cloudinary.com/dp4xn1jto/video/upload/f_auto,q_auto,w_1600/My_Movie_4_gxjr7u";

const POSTER_URL =
  "https://res.cloudinary.com/dp4xn1jto/video/upload/so_2,w_1600,f_jpg,q_80/My_Movie_4_gxjr7u";

function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const reveal = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
});

const CinematicVideoSection = () => {
  const { ref, visible } = useScrollReveal(0.08);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [visible]);

  /* Subtle slow scale on scroll — cinematic drift */
  useEffect(() => {
    const el = videoContainerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1,
          1 - rect.bottom / (window.innerHeight + rect.height)
        ));
        const scale = 1 + progress * 0.03;
        el.style.transform = `scale(${scale})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={ref} className="relative py-28 md:py-36">
      {/* ── Editorial text — left-aligned, constrained ── */}
      <div className="container mx-auto px-6 md:px-8 mb-12 md:mb-14">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-md ml-0 md:ml-4">
            <p
              className="text-minimal text-gold mb-3 font-extrabold"
              style={reveal(visible, 0)}
            >
              PROPERTY FILM
            </p>
            <div
              style={{
                ...reveal(visible, 100),
                width: 36,
                height: 1,
                background: "linear-gradient(90deg, hsl(var(--gold) / 0.45), transparent)",
                marginBottom: 20,
              }}
            />
            <h2
              className="text-3xl md:text-4xl font-display font-light text-architectural leading-[1.15] mb-4"
              style={reveal(visible, 200)}
            >
              Luxury Marketing
              <br />
              <span className="italic text-foreground/80">That Moves</span> Buyers
            </h2>
            <p
              className="text-muted-foreground text-sm leading-[1.85] max-w-sm"
              style={reveal(visible, 350)}
            >
              Cinematic presentation is part of how we position exceptional
              homes to stand apart, attract attention, and drive stronger
              perceived value.
            </p>
          </div>
        </div>
      </div>

      {/* ── Video — near full-bleed with soft edge fades ── */}
      <div
        className="relative mx-4 md:mx-8 lg:mx-12 overflow-hidden"
        style={reveal(visible, 450)}
      >
        {/* Top fade */}
        <div
          className="absolute top-0 inset-x-0 h-16 md:h-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, hsl(var(--background)), transparent)" }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-16 md:h-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }}
        />

        <div
          ref={videoContainerRef}
          className="will-change-transform origin-center"
          style={{ borderRadius: 3 }}
        >
          <div className="relative w-full" style={{ aspectRatio: "2.2 / 1" }}>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={VIDEO_URL}
              poster={POSTER_URL}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>

      {/* ── CTA — left-aligned below video ── */}
      <div className="container mx-auto px-6 md:px-8 mt-10 md:mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="ml-0 md:ml-4" style={reveal(visible, 600)}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 text-minimal text-muted-foreground hover:text-gold transition-colors duration-300"
            >
              SEE HOW YOUR HOME WOULD BE POSITIONED
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicVideoSection;
