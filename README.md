# uastro.eu — Saving Astronomy in Ukraine

The static website for the "Saving Astronomy in Ukraine" initiative.
Plain HTML and one CSS file. No build tools, no framework. It loads instantly and
is trivial to edit.

## Files

```
index.html            Homepage: full-width sections (hero, four directions,
                      plan, news, institutions, partners, contact)
styles.css            One shared stylesheet (design system + layout)
CNAME                 Custom domain for GitHub Pages (uastro.eu)
news/
  eas2026/index.html      Full article: EAS 2026 special session SS43
  lviv2026/index.html     Full article: Lviv visit, April 2026
  lviv2025/index.html     Full article: Lviv letter of intent, October 2025
  leiden2025/index.html   Full article: Leiden meeting, June 2025
  _template/index.html    Copy this to create a new article (not published)
assets/
  analytics.js          Google Analytics (gtag.js) loader; measurement ID here
  favicon.svg           Site icon
  hero-space.jpg        Optimised hero background (2560px); mobile version too
  hero-space-mobile.jpg Lighter hero background for small screens
  eas2026.png           EAS 2026 session photo (also the OG preview image)
  lviv-2026-*.jpg       Lviv 2026 photos (credit Inna Potapova, JASU)
  lviv-2025-*.jpg       Lviv 2025 photos (credit Valeriia Pinchuk, Mariia Seniak)
  leiden-2025.jpg       Leiden 2025 meeting photo (credit naor.studio)
  RecoveryPlanUkraine_EN.pdf   The Recovery Plan

The hero background is derived from a large source image (`background.png`,
git-ignored); the served copies are `hero-space.jpg` (2560px) and
`hero-space-mobile.jpg`. To refresh them from a new source, resize to about
2560px and 1280px wide and overwrite those two files.
```

Each news article lives at its own permanent URL (`uastro.eu/news/<slug>/`),
so it can be cited and linked directly. The homepage shows a teaser (date,
headline, photo, first paragraph) linking to the full article.

## Editing the site

Everything is hand-editable. Open the file, change the text, save.

- **Change copy:** edit the text directly in `index.html` (or the article's
  `news/<slug>/index.html`). Each section is marked with a comment.
- **Adjust colours / width / fonts:** edit the variables at the top of
  `styles.css` (`--accent`, `--space`, `--paper`, `--container`, `--serif`,
  and so on). All pages share this one stylesheet.

### Layout: full-width sections ("bands")

The homepage is built from full-width **bands**. Each band's background runs
edge to edge, and its content sits in a centred `.container` (max ~1180px).
Background variants alternate so sections read as distinct zones:
`band-light` (off-white), `band-tint` (warm tint), `band-dark` (deep sky).

**To add a new section** (for example a future "Institutions" map or an
"Events" list), drop this skeleton anywhere inside `<main>` and give it an
`id` so the nav can link to it:

```html
<section id="my-section" class="band band-tint">
  <div class="container">
    <h2 class="rule">Section title</h2>
    <p class="section-intro">One or two lines introducing the section.</p>
    <!-- content -->
  </div>
</section>
```

Inside the container you can reuse the layout helpers:
`grid-4` (four columns), `cards` (responsive card grid), `split` (two columns,
text and media). All of them collapse to one column on mobile automatically.
Add the section to the nav by copying a link in the `.nav` of every page's
top bar.

The **Institutions in Ukraine** and **Partners and supporting organisations**
sections are currently placeholders (marked "in preparation" on the page), ready
to be filled in: real institution profiles and a map, and partner logos and
names. Remove them, or fill them in, whenever you like.

### Add a news item

1. Copy `news/_template/` to `news/<slug>/` — the slug is short and lowercase,
   e.g. `news/kyiv2027/`. The article's permanent URL becomes
   `https://uastro.eu/news/<slug>/`.
2. Open the new `index.html` and replace every ALL-CAPS placeholder (title,
   date, text, photo, links, citation line). If there is a photo, put it in
   `assets/` first.
