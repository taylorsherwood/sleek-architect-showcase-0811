import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import type { InlineCTAConfig } from "@/lib/articlePathways";

interface Props {
  cta: InlineCTAConfig;
  /** "mid_1" | "mid_2" — used as the position parameter on analytics events. */
  position: string;
  category: string;
  /** Article id, included in analytics for post-level attribution. */
  articleId?: string;
}

/**
 * Editorial-style in-article CTA. Visually echoes the existing SoftCTA
 * (hairline top/bottom rule, muted gold pill button) so it reads as a
 * publication insert, not an advertisement.
 *
 * Fires:
 *  - cta_impression  when first scrolled into view (>=40% visible)
 *  - cta_click       on link click
 *  - article_progress when the impression fires (mid_1 ≈ ~30%, mid_2 ≈ ~70%)
 */
const InlineEditorialCTA = ({ cta, position, category, articleId }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
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
              cta_type: "inline_editorial",
              cta_position: position,
              cta_href: cta.href,
              cta_label: cta.label,
              article_id: articleId,
              article_category: category,
            });
            trackEvent("article_progress", {
              milestone: position,
              article_id: articleId,
              article_category: category,
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [cta.href, cta.label, position, category, articleId]);

  const onClick = () => {
    trackEvent("cta_click", {
      cta_type: "inline_editorial",
      cta_position: position,
      cta_href: cta.href,
      cta_label: cta.label,
      article_id: articleId,
      article_category: category,
    });
  };

  return (
    <aside
      ref={ref}
      className="my-14 md:my-16 pt-10 md:pt-12 border-t border-foreground/15"
      aria-label="Editorial recommendation"
    >
      <div className="max-w-2xl mx-auto text-center px-2">
        <p className="text-minimal text-gold mb-4 tracking-[0.22em] text-xs uppercase">
          {cta.eyebrow}
        </p>
        <p className="text-xl md:text-2xl font-light text-architectural mb-4 leading-snug">
          {cta.headline}
        </p>
        <p className="text-sm md:text-base text-muted-foreground font-light mb-7 leading-relaxed">
          {cta.body}
        </p>
        <Link
          to={cta.href}
          onClick={onClick}
          className="inline-block border border-[#b9a06c] text-[#b9a06c] bg-transparent hover:bg-[#b9a06c] hover:text-white uppercase tracking-[0.18em] text-xs px-8 py-4 transition-colors"
        >
          {cta.label}
        </Link>
      </div>
    </aside>
  );
};

export default InlineEditorialCTA;
