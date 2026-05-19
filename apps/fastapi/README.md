# FastAPI app

Basic FastAPI app managed with `uv`.

## Prerequisites

- `uv` installed (latest stable recommended)
- Python 3.12+

## Setup

```bash
uv sync
```

## Run

```bash
uv run fastapi dev src/fastapi_app/main.py --host 0.0.0.0 --port 8000
```

Health endpoint:

- `GET /health` -> `{"status":"ok"}`

## Quality checks

```bash
uv run ruff check .
uv run ruff format .
uv run pytest
```
