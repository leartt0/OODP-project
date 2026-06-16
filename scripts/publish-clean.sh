#!/usr/bin/env bash
# Publishes a single clean commit with only leartt0 as author (no Cursor co-author).
# Use after deleting and recreating the GitHub repository.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

git checkout --orphan publish-clean
git add -A

TREE=$(git write-tree)
MSG_FILE=$(mktemp)
cat > "$MSG_FILE" <<'EOF'
Initial commit: weEatz — online food delivery system.

Ghost kitchen food delivery in Prishtina, Kosovo. Eight locations, twenty fast-food products.

Implements Singleton, Adapter, Observer, Composite, and Iterator design patterns.
Developed by Leart Saliu. Academic work — SEEU.
EOF

# Use GitHub noreply email so commits appear on your profile graph.
GITHUB_EMAIL="179647917+leartt0@users.noreply.github.com"
COMMIT=$(GIT_AUTHOR_NAME="Leart Saliu" GIT_AUTHOR_EMAIL="$GITHUB_EMAIL" \
  GIT_COMMITTER_NAME="Leart Saliu" GIT_COMMITTER_EMAIL="$GITHUB_EMAIL" \
  git commit-tree "$TREE" -F "$MSG_FILE")
rm "$MSG_FILE"

git update-ref refs/heads/main "$COMMIT"
git checkout main
git branch -D publish-clean 2>/dev/null || true

echo "Clean commit: $(git log -1 --oneline)"
echo "Author: $(git log -1 --format='%an <%ae>')"
git log -1 --format=%B | grep -i cursor && echo "WARNING: Cursor found in message" || echo "No Cursor co-author."

git push --force origin main
echo "Pushed to origin main."
