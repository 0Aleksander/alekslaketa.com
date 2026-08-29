# alekslaketa.com

Static one-page landing site. No build step — `index.html` is the whole site.

## Assets

- `assets/mark.svg` — cleaned monogram (background square stripped out), used inline as the large background watermark
- `assets/headshot-bw.png` — currently used in the hero
- `assets/headshot-color.png` — alternate, not currently used; swap in if black-and-white doesn't stick
- `assets/og-image.png` — 1200×630 social preview card (Open Graph / Twitter), generated to match the site's palette and the site's monogram mark

## To-dos before this is "real"

- [ ] Swap the placeholder `mailto:hello@alekslaketa.com` once Proton Mail is wired up on the domain (marked `TODO`)
- [ ] Cloudflare DNS: add a `CNAME` record, name `www`, target `alekslaketa.com`, proxied — currently `www.alekslaketa.com` doesn't resolve
- [ ] Cloudflare Rules → Redirect Rules: 301 `www.alekslaketa.com/*` → `https://alekslaketa.com/$1` (avoids duplicate-content across the two hosts once `www` resolves)
- [ ] Cloudflare SSL/TLS → Overview: set encryption mode to Full (or Full strict if the origin has a valid cert)
- [ ] Cloudflare SSL/TLS → Edge Certificates: enable "Always Use HTTPS" — plain `http://` currently returns 200 instead of redirecting
- [ ] After deploy, re-scrape the OG preview via LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) so the cached preview isn't stale/blank the first time the link is shared

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub under the `0Aleksander` org.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → connect this repo.
3. Build settings: none — framework preset "None", build command empty, output directory `/`.
4. Add `alekslaketa.com` as a custom domain on the Pages project (DNS is already on Cloudflare, so this is automatic).

Pages is git-connected, so a push to `main` triggers an automatic rebuild/redeploy — no manual redeploy step needed once the project is connected as above.
