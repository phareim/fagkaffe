# Presentations — Miles Branded Slide Decks

Single-file HTML presentations styled per the Miles Brand Guide 2026.

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
└── scripts/
    ├── new.sh <name>          ← scaffold a new presentation
    ├── serve.sh [port]        ← local dev server (default :8080)
    └── deploy.sh [project]    ← deploy to Cloudflare Pages

../resources/
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
<section class="slide">
  <div class="slide-inner [theme-class]">
    <!-- content -->
    <aside class="notes">Speaker notes here (hidden during presentation).</aside>
  </div>
</section>
```

Use the HTML comment banner for readability:
```html
<!-- ╔══════════════════════════════════════════╗ -->
<!-- ║  SLIDE N — Description                   ║ -->
<!-- ╚══════════════════════════════════════════╝ -->
```

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

### Icons (`../resources/icons/`)

SVG icons for use in slides. Copy needed files to `public/` before use.

Available icons:
- **People**: Bruker, Brukere, Brukerprofil, Brukermappe, Brukerreise, Brukerundersøkelse, Digitalt møte, Hilse
- **UI elements**: Hamburger menu, Delete (høyre/venstre), Dele
- **Concepts**: Desktop koding, Desktop, Faglig autoritet, Feiring, Førsteplass, Gjenbruk
- **Data**: Graf linje (opp/ned), Graf søyler
- **Symbols**: Alfakrøll, Hjerte (fylt/outline, Miles/rød), FN Bærekraftsmål
- **Other**: brus-pils, Fjell

### Illustrations (`../resources/illustrations/`)

Larger illustrations (SVG/PNG) for visual slides.

### Example usage
```bash
# Copy an icon to public/
cp ../resources/icons/"Desktop koding.svg" public/

# Then reference in HTML
<img src="public/Desktop koding.svg" alt="Koding">
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

```bash
./scripts/deploy.sh                    # deploys as "miles-haugesund-fagkaffe"
./scripts/deploy.sh my-project-name    # custom project name
```

First run creates the project and prompts for Cloudflare auth. Subsequent runs deploy to production.

Once deployed, presentations are available at:
- `https://<project>.pages.dev/template.html`
- `https://<project>.pages.dev/my-talk.html`
- `https://<project>.pages.dev/my-talk.html#5` (direct link to slide 5)

Uses `npx wrangler` — no global install needed.

## Conventions for Building Decks

1. Always start with a `theme-title` slide (title + location/date + logo).
2. Always end with a `theme-title-center` slide (thanks/questions).
3. Use `theme-red` or `theme-teal` for emphasis/break slides between sections.
4. Keep text minimal — prefer short bullets over paragraphs.
5. One idea per slide.
6. Use fragments sparingly — they're great for agendas and reveals, annoying for every bullet.
7. Put images in `public/` and reference as `public/filename.ext`.
8. Code slides: use `theme-teal` + `<pre><code class="language-xx">`.
9. Add speaker notes for context — they help the presenter and document intent.
