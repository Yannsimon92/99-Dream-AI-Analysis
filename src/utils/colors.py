"""Mapping émotion → couleur pour le pipeline de rêves."""

EMOTION_COLORS: dict[str, str] = {
    "joy": "#e8c870",
    "sadness": "#7e8fb5",
    "fear": "#5070b0",
    "anger": "#b85040",
    "disgust": "#c8d8a0",
    "surprise": "#c898d0",
    "neutral": "#b8ae9c",
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