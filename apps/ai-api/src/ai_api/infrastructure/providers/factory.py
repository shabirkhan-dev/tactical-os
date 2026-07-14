from ai_api.config.settings import Settings
from ai_api.domain.ports import LlmProvider
from ai_api.infrastructure.providers.mock_provider import MockLlmProvider
from ai_api.infrastructure.providers.openai_compatible import OpenAICompatibleProvider


def create_llm_provider(settings: Settings) -> LlmProvider:
    if settings.ai_provider == "openai_compatible":
        return OpenAICompatibleProvider(settings)
    return MockLlmProvider()
