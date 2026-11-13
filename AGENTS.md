# Project architecture
- Keep editorial posts in the existing blog data collections and use BlogContent blocks for tables, callouts, CTAs, and FAQs so index, prerender, and schema consumers share the same content.
- Scope specialized table presentation and expandable FAQs to the requesting article; preserve existing articles' rendering defaults.
- Keep current neighborhood price summaries in `src/data/neighborhoodStats.ts` and render them through its formatters and `NeighborhoodMedian`; missing verified values are hidden, preventing unsourced duplicates across pages.
- Render statistic-counter values as final, stable DOM text from the first render; do not mutate numeric text after mount, so crawlers and accessible output agree.
- Use literal relative asset paths with `new URL(..., import.meta.url)`, not the `@/` import alias, so browser URL resolution and Vite asset rewriting work in both development and production.
- Compose homepage below-fold content from eagerly imported focused section modules inside the existing lazy boundary; preserve loading timing and prerendered content.
- Use BrokerageLogoBand for shared and private-seller footer marks, with background variants defined in global CSS; keep logo presentation synchronized without page seams.
- Scope reference-inspired homepage presentation through homepage classes and the optional Navigation editorialHome prop so other routes keep their styling.
- Render the homepage neighborhood atlas as a responsive image grid without scroll pinning so every neighborhood link remains directly accessible.
