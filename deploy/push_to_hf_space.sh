#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SPACE_ID="${HF_SPACE_ID:-ynomis2/projet-reves-api}"
STAGING="$(mktemp -d)"

echo "Staging deploy context in $STAGING"
cp -r "$REPO_ROOT/app" "$STAGING/app"
cp -r "$REPO_ROOT/src" "$STAGING/src"
cp "$REPO_ROOT/deploy/backend/Dockerfile" "$STAGING/Dockerfile"
cp "$REPO_ROOT/deploy/backend/README.md" "$STAGING/README.md"
cp "$REPO_ROOT/deploy/backend/requirements.txt" "$STAGING/requirements.txt"
mkdir -p "$STAGING/data/processed"
cp -r "$REPO_ROOT/data/processed/." "$STAGING/data/processed/"

echo "Pushing to HF Space: $SPACE_ID"
hf upload "$SPACE_ID" "$STAGING" . --type space --commit-message "Deploy from local build"

echo "Done. Space: https://huggingface.co/spaces/$SPACE_ID"
rm -rf "$STAGING"
