# Current Work
Active presentation: `notes/ai-agile.md` / `presentations/ai-agile.html`

---

## Slide Style Preferences

- **Full-bleed photos as standalone slides** — used for mood/transition, no text needed
- **Social embeds as primary content** — X-posts and LinkedIn posts shown as-is, side by side when comparing two voices
- **"Sticker" fragments** — short, punchy labels (e.g. "Is this BS?", "More research needed") that reveal on click as a wry aside
- **Substantial speaker notes** — tell the full story there; slides stay sparse
- **Literary/cultural anchors** — a quote or concept (Jevons, Art & Fear) used to frame an argument, not just decorate
- **Skepticism built in** — deliberately include counterpoints and critics, not just enthusiasm
- **Interactive data viz** — charts with hover states and animated stat cards rather than static images

---

# Presentations — Miles Branded Slide Decks

Single-file HTML presentations styled per the Miles Brand Guide 2026.
Use the icons and illustrations under the resources directory.

META: as we work and learn, please feel free to jot down notes and thoughts in @NAPKIN.md. it is supposed to be a brain-dump of random thoughts as we work. treat it as such. :END META.

## Project Structure

```
presentations/
├── template.html              ← copy this to start a new deck
├── CLAUDE.md                  ← you are here
├── styles/
│   ├── slides.css             ← all slide styles + brand tokens
│   └── highlight-miles.css    ← syntax highlighting theme
├── js/
│   └── slides.js              ← navigation, fragments, notes, hljs init
├── public/
│   ├── highlight.min.js       ← highlight.js core (bundled)
│   ├── miles-logo-red.svg     ← Miles logo (red, for title slides)
│   └── fonts/Gelica/          ← Gelica .ttf files (self-hosted)
├── scripts/
│   ├── new.sh <name>          ← scaffold a new presentation
│   ├── serve.sh [port]        ← local dev server (default :8080)
│   └── deploy.sh [project]    ← deploy to Cloudflare Pages
└── resources/
    ├── Miles template 2026.pptx   ← official PowerPoint template (reference)
    ├── icons/                     ← brand icons (SVG)
    └── illustrations/             ← larger illustrations (SVG/PNG)
```

## Creating a New Presentation

Copy `template.html` to `<name>.html` in this directory. Or run:
```bash
./scripts/new.sh my-talk
```

Each presentation is a single `.html` file. All presentations share `styles/`, `js/`, and `public/`.

## Slide Anatomy

Every slide follows this pattern:

```html
<section class="slide" data-title="Description">
  <div class="slide-inner [theme-class]">
    <!-- content -->
    <aside class="notes">Speaker notes here (hidden during presentation).</aside>
  </div>
</section>
```

Use `data-title` on the `<section>` to label each slide for readability and navigation.

## Brand Colors (CSS custom properties)

| Token             | Hex       | Use                                     |
|-------------------|-----------|-----------------------------------------|
| `--miles-red`     | `#ff303b` | Stopping power, energy, CTAs            |
| `--deep-red`      | `#b72318` | Deeper red for subtle accents           |
| `--burgundy`      | `#450d20` | Depth, title backgrounds                |
| `--cream`         | `#fbf0e5` | Default background, warm & human        |
| `--yellow`        | `#ffd9a1` | Optimism, accent on dark backgrounds    |
| `--dark-teal`     | `#004047` | Technology, knowledge, code slides      |
| `--teal`          | `#78e8db` | Bright accent on dark teal backgrounds  |
| `--dark-purple`   | `#3d1436` | Legacy tech theme (prefer teal)         |

## Themes

Set on `.slide-inner`:

| Class               | Background   | Text     | Best for                        |
|---------------------|-------------|----------|---------------------------------|
| *(none)*            | cream       | burgundy | Standard content slides         |
| `theme-title`       | burgundy    | cream    | Opening title slide (with logo) |
| `theme-title-center`| burgundy    | cream    | Closing/section slides          |
| `theme-red`         | Miles Red   | white    | Big statements, key takeaways   |
| `theme-teal`        | dark teal   | cream    | Code, tech content (preferred)  |
| `theme-purple`      | dark purple | cream    | Code, tech content (legacy)     |
| `theme-white`       | white       | burgundy | Clean data/comparison slides    |
| `theme-yellow`      | yellow      | burgundy | Warm callouts, fun slides       |

