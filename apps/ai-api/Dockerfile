FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1 \
	UV_LINK_MODE=copy \
	PYTHONUNBUFFERED=1

COPY apps/ai-api/pyproject.toml apps/ai-api/uv.lock apps/ai-api/README.md ./
COPY apps/ai-api/src ./src

RUN uv sync --frozen --no-dev

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "ai_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
