"""Mapping émotion → couleur pour le pipeline de rêves."""

EMOTION_COLORS: dict[str, str] = {
    "joy": "#F7CFA8",
    "sadness": "#6F5FA6",
    "fear": "#AEC0F2",
    "anger": "#A8442A",
    "disgust": "#5E8467",
    "surprise": "#C9B6E8",
    "neutral": "#B9AF9F",
}


def emotion_to_color(emotion: str) -> str:
    """Retourne le code hex de la couleur associée à une émotion (insensible à la casse)."""
    if not isinstance(emotion, str):
        raise ValueError(f"emotion doit être une str, reçu {type(emotion).__name__}")
    color = EMOTION_COLORS.get(emotion.lower())
    if color is None:
        raise ValueError(f"Émotion inconnue : {emotion !r} (attendues : {sorted(EMOTION_COLORS)})")
    return color


def dominant_color(emotions: dict[str, float]) -> str:
    """Retourne la couleur de l'émotion au score le plus élevé dans le dict donné."""
    if not emotions:
        raise ValueError("emotions ne doit pas être vide")
    top_emotion = max(emotions, key=emotions.get)
    return emotion_to_color(top_emotion)