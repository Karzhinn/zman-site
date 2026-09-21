# ZMAN — marketing & legal site

Bilingual (Sorani Kurdish ⇄ English) static website for **ZMAN**, the free English-learning app for Sorani Kurdish speakers. Plain HTML/CSS/JS — no framework, no build step — served by GitHub Pages.

**Live site:** https://karzhinn.github.io/zman-site/

## Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/zman-site/` | Landing page (hero, about, features, screenshots, download, contact) |
| `guide.html` | `/zman-site/guide.html` | User guide — sign up, sign in (Google/Apple/email), password reset, username, sign out, account deletion, FAQ |
| `privacy.html` | `/zman-site/privacy.html` | Privacy Policy (**DRAFT placeholders** — final text pending) |
| `terms.html` | `/zman-site/terms.html` | Terms of Service (**DRAFT placeholders** — final text pending) |
| `admin/` | `/zman-site/admin/` | Content admin (Sveltia CMS) for the top alert bar — see below |
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

## Content admin — the top alert bar (Sveltia CMS)

Every page can show a **site-wide alert bar** at the very top (announcements, status, issues, updates). Its content lives in [`content/alerts.json`](content/alerts.json) and is rendered by `script.js`. You edit it through **Sveltia CMS** at `/zman-site/admin/` — no code, just a form. When there is no active alert the bar stays hidden.

Each alert has: an **ID**, an **on/off** toggle (`active`), a **type** (info = indigo, success = green, warning = orange, critical = red), a **dismissible** toggle, a **Kurdish** and **English** message, and an optional **link** (URL + Kurdish/English label). Keep just one active at a time for the cleanest look.

Two behaviours to know:
- **Dismissing** is remembered per-visitor in their browser (`localStorage`). To make an updated message reappear for people who already closed the old one, **change its ID**.
- The site fetches the JSON fresh on each load; GitHub Pages' CDN can cache it for a few minutes, so a change may take a short while to appear for everyone.

### How to edit the alerts

**Option A — locally, no account or token needed (Chrome or Edge):**
1. Run a local server from the project root: `npx serve .`
2. Open `http://localhost:3000/admin/` (use whatever port `serve` prints).
3. Click **Work with Local Repository** and pick this project folder.
4. Edit under **Site content → Alerts / status bar** and save. Your change writes straight to `content/alerts.json` on disk — then `git commit` and `git push` to publish.

**Option B — from anywhere, with a GitHub token (recommended, no server to run):**
1. On GitHub: **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**. Give it access to **only the `Karzhinn/zman-site` repository**, with **Repository permissions → Contents: Read and write**. Copy the token.
2. Go to `https://karzhinn.github.io/zman-site/admin/` and click **Sign In Using Access Token**, paste the token.
3. Edit and **Publish** — Sveltia commits to `main` for you, and the live site updates after the Pages rebuild (~1 min). The token is stored only in your browser.

**Option C — polished one-click GitHub login (optional).** If you'd rather click "Sign In with GitHub" than paste a token, deploy the free [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) Cloudflare Worker, create a GitHub OAuth App pointing its callback at the worker, and set `base_url` in [`admin/config.yml`](admin/config.yml) to the worker URL. Options A and B need none of this.

> The `base_url` placeholder in `admin/config.yml` only affects the "Sign In with GitHub" button. Local editing and access-token sign-in work without touching it.

## Things left to fill in (search the code for `TODO`)

1. **Store links** — the **App Store** button is live (iOS launched). **Google Play** is still a `<span class="store-btn is-coming-soon">` placeholder (hero + download section) — swap it for a real `<a class="store-btn" href="…">` link and delete its `soon-pill` when the Android app ships.
2. **Direct APK / beta link** — a commented-out button sits in the download section.
3. **Real screenshots** — replace the SVGs in `assets/screenshots/` (see `assets/README.md`).
4. **Phone mockup & favicon & store badges** — see `assets/README.md`.
5. **Final legal text** — replace the DRAFT placeholders in `privacy.html` and `terms.html`, then remove the draft banner and the `draft-chip` spans.
6. **Guide wording vs. the real app** — `guide.html` has a `TODO` at the top: once the app UI is final, make the button/screen names in the steps match word-for-word what users actually see.
7. **OG/social URLs** — if you rename the repo or add a custom domain, update the `og:` meta tags in `index.html` and the absolute `/zman-site/` links in `404.html`.

## Deployment (GitHub Pages)

The site deploys from the `main` branch, root folder. After any push to `main`, GitHub Pages republishes automatically in ~1 minute. To (re)configure:

1. Open the repo on GitHub → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → Source: **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.

`.nojekyll` is committed so GitHub serves files as-is (no Jekyll processing).

### Custom domain (later)

On the same **Settings → Pages** screen, enter your domain under **Custom domain** — GitHub then commits a `CNAME` file to the repo. Point your DNS at GitHub Pages (CNAME record → `karzhinn.github.io`), and afterwards update the absolute URLs mentioned in item 6 above.
