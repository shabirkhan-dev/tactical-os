#!/usr/bin/env bash
# Enforce commit message: first line min length; allow "Merge" / "Revert" / "fixup!" / "squash!".
set -euo pipefail

msg() {
    printf '[git-hooks] %s\n' "$*"
}

MSG_FILE="${1:-.git/COMMIT_EDITMSG}"
if [ ! -f "$MSG_FILE" ]; then
    msg "commit-msg: no message file, skipping"
    exit 0
fi

FIRST=$(head -n1 "$MSG_FILE")
MIN_LEN="${COMMIT_MSG_MIN_LEN:-10}"

case "$FIRST" in
Merge\ *)
    msg "commit-msg: OK (merge commit message allowed)"
    exit 0
    ;;
Revert\ *)
    msg "commit-msg: OK (revert message allowed)"
    exit 0
    ;;
fixup!*)
    msg "commit-msg: OK (fixup allowed)"
    exit 0
    ;;
squash!*)
    msg "commit-msg: OK (squash allowed)"
    exit 0
    ;;
esac

if [[ "$FIRST" =~ ^# ]]; then
    msg "commit-msg: error - first line looks like a comment; write a real subject line"
    exit 1
fi

LEN=${#FIRST}
if [ "$LEN" -lt "$MIN_LEN" ]; then
    msg "commit-msg: error - first line too short (got ${LEN} chars, min ${MIN_LEN})"
    msg "example: feat(scope): short description of change"
    exit 1
fi

msg "commit-msg: OK (first line length ${LEN}, min ${MIN_LEN})"
exit 0
