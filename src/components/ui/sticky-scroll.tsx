'use client';

import { Link } from 'react-router-dom';
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

const PRICE_BY_SLUG: Record<string, string> = {
  'westlake-hills': '$2.5M+',
  'lake-austin': '$5M+',
  'barton-creek': '$2M+',
  'spanish-oaks': '$3M+',
  'tarrytown': '$2M+',
  'rollingwood': '$2.5M+',
  'rob-roy': '$3M+',
  'downtown': '$1.2M+',
  'clarksville': '$1.8M+',
  'pemberton-heights': '$2M+',
  'lake-travis': '$1.5M+',
  'zilker-austin': '$1.5M+',
  'davenport-ranch': '$2.2M+',
};

const bySlug = new Map(communityPages.map((c) => [c.slug, c]));

const communities = FEATURED_SLUGS
  .map((slug) => bySlug.get(slug))
  .filter((c): c is (typeof communityPages)[number] => Boolean(c?.image))
  .map((c) => ({
    name: c.name,
    img: c.heroImage || c.image,
    slug: c.slug,
    price: PRICE_BY_SLUG[c.slug] ?? '',
  }));

// Distribute communities across three columns. Middle column will be sticky
// (5 hero tiles to fill the section), left/right columns scroll past it.
type Item = (typeof communities)[number];

const pickMiddle = (): Item[] => {
  if (communities.length <= 5) return [...communities];
  // Evenly sampled across the list so we don't bunch the same neighborhoods.
  const idx = [0, 0.25, 0.5, 0.75, 1].map((t) =>
    Math.round(t * (communities.length - 1)),
  );
  const seen = new Set<number>();
  return idx.filter((i) => !seen.has(i) && seen.add(i)).map((i) => communities[i]);
};

// Distribute communities across three uniform columns (round-robin so
// each column has roughly the same number of tiles and the section
// ends at the same baseline).
const left = communities.filter((_, i) => i % 3 === 0);
const middle = communities.filter((_, i) => i % 3 === 1);
const right = communities.filter((_, i) => i % 3 === 2);

const PriceBadge = ({ price }: { price: string }) =>
  price ? (
    <span
      style={{
        position: 'absolute',
        top: '14px',
        right: '14px',
        backgroundColor: '#0C0F24',
        color: '#BAA26A',
        fontFamily: 'Cinzel, serif',
        fontSize: '11px',
        letterSpacing: '0.2em',
        padding: '6px 12px',
        borderRadius: '2px',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}
    >
      {price}
    </span>
  ) : null;

const NameStrip = ({ name }: { name: string }) => (
  <span
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '18px 18px 16px',
      background:
        'linear-gradient(to top, rgba(12,15,36,0.85) 0%, rgba(12,15,36,0.35) 60%, rgba(12,15,36,0) 100%)',
      color: 'white',
      fontFamily: 'Cinzel, serif',
      fontSize: 'clamp(14px, 1.05vw, 18px)',
      letterSpacing: '0.04em',
      lineHeight: 1.15,
      pointerEvents: 'none',
    }}
  >
    {name}
  </span>
);

const Tile = ({ item }: { item: Item }) => (
  <figure style={{ width: '100%', margin: 0 }}>
    <Link
      to={`/communities/${item.slug}`}
      aria-label={`${item.name} — view community`}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        aspectRatio: '4 / 5',
        overflow: 'hidden',
        borderRadius: '6px',
      }}
    >
      <img
        src={item.img}
        alt={item.name}
        loading="lazy"
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <PriceBadge price={item.price} />
      <NameStrip name={item.name} />
    </Link>
  </figure>
);

export default function StickyScroll() {
  return (
    <section
      aria-label="Featured communities"
      style={{ width: '100%', backgroundColor: '#0C0F24', color: 'white' }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          padding: 'clamp(64px, 8vw, 110px) 24px clamp(40px, 5vw, 64px)',
        }}
      >
        <p
          style={{
            color: '#BAA26A',
            fontFamily: 'Jost, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            margin: 0,
            marginBottom: '18px',
          }}
        >
          Curated Neighborhoods
        </p>
        <h2
          style={{
            fontFamily: 'Cinzel, serif',
            fontWeight: 400,
            color: 'white',
            fontSize: 'clamp(28px, 3.4vw, 48px)',
            letterSpacing: '0.02em',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Featured Communities in Austin
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gap: '8px',
          padding: '8px',
        }}
      >
        {/* LEFT — scrolls */}
        <div style={{ gridColumn: 'span 4 / span 4', display: 'grid', gap: '8px' }}>
          {left.map((c) => (
            <Tile key={c.slug} item={c} />
          ))}
        </div>

        {/* CENTER */}
        <div style={{ gridColumn: 'span 4 / span 4', display: 'grid', gap: '8px' }}>
          {middle.map((c) => (
            <Tile key={c.slug} item={c} />
          ))}
        </div>

        {/* RIGHT — scrolls */}
        <div style={{ gridColumn: 'span 4 / span 4', display: 'grid', gap: '8px' }}>
          {right.map((c) => (
            <Tile key={c.slug} item={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
