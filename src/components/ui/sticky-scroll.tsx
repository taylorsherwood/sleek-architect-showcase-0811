'use client';

import { useEffect, useRef, useState } from 'react';
import { communityPages } from '@/data/communityData';

const FEATURED_SLUGS = [
  'westlake-hills',
  'lake-austin',
  'barton-creek',
  'spanish-oaks',
  'tarrytown',
  'rollingwood',
  'rob-roy',
  'downtown',
  'clarksville',
  'pemberton-heights',
  'lake-travis',
  'zilker-austin',
  'davenport-ranch',
] as const;

const bySlug = new Map(communityPages.map((c) => [c.slug, c]));

const communities = FEATURED_SLUGS
  .map((slug) => bySlug.get(slug))
  .filter((c): c is (typeof communityPages)[number] => Boolean(c?.image))
  .map((c) => ({
    name: c.name,
    img: c.heroImage || c.image,
    slug: c.slug,
  }));

// Distribute into 3 columns. Middle column (sticky) shows just 3 hero tiles
// pinned across the full scroll of the section. Side columns hold the rest.
// Three columns scrolling at different speeds (parallax) while the
// outer section is pinned. Re-distribute communities across columns.
const colA = communities.filter((_, i) => i % 3 === 0);
const colB = communities.filter((_, i) => i % 3 === 1);
const colC = communities.filter((_, i) => i % 3 === 2);

type Item = { name: string; img: string; slug: string };

const Column = ({
  items,
  translateY,
}: {
  items: Item[];
  translateY: number;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transform: `translate3d(0, ${translateY}px, 0)`,
      willChange: 'transform',
    }}
  >
    {items.map((c) => (
      <a
        key={c.slug}
        href={`/communities/${c.slug}`}
        style={{
          display: 'block',
          overflow: 'hidden',
          borderRadius: '6px',
        }}
      >
        <img
          src={c.img}
          alt={c.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '22rem',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </a>
    ))}
  </div>
);

export default function StickyScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 across the pinned section

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Section is `200vh` tall — pin lasts for `vh` of scroll.
      // progress 0 when top hits 0; 1 when bottom hits viewport bottom.
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Each column travels a different distance for a parallax feel.
  // Negative = moves up as user scrolls down.
  const yA = -progress * 600; // slow
  const yB = -progress * 1100; // fast
  const yC = -progress * 750; // medium

  return (
    <section
      aria-label="Featured communities"
      ref={wrapperRef}
      style={{
        position: 'relative',
        backgroundColor: '#0C0F24',
        height: '200vh', // gives us 100vh of scroll-driven animation
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#0C0F24',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '12px',
            padding: '0 12px',
            alignItems: 'start',
          }}
        >
          <Column items={colA} translateY={yA} />
          <Column items={colB} translateY={yB} />
          <Column items={colC} translateY={yC} />
        </div>
      </div>
    </section>
  );
}