3. Add a teaser to the top of the News section in the homepage `index.html`:
   copy an existing `<article class="news-item">` block and update the date,
   headline link, photo, and first paragraph.

The `_template` folder itself is not published: GitHub Pages skips folders
that start with an underscore.

### Swap a photo

The two news photos live in `assets/` (`eas2026.png` and `leiden-2025.jpg`).
To replace one, either overwrite the file with the same name, or add a new file
and update the `<img src="...">` and `<figcaption>` inside the matching
`<figure class="photo">` block in `index.html`. Keep the `width`/`height`
attributes roughly matching the new image's pixel size to avoid layout shift.

### Replace the Recovery Plan PDF

The PDF is `assets/RecoveryPlanUkraine_EN.pdf`, linked from the "Read the plan
(PDF)" button. To publish a new version, overwrite that file with the same name
(no HTML change needed), or drop in a new file and update the button's `href`
in the `THE RECOVERY PLAN` section of `index.html`.

### Change the feedback form URL

In `index.html`, find the "Share your feedback" button and update its `href`
(currently the Google Form `https://forms.gle/As3SZyo9ueLFp4GY6`).

### Add or change a contact person

In the `CONTACT` section of `index.html`, edit the name, position, and email.

Email addresses are kept out of the raw HTML so spam bots cannot harvest them.
Each address is split into `data-user` and `data-domain` attributes on a
`<span class="email">`, and a small script at the bottom of the page reassembles
it into a clickable `mailto:` link in the browser. To change an address, edit
those two attributes (and the readable `<noscript>` fallback next to them). To
add another contact, copy the whole `<span class="email" ...>` and the script
handles it automatically.

### Social preview image

The Open Graph image points to `assets/eas2026.png`. To change what shows in link
previews, update the `og:image` URL in the `<head>` of `index.html`.

## Analytics

Google Analytics (gtag.js) is loaded on every page via
`<script src="/assets/analytics.js"></script>` in the `<head>`. The measurement
ID (`G-GEC45WPW5L`) is set in one place, at the top of
[`assets/analytics.js`](assets/analytics.js).

- **Change property:** edit `GA_ID` in `assets/analytics.js`.
- **Disable analytics:** remove the `<script src="/assets/analytics.js">` line
  from each page's `<head>` (or empty that file).

Note on privacy: the site is served from an EU domain, and Google Analytics
sets cookies and sends data to Google. Depending on how the site is used, EU
rules (GDPR / ePrivacy) may require a cookie-consent banner before analytics
loads, and/or Google Consent Mode. This is a legal decision for the initiative;
the current setup loads analytics for every visitor without a consent prompt.

## Deploying (GitHub Pages)

1. Push these files to the `main` branch of the GitHub repo.
2. In the repo: **Settings → Pages**. Set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
3. **Custom domain:** the `CNAME` file already contains `uastro.eu`. In
   **Settings → Pages → Custom domain**, confirm `uastro.eu` is shown.
4. **DNS at the registrar** (any EURid-accredited `.eu` registrar):
   - Four `A` records for the apex `uastro.eu` pointing to GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - One `CNAME` record for `www` pointing to `<your-username>.github.io.`
5. Wait for DNS to propagate, then tick **Enforce HTTPS** in Settings → Pages.

To redeploy after an edit: commit and push to `main`. GitHub Pages rebuilds
automatically within a minute or two.

## Domain note

`.eu` requires an EU/EEA based registrant. Pavlo qualifies through residence in
Germany. Register through any EURid-accredited registrar.

## Wired up

- [x] EAS 2026 session photo (`assets/eas2026.png`, also the social preview image)
- [x] Leiden 2025 meeting photo (`assets/leiden-2025.jpg`, credit naor.studio)
- [x] Recovery Plan PDF (`assets/RecoveryPlanUkraine_EN.pdf`)
- [x] Feedback form (Google Form)

## Still to add

- [ ] Contact persons (names and emails) in the Contact section
