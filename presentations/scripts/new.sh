#!/usr/bin/env bash
# Create a new presentation from template.
# Usage: ./scripts/new.sh my-talk-name
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)"
NAME="${1:?Usage: $0 <presentation-name>}"
DEST="$DIR/$NAME.html"

if [[ -f "$DEST" ]]; then
  echo "Error: $DEST already exists." >&2
  exit 1
fi

cp "$DIR/template.html" "$DEST"
# Update the title placeholder
sed -i '' "s/Presentation Title/$NAME/" "$DEST"
echo "Created $DEST"
echo "Open it:  open $DEST"
echo "Or serve:  ./scripts/serve.sh"
