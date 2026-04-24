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
const middle = [
  communities[0],
  communities[Math.floor(communities.length / 2)],
  communities[communities.length - 1],
].filter(Boolean);
const middleSlugs = new Set(middle.map((c) => c.slug));
const side = communities.filter((c) => !middleSlugs.has(c.slug));
const left = side.filter((_, i) => i % 2 === 0);
const right = side.filter((_, i) => i % 2 === 1);

const Tile = ({ src, alt, slug }: { src: string; alt: string; slug: string }) => (
  <figure style={{ width: '100%', margin: 0 }}>
    <a
      href={`/communities/${slug}`}
      style={{ display: 'block', overflow: 'hidden', borderRadius: '6px' }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '24rem',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </a>
  </figure>
);

export default function StickyScroll() {
  return (
    <section aria-label="Featured communities" style={{ backgroundColor: '#0C0F24' }}>
      <section style={{ color: 'white', width: '100%', backgroundColor: '#0C0F24' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '8px',
            padding: '0 8px',
          }}
        >
          {/* LEFT — scrolls */}
          <div style={{ gridColumn: 'span 4 / span 4', display: 'grid', gap: '8px' }}>
            {left.map((c) => (
              <Tile key={c.slug} src={c.img} alt={c.name} slug={c.slug} />
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
              gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
              gap: '8px',
              alignSelf: 'start',
            }}
          >
            {middle.map((c) => (
              <figure key={c.slug} style={{ width: '100%', height: '100%', margin: 0 }}>
                <a
                  href={`/communities/${c.slug}`}
                  style={{
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
                </a>
              </figure>
            ))}
          </div>

          {/* RIGHT — scrolls */}
          <div style={{ gridColumn: 'span 4 / span 4', display: 'grid', gap: '8px' }}>
            {right.map((c) => (
              <Tile key={c.slug} src={c.img} alt={c.name} slug={c.slug} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
