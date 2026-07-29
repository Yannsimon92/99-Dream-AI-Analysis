"""Classification zero-shot du type de rêve (dataset DreamBank)."""

_model = None

CANDIDATE_LABELS: list[str] = ["cauchemar", "normal", "absurde", "lucide", "nostalgique"]


def _get_model():
    """Retourne le pipeline transformers zero-shot-classification mis en cache."""
    global _model
    if _model is None:
        from transformers import pipeline

        _model = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    return _model


def classify_dream_type(text: str) -> dict[str, float]:
    """Retourne un dict {label: score} pour les 5 types de rêves candidats."""
    if not text or not text.strip():
        raise ValueError("text ne doit pas être vide ni réduit à des espaces")

    model = _get_model()
    raw = model(text, CANDIDATE_LABELS)
    return {label: float(score) for label, score in zip(raw["labels"], raw["scores"])}