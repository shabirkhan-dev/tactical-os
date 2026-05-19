#!/usr/bin/env bash
# Scan *added* lines in staged diff for common secret patterns. Exit 1 if likely secrets found.
set -euo pipefail

msg() {
    printf '[git-hooks] %s\n' "$*"
}

TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

# Exclude this script from the diff: its PATTERN strings contain substrings (e.g. BEGIN PRIVATE KEY)
# that would otherwise match our own regexes and fail the hook when editing check-secrets.sh.
SCAN_EXCLUDE=':(exclude)scripts/git-hooks/check-secrets.sh'

if ! git diff --staged -U0 -- . "$SCAN_EXCLUDE" >"$TMP" 2>/dev/null; then
    msg "secrets: nothing to scan (no staged diff)"
    exit 0
fi

if [ ! -s "$TMP" ]; then
    msg "secrets: nothing to scan (empty staged diff)"
    exit 0
fi

# Added lines in unified diff start with '+' (not '-' or context). Skip +++ headers: those are "+++ b/path".
# Patterns: private keys, AWS-style keys, generic api_key/password in assignments.
PATTERNS=(
    '^\+[^+].*-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----'
    '^\+[^+].*-----BEGIN OPENSSH PRIVATE KEY-----'
    '^\+[^+].*(aws_access_key_id|aws_secret_access_key)\s*=\s*["\047]?[A-Za-z0-9/+=]{20,}'
    '^\+[^+].*(api[_-]?key|apikey)\s*=\s*["\047]?[A-Za-z0-9_\-]{20,}'
    '^\+[^+].*(password|passwd|secret)\s*=\s*["\047][^"\047]{8,}'
    '^\+[^+].*(Bearer|Authorization)\s*:\s*["\047]?[A-Za-z0-9_\-.]{20,}'
)

FOUND=0
for pat in "${PATTERNS[@]}"; do
    if grep -qE "$pat" "$TMP" 2>/dev/null; then
        msg "secrets: possible secret matched pattern -"
        grep -nE "$pat" "$TMP" | head -5
        FOUND=1
    fi
done

if [ "$FOUND" -eq 1 ]; then
    msg "secrets: FAILED - remove or rotate secrets; use env vars or a secrets manager"
    exit 1
fi

msg "secrets: OK (staged diff scanned, no obvious secret patterns on added lines)"
exit 0