### Title Slide Layout

The opening title slide uses a specific layout matching the Miles PowerPoint template:

```html
<div class="slide-inner theme-title">
  <div class="title-header">
    <h1>Title of presentation<br>Customer name/subtitle</h1>
    <div class="title-meta">
      Location<br>
      Date
    </div>
  </div>
  <div class="title-logo">
    <img src="public/miles-logo-red.svg" alt="Miles">
  </div>
</div>
```

For closing slides or section breaks, use `theme-title-center` which centers the content:

```html
<div class="slide-inner theme-title-center">
  <h1>Thanks!</h1>
  <p>Questions?</p>
</div>
```

### Title with Illustration Layout

Title slide with a large image filling the right half:

```html
<div class="slide-inner theme-title title-illustration">
  <div class="title-text">
    <img class="logo" src="public/miles-logo-red.svg" alt="Miles">
    <h1>Heading text</h1>
  </div>
  <div class="title-image">
    <img src="public/photo.jpg" alt="Description">
  </div>
</div>
```

### Section Header Layout

For section breaks within the presentation. Has a small label + large heading + optional body text. Works with any theme.

```html
<div class="slide-inner theme-title-center">
  <div class="section-header">
    <span class="section-label">Section 01</span>
    <h1>Big Section Title</h1>
    <p>Optional supporting text goes here.</p>
  </div>
</div>
```

With a photo on the right side, add `section-photo`:

```html
<div class="slide-inner theme-title-center section-photo">
  <div class="section-header">
    <span class="section-label">Section 01</span>
    <h1>Section Title</h1>
    <p>Supporting text.</p>
  </div>
  <div class="section-image">
    <img src="public/photo.jpg" alt="Description">
  </div>
</div>
```

### Split Content Layout

Title and text on the left, edge-to-edge image on the right. Good for showcasing a screenshot, diagram, or photo alongside an explanation.

```html
<div class="slide-inner split">
  <div class="split-text">
    <h2>Title</h2>
    <p>Explanation text here.</p>
  </div>
  <div class="split-media">
    <img src="public/screenshot.png" alt="Description">
  </div>
</div>
```

Add `split-reverse` to put the image on the left instead:

```html
<div class="slide-inner split split-reverse">
  <div class="split-text">...</div>
  <div class="split-media">...</div>
</div>
```

### Full-bleed Photo

A single photo covering the entire slide (no text, no padding):

```html
<div class="slide-inner photo-full">
  <img src="public/photo.jpg" alt="Description">
</div>
```

For a photo with text overlay, use `has-bg` instead (see Images section below).

### Photo Grid

Grid of photos filling the slide:

```html
<div class="slide-inner photo-full">
  <div class="photo-grid grid-2x2">
    <img src="public/a.jpg" alt="">
    <img src="public/b.jpg" alt="">
    <img src="public/c.jpg" alt="">
    <img src="public/d.jpg" alt="">
  </div>
</div>
```

Grid variants: `grid-2x2` (4 photos), `grid-3x2` (6 photos).

Photo grid with title/text on the left:

```html
<div class="slide-inner photo-grid-text">
  <div>
    <h2>Title</h2>
    <p>Description text.</p>
  </div>
  <div class="photo-grid grid-2x2">
    <img src="public/a.jpg" alt="">
    <img src="public/b.jpg" alt="">
    <img src="public/c.jpg" alt="">
    <img src="public/d.jpg" alt="">
  </div>
</div>
```

### Team / People Cards

Show team members with circular photos, names, and roles:

```html
<div class="slide-inner">
  <h2>Our Team</h2>
  <div class="team-grid">
    <div class="team-card">
      <img src="public/person1.jpg" alt="Name">
      <div class="team-name">Full Name</div>
      <div class="team-role">Senior Consultant</div>
    </div>
    <div class="team-card">
      <img src="public/person2.jpg" alt="Name">
      <div class="team-name">Full Name</div>
      <div class="team-role">Tech Lead</div>
    </div>
    <div class="team-card">
      <img src="public/person3.jpg" alt="Name">
      <div class="team-name">Full Name</div>
      <div class="team-role">Designer</div>
    </div>
  </div>
</div>
```

