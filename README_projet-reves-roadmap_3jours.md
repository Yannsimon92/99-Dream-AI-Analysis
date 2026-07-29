# 🌙 Analyse / Cartographie Rêves

> Écouter / lire des rêves. Les analyser et transformer en expérience sensorielle — émotions, couleurs, images, sons.

---

## Équipe

| Qui | Focus |
|-----|-------|
| Personne A | Data + NLP + Embeddings |
| Personne B | ML / DL — Classification + Émotions |
| Personne C | Frontend Streamlit + Dataviz |

> Gestion agile — ownership par feature, pas de rôles figés. On s'entraide selon la charge.

---

## Stack

| Couche | Outil |
|--------|-------|
| Data | Pandas, NumPy |
| NLP | HuggingFace Transformers, sentence-transformers |
| Embeddings | `all-MiniLM-L6-v2` |
| Classification | BART-large-MNLI (zero-shot) + Logistic Regression / SVM (benchmark) |
| Émotions | `emotion-english-distilroberta-base` (7 émotions) |
| Clustering | KMeans, UMAP / t-SNE |
| Vectorisation | FAISS |
| Frontend | Streamlit |
| Dataviz | Plotly |
| Versioning | Git / GitHub |

---

## Datasets

| Dataset | Source | Usage |
|---------|--------|-------|
| **DreamBank-dreams-en** | [HuggingFace](https://huggingface.co/datasets/DReAMy-lib/DreamBank-dreams-en) | ~20 000 rêves — base principale |
| **Our Dreams, Our Selves** | [Dryad](https://datadryad.org/dataset/doi:10.5061/dryad.qbzkh18fr) | Classification Hall–Van de Castle |
| *(Dream Symbols)* | [Kaggle](https://www.kaggle.com/datasets/michaelberger/dream-symbols) | Inspiration symbolique (non scientifique) |

---

## Roadmap — 3 jours

### Jour 1 · Setup + Data + Premiers modèles

**Objectif : tout le monde peut run le projet, les données sont prêtes, premiers résultats NLP.**

#### Matin

| Qui | Tâche | Livrable |
|-----|-------|----------|
| **Tous** | Setup environnement | Repo Git, `requirements.txt`, structure dossiers, `.env` |
| **Tous** | Exploration du dataset DreamBank | Notebook `01_exploration.ipynb` — stats, distribution, qualité |

```
dream-ai/
├── README.md
├── requirements.txt
├── .env
├── .gitignore
├── data/
│   └── raw/
├── notebooks/
│   ├── 01_exploration.ipynb
│   ├── 02_preprocessing.ipynb
│   ├── 03_classification.ipynb
│   └── 04_emotions.ipynb
├── src/
│   ├── data/
│   │   ├── load.py
│   │   └── preprocess.py
│   ├── models/
│   │   ├── embeddings.py
│   │   ├── classifier.py
│   │   └── emotions.py
│   └── utils/
│       └── colors.py
├── app/
│   └── streamlit_app.py
└── tests/
```

#### Après-midi

| Qui | Tâche | Livrable |
|-----|-------|----------|
| **A** | Chargement dataset HuggingFace + nettoyage (texte, longueur, NaN, doublons) | `src/data/load.py` + `preprocess.py` |
| **A** | Premiers embeddings `all-MiniLM-L6-v2` sur un sample | `src/models/embeddings.py` — fonction `embed_dream(text) → vector` |
| **B** | Classification zero-shot BART sur 100 rêves test | `notebooks/03_classification.ipynb` — labels : cauchemar / normal / absurde / lucide / nostalgique |
| **B** | Analyse émotionnelle DistilRoBERTa sur le même sample | `notebooks/04_emotions.ipynb` — 7 émotions avec scores |
| **C** | Squelette Streamlit — input texte + affichage placeholder | `app/streamlit_app.py` — tourne en local, accepte un texte |
| **C** | Recherche du corpus Dryad — explorer la classification Hall–Van de Castle | Notes dans le notebook exploration |

#### ✅ Checkpoint Jour 1

- [ ] Repo Git fonctionnel, tout le monde peut `git pull` et `streamlit run`
- [ ] Dataset chargé et nettoyé (DataFrame propre)
- [ ] Embeddings fonctionnels sur un sample
- [ ] Classification zero-shot donne des résultats cohérents
- [ ] Émotions détectées sur quelques rêves
- [ ] Streamlit basique qui tourne

---

### Jour 2 · Pipeline complet + Clustering + Intégration

**Objectif : le pipeline fonctionne de bout en bout. Un rêve entré → classification + émotion + couleur. Premiers clusters.**

#### Matin

| Qui | Tâche | Livrable |
|-----|-------|----------|
| **A** | Embeddings sur tout le dataset (~20k rêves) | Fichier `embeddings.npy` ou parquet avec vecteurs |
| **A** | Index FAISS — recherche de rêves similaires | `src/models/embeddings.py` — fonction `find_similar(text, k=5) → list[dreams]` |
| **B** | Benchmark Logistic Regression / SVM sur les labels Dryad (si exploitables) ou labels zero-shot | Notebook + métriques (accuracy, F1) |
| **B** | Mapping émotion → couleur | `src/utils/colors.py` — fonction `emotion_to_color(emotion) → hex` |
| **C** | Intégration classification + émotions dans Streamlit | L'utilisateur entre un texte → voit le type de rêve + émotions |

#### Après-midi

| Qui | Tâche | Livrable |
|-----|-------|----------|
| **A** | KMeans sur les embeddings (méthode du coude, silhouette score) | Notebook + nombre optimal de clusters |
| **A** | UMAP / t-SNE — réduction dimensionnelle pour visualisation | Coordonnées 2D/3D pour chaque rêve |
| **B** | Pipeline unifié : `analyze_dream(text) → dict` | `src/models/` — une fonction qui renvoie {type, emotions, color, similar_dreams} |
| **B** | Tests du pipeline sur 10-20 rêves variés | Vérification qualitative des résultats |
| **C** | Affichage couleur du rêve dans Streamlit | Bloc coloré avec l'émotion dominante |
| **C** | Affichage rêves similaires | Section "Rêves similaires" avec les 3-5 plus proches |

#### ✅ Checkpoint Jour 2

- [ ] Pipeline complet : texte → type + émotions + couleur + rêves similaires
- [ ] FAISS index fonctionne (recherche en < 1s)
- [ ] Clusters identifiés (nombre optimal défini)
- [ ] Coordonnées UMAP/t-SNE calculées
- [ ] Streamlit affiche : classification, émotions, couleur, rêves similaires
- [ ] Métriques de classification documentées

---

### Jour 3 · Dataviz + Cartographie + Polish

**Objectif : la démo est présentable. Cartographie 3D des rêves, journal, polish UI.**

#### Matin

| Qui | Tâche | Livrable |
|-----|-------|----------|
| **A** | Cartographie 3D interactive des rêves (Plotly scatter 3D avec UMAP) | Visualisation où chaque point = un rêve, couleur = cluster ou émotion |
| **A** | Le rêve de l'utilisateur est placé dans la carte | Point highlighted dans le scatter |
| **B** | Ajout input vocal Whisper (si temps) ou amélioration du pipeline | Speech-to-text ou fine-tuning des labels |
| **B** | Stats sur le dataset — distribution émotions, types, longueurs | Données prêtes pour la dataviz |
| **C** | Intégration de la cartographie 3D dans Streamlit | Page "Latent Dream Space" |
| **C** | Design de l'interface — couleurs, layout, direction artistique | Application du design system (crème, blobs, Fraunces) |

#### Après-midi

| Qui | Tâche | Livrable |
|-----|-------|----------|
| **A** | Documentation technique — README final, docstrings | README complet avec instructions d'installation |
| **B** | Tests finaux — edge cases, rêves courts, rêves longs, textes absurdes | Bug fixes |
| **C** | Polish Streamlit — multi-pages, navigation, loading states | App propre et démo-ready |
| **Tous** | Run-through de la démo ensemble | Scénario de démo validé |

#### ✅ Checkpoint Jour 3

- [ ] Cartographie 3D interactive fonctionnelle
- [ ] Rêve de l'utilisateur positionné dans l'espace latent
- [ ] Interface Streamlit propre et navigable
- [ ] Direction artistique appliquée
- [ ] Démo de bout en bout qui tourne sans bug
- [ ] README finalisé

---

## Démo — Scénario type

```
1. L'utilisateur ouvre l'app
2. Il écrit (ou dicte) son rêve
3. L'app affiche :
   - Type de rêve (cauchemar, lucide, nostalgique…)
   - Émotions détectées (joie 40%, peur 25%, surprise 20%…)
   - Couleur attribuée au rêve
   - 3-5 rêves similaires dans la base DreamBank
   - Position du rêve dans la cartographie 3D
4. L'utilisateur explore la carte des rêves
```

---

## Extensions futures (si temps)

- 🎨 Génération d'image (Stable Diffusion XL)
- 🔮 Blob 3D animé réagissant aux émotions (Three.js)
- 🎵 Ambiance sonore (MusicGen-small / AudioLDM)
- 📓 Journal des rêves avec couleurs par jour
- 📅 Timeline entre 2 dates
- 📊 Stats de rêves récurrents
- 🧠 FreudGPT vs JungGPT — deux interprétations
- 🗺️ Constellation de rêves (rêves similaires reliés)
- 🌍 Partage anonyme — inconscient collectif

---

## Installation

```bash
# Cloner le repo
git clone https://github.com/[votre-repo]/dream-ai.git
cd dream-ai

# Créer l'environnement
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Lancer l'app
streamlit run app/streamlit_app.py
```

## Requirements (à compléter)

```
streamlit
pandas
numpy
transformers
sentence-transformers
faiss-cpu
datasets
plotly
umap-learn
scikit-learn
torch
```

---

## Métriques à suivre

| Métrique | Cible | Modèle |
|----------|-------|--------|
| Accuracy classification | > 70% | BART zero-shot ou SVM |
| Silhouette score (clustering) | > 0.3 | KMeans |
| Temps de réponse pipeline | < 3s | Pipeline complet |
| Nombre de clusters | 5-10 | Méthode du coude |

---

## Risques & mitigations

| Risque | Impact | Plan B |
|--------|--------|--------|
| Embeddings de 20k rêves trop lents | Jour 2 bloqué | Travailler sur un sample de 5k d'abord |
| Classification zero-shot peu convaincante | Résultats flous | Fallback sur SVM avec labels Dryad |
| UMAP/t-SNE pas lisible visuellement | Cartographie illisible | Réduire à 2D, ajuster les paramètres |
| Streamlit trop lent avec les modèles | Démo lente | Pré-calculer embeddings + cache Streamlit |
| Whisper trop lourd | Pas d'input vocal | Rester en texte seul pour la V1 |

---

*Dream AI — Le Wagon · 2025*
