# Déploiement du backend (Google Cloud Run)

Le backend n'a plus de dépendance ML lourde (torch/transformers/sentence-transformers) :
les modèles sont appelés via l'API HF Inference (`huggingface_hub.InferenceClient`)
au lieu d'être chargés en mémoire. Empreinte mémoire du process : ~140 Mo.

## Prérequis

- Un token HF (`https://huggingface.co/settings/tokens`, lecture seule suffit)
- `gcloud` authentifié, projet GCP avec billing actif

## Déploiement

Depuis la racine du repo (le contexte de build doit être la racine, pour que
`COPY app/`, `COPY src/`, `COPY data/processed/` dans le Dockerfile trouvent
leurs sources) :

```bash
gcloud run deploy projet-reves-api \
  --source . \
  --dockerfile deploy/backend/Dockerfile \
  --region europe-west1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --set-env-vars HF_TOKEN=<ton-token-hf>
```

Cloud Run fournit automatiquement la variable `PORT` (gérée dans le `CMD` du
Dockerfile) et scale à zéro entre les requêtes (pas de coût à l'inactivité).
