# Maintaining the site

Notes for editing and deploying [uastro.eu](https://uastro.eu). The site is plain
HTML and one CSS file, with no build step: open a file, change the text, save,
commit, push. See [README.md](README.md) for what the initiative is about.

## Files

```
index.html            Homepage: full-width sections (hero, four directions,
                      plan, news, institutions, contact)
styles.css            One shared stylesheet (design system + layout)
CNAME                 Custom domain for GitHub Pages (uastro.eu)
plan/
  index.html          The Recovery Plan as a readable web page (full text,
                      table of contents, figures), generated from the
                      git-ignored Markdown source in assets/
institutions/
  index.html          Overview of the main astronomical institutions of
                      Ukraine, with profiles, an interactive map, and links
                      to the Leiden slides
facilities/
  index.html          Facilities and infrastructure: key telescopes and
                      instruments, grouped by domain (under construction)
war-impact/
  index.html          The impact of the war: people, infrastructure, funding,
                      energy, education, resilience (under construction)
projects/               Projects & communities that are part of the recovery
  space-radio/index.html  Space Radio for Ukraine (about, photos, downloads)
  astrosandbox/index.html AstroSandbox educational community
spotlight/              Broader Ukrainian astronomy & space (not the recovery)
  space-apps-kyiv/index.html  Space Apps Kyiv (NASA hackathon host)
news/
  eas2026/index.html      Full article: EAS 2026 special session SS43
  lviv2026/index.html     Full article: Lviv visit, April 2026
  lviv2025/index.html     Full article: Lviv letter of intent, October 2025
  leiden2025/index.html   Full article: Leiden meeting, June 2025
  _template/index.html    Copy this to create a new article (not published)
assets/
  analytics.js          Google Analytics (gtag.js) loader; measurement ID here
  favicon.svg           Site icon
  hero-space.jpg        Optimised hero background (2560px)
  hero-space-mobile.jpg Lighter hero background for small screens
  eas2026.png           EAS 2026 session photo (also the OG preview image)
  lviv-2026-*.jpg       Lviv 2026 photos (credit Inna Potapova, JASU)
  lviv-2025-*.jpg       Lviv 2025 photos (credit Valeriia Pinchuk, Mariia Seniak)
  leiden-2025.jpg       Leiden 2025 meeting photo (credit naor.studio)
  RecoveryPlanUkraine_EN.pdf   The Recovery Plan (PDF)
  plan/                 Figures used by the /plan/ web page (fig-01.png ...)
  slides-leiden-2025/   Presentation slides from the Leiden meeting (PDFs)
  projects/space-radio/ Space Radio for Ukraine files: logo, workshop photos,
                        instruction PDFs (EN/UA), software downloads
  institutions/         Photos for the institution cards, one per card id
                        (mao.jpg, ira.jpg, knu-obs.jpg ...); credited on the page
```

Each news article lives at its own permanent URL (`uastro.eu/news/<slug>/`), so
it can be cited and linked directly. The homepage shows a teaser (date, headline,
photo, first paragraph) linking to the full article.

The hero background is derived from a large source image (`background.png`,
git-ignored); the served copies are `hero-space.jpg` (2560px) and
`hero-space-mobile.jpg` (1280px). To refresh them, resize a new source to about
those widths and overwrite the two files.

## Editing copy and design

- **Change text:** edit it directly in `index.html` (or an article's
  `news/<slug>/index.html`). Each section is marked with a comment.
- **Adjust colours / width / fonts:** edit the variables at the top of
  `styles.css` (`--accent`, `--space`, `--paper`, `--container`, `--serif`, and
  so on). All pages share this one stylesheet.

### Layout: full-width sections ("bands")

The pages are built from full-width **bands**. Each band's background runs edge to
edge, and its content sits in a centred `.container` (max ~1180px). Background
variants alternate so sections read as distinct zones: `band-light` (off-white),
`band-tint` (warm tint), `band-dark` (deep sky).

To add a new section, drop this skeleton inside `<main>` and give it an `id` so
the nav can link to it:

```html
<section id="my-section" class="band band-tint">
  <div class="container">
    <h2 class="rule">Section title</h2>
    <p class="section-intro">One or two lines introducing the section.</p>
    <!-- content -->
  </div>
</section>
```

Inside the container you can reuse the layout helpers: `grid-4` (four columns),
`cards` (responsive card grid), `split` (two columns, text and media). All
collapse to one column on mobile. Add the section to the nav by copying a link
into the `.nav` of every page's top bar.

## Common tasks

### Add a news item

1. Copy `news/_template/` to `news/<slug>/` — a short lowercase slug, e.g.
   `news/kyiv2027/`. The article's URL becomes `https://uastro.eu/news/<slug>/`.
2. Open the new `index.html` and replace every ALL-CAPS placeholder (title, date,
   text, photo, links, citation line). Put any photo in `assets/` first.
3. Add a teaser to the top of the News section in the homepage `index.html`: copy
   an existing `<article class="card">` block and update the date, headline link,
   photo, and first paragraph.

The `_template` folder itself is not published (GitHub Pages skips folders that
start with an underscore).

### Add a project

Projects are joint initiatives under the umbrella of the Recovery of Ukrainian
Astronomy. Each has its own page and a card in the homepage Projects band.

1. Create `projects/<slug>/index.html` — copy `projects/space-radio/index.html`
   as the pattern: a dark title band (name, one-line summary, key actions), an
   About section (`split` with the project logo), a photo `gallery`, and a
   `cards` row for documents / downloads / partners.
2. Put the project's files in `assets/projects/<slug>/` (resize photos to about
   1600px wide).
