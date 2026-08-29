# alekslaketa.com

Static one-page landing site. No build step — `index.html` is the whole site.

## Assets

- `assets/mark.svg` — cleaned monogram (background square stripped out), used inline as the large background watermark
- `assets/headshot-bw.png` — currently used in the hero
- `assets/headshot-color.png` — alternate, not currently used; swap in if black-and-white doesn't stick

## To-dos before this is "real"

- [ ] Swap the placeholder `mailto:hello@alekslaketa.com` once Proton Mail is wired up on the domain (marked `TODO`)

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub under the `0Aleksander` org.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → connect this repo.
3. Build settings: none — framework preset "None", build command empty, output directory `/`.
4. Add `alekslaketa.com` as a custom domain on the Pages project (DNS is already on Cloudflare, so this is automatic).
