# Project architecture
- Keep editorial posts in the existing blog data collections and use BlogContent blocks for tables, callouts, CTAs, and FAQs so index, prerender, and schema consumers share the same content.
- Scope specialized table presentation and expandable FAQs to the requesting article; preserve existing articles' rendering defaults.
- Keep current neighborhood price summaries in `src/data/neighborhoodStats.ts` and render them through its formatters and `NeighborhoodMedian`; missing verified values are hidden, preventing unsourced duplicates across pages.
- Render statistic-counter values as final, stable DOM text from the first render; do not mutate numeric text after mount, so crawlers and accessible output agree.
- Use literal relative asset paths with `new URL(..., import.meta.url)`, not the `@/` import alias, so browser URL resolution and Vite asset rewriting work in both development and production.