3. Add a card for it in the `PROJECTS` section of the homepage `index.html`.

### Update the Recovery Plan

- **Web page:** `plan/index.html` is generated from the Markdown export of the
  plan (`assets/RecoveryPlanUkraine_EN.md`, kept out of git). For small wording
  fixes, edit `plan/index.html` directly. For a new revision, replace the Markdown
  and regenerate: figures live in `assets/plan/` (`fig-01.png` ...), the table of
  contents is built from the `#`/`##` headings, and `**Direction N. ...**` lines
  are promoted to section headings.
- **PDF:** overwrite `assets/RecoveryPlanUkraine_EN.pdf` with the same name (no
  HTML change needed).

### The institutions map

`institutions/index.html` has an interactive map: an inline SVG outline of Ukraine
(`.ua-map`) with clickable city markers synced to the city lists (`.city-block`).
It uses no map library, tiles, or external requests. The outline was projected
from public-domain border data; marker coordinates are in the SVG's
`0 0 1000 680` viewBox.

To add a city: add a `<g class="ua-marker" data-city="SLUG">` (a `<circle>` plus a
`<text>` label) at the right `cx`/`cy`, and a matching
`<article class="city-block" id="cb-SLUG" data-city="SLUG">` in the list. The small
script at the bottom of the file wires them together. Each institution in a city
list links by `#id` to its detail card lower on the page.

### Swap a photo

Overwrite the file in `assets/` with the same name, or add a new file and update
the `<img src="...">` and `<figcaption>` in the matching `<figure>` block. Keep
the `width`/`height` attributes roughly matching the new image to avoid layout
shift.

### Change the feedback form or social preview

- **Feedback form:** in `index.html`, update the "Share your feedback" button's
  `href` (currently the Google Form `https://forms.gle/As3SZyo9ueLFp4GY6`).
- **Social preview image:** update the `og:image` URL in the `<head>` (currently
  `assets/eas2026.png`).

### Add or change a contact person

In the Contact section of `index.html`, edit the name, position, and email.

Email addresses are kept out of the raw HTML so spam bots cannot harvest them:
each address is split into `data-user` and `data-domain` attributes on a
`<span class="email">`, and a small script reassembles it into a `mailto:` link
in the browser. To change an address, edit those attributes (and the readable
`<noscript>` fallback). To add a contact, copy the whole `<span class="email">`.

## Analytics

Google Analytics (gtag.js) loads on every page via
`<script src="/assets/analytics.js"></script>`. The measurement ID (`G-GEC45WPW5L`)
is set once, at the top of `assets/analytics.js`.

- **Change property:** edit `GA_ID` in `assets/analytics.js`.
- **Disable analytics:** remove the `<script src="/assets/analytics.js">` line
  from each page's `<head>` (or empty that file).

**Privacy note:** the site is served from an EU domain, and Google Analytics sets
cookies and sends data to Google. Depending on use, EU rules (GDPR / ePrivacy) may
require a cookie-consent banner before analytics loads, and/or Google Consent
Mode. The current setup loads analytics for every visitor without a consent
prompt — a decision to revisit for the initiative.

## Deploying (GitHub Pages)

The site deploys automatically: commit and push to `main`, and GitHub Pages
rebuilds within a minute or two.

First-time setup, for reference:

1. **Settings → Pages** → Source: "Deploy from a branch", branch `main`, folder
   `/ (root)`.
2. **Custom domain:** the `CNAME` file contains `uastro.eu`; confirm it under
   Settings → Pages → Custom domain.
3. **DNS at the registrar** (any EURid-accredited `.eu` registrar):
   - Four `A` records for the apex `uastro.eu`:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - One `CNAME` record for `www` pointing to `<your-username>.github.io.`
4. After DNS propagates, tick **Enforce HTTPS**.

Note: `.eu` requires an EU/EEA based registrant (Pavlo qualifies through residence
in Germany). Register through any EURid-accredited registrar.
