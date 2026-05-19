# Git hooks (Lefthook)

Hooks are wired in root `lefthook.yml`. After clone, run `bun run prepare` to install.

Each shell hook prints lines prefixed with **`[git-hooks]`** so you always see whether it passed, skipped, or failed, even when there is nothing to do.

## Pre-commit (order)

| Step | What it does |
|------|----------------|
| **trailing-whitespace** | Strips trailing whitespace from staged text files and re-stages; reports count or “nothing to do” |
| **format** | `bun run format` |
| **lint** | `bun run lint:fix` |
| **typecheck** | `bun run typecheck` |
| **architecture** | `bun run architecture:check` |
| **large-files** | Fails if any staged file is larger than `MAX_SIZE_MB` (default **2**); reports OK when under limit |
| **secrets** | Scans **added** lines in the staged diff for common secret patterns (private keys, AWS-style keys, long `api_key` / `password` assignments, etc.). The diff of `scripts/git-hooks/check-secrets.sh` itself is excluded so regex literals in that file do not false-positive. |

## Commit-msg

- First line must be at least **10** characters (override: `COMMIT_MSG_MIN_LEN=20`).
- **Merge**, **Revert**, **fixup!**, **squash!** messages are allowed without the length check.
- A first line that looks like a comment (`# …`) is rejected with a clear error.

## Optional: stronger secret scanning

For deeper scanning (e.g. high-entropy strings), install [gitleaks](https://github.com/gitleaks/gitleaks) and add a pre-commit step that runs `gitleaks protect --staged --no-banner`.
