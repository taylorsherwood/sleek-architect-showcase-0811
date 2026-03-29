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
  distance = 10,
  duration = 800,
  stagger,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

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
            transition: `opacity ${duration}ms ${ease} ${itemDelay}ms, transform ${duration}ms ${ease} ${itemDelay}ms`,
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
    transition: `opacity ${duration}ms ${ease} ${delay}ms, transform ${duration}ms ${ease} ${delay}ms`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;
