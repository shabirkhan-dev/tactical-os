from fastapi import APIRouter, HTTPException, status

from ai_api.api.deps import AssistServiceDep, InternalAuthDep
from ai_api.domain.errors import ProviderError
from ai_api.domain.ports import ChatMessage
from ai_api.schemas.assist import AssistRequest, AssistResponse

router = APIRouter(tags=["assist"])


@router.post("/assist", response_model=AssistResponse)
async def assist(
    body: AssistRequest,
    service: AssistServiceDep,
    _: InternalAuthDep,
) -> AssistResponse:
    messages = [ChatMessage(role=item.role, content=item.content) for item in body.messages]
    try:
        result = await service.assist(messages=messages, context=body.context)
    except ProviderError as error:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail={"code": error.code, "message": error.message},
        ) from error

    return AssistResponse(reply=result.content, provider=result.provider, model=result.model)
