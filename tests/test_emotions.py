"""Tests unitaires pour src.models.emotions.

Ces tests n'appellent jamais la vraie API HF Inference : `_get_client` est
monkeypatché pour renvoyer un stub imitant `InferenceClient.text_classification`.
"""

from types import SimpleNamespace

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


class _StubClient:
    """Client factice : renvoie les 7 émotions avec des scores déterministes."""

    def __init__(self) -> None:
        self.calls = 0
        self.last_text: str | None = None

    def text_classification(self, text, model=None, top_k=None):
        self.calls += 1
        self.last_text = text
        base = float(len(text))
        return [
            SimpleNamespace(label=label, score=round(0.1 + (base + i) / 100.0, 6))
            for i, label in enumerate(EXPECTED_EMOTIONS)
        ]


def _install_stub(monkeypatch: pytest.MonkeyPatch) -> _StubClient:
    stub = _StubClient()
    monkeypatch.setattr(emo, "_get_client", lambda: stub)
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
    raw = stub.text_classification(text, model=None, top_k=7)
    expected = {r.label: float(r.score) for r in raw}
    assert result == expected
    assert abs(sum(result.values()) - sum(expected.values())) == 0.0


@pytest.mark.parametrize("text", ["", "   "])
def test_detect_emotions_rejects_blank(text: str, monkeypatch: pytest.MonkeyPatch) -> None:
    """Les textes vides ou pur-espace lèvent ValueError sans appeler _get_client."""
    stub = _install_stub(monkeypatch)
    with pytest.raises(ValueError):
        emo.detect_emotions(text)
    assert stub.calls == 0


def test_get_client_created_only_once(monkeypatch: pytest.MonkeyPatch) -> None:
    """_get_client ne crée le client qu'une seule fois même après plusieurs appels."""
    monkeypatch.setattr(emo, "_client", None)

    calls = {"n": 0}

    class _CountedClient(_StubClient):
        def __init__(self) -> None:
            calls["n"] += 1
            super().__init__()

    monkeypatch.setattr(emo, "InferenceClient", _CountedClient)

    emo.detect_emotions("rêve un")
    emo.detect_emotions("rêve deux")
    emo.detect_emotions("rêve trois")

    assert calls["n"] == 1
