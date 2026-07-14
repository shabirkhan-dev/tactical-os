import secrets

from fastapi import Header

from ai_api.config.settings import Settings
from ai_api.domain.errors import UnauthorizedServiceError


def verify_service_token(
	settings: Settings,
	*,
	authorization: str | None,
	service_token: str | None,
) -> None:
	expected = settings.ai_service_token.get_secret_value()
	presented: str | None = None

	if service_token:
		presented = service_token.strip()
	elif authorization and authorization.lower().startswith("bearer "):
		presented = authorization[7:].strip()

	if not presented or not secrets.compare_digest(presented, expected):
		raise UnauthorizedServiceError()


async def require_service_token(
	settings: Settings,
	authorization: str | None = Header(default=None),
	x_ai_service_token: str | None = Header(default=None, alias="X-AI-Service-Token"),
) -> None:
	verify_service_token(settings, authorization=authorization, service_token=x_ai_service_token)
