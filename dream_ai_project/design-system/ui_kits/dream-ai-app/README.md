# Dream AI — App UI Kit

A high-fidelity, click-through recreation of the **Dream AI** dream-analysis flow. Not production code — cosmetic, modular components you can lift into real designs. Built entirely on the root `../../colors_and_type.css` tokens.

> No source codebase or Figma was provided. This kit interprets the written art-direction brief into the canonical Dream AI experience.

## Run

Open `index.html`. It loads React 18 + Babel (in-browser) + Lucide icons, then the JSX components in order.

## The flow (interactive)

1. **Compose** — editorial hero, dream textarea (serif-italic placeholder), sample-dream chips, coral CTA (disabled until ≥12 chars).
2. **Analyzing** — the named pipeline animates step by step (Saisie → Embedding → Classification → Interprétation → Rêves voisins).
3. **Results** — the dream quoted back, an analysis card (dream-type badge + confidence bar + editorial interpretation), the full classification set with the match emphasised, a latent-space scatter with the user's dream highlighted, and the nearest neighbouring dreams.
4. **History** — a quiet list of recent dreams, color-dotted by type.

Click the chips, hit **Analyser mon rêve**, then **Nouveau rêve** to loop. **Historique** opens the history view.

## Files

| File | Role |
|---|---|
| `index.html` | Entry; script load order. |
| `kit.css` | All component styles, on tokens. |
| `primitives.jsx` | Data (dream types, samples, neighbours), `Logo`, `Button`, `Icon` (Lucide), `DreamBadge`, `AuroraBg`. |
| `Composer.jsx` | Header + hero + dream input + chips. |
| `Pipeline.jsx` | `Pipeline` + `usePipeline` animation hook. |
| `AnalysisResult.jsx` | Badge + confidence bar + interpretation card. |
| `SimilarDreams.jsx` | Neighbour cards with aurora thumbnails. |
| `LatentSpace.jsx` | Organic UMAP-style node scatter with floating label. |
| `App.jsx` | State machine (compose / analyzing / results / history) + the fake `analyze()`. |

## Notes / shortcuts

- `analyze()` is a keyword heuristic, not a model — it just picks a plausible dream-type + interpretation so the UI feels alive.
- Icons are **Lucide via CDN** (substitution — no brand icon set exists). Swap if a real set arrives.
- Components share scope via `window` assignment (in-browser Babel has per-script scope).
- Single centered column ≤720px (≤960px on results) — matches the Streamlit-friendly layout in the root README.