For 5 people, add `team-5` to the grid: `<div class="team-grid team-5">`.

### Logo Closing

Minimal closing slide with just the Miles logo centered:

```html
<div class="slide-inner theme-title-center logo-center">
  <img src="public/miles-logo-red.svg" alt="Miles">
</div>
```

Works with any theme (`theme-title-center`, `theme-red`, etc.).

## Typography

- **Headings**: Gelica (font-weight 500 = Medium). Use `h1` for slide titles, `h2` for section headings, `h3` for subheadings.
- **Body text**: DM Sans. Use `p` and `li`.
- **Code**: DM Mono. Inline `<code>` or block `<pre><code>`.
- Font sizes are pre-set. Do not add custom font-size unless absolutely needed.

## Layout Classes

### Spacing
- `<div class="gap"></div>` — 1.5em vertical gap (use between heading and content)
- `<div class="gap-lg"></div>` — 2.5em vertical gap

### Columns
```html
<div class="columns">       <!-- 2 equal columns, 48px gap -->
  <div>...</div>
  <div>...</div>
</div>

<div class="columns-3">     <!-- 3 equal columns, 36px gap -->
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

### Text
- `text-center` — center-align text in the slide

### Accent Color
- `<span class="accent">text</span>` — Miles Red on light themes, yellow on dark themes.

## Fragments (Step Reveal)

Add `class="fragment"` to any element. Each press of next reveals one fragment:

```html
<ul>
  <li class="fragment">Appears first</li>
  <li class="fragment">Appears second</li>
  <li class="fragment">Appears third</li>
</ul>
```

Fragments work on any element, not just list items.

## Code Blocks (Syntax Highlighting)

Uses highlight.js with a custom Miles color theme. Specify language on the `<code>` tag:

```html
<pre><code class="language-python">def hello():
    return "Hello, Miles!"</code></pre>
```

Common language classes: `language-javascript`, `language-typescript`, `language-python`, `language-java`, `language-kotlin`, `language-go`, `language-rust`, `language-html`, `language-css`, `language-sql`, `language-bash`, `language-json`, `language-yaml`.

Omit the class for auto-detection. Best on `theme-teal`, `theme-purple`, or default (cream).

The syntax highlighting theme has special adjustments for `theme-teal` slides (teal keywords, yellow strings).

## Images

### Centered image (diagram, screenshot)
```html
<div class="img-center">
  <img src="public/my-diagram.png" alt="Description">
</div>
```

### Image + text side by side
```html
<div class="img-text">
  <img src="public/photo.jpg" alt="Description">
  <div>
    <h3>Heading</h3>
    <p>Text next to the image.</p>
  </div>
</div>
```
Add `class="img-text img-right"` to put the image on the right.

### Full background image
```html
<div class="slide-inner has-bg">
  <div class="bg" style="background-image: url('public/photo.jpg')"></div>
  <div class="bg-overlay"></div>
  <div class="bg-content">
    <h1>Title over image</h1>
    <p>Subtitle text</p>
  </div>
</div>
```
The overlay is burgundy at 70% opacity. Override with inline style if needed.

### Image with caption
```html
<figure>
  <img src="public/photo.jpg" alt="Description">
  <figcaption>Photo: description here</figcaption>
</figure>
```

## Brand Assets

### Icons (`resources/icons/`)

SVG icons for use in slides. Reference directly from `resources/icons/`.

Available icons:
- **People**: Bruker, Brukere, Brukerprofil, Brukermappe, Brukerreise, Brukerundersøkelse, Digitalt møte, Hilse
- **UI elements**: Hamburger menu, Delete (høyre/venstre), Dele
- **Concepts**: Desktop koding, Desktop, Faglig autoritet, Feiring, Førsteplass, Gjenbruk
- **Data**: Graf linje (opp/ned), Graf søyler
- **Symbols**: Alfakrøll, Hjerte (fylt/outline, Miles/rød), FN Bærekraftsmål
- **Other**: brus-pils, Fjell

### Illustrations (`resources/illustrations/`)

Larger illustrations (SVG/PNG) for visual slides.

### Example usage
```html
<!-- Reference icons directly -->
<img src="resources/icons/Desktop koding.svg" alt="Koding">
```

## Speaker Notes

Add `<aside class="notes">` inside `.slide-inner`. Hidden during presentation, shown in a separate window when pressing `s`:

```html
<aside class="notes">
  Mention the quarterly results here.
  Pause for questions.
