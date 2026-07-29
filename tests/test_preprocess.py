"""Tests unitaires pour src.data.preprocess.clean_dreams."""

import math

import pandas as pd

from src.data.preprocess import clean_dreams


def _sample_df() -> pd.DataFrame:
    return pd.DataFrame(
        {
            "dreams": [
                "I was flying over the city 3",  # 7 mots
                "I was flying over the city 3",  # doublon de la ligne précédente
                "   ",  # whitespace uniquement -> supprimé
                None,  # null -> supprimé
                "A short dream.",  # 3 mots
            ],
            "series": ["a", "a", "b", "c", "d"],
            "year": ["1994", "1994", "1960-1997", "2001", "2010"],
            "gender": ["M", "M", "F", "F", "M"],
        }
    )


def test_dedu_and_empty_null_removal() -> None:
    df = clean_dreams(_sample_df())

    assert len(df) == 2
    # Les doublons (lignes 0 et 1 identiques) -> une seule conservée
    # whitespace-only (index 2) et None (index 3) supprimés
    # reste : "I was flying over the city 3" et "A short dream."


def test_no_mutation_of_input() -> None:
    original = _sample_df()
    original_cols = original.columns.tolist()
    original_shape = original.shape
    _ = clean_dreams(original)
    assert original.columns.tolist() == original_cols
    assert original.shape == original_shape


def test_word_count() -> None:
    df = clean_dreams(_sample_df())
    # "I was flying over the city 3" -> 7 mots ; "A short dream." -> 3 mots
    counts = sorted(df["word_count"].tolist())
    assert counts == [3, 7]
    assert df["word_count"].dtype.kind in {"i", "u"}


def test_clean_year_extraction_from_range_and_single() -> None:
    df = clean_dreams(_sample_df())
    by_year = df.sort_values("dreams").set_index("clean_year")
    # "A short dream." (year 2010) -> 2010.0 ; "I was flying over the city 3" (year 1994) -> 1994.0
    assert by_year.loc[2010.0, "dreams"] == "A short dream."
    assert by_year.loc[1994.0, "dreams"] == "I was flying over the city 3"


def test_clean_year_extraction_from_year_range() -> None:
    df_in = pd.DataFrame(
        {
            "dreams": ["a dream with a year range"],
            "series": ["a"],
            "year": ["1960-1997"],
            "gender": ["M"],
        }
    )
    df = clean_dreams(df_in)
    assert df.loc[0, "clean_year"] == 1960.0
    assert df.loc[0, "decade"] == "1960s"


def test_decade_from_clean_year() -> None:
    df = clean_dreams(_sample_df())
    # clean_year 1994 -> "1990s" ; clean_year 2010 -> "2010s"
    decade_by_year = df.set_index("clean_year")["decade"]
    assert decade_by_year.loc[1994.0] == "1990s"
    assert decade_by_year.loc[2010.0] == "2010s"


def test_missing_year_gives_nan_decade_and_clean_year() -> None:
    df_in = pd.DataFrame(
        {
            "dreams": ["no year here", "with year"],
            "series": ["x", "y"],
            "year": ["no digits", "1988"],
            "gender": ["M", "F"],
        }
    )
    df = clean_dreams(df_in)
    assert len(df) == 2
    row_no_year = df.loc[df["dreams"] == "no year here"].iloc[0]
    assert isinstance(row_no_year["clean_year"], float) and math.isnan(
        row_no_year["clean_year"]
    )
    assert pd.isna(row_no_year["decade"])  # type: ignore[arg-type]
    row_year = df.loc[df["dreams"] == "with year"].iloc[0]
    assert row_year["clean_year"] == 1988.0


def test_index_reset() -> None:
    df = clean_dreams(_sample_df())
    assert df.index.tolist() == list(range(len(df)))