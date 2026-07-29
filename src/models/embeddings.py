"""Génération d'embeddings pour les textes de rêves (DreamBank)."""

import faiss
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
    return np.asarray(model.encode(texts, show_progress_bar=True))


_index = None
_index_texts: list[str] | None = None


def _get_index() -> tuple:
    """Construit et met en cache l'index FAISS sur le corpus DreamBank nettoyé."""
    global _index, _index_texts
    if _index is not None and _index_texts is not None:
        return _index, _index_texts
    from src.data.load import load_dreambank
    from src.data.preprocess import clean_dreams

    df = clean_dreams(load_dreambank())
    texts = df["dreams"].tolist()
    vectors = embed_dreams(texts)
    index = faiss.IndexFlatL2(vectors.shape[1])
    index.add(vectors.astype("float32"))
    _index = index
    _index_texts = texts
    return _index, _index_texts


def find_similar(text: str, k: int = 5) -> list[str]:
    """Retourne les k textes de rêve les plus proches de `text` (similarité L2)."""
    if not text or not text.strip():
        raise ValueError("text must be a non-empty, non-whitespace string")
    index, texts = _get_index()
    query = embed_dream(text).astype("float32").reshape(1, -1)
    distances, indices = index.search(query, min(k, len(texts)))
    return [texts[i] for i in indices[0] if i != -1]