# alekslaketa.com

My site: [alekslaketa.com](https://alekslaketa.com), in Slovenian at `/sl/` and English at `/en/`. Plain HTML, CSS and a little vanilla JavaScript, no framework, no build step on Cloudflare.

## Layout

- `sl/` and `en/`: the home page plus three example pages (`obrtniki`, `saloni`, `trgovine`), one `index.html` each
- `_redirects`: `/` goes to `/sl/`
- `_headers`: security headers (CSP, HSTS, no framing, nosniff) and caching
- `404.html`: bilingual not-found page (`not_found_handling` in `wrangler.jsonc`)
- `sitemap.xml` + `robots.txt`: every page in both languages, with hreflang alternates
- The pages are generated from bilingual design sources kept outside this repo. Each language gets its own URL, so the language switch is a plain link and search engines see both versions (`hreflang`).
- The previous one-page site (Aug 2026) is kept under the git tag `old-site-2026-08`.

## Stack

- Static HTML/CSS, deliberately no framework for something this small. The "what happens at night" example plays as you scroll (sticky section driven by scroll position, reversible)
- Hosted on **Cloudflare Workers** (static assets only, no Worker code; see `wrangler.jsonc`), git-connected. A push to `main` deploys; every other branch gets a preview URL
- DNS, TLS, and the `www` → apex redirect all run through Cloudflare
- `hello@alekslaketa.com` on Proton Mail, with MX/SPF/DKIM/DMARC configured on the same Cloudflare zone

## Assets

- `assets/mark.svg`: the abstract "AL" monogram, used as the background watermark
- `assets/mark-signature.png`: a solid-opacity raster version of the same mark, for the email signature (SVG isn't reliably supported in mail clients)
- `assets/helping.jpg`: hero photo (bit summit Hamburg workshop, Sep 2026); `assets/p30.jpg`: the talk photo
- `assets/og-sl.png` / `assets/og-en.png`: 1200×630 social previews
- `assets/*.webp`: the same photos as WebP (about a third of the size), served first via `<picture>`
- `assets/fonts/`: Archivo and Hanken Grotesk, self-hosted, so no visitor data goes to Google
- `assets/js/`: one small script per page (the scroll example); no inline scripts, so the CSP can forbid them

## Deploy

Push to `main`. Cloudflare Workers Builds runs `wrangler deploy` with `wrangler.jsonc` and the site is live within a minute. Other branches run `wrangler versions upload` and get a preview URL.
