"""Pipeline d'analyse de rêves (placeholder temporaire)."""

# TEMPORAIRE : cette fonction retourne des données fixes en attendant que
# les modules src/models/classifier.py, src/models/emotions.py et
# src/utils/colors.py soient implémentés et branchés ici.


def analyze_dream(text: str) -> dict:
    """Analyse un récit de rêve et renvoie un résumé structuré (placeholder)."""
    if not text or not text.strip():
        raise ValueError("Le texte du rêve ne peut pas être vide.")

    return {
        "type": "nostalgique",
        "emotions": {
            "joie": 0.4,
            "peur": 0.25,
            "surprise": 0.2,
            "tristesse": 0.15,
        },
        "color": "#E4A672",
        "similar_dreams": [
            "Je retrouvais mon grand-père dans la maison de mon enfance.",
            "Une voix familière me murmurait des conseils pendant la nuit.",
            "Des photos anciennes prenaient vie sous mes yeux endormis.",
        ],
    }