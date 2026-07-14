# Assets — what to replace and with what

Every file marked **PLACEHOLDER** below should eventually be replaced with a real asset.
Keep the same file name (or update the matching `src` in the HTML).

| File | Status | Replace with | Recommended size |
|---|---|---|---|
| `logo-big.png` | ✅ real | — (big ZMAN wordmark, transparent bg) | as provided |
| `logo-small.png` | ✅ real | — (small ZMAN wordmark, transparent bg) | as provided |
| `logo-mark.png` | ✅ real | auto-cropped wordmark used in header/hero (regenerate if the logo changes) | tight crop, ~1000 px wide |
| `logo-og.png` | ✅ real | social-share image (white bg). Optionally replace with a designed 1200×630 banner | 1200×630 px |
| `favicon.svg` | PLACEHOLDER | a proper app-icon favicon (rounded square + logo) | SVG, or 32/180/512 px PNGs |
| `phone-mockup.png` | ✅ real | device-framed home-screen mockup shown in the hero (transparent background) | 1530×3036 px PNG |
| `screenshots/lesson1.png`, `lesson3.png`, `achievements.png`, `leaderboard.png` | ✅ real | real app screenshots shown in the carousel | 1290×2796 px PNG |
| `badge-google-play.svg` | PLACEHOLDER | the **official** "Get it on Google Play" badge (required by Google's brand rules once live) | official asset |
| `badge-app-store.svg` | PLACEHOLDER | the **official** "Download on the App Store" badge (required by Apple's brand rules once live) | official asset |

Official badge sources:

- Google Play: https://play.google.com/intl/en_us/badges/
- App Store: https://developer.apple.com/app-store/marketing/guidelines/

Notes:

- Screenshots are shown ~230 px wide on the site, so compressed WebP around 100–200 KB each is plenty.
- The store buttons on the site are currently rendered in HTML/CSS (so their text can switch language) with a "coming soon" state. When the app is live you can either paste real links into those buttons (see `TODO` comments in `index.html`) or swap them for the official badge images above.
- Safari doesn't support SVG favicons; when you have a final app icon, add PNG fallbacks (32×32 and a 180×180 `apple-touch-icon`).
