#!/usr/bin/env bash
# Deploy presentations to Cloudflare Pages as static files.
# Usage: ./scripts/deploy.sh [project-name]
#
# First run will prompt you to create the project.
# Subsequent runs deploy to production.
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT="${1:-miles-haugesund-fagkaffe}"

echo "Deploying $DIR → Cloudflare Pages project: $PROJECT"
npx wrangler pages deploy "$DIR" --project-name="$PROJECT" --commit-dirty=true
