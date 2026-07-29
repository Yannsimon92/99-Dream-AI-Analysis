"""Chargement et mise en cache du dataset DreamBank."""

from pathlib import Path

import pandas as pd

_REPO_ROOT = Path(__file__).resolve().parents[2]
_CACHE_PATH = _REPO_ROOT / "data" / "raw" / "dreambank.parquet"
_REMOTE_URL = (
    "hf://datasets/DReAMy-lib/DreamBank-dreams-en/data/"
    "train-00000-of-00001-24937aef854be1c9.parquet"
)


def load_dreambank(force_download: bool = False) -> pd.DataFrame:
    """Charge le dataset DreamBank depuis le cache local ou la source HuggingFace."""
    if not force_download and _CACHE_PATH.exists():
        return pd.read_parquet(_CACHE_PATH)

    df = pd.read_parquet(_REMOTE_URL)
    _CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    df.to_parquet(_CACHE_PATH, index=False)
    return df