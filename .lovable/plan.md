## Goal

Stop treating `/land-ranch/hill-country-ranches` as a market report. Reauthor it as a land acquisition experience that puts Taylor Sherwood at the center, leads with imagery and motion, and exposes one proprietary "how we evaluate land" moment that no other page on the site has.

Brand system stays locked: ivory `#F5F3EF` / `#FAFAF8`, navy `#0C0F24`, gold `#b9a06c`, Cinzel + Jost. No new colors, no new fonts.

## New page narrative (top to bottom)

```text
1  Cinematic hero               full-bleed video, single line: "The most valuable
                                land in Texas rarely trades publicly."
2  Advisor anchor                Taylor portrait, signature, one sentence of
                                positioning, single CTA. Replaces "Market Overview".
3  Opportunity reel              5 horizontal full-bleed editorial cards
                                (Legacy · Live Water · Recreational · Investment ·
                                Off-Market) on dark navy ground. Image-led.
4  Signature evaluation          PROPRIETARY block: "The Six Lenses".
                                Water · Access · Exemptions · Topography ·
                                Feasibility · Position. Interactive vertical
                                stepper — hover/scroll reveals advisor commentary
                                on each lens. This is the page's memorable moment.
5  Regional map                  Kept. Reframed as "Where we operate" with a
                                single short caption, no surrounding text grid.
6  Quiet lifestyle frame         One large editorial image + one Cinzel pull
                                quote. No paragraph stack.
7  Off-market access CTA         Navy band, gold rule, one CTA to /off-market.
8  Adjacent markets              Kept, slimmed to a clean 4-up row.
```

Removed entirely from this slug only (still live for other markets):
- Buyer/Seller Market Balance gauge (reads like a report)
- Market Overview prose + bullet list
- By-the-numbers stats grid inside `HillCountryTopEnhancements`
- "Three ways buyers acquire" category grid inside `HillCountryTopEnhancements`
  (replaced by Opportunity Reel, which covers the same idea with imagery)

## What gets built

**New components (Hill Country only):**

- `HillCountryHero` — full-bleed cinematic video, single headline, single eyebrow, no buttons. Replaces the shared market hero on this slug.
- `HillCountryAdvisorAnchor` — Taylor portrait left, short positioning + signature CTA right. Asymmetric, off-center.
- `HillCountryOpportunityReel` — horizontal scroll-snap row of 5 dark editorial cards on navy. Image-forward, gold eyebrow, one-line title, single thin gold rule, no body copy.
- `HillCountrySixLenses` — the signature section. Vertical stepper with sticky left column ("How we read a tract of land · The Six Lenses") and right column listing all six lenses with advisor commentary. Numbered 01-06, gold rule under each, hover lifts the active lens.
- `HillCountryLifestyleQuote` — large image + Cinzel pull quote, no surrounding paragraphs.

**Reused:**
- `LandRanchMap` (rewrapped with single caption)
- Existing Featured Opportunities CTA band
- Existing Related Markets row
- Existing navigation, footer, schema, SEO head

**Edited:**
- `src/pages/LandRanchMarket.tsx` — for `slug === "hill-country-ranches"`, render a new `<HillCountryExperience />` instead of the shared template (hero, balance gauge, overview, agent intel, property types, why buyers, lifestyle, all skipped on this slug). Other markets unchanged.
- `src/components/land-ranch/HillCountryEnhancements.tsx` — delete the by-the-numbers and ownership-categories blocks; keep the parallax/video and map wrappers if still needed, otherwise fold into the new experience component.

## Motion & interaction

- Hero video continues; copy fades in on top with a slow opacity ramp.
- Opportunity reel cards: subtle gold underline grows left-to-right on hover, image cross-fade scale 1.00 → 1.04 over 1200ms.
- Six Lenses: sticky-left layout; each lens row fades in on intersection, gold number scales from 0.96 → 1.
- No bounce, no spring, no flashy transitions — calm, editorial.

## Technical notes

- All sections respect the global vertical rhythm spacers (`h-12 md:h-20`).
- All gold elements use `#b9a06c` at 100% opacity, no gradients.
- Headings stay strictly H1 → H2 → H3. Only the hero gets H1.
- All images `object-fit: cover`. Mobile collapses the sticky stepper to a stacked list.
- No new dependencies. No backend changes.
- SEO meta, schema markup, breadcrumb schema all preserved from the existing page.

## Out of scope

- Other `/land-ranch/*` market pages
- Copy rewrites beyond what the new sections require
- New imagery beyond what already exists in `src/assets`
- Typography or color system changes