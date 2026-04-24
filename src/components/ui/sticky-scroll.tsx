'use client';

import { Link } from 'react-router-dom';
import { communityPages } from '@/data/communityData';

// Curated list of marquee Austin communities (real data, real /communities/[slug] links).
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
    <section className="relative w-full bg-[#0C0F24]">
        <div className="flex w-full">
          {/* LEFT — sticky panel (desktop only) */}
          <div className="sticky top-0 hidden lg:flex h-screen w-5/12 flex-col justify-center px-12 xl:px-16 shrink-0">
            <p className="text-[#BAA26A] font-cinzel text-xs tracking-[0.4em] uppercase mb-6">
              Featured Communities
            </p>
            <h2 className="text-white font-cinzel text-3xl xl:text-4xl leading-tight mb-6">
              Where Austin's Best Real Estate Lives
            </h2>
            <p className="text-gray-400 font-jost font-light text-sm leading-relaxed mb-8 max-w-md">
              From Lake Austin waterfront to Westlake hilltop estates. Every neighborhood, curated.
            </p>
            <div className="w-12 h-px bg-[#BAA26A]" />
            <p className="text-[#BAA26A] font-jost text-xs mt-12 tracking-widest">
              Scroll to explore →
            </p>
            <Link
              to="/communities"
              className="mt-6 inline-block text-white font-jost text-xs tracking-[0.2em] uppercase border-b border-[#BAA26A]/40 pb-1 self-start hover:text-[#BAA26A] transition-colors"
            >
              View All Communities
            </Link>
          </div>

          {/* MOBILE header */}
          <div className="lg:hidden w-full px-6 pt-20 pb-10 text-center">
            <p className="text-[#BAA26A] font-cinzel text-[11px] tracking-[0.4em] uppercase mb-4">
              Featured Communities
            </p>
            <h2 className="text-white font-cinzel text-2xl leading-tight mb-4">
              Where Austin's Best Real Estate Lives
            </h2>
            <div className="w-10 h-px bg-[#BAA26A] mx-auto" />
          </div>

          {/* RIGHT — scrolling cards */}
          <div className="w-full lg:w-7/12">
            {communities.map((c) => (
              <div
                key={c.slug}
                className="min-h-[80vh] lg:min-h-screen flex items-center py-12 lg:py-20 px-6 lg:px-12"
              >
                <div className="w-full">
                  <Link to={`/communities/${c.slug}`} className="group block">
                    <div className="relative overflow-hidden">
                      <img
                        src={c.img}
                        alt={`Luxury homes in ${c.name}, Austin`}
                        className="w-full h-[360px] lg:h-[420px] object-cover rounded-sm transition-transform duration-[900ms] ease-out group-hover:scale-[1.015]"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute top-4 right-4 bg-[#0C0F24] text-[#BAA26A] font-cinzel text-xs tracking-widest px-3 py-1 border border-[#BAA26A]/60">
                        {c.price}
                      </span>
                    </div>
                    <h3 className="text-white font-cinzel text-2xl mt-6 group-hover:text-[#BAA26A] transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-gray-400 font-jost font-light text-sm mt-2 line-clamp-2 max-w-xl">
                      {c.desc}
                    </p>
                    <span className="text-[#BAA26A] font-jost text-sm mt-4 inline-block tracking-wide group-hover:text-white transition-colors">
                      Explore Neighborhood →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
