#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE_NAME="${CLOUD_RUN_SERVICE:-projet-reves-api}"
REGION="${CLOUD_RUN_REGION:-europe-west1}"
STAGING="$(mktemp -d)"

echo "Staging deploy context in $STAGING"
cp -r "$REPO_ROOT/app" "$STAGING/app"
cp -r "$REPO_ROOT/src" "$STAGING/src"
cp "$REPO_ROOT/deploy/backend/Dockerfile" "$STAGING/Dockerfile"
cp "$REPO_ROOT/deploy/backend/requirements.txt" "$STAGING/requirements.txt"
mkdir -p "$STAGING/data/processed"
cp -r "$REPO_ROOT/data/processed/." "$STAGING/data/processed/"

HF_TOKEN="${HF_TOKEN:-$(hf auth token)}"

echo "Deploying to Cloud Run: $SERVICE_NAME ($REGION)"
gcloud run deploy "$SERVICE_NAME" \
  --source "$STAGING" \
  --region "$REGION" \
  --allow-unauthenticated \
  --memory 512Mi \
  --set-env-vars "HF_TOKEN=${HF_TOKEN}"

rm -rf "$STAGING"
