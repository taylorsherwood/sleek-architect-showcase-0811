'use client';

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

const middle = pickMiddle();
const middleSlugs = new Set(middle.map((c) => c.slug));
const side = communities.filter((c) => !middleSlugs.has(c.slug));
const left = side.filter((_, i) => i % 2 === 0);
const right = side.filter((_, i) => i % 2 === 1);

const Caption = ({ name, price }: { name: string; price: string }) => (
  <figcaption
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '20px 22px',
      background:
        'linear-gradient(to top, rgba(12,15,36,0.85) 0%, rgba(12,15,36,0.45) 55%, rgba(12,15,36,0) 100%)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: '12px',
      color: 'white',
      pointerEvents: 'none',
    }}
  >
    <span
      style={{
        fontFamily: 'Cinzel, serif',
        fontSize: 'clamp(14px, 1.05vw, 18px)',
        letterSpacing: '0.04em',
        lineHeight: 1.15,
      }}
    >
      {name}
    </span>
    {price && (
      <span
        style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#BAA26A',
          whiteSpace: 'nowrap',
        }}
      >
        {price}
      </span>
    )}
  </figcaption>
);

const Tile = ({ item, height }: { item: Item; height: string }) => (
  <figure style={{ width: '100%', margin: 0 }}>
    <a
      href={`/communities/${item.slug}`}
      style={{
        position: 'relative',
        display: 'block',
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
          width: '100%',
          height,
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <Caption name={item.name} price={item.price} />
    </a>
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
            <Tile key={c.slug} item={c} height="24rem" />
          ))}
        </div>

        {/* CENTER — sticky */}
        <div
          style={{
            gridColumn: 'span 4 / span 4',
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'grid',
            gridTemplateRows: `repeat(${middle.length}, minmax(0, 1fr))`,
            gap: '8px',
            alignSelf: 'start',
          }}
        >
          {middle.map((c) => (
            <figure key={c.slug} style={{ width: '100%', height: '100%', margin: 0 }}>
              <a
                href={`/communities/${c.slug}`}
                style={{
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  height: '100%',
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
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <Caption name={c.name} price={c.price} />
              </a>
            </figure>
          ))}
        </div>

        {/* RIGHT — scrolls */}
        <div style={{ gridColumn: 'span 4 / span 4', display: 'grid', gap: '8px' }}>
          {right.map((c) => (
            <Tile key={c.slug} item={c} height="24rem" />
          ))}
        </div>
      </div>
    </section>
  );
}
