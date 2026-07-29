"""Génération d'embeddings pour les textes de rêves (DreamBank)."""

import numpy as np

_model = None


def _get_model():
    """Retourne le SentenceTransformer mis en cache (chargement unique)."""
    global _model
    if _model is None:
        from sentence_transformers import SentenceTransformer

        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def embed_dream(text: str) -> np.ndarray:
    """Encode un seul texte de rêve en un vecteur 1D de shape (384,)."""
    model = _get_model()
    return np.asarray(model.encode(text))


def embed_dreams(texts: list[str]) -> np.ndarray:
    """Encode une liste de textes en un tableau 2D de shape (len(texts), 384)."""
    model = _get_model()
    return np.asarray(model.encode(texts))