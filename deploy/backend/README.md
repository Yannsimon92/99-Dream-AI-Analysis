---
title: Projet Reves API
emoji: 🌙
colorFrom: purple
colorTo: pink
sdk: docker
app_port: 7860
pinned: false
---

# Projet Rêves — API

API FastAPI d'analyse de rêves (émotions, type, couleur, rêves similaires) — dataset DreamBank.

`POST /analyze` `{"text": "..."}` → `{"type", "emotions", "color", "similar_dreams"}`
`GET /health`

Code source complet : https://github.com/Yannsimon92/99-Dream-AI-Analysis
