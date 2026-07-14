from typing import Literal

from pydantic import BaseModel, Field


class AssistMessage(BaseModel):
	role: Literal["user", "assistant", "system"]
	content: str = Field(min_length=1, max_length=8_000)


class AssistRequest(BaseModel):
	messages: list[AssistMessage] = Field(min_length=1, max_length=40)
	context: str | None = Field(
		default=None,
		max_length=4_000,
		description="Optional UI/page context the assistant may use.",
	)


class AssistResponse(BaseModel):
	reply: str
	provider: str
	model: str
