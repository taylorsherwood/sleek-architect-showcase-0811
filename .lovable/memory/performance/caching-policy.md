---
name: caching-policy
description: Cache-Control rules in public/_headers — note that Lovable's Cloudflare hosting does not honor Netlify-style _headers files
type: feature
---
The `public/_headers` file declares `Cache-Control: public, max-age=31536000, immutable` for hashed asset paths (`/assets/*`, `/static-assets/*`, `/images/*`, `/lovable-uploads/*`, `/videos/*`, `/fonts/*`, `/*.js`, `/*.css`) and shorter TTLs for HTML and config files.

**Important caveat:** Lovable's published hosting (Cloudflare-fronted) does NOT honor the Netlify-style `_headers` file. Live response headers show no `Cache-Control` set, which is what triggers the "Use efficient cache lifetimes" Lighthouse audit. The file is preserved for documentation and future portability, but actual cache control must be configured at the Cloudflare/hosting layer (out of scope for in-app code).

**Why:** Static asset URLs in this project are content-hashed by Vite (e.g., `index-CBAOFB_s.css`), so a long max-age would be safe — but the header isn't being applied by the host.

**How to apply:** Do not attempt to fix the cache-lifetime audit via code changes. Refer the user to hosting/CDN settings.
