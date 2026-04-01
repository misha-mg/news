#!/bin/bash
# Run this script from ~/Desktop/news to push the project to GitHub
# Usage: bash ~/Desktop/news/setup-github.sh

set -e
cd ~/Desktop/news

echo "=== Cleaning up git lock file if present ==="
rm -f .git/index.lock

echo ""
echo "=== Git status ==="
git config user.email "mishahorod@gmail.com"
git config user.name "Michael"
git checkout -b main 2>/dev/null || git checkout main 2>/dev/null || true

echo ""
echo "=== Staging files (node_modules excluded via .gitignore) ==="
git add .
git status --short

echo ""
echo "=== Creating initial commit ==="
git commit -m "Initial commit: React news aggregator app"

echo ""
echo "=== Checking GitHub CLI auth ==="
gh auth status

echo ""
echo "=== Creating public GitHub repo and pushing ==="
gh repo create news --public --source=. --remote=origin --push

echo ""
echo "=== Done! Your repo is live at: ==="
gh repo view --json url -q .url
