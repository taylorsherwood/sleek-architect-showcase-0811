# Focused cleanup without SEO or behavior changes

## Confirmed findings
- **Three unused components:** `Portfolio.tsx`, `Services.tsx`, and `BlogCTA.tsx` have no import references in the app, scripts, or configuration. Two contain leftover architecture-template content. They add maintenance clutter, not current visitor download weight.
- **Duplicated brokerage logo band:** the shared footer and private-seller page repeat the same two images, dimensions, and spacing. Changes currently require two edits, which risks inconsistent presentation.
- **Large multi-purpose files:** the homepage below-fold file is 1,616 lines; Land & Ranch is 1,830 lines. Keeping unrelated sections together increases the work and regression risk of small changes. Article collections are long because they contain actual editorial content, not disposable junk.
- **Limited regression coverage:** the existing test file covers statistics; the post-build SEO check covers metadata on eight routes, but not article body completeness. Cleanup needs a before/after content comparison to protect Google and AI readability.

## Ordered cleanup
1. **Delete only the three confirmed unused components.** Keep their image assets unless separately proven unused. Confirm no surviving imports; run existing statistics tests and check homepage, Sell, and a blog post in the preview.
2. **Share the brokerage logo band.** Preserve each page's existing background, transparent images, sizing, spacing, text alternatives, and position. Check both footer versions at desktop and phone widths against baseline screenshots.
3. **Split the homepage below-fold sections into focused files.** Move code without changing content, exported interfaces, section order, loading timing, or interactions. Start with this file only; defer the larger land pages. Check homepage search, testimonials, contact controls, and footer before moving on.

Each step leaves the app working and is checked before the next step. No rewrite, dependency updates, or design changes.

## SEO and AI safeguards
- Preserve all article text, titles, headings, links, routes, aliases, canonical URLs, FAQs, author details, schema, sitemap entries, and AI index files.
- Compare page content and structured data before/after on the homepage, Sell, private-seller page, and a representative article.
- Keep prerendering and lazy-loading behavior intact; use the automatic build and existing post-build SEO verifier.
- Do not remove content merely to reduce line count or file size.

## Separate findings, not included in this cleanup
- The private-seller form ignores the submitter's failure result and still navigates to its thank-you page. That can make an unsuccessful inquiry look successful. Changing it requires a separate behavior fix and failure-path test.
- Security results are stale. The latest available storage result flags public file listing in `listing-media` as informational; available dependency results report no findings but are dated October 16. There is no recent full-app deep scan. Run a scan from the Security tab for a current assessment. No security or package changes are proposed here.

## Scope
Only the approved cleanup steps above. Application code and dependencies remain unchanged until approval.
