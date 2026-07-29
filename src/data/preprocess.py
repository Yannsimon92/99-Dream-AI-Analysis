"""Nettoyage et enrichissement du DataFrame DreamBank."""

import numpy as np
import pandas as pd


def clean_dreams(df: pd.DataFrame) -> pd.DataFrame:
    """Retourne une copie nettoyée du DataFrame (dédup, filtre, colonnes calculées)."""
    out = df.copy()
    out = out.drop_duplicates()

    dreams = out["dreams"]
    out = out[dreams.notna() & (dreams.astype(str).str.strip() != "")]

    out["clean_year"] = (
        out["year"].astype(str).str.extract(r"(\d{4})")[0].astype(float)
    )

    out["word_count"] = out["dreams"].astype(str).apply(lambda x: len(x.split())).astype(int)

    def _decade(year: float) -> object:
        if pd.isna(year):
            return np.nan
        return f"{int(year // 10 * 10)}s"

    out["decade"] = out["clean_year"].apply(_decade)

    return out.reset_index(drop=True)