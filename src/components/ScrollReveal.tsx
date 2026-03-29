import { useEffect, useRef, useState, type ReactNode, Children, cloneElement, isValidElement } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance to travel upward in px (default 18) */
  distance?: number;
  /** Duration in ms (default 900) */
  duration?: number;
  /** Stagger children by this ms each (wraps each child in a reveal) */
  stagger?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  distance = 18,
  duration = 900,
  stagger,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stagger mode: wrap each child individually with incremental delay
  if (stagger && stagger > 0) {
    const items = Children.toArray(children);
    return (
      <div ref={ref} className={className}>
        {items.map((child, i) => {
          const itemDelay = delay + i * stagger;
          const style = {
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
            transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${itemDelay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${itemDelay}ms`,
            willChange: "opacity, transform" as const,
          };
          return (
            <div key={i} style={style}>
              {child}
            </div>
          );
        })}
      </div>
    );
  }

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
    willChange: "opacity, transform" as const,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;
