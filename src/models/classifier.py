"""Classification zero-shot du type de rêve (dataset DreamBank)."""

from huggingface_hub import InferenceClient

CANDIDATE_LABELS: list[str] = ["cauchemar", "normal", "absurde", "lucide", "nostalgique"]
_CLASSIFIER_MODEL = "valhalla/distilbart-mnli-12-1"

_client = None


def _get_client() -> InferenceClient:
    """Retourne le client HF Inference mis en cache (instanciation unique)."""
    global _client
    if _client is None:
        _client = InferenceClient()
    return _client


def classify_dream_type(text: str) -> dict[str, float]:
    """Retourne un dict {label: score} pour les 5 types de rêves candidats."""
    if not text or not text.strip():
        raise ValueError("text ne doit pas être vide ni réduit à des espaces")

    client = _get_client()
    results = client.zero_shot_classification(text, candidate_labels=CANDIDATE_LABELS, model=_CLASSIFIER_MODEL)
    return {r.label: float(r.score) for r in results}
