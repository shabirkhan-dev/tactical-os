from main import health, home


def test_health() -> None:
    assert health() == {"status": "ok"}


def test_home() -> None:
    assert home() == {"message": "welcome"}
