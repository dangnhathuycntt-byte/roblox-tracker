#!/usr/bin/env bash
set -e

# ── CONFIG ──
VPS_USER="${VPS_USER:-root}"
VPS_IP="${VPS_IP:?Set VPS_IP before running (e.g. VPS_IP=1.2.3.4 ./deploy.sh)}"
VPS_PATH="/root/roblox-tracker"           # app folder on VPS
DB_FILE="data.db"
KEEP_BACKUPS=3

# ── BUILD ──
echo "=== Building Next.js (standalone) ==="
rm -rf .next
npm run build

echo "=== Preparing deploy package ==="
TMP_DIR=$(mktemp -d)
# Next.js standalone mirrors the project's absolute path; find server.js to locate the app root
APP_ROOT=$(dirname "$(find .next/standalone -name server.js -not -path '*/node_modules/*' | head -1)")
cp -r "$APP_ROOT"/* "$TMP_DIR/"
cp -r .next/static "$TMP_DIR/.next/"
cp -r public "$TMP_DIR/" 2>/dev/null || true
cp -f "$DB_FILE" "$TMP_DIR/" 2>/dev/null || echo "  (no local data.db to copy)"
echo "DATABASE_URL=/root/roblox-tracker/data.db" > "$TMP_DIR/.env"

# ── UPLOAD ──
echo "=== Uploading to $VPS_USER@$VPS_IP:$VPS_PATH ==="
ssh "$VPS_USER@$VPS_IP" "mkdir -p $VPS_PATH"
rsync -avz --delete "$TMP_DIR/" "$VPS_USER@$VPS_IP:$VPS_PATH/"
rm -rf "$TMP_DIR"

# ── SETUP ON VPS ──
echo "=== Setting up on VPS ==="
ssh "$VPS_USER@$VPS_IP" << 'ENDSSH'
cd /root/roblox-tracker

# Install Node.js 22 if missing
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

# Install build tools for better-sqlite3 native addon
apt-get install -y build-essential python3

# Install pm2 if missing
if ! command -v pm2 &>/dev/null; then
  npm install -g pm2
fi

# Rebuild native addons for Linux (standalone lacks source, so reinstall)
npm install better-sqlite3 --no-save

# Start / restart app
pm2 delete roblox-tracker 2>/dev/null || true
PORT=3000 pm2 start server.js --name roblox-tracker
pm2 save
ENDSSH

echo ""
echo "=== Deploy complete! ==="
echo "Dashboard:   http://$VPS_IP:3000/dashboard"
echo "Docs:        http://$VPS_IP:3000/dashboard/docs"
echo "API:         http://$VPS_IP:3000/api/accounts"
