"""Détection d'émotions sur des textes de rêves (DreamBank)."""

_model = None


def _get_model():
    """Retourne le pipeline transformers de classification d'émotions mis en cache."""
    global _model
    if _model is None:
        from transformers import pipeline

        _model = pipeline(
            "text-classification",
            model="j-hartmann/emotion-english-distilroberta-base",
            top_k=None,
        )
    return _model


def detect_emotions(text: str) -> dict[str, float]:
    """Retourne un dict {emotion_label: score} pour les 7 émotions du texte."""
    if not text or not text.strip():
        raise ValueError("text ne doit pas être vide ni réduit à des espaces")

    model = _get_model()
    raw = model(text)
    entries = raw[0] if raw and isinstance(raw[0], list) else raw
    return {entry["label"]: float(entry["score"]) for entry in entries}