"""Tests unitaires pour src.models.classifier.

Ces tests ne téléchargent jamais le vrai modèle
`facebook/bart-large-mnli` et ne requièrent pas que `transformers` / `torch`
soient installés : `_get_model` est monkeypatché pour renvoyer un stub
callable imitant le comportement d'un pipeline zero-shot-classification
appelé avec `(text, candidate_labels)`.
"""

import pytest

import src.models.classifier as clf

EXPECTED_LABELS = [
    "cauchemar",
    "normal",
    "absurde",
    "lucide",
    "nostalgique",
]


class _StubPipeline:
    """Pipeline factice : retourne les labels/scores dans un ordre différent de CANDIDATE_LABELS."""

    def __init__(self) -> None:
        self.calls = 0
        self.last_text: str | None = None
        self.last_labels: list[str] | None = None

    def __call__(self, text, candidate_labels):
        self.calls += 1
        self.last_text = text
        self.last_labels = list(candidate_labels)
        # Ordre volontairement différent de CANDIDATE_LABELS, scores décroissants.
        shuffled = ["absurde", "normal", "cauchemar", "nostalgique", "lucide"]
        scores = [0.5, 0.3, 0.1, 0.07, 0.03]
        return {"sequence": text, "labels": shuffled, "scores": scores}


def _install_stub(monkeypatch: pytest.MonkeyPatch) -> _StubPipeline:
    stub = _StubPipeline()
    monkeypatch.setattr(clf, "_get_model", lambda: stub)
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
    raw = stub(text, clf.CANDIDATE_LABELS)
    expected = {label: float(score) for label, score in zip(raw["labels"], raw["scores"])}
    assert result == expected


@pytest.mark.parametrize("text", ["", "   "])
def test_classify_dream_type_rejects_blank(text: str, monkeypatch: pytest.MonkeyPatch) -> None:
    """Les textes vides ou pur-espace lèvent ValueError sans appeler _get_model."""
    stub = _install_stub(monkeypatch)
    with pytest.raises(ValueError):
        clf.classify_dream_type(text)
    assert stub.calls == 0


def test_get_model_loaded_only_once(monkeypatch: pytest.MonkeyPatch) -> None:
    """_get_model ne charge le pipeline qu'une seule fois même après plusieurs appels."""
    monkeypatch.setattr(clf, "_model", None)

    calls = {"n": 0}

    class _CountedPipeline:
        def __init__(self, *args, **kwargs) -> None:
            calls["n"] += 1

        def __call__(self, text, candidate_labels):
            return {
                "sequence": text,
                "labels": list(candidate_labels),
                "scores": [0.0] * len(candidate_labels),
            }

    import sys
    import types

    fake_mod = types.ModuleType("transformers")
    fake_mod.pipeline = lambda *a, **kw: _CountedPipeline()
    monkeypatch.setitem(sys.modules, "transformers", fake_mod)

    clf.classify_dream_type("rêve un")
    clf.classify_dream_type("rêve deux")
    clf.classify_dream_type("rêve trois")

    assert calls["n"] == 1