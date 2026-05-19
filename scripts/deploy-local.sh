#!/usr/bin/env bash
set -euo pipefail

SERVER="root@186.246.30.117"
DEPLOY_SCRIPT="~/my-website/scripts/deploy.sh"

echo "=== Local deploy to $SERVER ==="

# Проверка SSH ключа
if ! ssh -o BatchMode=yes -o ConnectTimeout=5 "$SERVER" 'echo "[OK] SSH OK"' 2>/dev/null; then
  echo "[ERROR] SSH ключ не настроен. Сначала запустите: bash scripts/deploy-step1.sh"
  exit 1
fi

echo "Running deploy script on server..."
ssh "$SERVER" "bash $DEPLOY_SCRIPT"

echo "=== Local deploy finished ==="
