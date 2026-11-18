# alekslaketa.com

My site: [alekslaketa.com](https://alekslaketa.com), in Slovenian at `/sl/` and English at `/en/`. Plain HTML, CSS and a little vanilla JavaScript, no framework, no build step on Cloudflare.

## Layout

- `sl/` and `en/`: the home page plus three example pages (`obrtniki`, `saloni`, `trgovine`), one `index.html` each
- `_redirects`: `/` goes to `/sl/` (Cloudflare Pages redirect file)
- The pages are generated from bilingual design sources kept outside this repo. Each language gets its own URL, so the language switch is a plain link and search engines see both versions (`hreflang`).
- The previous one-page site (Aug 2026) is kept under the git tag `old-site-2026-08`.

## Stack

- Static HTML/CSS, deliberately no framework for something this small. The "what happens at night" example plays as you scroll (sticky section driven by scroll position, reversible)
- Hosted on **Cloudflare Pages**, git-connected. A push to `main` triggers an automatic rebuild and redeploy, no manual deploy step
- DNS, TLS, and the `www` → apex redirect all run through Cloudflare
- `hello@alekslaketa.com` on Proton Mail, with MX/SPF/DKIM/DMARC configured on the same Cloudflare zone

## Assets

- `assets/mark.svg`: the abstract "AL" monogram, used as the background watermark
- `assets/mark-signature.png`: a solid-opacity raster version of the same mark, for the email signature (SVG isn't reliably supported in mail clients)
- `assets/helping.jpg`: hero photo (bit summit Hamburg workshop, Sep 2026); `assets/p30.jpg`: the talk photo
- `assets/og-sl.png` / `assets/og-en.png`: 1200×630 social previews
- `assets/headshot-*.png`, `assets/og-image.png`: from the previous site, kept so old links and the email signature don't break

## Deploy

1. Push to `main` on this repo.
2. Cloudflare Pages picks it up automatically (project already connected: Workers & Pages → this repo, framework preset "None", no build command, output directory `/`) and redeploys within seconds.

That's the whole pipeline: no CI config, no build artifacts, nothing else to maintain.
