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
  const wrapperRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);
  const colCRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 across the pinned section
  const [travel, setTravel] = useState({ a: 0, b: 0, c: 0 });

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const viewportHeight = viewportRef.current?.offsetHeight ?? window.innerHeight;
      setTravel({
        a: Math.max((colARef.current?.scrollHeight ?? 0) - viewportHeight, 0),
        b: Math.max((colBRef.current?.scrollHeight ?? 0) - viewportHeight, 0),
        c: Math.max((colCRef.current?.scrollHeight ?? 0) - viewportHeight, 0),
      });
    };
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
    const resizeObserver = new ResizeObserver(() => {
      measure();
      update();
    });

    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (colARef.current) resizeObserver.observe(colARef.current);
    if (colBRef.current) resizeObserver.observe(colBRef.current);
    if (colCRef.current) resizeObserver.observe(colCRef.current);

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('resize', update);
      resizeObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const yA = -(travel.a * (0.04 + progress * 0.56));
  const yB = -(travel.b * (0.12 + progress * 0.78));
  const yC = -(travel.c * (0.08 + progress * 0.64));

  return (
    <section
      aria-label="Featured communities"
      ref={wrapperRef}
      style={{
        position: 'relative',
        backgroundColor: '#0C0F24',
        height: '165vh',
      }}
    >
      <div
        ref={viewportRef}
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
            padding: '2vh 12px',
            alignItems: 'start',
          }}
        >
          <div ref={colARef}><Column items={colA} translateY={yA} /></div>
          <div ref={colBRef}><Column items={colB} translateY={yB} /></div>
          <div ref={colCRef}><Column items={colC} translateY={yC} /></div>
        </div>
      </div>
    </section>
  );
}
