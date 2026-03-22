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
    <section ref={ref} className="relative pt-0 pb-28 md:pb-36">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ── Overlapping editorial layout ── */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-center">

            {/* Left — Text */}
            <div className="relative z-10 max-w-md lg:max-w-none lg:pl-4 xl:pl-8 lg:pr-0 lg:mr-[-12%]" style={{ filter: "drop-shadow(0 0 24px hsl(var(--background) / 0.6))" }}>
              {/* Eyebrow */}
              <p
                className="text-[10px] text-gold/80 mb-8 font-bold"
                style={{ ...reveal(visible, 0), letterSpacing: "0.3em" }}
              >
                PROPERTY FILM
              </p>

              {/* Divider */}
              <div
                style={{
                  ...reveal(visible, 80),
                  width: 28,
                  height: 1,
                  background: "linear-gradient(90deg, hsl(var(--gold) / 0.3), transparent)",
                  marginBottom: 32,
                }}
              />

              {/* Headline — progressive cascade stagger */}
              <h2
                className="font-display font-medium text-architectural leading-[0.95] lg:ml-[3.5%]"
                style={{ ...reveal(visible, 160), fontSize: "clamp(2rem, 3.5vw, 2.75rem)", letterSpacing: "-0.02em" }}
              >
                Luxury Marketing
              </h2>
              <p
                className="font-display font-extralight italic text-foreground/55 leading-[0.95] mt-1.5 mb-10 lg:ml-[6%]"
                style={{ ...reveal(visible, 240), fontSize: "clamp(2rem, 3.5vw, 2.75rem)", letterSpacing: "-0.01em" }}
              >
                That Moves Buyers
              </p>

              {/* Power line */}
              <p
                className="text-sm font-medium text-foreground/85 mb-5"
                style={{ ...reveal(visible, 340), letterSpacing: "0.12em" }}
              >
                Most agents list. We position.
              </p>

              {/* Subheadline */}
              <p
                className="text-muted-foreground/80 text-[13px] leading-[2] max-w-[20rem] mb-8 lg:mb-0"
                style={reveal(visible, 420)}
              >
                Cinematic presentation is part of how we position exceptional
                homes to stand apart, attract attention, and drive stronger
                perceived value.
              </p>

              {/* CTA — desktop only (below text) */}
              <div className="hidden lg:block mt-8 lg:ml-[3.5%]" style={reveal(visible, 520)}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-[10px] font-medium text-muted-foreground/70 hover:text-gold transition-colors duration-500"
                  style={{ letterSpacing: "0.18em" }}
                >
                  SEE HOW YOUR HOME WOULD BE POSITIONED
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right — Video */}
            <div
              className="relative overflow-hidden mt-10 lg:mt-0"
              style={{ ...reveal(visible, 350), borderRadius: 3 }}
            >
              {/* Top fade */}
              <div
                className="absolute top-0 inset-x-0 h-20 md:h-28 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, hsl(var(--background) / 0.12), transparent)" }}
              />
              {/* Bottom fade */}
              <div
                className="absolute bottom-0 inset-x-0 h-24 md:h-32 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, hsl(var(--background) / 0.25), transparent)" }}
              />

              <div
                ref={videoContainerRef}
                className="will-change-transform origin-center"
              >
                <div className="relative w-full" style={{ aspectRatio: "4 / 3" }}>
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
          </div>

          {/* CTA — mobile only */}
          <div className="lg:hidden mt-8" style={reveal(visible, 520)}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 text-[10px] font-medium text-muted-foreground/70 hover:text-gold transition-colors duration-500"
              style={{ letterSpacing: "0.18em" }}
            >
              SEE HOW YOUR HOME WOULD BE POSITIONED
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicVideoSection;
