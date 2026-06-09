import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { pathwayForCategory } from "@/lib/articlePathways";

interface Props {
  category: string;
  articleId?: string;
}

/**
 * End-of-article "Continue Exploring" pathway. Three curated destinations
 * chosen from the article's category. Replaces the generic blog ending
 * with a contextual next-step decision, lifting pages/session.
 *
 * Fires:
 *  - cta_impression  once when the block enters the viewport (block-level)
 *  - cta_click       on each destination click (per-destination)
 */
const ContinueExploring = ({ category, articleId }: Props) => {
  const { destinations } = pathwayForCategory(category);
  const ref = useRef<HTMLElement | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || firedRef.current) return;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            trackEvent("cta_impression", {
              cta_type: "continue_exploring",
              cta_position: "article_end",
              article_id: articleId,
              article_category: category,
              destination_count: destinations.length,
            });
            trackEvent("article_progress", {
              milestone: "article_end",
              article_id: articleId,
              article_category: category,
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [articleId, category, destinations.length]);

  const onClick = (href: string, label: string, idx: number) => () => {
    trackEvent("cta_click", {
      cta_type: "continue_exploring",
      cta_position: `article_end_${idx + 1}`,
      cta_href: href,
      cta_label: label,
      article_id: articleId,
      article_category: category,
    });
  };

  return (
    <section
      ref={ref}
      className="mt-20 pt-12 border-t border-foreground/15"
      aria-label="Continue exploring"
    >
      <p className="text-minimal text-gold mb-4 tracking-[0.22em] text-xs uppercase">
        Continue Exploring
      </p>
      <h2 className="text-2xl md:text-3xl font-light text-architectural mb-10 leading-snug">
        Three places to go from here
      </h2>
      <ul className="grid md:grid-cols-3 gap-x-10 gap-y-10">
        {destinations.map((dest, idx) => (
          <li key={dest.href} className="group">
            <Link
              to={dest.href}
              onClick={onClick(dest.href, dest.label, idx)}
              className="block"
            >
              <span className="block w-8 h-px bg-[#b9a06c] mb-5 group-hover:w-14 transition-all duration-300" />
              <span className="block text-lg md:text-xl font-light text-architectural mb-3 leading-snug group-hover:text-foreground transition-colors">
                {dest.label}
              </span>
              <span className="block text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                {dest.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContinueExploring;
