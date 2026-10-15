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

## Still to do

- **Google Play**: the store button is a "coming soon" state until the Android app is
  live — see the `TODO` in `index.html` (hero and Download section).
