#!/usr/bin/env bash
# Generate index.html listing all presentations (excluding template and index).
# Usage: ./scripts/build-index.sh
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$DIR/index.html"

# Collect presentation files (skip template.html and index.html)
files=()
for f in "$DIR"/*.html; do
  base="$(basename "$f")"
  [[ "$base" == "template.html" || "$base" == "index.html" ]] && continue
  files+=("$f")
done

# Build card HTML by extracting <title> from each file
cards=""
for f in "${files[@]}"; do
  base="$(basename "$f")"
  slug="${base%.html}"

  # Extract title (strip " — Miles" suffix if present)
  title=$(grep -m1 '<title>' "$f" | sed 's/.*<title>//;s/<\/title>.*//' | sed 's/ *— *Miles$//')
  [[ -z "$title" ]] && title="$slug"

  # Extract date from title-meta if available
  date=$(grep -A2 'class="title-meta"' "$f" | tail -1 | sed 's/<[^>]*>//g;s/^[[:space:]]*//' | head -1)

  # Count slides
  slide_count=$(grep -c 'class="slide"' "$f" || true)

  cards+="      <a class=\"card\" href=\"${slug}\">
        <div class=\"card-title\">${title}</div>
        <div class=\"card-meta\">"
  [[ -n "$date" ]] && cards+="<span>${date}</span>"
  cards+="<span>${slide_count} slides</span>"
  cards+="</div>
      </a>
"
done

# Write the index page
cat > "$OUT" << 'HEADER'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentations — Miles</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">

  <style>
    @font-face {
      font-family: 'Gelica';
      src: url('public/fonts/Gelica/Gelica-Medium.ttf') format('truetype');
      font-weight: 500;
      font-display: swap;
    }
    @font-face {
      font-family: 'Gelica';
      src: url('public/fonts/Gelica/Gelica-SemiBold.ttf') format('truetype');
      font-weight: 600;
      font-display: swap;
    }

    :root {
      --miles-red: #ff303b;
      --burgundy: #450d20;
      --cream: #fbf0e5;
      --dark-teal: #004047;
      --teal: #78e8db;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: var(--cream);
      color: var(--burgundy);
      min-height: 100vh;
    }

    header {
      background: var(--burgundy);
      padding: 3rem 2rem 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    header h1 {
      font-family: 'Gelica', Georgia, serif;
      font-weight: 500;
      color: var(--cream);
      font-size: 2.2rem;
    }

    header img {
      height: 2.5rem;
    }

    main {
      max-width: 960px;
      margin: 0 auto;
      padding: 3rem 2rem 4rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      text-decoration: none;
      color: var(--burgundy);
      box-shadow: 0 1px 3px rgba(69, 13, 32, 0.08);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      border: 1px solid rgba(69, 13, 32, 0.06);
    }

    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(69, 13, 32, 0.12);
    }

    .card-title {
      font-family: 'Gelica', Georgia, serif;
      font-weight: 600;
      font-size: 1.25rem;
      line-height: 1.3;
    }

    .card-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      opacity: 0.6;
    }

    .empty {
      text-align: center;
      padding: 4rem 1rem;
      opacity: 0.5;
      font-size: 1.1rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>Presentations</h1>
    <img src="public/miles-logo-red.svg" alt="Miles">
  </header>
  <main>
    <div class="grid">
HEADER

# Inject cards (or empty state)
if [[ ${#files[@]} -eq 0 ]]; then
  echo '      <p class="empty">No presentations yet. Run <code>./scripts/new.sh my-talk</code> to create one.</p>' >> "$OUT"
else
  echo -n "$cards" >> "$OUT"
fi

cat >> "$OUT" << 'FOOTER'
    </div>
  </main>
</body>
</html>
FOOTER

echo "Generated $OUT (${#files[@]} presentations)"
