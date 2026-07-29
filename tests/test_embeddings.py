"""Tests unitaires pour src.models.embeddings.

Ces tests ne téléchargent jamais le vrai modèle `all-MiniLM-L6-v2` et ne
requièrent pas que `sentence_transformers` / `torch` soient installés :
l'import de `src.models.embeddings` est paresseux sur `sentence_transformers`,
et `_get_model` est monkeypatché ou contourné via un faux module injecté dans
`sys.modules`.
"""

import sys
import types

import numpy as np
import pytest

import src.models.embeddings as emb


class _StubModel:
    """Modèle factice : encode détermiste basé sur la longueur du texte."""

    def __init__(self, name: str) -> None:
        self.name = name

    def encode(self, texts, **kwargs):
        if isinstance(texts, str):
            return np.full(384, float(len(texts)), dtype=np.float32)
        arr = np.zeros((len(texts), 384), dtype=np.float32)
        for i, t in enumerate(texts):
            arr[i, :] = float(len(t))
        return arr


def test_embed_dream_shape(monkeypatch: pytest.MonkeyPatch) -> None:
    """embed_dream retourne un np.ndarray de shape (384,)."""
    monkeypatch.setattr(emb, "_get_model", lambda: _StubModel("stub"))
    vec = emb.embed_dream("hello world")
    assert isinstance(vec, np.ndarray)
    assert vec.shape == (384,)


def test_embed_dreams_shape(monkeypatch: pytest.MonkeyPatch) -> None:
    """embed_dreams retourne un np.ndarray de shape (n, 384)."""
    monkeypatch.setattr(emb, "_get_model", lambda: _StubModel("stub"))
    texts = ["aaa", "bb", "c"]
    mat = emb.embed_dreams(texts)
    assert isinstance(mat, np.ndarray)
    assert mat.shape == (3, 384)


def test_model_loaded_only_once(monkeypatch: pytest.MonkeyPatch) -> None:
    """Le constructeur sous-jacent n'est appelé qu'une fois (cache de _get_model)."""
    monkeypatch.setattr(emb, "_model", None)

    calls = {"n": 0}

    class _CountedModel(_StubModel):
        def __init__(self, name: str) -> None:
            calls["n"] += 1
            super().__init__(name)

    fake_mod = types.ModuleType("sentence_transformers")
    fake_mod.SentenceTransformer = _CountedModel
    monkeypatch.setitem(sys.modules, "sentence_transformers", fake_mod)

    emb.embed_dream("x")
    emb.embed_dreams(["a", "b"])
    emb.embed_dream("y")

    assert calls["n"] == 1