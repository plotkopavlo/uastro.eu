# uastro.eu — Saving Astronomy in Ukraine

A single-page static website for the "Saving Astronomy in Ukraine" initiative.
Plain HTML and one CSS file. No build tools, no framework. It loads instantly and
is trivial to edit.

## Files

```
index.html          The whole page (all copy lives here)
styles.css          One stylesheet (colours, spacing, layout)
CNAME               Custom domain for GitHub Pages (uastro.eu)
assets/
  favicon.svg       Site icon
  ss43-poster.jpg   (add) OG image / session poster
recovery-plan.pdf   (add) the Recovery Plan, linked from the site
```

## Editing the site

Everything is hand-editable. Open the file, change the text, save.

- **Change copy:** edit the text directly in `index.html`. Each section is marked
  with a comment (`NEWS`, `THE RECOVERY PLAN`, `CONTACT`, etc.).
- **Adjust colours / width:** edit the variables at the top of `styles.css`
  (`--accent`, `--maxwidth`, and so on).

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

### Add contact persons

In the `CONTACT` section of `index.html`, replace "Contact persons to be added"
with names and emails.

### Social preview image

The Open Graph image points to `assets/eas2026.png`. To change what shows in link
previews, update the `og:image` URL in the `<head>` of `index.html`.

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
