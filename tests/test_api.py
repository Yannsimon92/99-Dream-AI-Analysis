"""Tests de l'API FastAPI (app/main.py)."""

import pytest
from fastapi.testclient import TestClient

import src.pipeline as pipeline
from app.main import app

client = TestClient(app)


@pytest.fixture(autouse=True)
def _stub_models(monkeypatch: pytest.MonkeyPatch) -> None:
    """Évite d'appeler les vrais modèles transformers (lourds, réseau) pendant les tests API."""
    monkeypatch.setattr(
        pipeline,
        "detect_emotions",
        lambda text: {"joy": 0.6, "fear": 0.25, "sadness": 0.15},
    )
    monkeypatch.setattr(
        pipeline,
        "classify_dream_type",
        lambda text: {"nostalgique": 0.5, "normal": 0.3, "absurde": 0.2},
    )


def test_health() -> None:
    """GET /health doit renvoyer 200 et {"status": "ok"}."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_analyze_valid() -> None:
    """POST /analyze avec un texte valide renvoie la structure attendue."""
    response = client.post("/analyze", json={"text": "Je rêvais d'une forêt lumineuse."})
    assert response.status_code == 200
    data = response.json()

    assert set(data.keys()) == {"type", "emotions", "color", "similar_dreams"}
    assert isinstance(data["type"], str)
    assert isinstance(data["emotions"], dict)
    assert all(isinstance(v, float) for v in data["emotions"].values())
    assert isinstance(data["color"], str)
    assert data["color"].startswith("#")
    assert isinstance(data["similar_dreams"], list)
    assert all(isinstance(d, str) for d in data["similar_dreams"])


def test_analyze_empty() -> None:
    """POST /analyze avec un texte vide doit renvoyer 422."""
    response = client.post("/analyze", json={"text": ""})
    assert response.status_code == 422


def test_analyze_whitespace_only() -> None:
    """POST /analyze avec seulement des espaces doit renvoyer 422."""
    response = client.post("/analyze", json={"text": "   "})
    assert response.status_code == 422