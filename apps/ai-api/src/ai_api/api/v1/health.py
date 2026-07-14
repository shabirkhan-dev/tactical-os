from fastapi import APIRouter

from ai_api.api.deps import SettingsDep
from ai_api.schemas.health import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health(settings: SettingsDep) -> HealthResponse:
    return HealthResponse(
        status="ok",
        service=settings.app_name,
        provider=settings.ai_provider,
        environment=settings.environment,
    )
