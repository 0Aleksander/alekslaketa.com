# alekslaketa.com

My personal landing page — [alekslaketa.com](https://alekslaketa.com). Plain HTML and CSS, no framework, no build step, no JavaScript dependencies. `index.html` is the whole site.

## Stack

- Static HTML/CSS — one file, deliberately no framework for something this small
- Hosted on **Cloudflare Pages**, git-connected — a push to `main` triggers an automatic rebuild and redeploy, no manual deploy step
- DNS, TLS, and the `www` → apex redirect all run through Cloudflare
- `hello@alekslaketa.com` on Proton Mail, with MX/SPF/DKIM/DMARC configured on the same Cloudflare zone

## Assets

- `assets/mark.svg` — the abstract "AL" monogram, used as the background watermark
- `assets/mark-signature.png` — a solid-opacity raster version of the same mark, for the email signature (SVG isn't reliably supported in mail clients)
- `assets/headshot-bw.png` / `assets/headshot-color.png` — the hero photo, black-and-white currently in use
- `assets/og-image.png` — 1200×630 social preview card for link previews on LinkedIn/Twitter, matching the site's palette and mark

## Deploy

1. Push to `main` on this repo.
2. Cloudflare Pages picks it up automatically (project already connected — Workers & Pages → this repo, framework preset "None", no build command, output directory `/`) and redeploys within seconds.

That's the whole pipeline — no CI config, no build artifacts, nothing else to maintain.
