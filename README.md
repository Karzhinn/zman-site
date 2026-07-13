# ZMAN — marketing & legal site

Bilingual (Sorani Kurdish ⇄ English) static website for **ZMAN**, the free English-learning app for Sorani Kurdish speakers. Plain HTML/CSS/JS — no framework, no build step — served by GitHub Pages.

**Live site:** https://karzhinn.github.io/zman-site/

## Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/zman-site/` | Landing page (hero, about, features, screenshots, download, contact) |
| `privacy.html` | `/zman-site/privacy.html` | Privacy Policy (**DRAFT placeholders** — final text pending) |
| `terms.html` | `/zman-site/terms.html` | Terms of Service (**DRAFT placeholders** — final text pending) |
| `404.html` | any missing URL | Redirects back to the home page |

## Preview locally

Just open `index.html` in a browser — everything works from the filesystem.
For a proper local server (nicer URLs), run one of:

```
python -m http.server 8000        # if Python is installed
npx serve .                       # if Node is installed
```

then open http://localhost:8000

## How the bilingual text works

- Kurdish (Sorani, RTL) is the default; the header globe button switches to English (LTR).
- Every translatable element carries `data-ku="…"` and `data-en="…"` attributes; `script.js` swaps `textContent`, flips `dir`/`lang` on `<html>`, and remembers the choice in `localStorage` (`zman-lang`).
- **To edit copy:** change BOTH the `data-ku` / `data-en` attributes *and* the visible text between the tags (the visible text is the no-JS/Kurdish default).
- Bilingual image alt text uses `data-alt-ku` / `data-alt-en`; aria-labels use `data-aria-ku` / `data-aria-en`.

## Things left to fill in (search the code for `TODO`)

1. **Store links** — `index.html` has two `TODO` comment blocks (hero + download section). When the app is published, replace the `<span class="store-btn is-coming-soon">` elements with real `<a class="store-btn" href="…">` links and delete the `soon-pill` spans.
2. **Direct APK / beta link** — a commented-out button sits in the download section.
3. **Real screenshots** — replace the SVGs in `assets/screenshots/` (see `assets/README.md`).
4. **Phone mockup & favicon & store badges** — see `assets/README.md`.
5. **Final legal text** — replace the DRAFT placeholders in `privacy.html` and `terms.html`, then remove the draft banner and the `draft-chip` spans.
6. **OG/social URLs** — if you rename the repo or add a custom domain, update the `og:` meta tags in `index.html` and the absolute `/zman-site/` links in `404.html`.

## Deployment (GitHub Pages)

The site deploys from the `main` branch, root folder. After any push to `main`, GitHub Pages republishes automatically in ~1 minute. To (re)configure:

1. Open the repo on GitHub → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → Source: **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.

`.nojekyll` is committed so GitHub serves files as-is (no Jekyll processing).

### Custom domain (later)

On the same **Settings → Pages** screen, enter your domain under **Custom domain** — GitHub then commits a `CNAME` file to the repo. Point your DNS at GitHub Pages (CNAME record → `karzhinn.github.io`), and afterwards update the absolute URLs mentioned in item 6 above.
