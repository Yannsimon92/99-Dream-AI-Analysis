"""Tests unitaires pour src.utils.colors."""

import pytest

from src.utils.colors import EMOTION_COLORS, dominant_color, emotion_to_color


def test_emotion_to_color_joy() -> None:
    """emotion_to_color('joy') retourne '#F7CFA8'."""
    assert emotion_to_color("joy") == "#F7CFA8"


@pytest.mark.parametrize(
    "emotion,expected",
    [
        ("fear", "#AEC0F2"),
        ("disgust", "#5E8467"),
        ("neutral", "#B9AF9F"),
        ("sadness", "#6F5FA6"),
    ],
)
def test_emotion_to_color_other_emotions(emotion: str, expected: str) -> None:
    """emotion_to_color retourne la bonne couleur pour les autres émotions du mapping."""
    assert emotion_to_color(emotion) == expected


@pytest.mark.parametrize("label", ["JOY", "Joy", "jOy"])
def test_emotion_to_color_case_insensitive(label: str) -> None:
    """emotion_to_color ignore la casse."""
    assert emotion_to_color(label) == "#F7CFA8"


def test_emotion_to_color_unknown_raises() -> None:
    """emotion_to_color lève ValueError pour une émotion absente du mapping."""
    with pytest.raises(ValueError):
        emotion_to_color("inconnu")


def test_emotion_to_color_covers_all_seven() -> None:
    """Les 7 émotions du modèle sont présentes dans le mapping."""
    assert set(EMOTION_COLORS) == {
        "anger",
        "disgust",
        "fear",
        "joy",
        "neutral",
        "sadness",
        "surprise",
    }


def test_dominant_color_returns_top_emotion_color() -> None:
    """dominant_color retourne la couleur de l'émotion au score max."""
    emotions = {"joy": 0.1, "fear": 0.7, "sadness": 0.2}
    assert dominant_color(emotions) == "#AEC0F2"


def test_dominant_color_empty_raises() -> None:
    """dominant_color lève ValueError pour un dict vide."""
    with pytest.raises(ValueError):
        dominant_color({})


def test_dominant_color_single_entry() -> None:
    """dominant_color fonctionne avec une seule entrée."""
    assert dominant_color({"surprise": 0.9}) == "#C9B6E8"


def test_dominant_color_tie_picks_one() -> None:
    """dominant_color ne lève pas même en cas d'égalité de scores."""
    emotions = {"anger": 0.5, "joy": 0.5}
    result = dominant_color(emotions)
    assert result in {"#A8442A", "#F7CFA8"}
