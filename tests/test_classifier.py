"""Tests unitaires pour src.models.classifier.

Ces tests n'appellent jamais la vraie API HF Inference : `_get_client` est
monkeypatché pour renvoyer un stub imitant
`InferenceClient.zero_shot_classification`.
"""

from types import SimpleNamespace

import pytest

import src.models.classifier as clf

EXPECTED_LABELS = [
    "cauchemar",
    "normal",
    "absurde",
    "lucide",
    "nostalgique",
]


class _StubClient:
    """Client factice : renvoie les labels/scores dans un ordre différent de CANDIDATE_LABELS."""

    def __init__(self) -> None:
        self.calls = 0
        self.last_text: str | None = None
        self.last_labels: list[str] | None = None

    def zero_shot_classification(self, text, candidate_labels=None, model=None):
        self.calls += 1
        self.last_text = text
        self.last_labels = list(candidate_labels)
        # Ordre volontairement différent de CANDIDATE_LABELS, scores décroissants.
        shuffled = ["absurde", "normal", "cauchemar", "nostalgique", "lucide"]
        scores = [0.5, 0.3, 0.1, 0.07, 0.03]
        return [SimpleNamespace(label=lbl, score=score) for lbl, score in zip(shuffled, scores)]


def _install_stub(monkeypatch: pytest.MonkeyPatch) -> _StubClient:
    stub = _StubClient()
    monkeypatch.setattr(clf, "_get_client", lambda: stub)
    return stub


def test_classify_dream_type_returns_five_keys(monkeypatch: pytest.MonkeyPatch) -> None:
    """classify_dream_type renvoie exactement les 5 labels candidats en floats."""
    _install_stub(monkeypatch)
    result = clf.classify_dream_type("un texte de rêve")
    assert set(result.keys()) == set(EXPECTED_LABELS)
    assert all(isinstance(v, float) for v in result.values())


def test_classify_dream_type_preserves_label_score_associations(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """Les associations label->score sont fidèles même si l'ordre du stub diffère."""
    stub = _install_stub(monkeypatch)
    text = "un texte de rêve"
    result = clf.classify_dream_type(text)
    raw = stub.zero_shot_classification(text, candidate_labels=clf.CANDIDATE_LABELS)
    expected = {r.label: float(r.score) for r in raw}
    assert result == expected


@pytest.mark.parametrize("text", ["", "   "])
def test_classify_dream_type_rejects_blank(text: str, monkeypatch: pytest.MonkeyPatch) -> None:
    """Les textes vides ou pur-espace lèvent ValueError sans appeler _get_client."""
    stub = _install_stub(monkeypatch)
    with pytest.raises(ValueError):
        clf.classify_dream_type(text)
    assert stub.calls == 0


def test_get_client_created_only_once(monkeypatch: pytest.MonkeyPatch) -> None:
    """_get_client ne crée le client qu'une seule fois même après plusieurs appels."""
    monkeypatch.setattr(clf, "_client", None)

    calls = {"n": 0}

    class _CountedClient(_StubClient):
        def __init__(self) -> None:
            calls["n"] += 1
            super().__init__()

    monkeypatch.setattr(clf, "InferenceClient", _CountedClient)

    clf.classify_dream_type("rêve un")
    clf.classify_dream_type("rêve deux")
    clf.classify_dream_type("rêve trois")

    assert calls["n"] == 1
