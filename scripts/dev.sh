#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
LOG="$ROOT/dev.log"

exec > >(tee -a "$LOG") 2>&1

echo "=== $(date) ==="
echo "Project: $ROOT"

# WSL + Windows proxy often breaks npm/node
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy ALL_PROXY all_proxy
export NO_PROXY='*'

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: Node.js not found. Install: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs"
  exit 1
fi

echo "Node: $(node -v)"
echo "npm: $(npm -v)"

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Validating content.json..."
node -e "JSON.parse(require('fs').readFileSync('data/content.json','utf8')); console.log('content.json OK')"

echo "Clearing .next cache..."
rm -rf .next

echo "Freeing port 3000..."
fuser -k 3000/tcp 2>/dev/null || true

echo "Starting dev server on http://0.0.0.0:3000"
echo "Open in browser: http://localhost:3000"
exec npm run dev
