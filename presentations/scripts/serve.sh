#!/usr/bin/env bash
# Serve the presentations directory on localhost.
# Usage: ./scripts/serve.sh [port]
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${1:-8080}"

echo "Serving presentations at http://localhost:$PORT"
echo "Press Ctrl+C to stop."
python3 -m http.server "$PORT" -d "$DIR"
