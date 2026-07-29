"""Pipeline d'analyse de rêves."""

from src.models.emotions import detect_emotions
from src.utils.colors import dominant_color

# TEMPORAIRE : type et similar_dreams restent fixes en attendant que
# src/models/classifier.py (classification) et la recherche FAISS
# (src/models/embeddings.find_similar, pas encore implémentée) soient
# branchés ici.
_PLACEHOLDER_TYPE = "nostalgique"
_PLACEHOLDER_SIMILAR_DREAMS = [
    "Je retrouvais mon grand-père dans la maison de mon enfance.",
    "Une voix familière me murmurait des conseils pendant la nuit.",
    "Des photos anciennes prenaient vie sous mes yeux endormis.",
]


def analyze_dream(text: str) -> dict:
    """Analyse un récit de rêve et renvoie un résumé structuré."""
    if not text or not text.strip():
        raise ValueError("Le texte du rêve ne peut pas être vide.")

    emotions = detect_emotions(text)

    return {
        "type": _PLACEHOLDER_TYPE,
        "emotions": emotions,
        "color": dominant_color(emotions),
        "similar_dreams": _PLACEHOLDER_SIMILAR_DREAMS,
    }