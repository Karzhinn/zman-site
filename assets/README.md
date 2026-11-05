# Assets — brand v2.0

Everything here comes from the v2 rebrand kit (`websudo/zman rebrand/`) or the app's
own store assets (`ZMANX-main/store_assets/`). Don't redraw or recolour the logo —
see the brand guidelines ("Using the logo"): never rotate the mark, recolour the dot,
colour the stroke, stretch it, or set the name in another font.

| File | Source | Used for |
|---|---|---|
| `brand/lockup-kurdish-light.svg` / `-dark.svg` | `01 Logo/svg/zman-lockup-kurdish-*.svg` | Header + footer logo when the page is in Kurdish |
| `brand/lockup-latin-light.svg` / `-dark.svg` | `01 Logo/svg/zman-lockup-latin-*.svg` | Header + footer logo when the page is in English |
| `brand/app-icon.svg` | `02 App icon/svg/zman-ios-icon-default-preview-rounded.svg` | Download card, 404 page |
| `favicon.svg` | same as `app-icon.svg` | Browser tab icon |
| `apple-touch-icon.png` | `02 App icon/png/zman-ios-icon-default-1024.png`, resized to 180×180 | iOS "Add to Home Screen" |
| `og.png` | `ZMANX-main/store_assets/feature_graphic_1024x500.png` | Social-share preview (`og:image`) |
| `brand/badge-app-store.svg` | Apple: developer.apple.com/assets/elements/badges/download-on-the-app-store.svg (official, unaltered) | Hero + store listing cards |
| `brand/badge-google-play.png` | Google: play.google.com/intl/en_us/badges/ (official `en_badge_web_generic.png`, transparent padding trimmed only) | Hero + store listing cards |
| `brand/qr-app-store.svg`, `brand/qr-google-play.svg` | Generated: `npx qrcode -t svg -e M -m 1 -d 17171FFF -l FFFFFFFF -o <file> <store url>` | Store listing cards (desktop only) |
| `shots/*.jpg` | `ZMANX-main/store_assets/screenshots/appstore_1179x2556/*.png`, resized to 640 px wide, JPEG q86 | Hero phone + screenshots carousel |

`-light` lockups sit on light backgrounds (Ink tile); `-dark` lockups are for dark
backgrounds — the mark drops its tile there, per the guidelines. Each page swaps
them automatically with `prefers-color-scheme`, and swaps Kurdish/Latin with the
language toggle (`.logo-ku` / `.logo-en`).

## Updating screenshots

When the app's store screenshots change, re-export from
`ZMANX-main/store_assets/screenshots/appstore_1179x2556/` at 640 px wide and keep the
same file names in `shots/` (`home`, `home-dark`, `welcome`, `lesson`, `correct`,
`progress`, `badges`, `library`, `phrasebook`). `home.jpg` / `home-dark.jpg` are the
hero phone in light / dark mode.

## Store badges

Use the official badges as-is: never recolour, redraw, crop the artwork itself, or change the text. Show them at the same height side by side (52 px on this site).
