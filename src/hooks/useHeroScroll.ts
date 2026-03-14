import { useEffect, useState } from "react";

/** Returns a 0–1 value representing scroll progress through the hero viewport height */
export function useHeroScroll() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const vh = window.innerHeight;
          const p = Math.min(window.scrollY / vh, 1);
          setProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}
