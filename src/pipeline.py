"""Pipeline d'analyse de rêves."""

from src.models.classifier import classify_dream_type
from src.models.embeddings import find_similar
from src.models.emotions import detect_emotions
from src.utils.colors import dominant_color


def analyze_dream(text: str) -> dict:
    """Analyse un récit de rêve et renvoie un résumé structuré."""
    if not text or not text.strip():
        raise ValueError("Le texte du rêve ne peut pas être vide.")

    emotions = detect_emotions(text)
    type_scores = classify_dream_type(text)
    dominant_type = max(type_scores, key=type_scores.get)

    return {
        "type": dominant_type,
        "emotions": emotions,
        "color": dominant_color(emotions),
        "similar_dreams": find_similar(text, k=5),
    }