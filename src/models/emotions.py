"""Détection d'émotions sur des textes de rêves (DreamBank)."""

from huggingface_hub import InferenceClient

_EMOTION_MODEL = "j-hartmann/emotion-english-distilroberta-base"

_client = None


def _get_client() -> InferenceClient:
    """Retourne le client HF Inference mis en cache (instanciation unique)."""
    global _client
    if _client is None:
        _client = InferenceClient()
    return _client


def detect_emotions(text: str) -> dict[str, float]:
    """Retourne un dict {emotion_label: score} pour les 7 émotions du texte."""
    if not text or not text.strip():
        raise ValueError("text ne doit pas être vide ni réduit à des espaces")

    client = _get_client()
    results = client.text_classification(text, model=_EMOTION_MODEL, top_k=7)
    return {r.label: float(r.score) for r in results}
