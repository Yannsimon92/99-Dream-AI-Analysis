"""Tests unitaires pour src.models.embeddings.

Ces tests n'appellent jamais la vraie API HF Inference : `_get_client` est
monkeypatché pour renvoyer un stub imitant
`InferenceClient.feature_extraction`.
"""

import numpy as np
import pytest

import src.models.embeddings as emb


class _StubClient:
    """Client factice : encode déterministe basé sur la longueur du texte."""

    def __init__(self) -> None:
        self.calls = 0

    def feature_extraction(self, texts, model=None):
        self.calls += 1
        if isinstance(texts, str):
            return np.full(384, float(len(texts)), dtype=np.float32)
        arr = np.zeros((len(texts), 384), dtype=np.float32)
        for i, t in enumerate(texts):
            arr[i, :] = float(len(t))
        return arr


def test_embed_dream_shape(monkeypatch: pytest.MonkeyPatch) -> None:
    """embed_dream retourne un np.ndarray de shape (384,)."""
    monkeypatch.setattr(emb, "_get_client", lambda: _StubClient())
    vec = emb.embed_dream("hello world")
    assert isinstance(vec, np.ndarray)
    assert vec.shape == (384,)


def test_embed_dreams_shape(monkeypatch: pytest.MonkeyPatch) -> None:
    """embed_dreams retourne un np.ndarray de shape (n, 384)."""
    monkeypatch.setattr(emb, "_get_client", lambda: _StubClient())
    texts = ["aaa", "bb", "c"]
    mat = emb.embed_dreams(texts)
    assert isinstance(mat, np.ndarray)
    assert mat.shape == (3, 384)


def test_client_created_only_once(monkeypatch: pytest.MonkeyPatch) -> None:
    """Le client sous-jacent n'est instancié qu'une fois (cache de _get_client)."""
    monkeypatch.setattr(emb, "_client", None)

    calls = {"n": 0}

    class _CountedClient(_StubClient):
        def __init__(self) -> None:
            calls["n"] += 1
            super().__init__()

    monkeypatch.setattr(emb, "InferenceClient", _CountedClient)

    emb.embed_dream("x")
    emb.embed_dreams(["a", "b"])
    emb.embed_dream("y")

    assert calls["n"] == 1
