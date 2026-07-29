"""Tests unitaires pour find_similar (index FAISS réel en mémoire, sans réseau).

Aucun téléchargement du modèle `all-MiniLM-L6-v2`, aucun appel à
`load_dreambank`/`clean_dreams` : `_get_index` et `embed_dream` sont remplacés
par des fakes construisant un petit index FAISS `IndexFlatL2` déterministe.
"""

import numpy as np
import pytest

import src.models.embeddings as emb

DIM = 384
CORPUS = [f"rêve {i}" for i in range(5)]


def _build_fake_index():
    """Construit un vrai IndexFlatL2 sur un corpus factice déterministe."""
    import faiss

    vectors = np.array(
        [np.full(DIM, float(i), dtype=np.float32) for i in range(len(CORPUS))],
        dtype=np.float32,
    )
    index = faiss.IndexFlatL2(DIM)
    index.add(vectors)
    return index


def _patch_fakes(monkeypatch: pytest.MonkeyPatch, query_value: float = 2.0) -> dict:
    """Monkeypatche `_get_index` et `embed_dream` et renvoie des compteurs d'appels."""
    calls = {"get_index": 0, "embed_dream": 0}
    index = _build_fake_index()

    def fake_get_index() -> tuple:
        calls["get_index"] += 1
        return index, list(CORPUS)

    def fake_embed_dream(text: str) -> np.ndarray:
        calls["embed_dream"] += 1
        return np.full(DIM, float(query_value), dtype=np.float32)

    monkeypatch.setattr(emb, "_get_index", fake_get_index)
    monkeypatch.setattr(emb, "embed_dream", fake_embed_dream)
    return calls


def test_find_similar_k1_returns_closest(monkeypatch: pytest.MonkeyPatch) -> None:
    """k=1 renvoie une liste de longueur 1 contenant le texte le plus proche."""
    calls = _patch_fakes(monkeypatch, query_value=2.0)
    result = emb.find_similar("un texte", k=1)
    assert len(result) == 1
    assert result[0] == CORPUS[2]
    assert calls["get_index"] == 1
    assert calls["embed_dream"] == 1


def test_find_similar_k3_ordered(monkeypatch: pytest.MonkeyPatch) -> None:
    """k=3 renvoie 3 textes distincts ordonnés par proximité croissante."""
    _patch_fakes(monkeypatch, query_value=2.0)
    result = emb.find_similar("un texte", k=3)
    assert len(result) == 3
    assert len(set(result)) == 3
    assert result[0] == CORPUS[2]
    distances = [abs(2.0 - CORPUS.index(t)) for t in result]
    assert distances == sorted(distances)
    assert set(result) == {CORPUS[2], CORPUS[1], CORPUS[3]}


def test_find_similar_k_larger_than_corpus(monkeypatch: pytest.MonkeyPatch) -> None:
    """k > taille du corpus n'échoue pas et renvoie au plus len(corpus) résultats."""
    _patch_fakes(monkeypatch, query_value=2.0)
    result = emb.find_similar("un texte", k=100)
    assert len(result) <= len(CORPUS)
    assert len(result) == len(CORPUS)
    assert len(set(result)) == len(CORPUS)


def test_find_similar_empty_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    """Texte vide lève ValueError sans appeler _get_index ni embed_dream."""
    calls = _patch_fakes(monkeypatch)
    with pytest.raises(ValueError):
        emb.find_similar("")
    assert calls["get_index"] == 0
    assert calls["embed_dream"] == 0


def test_find_similar_whitespace_raises(monkeypatch: pytest.MonkeyPatch) -> None:
    """Texte d'espaces lève ValueError sans appeler _get_index ni embed_dream."""
    calls = _patch_fakes(monkeypatch)
    with pytest.raises(ValueError):
        emb.find_similar("   ")
    assert calls["get_index"] == 0
    assert calls["embed_dream"] == 0
