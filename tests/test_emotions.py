"""Tests unitaires pour src.models.emotions.

Ces tests ne téléchargent jamais le vrai modèle
`j-hartmann/emotion-english-distilroberta-base` et ne requièrent pas que
`transformers` / `torch` soient installés : `_get_model` est monkeypatché
pour renvoyer un stub callable imitant le comportement d'un pipeline
transformers appelé avec `(text, top_k=None)`.
"""

import pytest

import src.models.emotions as emo

EXPECTED_EMOTIONS = [
    "anger",
    "disgust",
    "fear",
    "joy",
    "neutral",
    "sadness",
    "surprise",
]


class _StubPipeline:
    """Pipeline factice : retourne les 7 émotions avec des scores déterministes."""

    def __init__(self) -> None:
        self.calls = 0
        self.last_text: str | None = None

    def __call__(self, text, top_k=None):
        self.calls += 1
        self.last_text = text
        base = float(len(text))
        scores = {
            label: round(0.1 + (base + i) / 100.0, 6)
            for i, label in enumerate(EXPECTED_EMOTIONS)
        }
        return [[{"label": lbl, "score": scores[lbl]} for lbl in EXPECTED_EMOTIONS]]


def _install_stub(monkeypatch: pytest.MonkeyPatch) -> _StubPipeline:
    stub = _StubPipeline()
    monkeypatch.setattr(emo, "_get_model", lambda: stub)
    return stub


def test_detect_emotions_returns_seven_keys(monkeypatch: pytest.MonkeyPatch) -> None:
    """detect_emotions renvoie exactement les 7 émotions attendues en floats."""
    _install_stub(monkeypatch)
    result = emo.detect_emotions("un texte de rêve")
    assert set(result.keys()) == set(EXPECTED_EMOTIONS)
    assert all(isinstance(v, float) for v in result.values())


def test_detect_emotions_preserves_scores(monkeypatch: pytest.MonkeyPatch) -> None:
    """Les scores retournés correspondent à ceux fournis par le stub sans altération."""
    stub = _install_stub(monkeypatch)
    text = "un texte de rêve"
    result = emo.detect_emotions(text)
    raw = stub(text, top_k=None)[0]
    expected = {entry["label"]: float(entry["score"]) for entry in raw}
    assert result == expected
    assert abs(sum(result.values()) - sum(expected.values())) == 0.0


@pytest.mark.parametrize("text", ["", "   "])
def test_detect_emotions_rejects_blank(text: str, monkeypatch: pytest.MonkeyPatch) -> None:
    """Les textes vides ou pur-espace lèvent ValueError sans appeler _get_model."""
    stub = _install_stub(monkeypatch)
    with pytest.raises(ValueError):
        emo.detect_emotions(text)
    assert stub.calls == 0


def test_get_model_loaded_only_once(monkeypatch: pytest.MonkeyPatch) -> None:
    """_get_model ne charge le pipeline qu'une seule fois même après plusieurs appels."""
    monkeypatch.setattr(emo, "_model", None)

    calls = {"n": 0}

    class _CountedPipeline:
        def __init__(self, *args, **kwargs) -> None:
            calls["n"] += 1

        def __call__(self, text, top_k=None):
            return [[{"label": lbl, "score": 0.0} for lbl in EXPECTED_EMOTIONS]]

    import sys
    import types

    fake_mod = types.ModuleType("transformers")
    fake_mod.pipeline = lambda *a, **kw: _CountedPipeline()
    monkeypatch.setitem(sys.modules, "transformers", fake_mod)

    emo.detect_emotions("rêve un")
    emo.detect_emotions("rêve deux")
    emo.detect_emotions("rêve trois")

    assert calls["n"] == 1