</aside>
```

## Keyboard Shortcuts

| Key              | Action                    |
|------------------|---------------------------|
| → ↓ Space PgDn   | Next slide / fragment     |
| ← ↑ PgUp         | Previous slide / fragment |
| Home              | First slide               |
| End               | Last slide                |
| f                 | Toggle fullscreen         |
| s                 | Open speaker notes window |

Also: click right half to advance, left half to go back. Swipe on touch.

## URL Hash

The current slide is stored in the URL hash (`#3` = slide 3). Link directly to a slide or reload without losing position.

## Deployment (Cloudflare Pages)

The entire `presentations/` directory is deployed as static files to Cloudflare Pages.

### Automatic (CI/CD)

Pushing to `main` triggers a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
1. Rebuilds the index page (`scripts/build-index.sh`)
2. Deploys to Cloudflare Pages via `wrangler`

Required GitHub repo secrets:
- `CLOUDFLARE_API_TOKEN` — needs "Cloudflare Pages: Edit" permission
- `CLOUDFLARE_ACCOUNT_ID` — from the Cloudflare dashboard sidebar

### Manual

```bash
./scripts/deploy.sh                    # deploys as "miles-haugesund-fagkaffe"
./scripts/deploy.sh my-project-name    # custom project name
```

### Index Page

`index.html` is auto-generated by `scripts/build-index.sh`. It lists all presentations (excluding `template.html`). Regenerated automatically on deploy. Do not edit by hand.

### URLs

Once deployed, presentations are available at:
- `https://<project>.pages.dev/` (index / overview)
- `https://<project>.pages.dev/my-talk` (pretty URL, no .html needed)
- `https://<project>.pages.dev/my-talk#5` (direct link to slide 5)

## Live Polls

Audience members scan a QR code → `https://<project>.pages.dev/poll?p=<slug>` → vote on their phone. Results update live in the slide deck every 3 seconds.

### Poll slide syntax

```html
<section class="slide" data-title="Avstemning" data-poll="my-poll-id">
  <div class="slide-inner theme-teal">
    <h2>Question text here.</h2>
    <aside class="notes">Scan-to-vote. Wait for results before advancing.</aside>
  </div>
</section>
```

- `data-poll` on the `<section>` triggers auto-injection of a QR code + live bar chart.
- The poll ID must match what was created in the admin panel.
- `public/qrcode.min.js` and `js/slides.js` handle everything automatically.

### Setup (one-time per deployment)

```bash
wrangler d1 create fag-kaffe-polls                              # get database_id
# → paste it into wrangler.toml  [[d1_databases]] database_id field
wrangler d1 execute fag-kaffe-polls --file=presentations/schema.sql
# Set ADMIN_TOKEN in Cloudflare Pages → Settings → Environment variables
```

### Before each presentation

1. Open `https://<project>.pages.dev/admin`
2. Enter admin token (stored in sessionStorage).
3. Select presentation slug → Create new session → name it (e.g. "Haugesund feb 2026").
4. Add polls matching the `data-poll` IDs used in your slides (question + options on separate lines).

### Admin panel: `presentations/admin.html`
### Mobile vote page: `presentations/poll.html`
### Schema: `presentations/schema.sql`
### API: `presentations/functions/api/` (Cloudflare Pages Functions + D1)

---

## Conventions for Building Decks

1. Always start with a `theme-title` slide (title + location/date + logo).
2. Always end with a `theme-title-center` slide (thanks/questions).
3. Use `theme-red` or `theme-teal` for emphasis/break slides between sections.
4. Keep text minimal — prefer short bullets over paragraphs.
5. One idea per slide.
6. Use fragments sparingly — they're great for agendas and reveals, annoying for every bullet.
7. Use icons from `resources/icons/` and illustrations from `resources/illustrations/`. Put other images in `public/`.
8. Code slides: use `theme-teal` + `<pre><code class="language-xx">`.
9. Add speaker notes for context — they help the presenter and document intent.
