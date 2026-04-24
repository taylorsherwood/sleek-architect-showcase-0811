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
    <main style={{ backgroundColor: '#0C0F24' }}>
      {/* INTRO — full-screen hero with grid backdrop, sticky behind the gallery */}
      <div className="sticky-wrapper">
        <section
          style={{
            color: 'white',
            height: '100vh',
            width: '100%',
            backgroundColor: '#0C0F24',
            display: 'grid',
            placeContent: 'center',
            position: 'sticky',
            top: 0,
            overflow: 'hidden',
          }}
        >
          {/* grid backdrop */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(to right, rgba(186,162,106,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(186,162,106,0.10) 1px, transparent 1px)',
              backgroundSize: '54px 54px',
              maskImage:
                'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
            }}
          />
          <div style={{ position: 'relative', padding: '0 32px', textAlign: 'center' }}>
            <p
              style={{
                color: '#BAA26A',
                fontFamily: 'Cinzel, serif',
                fontSize: '12px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              Featured Communities
            </p>
            <h2
              style={{
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                fontFamily: 'Cinzel, serif',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                color: 'white',
                margin: 0,
              }}
            >
              Where Austin&apos;s Best <br />
              Real Estate Lives <br />
              <span style={{ color: '#BAA26A' }}>Scroll down 👇</span>
            </h2>
          </div>
        </section>
      </div>

      {/* GALLERY — 3-column grid; middle column is sticky */}
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

      {/* OUTRO — gradient wordmark, like the reference */}
      <footer style={{ backgroundColor: '#0C0F24', position: 'relative' }}>
        <h2
          style={{
            fontSize: '16vw',
            transform: 'translateY(80px)',
            lineHeight: 1,
            textTransform: 'uppercase',
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(to right, #BAA26A, #5a4a2a)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            margin: 0,
          }}
        >
          Echelon
        </h2>
        <div
          style={{
            backgroundColor: '#000',
            height: '160px',
            position: 'relative',
            zIndex: 10,
            display: 'grid',
            placeContent: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Jost, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            borderTopLeftRadius: '9999px',
            borderTopRightRadius: '9999px',
          }}
        >
          <a href="/communities" style={{ color: '#BAA26A', textDecoration: 'none' }}>
            View all communities →
          </a>
        </div>
      </footer>
    </main>
  );
}
