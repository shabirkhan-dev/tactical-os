#!/usr/bin/env bash
# Strip trailing whitespace from staged text files and re-stage.
# Text detection: grep -qI skips binary (see grep(1)).
set -euo pipefail

msg() {
    printf '[git-hooks] %s\n' "$*"
}

FIXED=0
CHECKED=0
while IFS= read -r -d '' f; do
    [ -z "$f" ] && continue
    [ ! -f "$f" ] && continue
    if grep -qI . "$f" 2>/dev/null; then
        CHECKED=$((CHECKED + 1))
        TMPF=$(mktemp)
        if sed 's/[[:space:]]*$//' "$f" >"$TMPF" && ! cmp -s "$f" "$TMPF"; then
            mv "$TMPF" "$f"
            git add "$f"
            FIXED=$((FIXED + 1))
            msg "fixed trailing whitespace: $f"
        else
            rm -f "$TMPF"
        fi
    fi
done < <(git diff --staged --name-only -z 2>/dev/null || true)

if [ "$CHECKED" -eq 0 ]; then
    msg "trailing whitespace: nothing to do (no staged text files)"
elif [ "$FIXED" -eq 0 ]; then
    msg "trailing whitespace: OK (${CHECKED} staged text file(s), no fixes needed)"
else
    msg "trailing whitespace: done (${FIXED} file(s) fixed and re-staged)"
fi
exit 0
