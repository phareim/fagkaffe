# Miles Presentations

Single-file HTML slide decks styled per the Miles Brand Guide 2026. No build step, no dependencies beyond a browser.

## Quick Start

```bash
# Create a new presentation
./presentations/scripts/new.sh my-talk

# Start local dev server
./presentations/scripts/serve.sh

# Open in browser
open http://localhost:8080/my-talk.html
```

Or just copy `presentations/template.html` to a new `.html` file and start editing.

## How It Works

Each presentation is a single HTML file. All decks share the same styles, scripts, and assets:

```
presentations/
├── template.html              # starter deck — copy this
├── styles/slides.css          # all styles + brand tokens
├── styles/highlight-miles.css # syntax highlighting theme
├── js/slides.js               # navigation, fragments, speaker notes
├── public/                    # fonts, logo, highlight.js
├── scripts/                   # new, serve, deploy
└── resources/                 # brand icons, illustrations, PPTX reference
```

## Slides

Every slide is a `<section class="slide">` containing a `<div class="slide-inner">`:

```html
<section class="slide">
  <div class="slide-inner theme-teal">
    <h2>Slide Title</h2>
    <p>Content goes here.</p>
    <aside class="notes">Speaker notes (hidden, press 's' to view).</aside>
  </div>
</section>
```

## Themes

Add a theme class to `.slide-inner` to change the color scheme:

| Class | Background | Best for |
|---|---|---|
| *(default)* | Cream | Standard content |
| `theme-title` | Burgundy | Opening title slide |
| `theme-title-center` | Burgundy | Closing / section breaks |
| `theme-red` | Red | Big statements |
| `theme-teal` | Dark teal | Code, tech content |
| `theme-purple` | Dark purple | Code (legacy) |
| `theme-white` | White | Data, comparisons |
| `theme-yellow` | Yellow | Warm callouts |

## Layouts

Beyond basic heading + text, the following layout patterns are available:

- **Columns** — `columns` (2-col) or `columns-3` (3-col) grids
- **Title with illustration** — `theme-title title-illustration` for a title slide with an image filling the right half
- **Section header** — `section-header` with a label, large heading, and optional body text
- **Section header + photo** — add `section-photo` for a photo on the right
- **Split content** — `split` for text left + edge-to-edge image right (`split-reverse` to flip)
- **Image + text** — `img-text` side-by-side (`img-right` to swap)
- **Full-bleed photo** — `photo-full` for a single image covering the entire slide
- **Background image + overlay** — `has-bg` with text over a darkened photo
- **Photo grid** — `photo-grid` with `grid-2x2` or `grid-3x2`
- **Team cards** — `team-grid` with circular photos, names, and roles
- **Logo closing** — `logo-center` for a minimal logo-only slide
- **Icon cards** — `icon-grid` + `icon-card` for icon grids

## Features

- **Fragments** — add `class="fragment"` to reveal elements one at a time
- **Syntax highlighting** — `<pre><code class="language-python">` with a custom Miles color theme
- **Speaker notes** — `<aside class="notes">` inside any slide, press `s` to open
- **Keyboard nav** — arrow keys, space, Home/End, `f` for fullscreen
- **URL hash** — `#5` links directly to slide 5
- **Touch/click** — swipe or click left/right halves

## Deploying

```bash
./presentations/scripts/deploy.sh              # deploy to Cloudflare Pages
./presentations/scripts/deploy.sh my-project   # custom project name
```

Presentations are then available at `https://<project>.pages.dev/<name>.html`.

## Brand Reference

The official Miles PowerPoint template (`presentations/resources/Miles template 2026.pptx`) was used as the design reference. Brand icons are in `presentations/resources/icons/` and illustrations in `presentations/resources/illustrations/`.

See `presentations/CLAUDE.md` for the full technical reference including all CSS classes, color tokens, and HTML patterns.
