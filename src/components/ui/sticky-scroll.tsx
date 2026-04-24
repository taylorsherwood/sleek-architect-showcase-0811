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
] as const;

const bySlug = new Map(communityPages.map((c) => [c.slug, c]));

const communities = FEATURED_SLUGS
  .map((slug) => bySlug.get(slug))
  .filter((c): c is (typeof communityPages)[number] => Boolean(c?.image))
  .map((c) => ({
    name: c.name,
    price: c.priceRange,
    desc:
      c.metaDescription ||
      c.overview?.replace(/\n+/g, ' ').slice(0, 120) ||
      `Explore homes for sale in ${c.name}, Austin.`,
    img: c.heroImage || c.image,
    slug: c.slug,
  }));

export default function StickyScroll() {
  return (
    <section style={{ display: 'flex', alignItems: 'flex-start', backgroundColor: '#0C0F24' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '40%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 64px',
          flexShrink: 0,
        }}
      >
        <p
          style={{
            color: '#BAA26A',
            fontSize: '11px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontFamily: 'Cinzel',
            marginBottom: '24px',
          }}
        >
          Featured Communities
        </p>

        <h2
          style={{
            color: 'white',
            fontSize: '36px',
            fontFamily: 'Cinzel',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}
        >
          Where Austin&apos;s Best Real Estate Lives
        </h2>

        <p
          style={{
            color: '#9CA3AF',
            fontSize: '14px',
            fontFamily: 'Jost',
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: '32px',
          }}
        >
          From Lake Austin waterfront to Westlake hilltop estates. Every neighborhood, curated.
        </p>

        <div style={{ width: '48px', height: '1px', backgroundColor: '#BAA26A' }} />
      </div>

      <div style={{ width: '60%' }}>
        {communities.map((c, i) => (
          <div
            key={i}
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              padding: '80px 64px',
            }}
          >
            <div style={{ width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={c.img}
                  alt={c.name}
                  style={{
                    width: '100%',
                    height: '420px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                  loading="lazy"
                  decoding="async"
                />

                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: '#0C0F24',
                    color: '#BAA26A',
                    fontFamily: 'Cinzel',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    padding: '6px 14px',
                  }}
                >
                  {c.price}
                </span>
              </div>

              <h3
                style={{
                  color: 'white',
                  fontFamily: 'Cinzel',
                  fontSize: '24px',
                  marginTop: '24px',
                }}
              >
                {c.name}
              </h3>

              <p
                style={{
                  color: '#9CA3AF',
                  fontFamily: 'Jost',
                  fontWeight: 300,
                  fontSize: '14px',
                  marginTop: '8px',
                }}
              >
                {c.desc}
              </p>

              <a
                href={`/communities/${c.slug}`}
                style={{
                  color: '#BAA26A',
                  fontFamily: 'Jost',
                  fontSize: '13px',
                  marginTop: '16px',
                  display: 'inline-block',
                  letterSpacing: '0.1em',
                }}
              >
                Explore Neighborhood →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
