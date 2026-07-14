from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ai_api import __version__
from ai_api.api.v1 import api_router
from ai_api.config.settings import get_settings


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
	get_settings()
	yield


def create_app() -> FastAPI:
	settings = get_settings()
	app = FastAPI(
		title=settings.app_name,
		version=__version__,
		lifespan=lifespan,
	)
	app.add_middleware(
		CORSMiddleware,
		allow_origins=settings.cors_origin_list,
		allow_credentials=True,
		allow_methods=["GET", "POST", "OPTIONS"],
		allow_headers=["Authorization", "Content-Type", "X-AI-Service-Token", "X-User-Id"],
	)
	app.include_router(api_router, prefix=settings.api_prefix)
	return app


app = create_app()


def run() -> None:
	import uvicorn

	settings = get_settings()
	uvicorn.run(
		"ai_api.main:app",
		host="0.0.0.0",
		port=settings.port,
		reload=settings.environment == "development",
	)
