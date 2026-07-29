# Website UI kit — Cartographie des rêves

A high-fidelity, responsive (desktop + mobile) recreation of the marketing
site for the dream-analysis product, built in the **"Cream & Blobs"** language.
It's a click-through prototype, not production code — cosmetic fidelity over
real functionality.

## Run it

Open `index.html`. It loads the shared foundations
(`../../colors_and_type.css`, `../../components.css`) plus `site.css`, then
mounts the React app from the JSX files below.

## Files

| File | Role |
|---|---|
| `index.html` | Mounts the app, loads React + Babel + all JSX |
| `site.css` | All website-specific layout, components & responsive rules |
| `site-nav.jsx` | `Nav` (sticky, mobile drawer), `Hero`, `Footer`, inline `Icon` |
| `site-sections.jsx` | `Pipeline`, `Gallery`, `Manifesto`, `DreamModal` + dream/step data |
| `site-app.jsx` | `App` root — state (modal, tweaks), Tweaks panel |
| `tweaks-panel.jsx` | Tweaks shell (host protocol + controls) |

## Screens / sections covered

- **Nav** — sticky translucent bar (blur 20px), wordmark + monogram, links,
  outline CTA. Collapses to a hamburger + serif-italic drawer under 860px.
- **Hero** — Fraunces display with terracotta italic, italic subtitle, primary +
  ghost CTAs, and a slow-drifting three-blob cluster (blur 60px).
- **Pipeline** ("Comment ça marche") — the five-step `ds-step` row with inline
  emotion blobs; wraps to 2-col on tablet, then mobile.
- **Gallery** — 3-col grid of public "dreams"; each card is a glowing emotion
  blob + italic title + emotion pill + author. Hover lifts the card and grows
  the glow. Click opens the modal.
- **Dream modal** — full reading of a dream: big emotion orb, emotion breakdown
  bars (colour = emotion), and an "Écouter la restitution" play button.
- **Manifesto** — centred big-quote section.
- **Footer** — wordmark + three link columns, hairline top border.

## Interactions

- Sticky nav, smooth-scroll anchors, mobile drawer toggle.
- Gallery card → dream modal (backdrop blur, click-out / × to close).
- **Tweaks** (toggle from the toolbar): **Accent** colour (drives the global
  `--terracotta`, so every italic highlight + primary button follows it) and
  **Hero alignment** (left / center).

## Responsive

Breakpoints at **860px** (nav → drawer, pipeline 2-col, gallery 2-col) and
**560px** (tighter padding, hero orb hidden, single-column gallery/pipeline).

## Notes / cut corners

- Icons are tiny inline hairline SVGs (menu / × / play) to stay offline-safe and
  match the documented Lucide style — swap for Lucide proper in production.
- All "dreams" are in-world sample data; the play button and CTAs are inert.
- Copy is **French with English brand keywords**, per the chosen direction.
