# alekslaketa.com

Static one-page landing site. No build step — `index.html` is the whole site.

## Assets

- `assets/mark.svg` — cleaned monogram (background square stripped out), used inline as the large background watermark
- `assets/headshot-bw.png` — currently used in the hero
- `assets/headshot-color.png` — alternate, not currently used; swap in if black-and-white doesn't stick
- `assets/og-image.png` — 1200×630 social preview card (Open Graph / Twitter), generated to match the site's palette and the site's monogram mark

## To-dos before this is "real"

- [x] `mailto:hello@alekslaketa.com` — live on Proton Mail (Unlimited plan). MX, SPF, DKIM (3x CNAME), and DMARC records confirmed resolving correctly on Cloudflare; end-to-end send/receive verified against Gmail.
- [x] Cloudflare DNS: `CNAME` record, name `www`, target `alekslaketa.com`, proxied — confirmed resolving via public DNS (1.1.1.1, 8.8.8.8, and Cloudflare's own authoritative NS)
- [x] Cloudflare Rules → Redirect Rules: 301 `www.alekslaketa.com/*` → `https://alekslaketa.com/$1` (deployed via the "Redirect from WWW to root" template) — confirmed: `http://www` → 301 → `https://www` → 301 → `https://alekslaketa.com/` → 200
- [x] Cloudflare SSL/TLS → Overview: encryption mode is Full
- [x] Cloudflare SSL/TLS → Edge Certificates: "Always Use HTTPS" — confirmed, `http://alekslaketa.com` now 301s to `https://alekslaketa.com/`
- [ ] After deploy, re-scrape the OG preview via LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) so the cached preview isn't stale/blank the first time the link is shared

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub under the `0Aleksander` org.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → connect this repo.
3. Build settings: none — framework preset "None", build command empty, output directory `/`.
4. Add `alekslaketa.com` as a custom domain on the Pages project (DNS is already on Cloudflare, so this is automatic).

Pages is git-connected, so a push to `main` triggers an automatic rebuild/redeploy — no manual redeploy step needed once the project is connected as above.
