"""API FastAPI minimale pour l'analyse de rêves."""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.pipeline import analyze_dream

app = FastAPI(title="Projet Rêves API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DreamRequest(BaseModel):
    """Requête contenant le récit de rêve à analyser."""

    text: str


class DreamResponse(BaseModel):
    """Réponse d'analyse d'un rêve."""

    type: str
    emotions: dict[str, float]
    color: str
    similar_dreams: list[str]


@app.post("/analyze", response_model=DreamResponse)
def analyze(request: DreamRequest) -> DreamResponse:
    """Analyse un rêve et renvoie son interprétation."""
    try:
        result = analyze_dream(request.text)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    return DreamResponse(**result)


@app.get("/health")
def health() -> dict[str, str]:
    """Healthcheck simple."""
    return {"status": "ok"}