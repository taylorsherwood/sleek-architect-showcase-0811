import { useEffect } from "react";

/** Drives `.parallax-break` panels with a GPU transform so parallax works in every browser, including Safari. */
export function useParallaxBreaks() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".parallax-break").forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
        el.style.setProperty("--parallax-y", `${(progress * -18).toFixed(2)}%`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    schedule();
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
}
