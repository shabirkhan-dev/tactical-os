from fastapi import FastAPI

app = FastAPI(title="School OS FastAPI", version="0.1.0")


@app.get("/")
def home() -> dict[str, str]:
    return {"message": "welcome"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
