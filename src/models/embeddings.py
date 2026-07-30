"""Génération d'embeddings pour les textes de rêves (DreamBank)."""

import json
from pathlib import Path

import faiss
import numpy as np
from huggingface_hub import InferenceClient

_REPO_ROOT = Path(__file__).resolve().parents[2]
_INDEX_PATH = _REPO_ROOT / "data" / "processed" / "faiss_index.bin"
_TEXTS_PATH = _REPO_ROOT / "data" / "processed" / "dream_texts.json"

_EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

_client = None


def _get_client() -> InferenceClient:
    """Retourne le client HF Inference mis en cache (instanciation unique)."""
    global _client
    if _client is None:
        _client = InferenceClient()
    return _client


def embed_dream(text: str) -> np.ndarray:
    """Encode un seul texte de rêve en un vecteur 1D de shape (384,)."""
    client = _get_client()
    return np.asarray(client.feature_extraction(text, model=_EMBEDDING_MODEL))


def embed_dreams(texts: list[str]) -> np.ndarray:
    """Encode une liste de textes en un tableau 2D de shape (len(texts), 384)."""
    client = _get_client()
    return np.asarray(client.feature_extraction(texts, model=_EMBEDDING_MODEL))


_index = None
_index_texts: list[str] | None = None


def _get_index() -> tuple:
    """Construit (ou charge depuis le disque) et met en cache l'index FAISS sur le corpus DreamBank nettoyé."""
    global _index, _index_texts
    if _index is not None and _index_texts is not None:
        return _index, _index_texts

    if _INDEX_PATH.exists() and _TEXTS_PATH.exists():
        _index = faiss.read_index(str(_INDEX_PATH))
        _index_texts = json.loads(_TEXTS_PATH.read_text(encoding="utf-8"))
        return _index, _index_texts

    from src.data.load import load_dreambank
    from src.data.preprocess import clean_dreams

    df = clean_dreams(load_dreambank())
    texts = df["dreams"].tolist()
    vectors = embed_dreams(texts)
    index = faiss.IndexFlatL2(vectors.shape[1])
    index.add(vectors.astype("float32"))

    _INDEX_PATH.parent.mkdir(parents=True, exist_ok=True)
    faiss.write_index(index, str(_INDEX_PATH))
    _TEXTS_PATH.write_text(json.dumps(texts, ensure_ascii=False), encoding="utf-8")

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