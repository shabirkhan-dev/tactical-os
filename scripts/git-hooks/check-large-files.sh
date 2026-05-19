#!/usr/bin/env bash
# Forbid committing staged files over MAX_SIZE_MB (default 2).
set -euo pipefail

msg() {
    printf '[git-hooks] %s\n' "$*"
}

MAX_SIZE_MB="${MAX_SIZE_MB:-2}"
MAX_BYTES=$((MAX_SIZE_MB * 1024 * 1024))
FOUND=0
COUNT=0

while IFS= read -r -d '' f; do
    [ -z "$f" ] && continue
    [ ! -f "$f" ] && continue
    COUNT=$((COUNT + 1))
    SZ=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f" 2>/dev/null)
    if [ -n "$SZ" ] && [ "$SZ" -gt "$MAX_BYTES" ]; then
        SZ_MB=$((SZ / 1024 / 1024))
        msg "error: file too large - $f (${SZ_MB}MB, max ${MAX_SIZE_MB}MB)"
        FOUND=1
    fi
done < <(git diff --staged --name-only -z 2>/dev/null || true)

if [ "$COUNT" -eq 0 ]; then
    msg "large files: nothing to check (no staged files)"
    exit 0
fi

if [ "$FOUND" -eq 1 ]; then
    msg "large files: FAILED - unstage large files or add to .gitignore"
    exit 1
fi

msg "large files: OK (${COUNT} staged file(s), max ${MAX_SIZE_MB}MB each)"
exit 0
