# App UI kit — Cartographie des rêves (mobile)

A high-fidelity, click-through recreation of the **iOS dream-analysis app**, in
the "Cream & Blobs" language, inside a realistic iPhone frame. Cosmetic
fidelity over real functionality.

## Run it

Open `index.html`. It loads the shared foundations
(`../../colors_and_type.css`, `../../components.css`) + `app.css`, the iOS
device frame, and the React screens.

## Files

| File | Role |
|---|---|
| `index.html` | Mounts the app + iPhone frame, loads everything |
| `app.css` | All screen layouts, components, tab bar, transitions |
| `ios-frame.jsx` | iPhone bezel / status bar / home indicator (starter component) |
| `app-shared.jsx` | Inline hairline `AppIcon` set, emotion→colour map, sample data, `TabBar` |
| `screens-a.jsx` | `HomeScreen`, `ComposeScreen`, `AnalyseScreen` |
| `screens-b.jsx` | `ResultScreen` (cartographie), `PlayScreen`, `JournalScreen`, `ProfilScreen` |
| `app-main.jsx` | Flow controller (state machine), Tweaks panel |
| `tweaks-panel.jsx` | Tweaks shell |

## The flow

`Accueil → Raconter un rêve → Saisie (auto-typing) → Analyse (loading onirique)
→ Cartographie (résultat) → Écouter la restitution (lecture)`. A glass **tab
bar** (Accueil · Journal · ＋ · Profil) persists on the three top-level screens;
the ＋ jumps straight into composing.

## Screens

- **Accueil** — greeting in Fraunces + terracotta italic, today's emotion
  **aura** (concentric rings + blurred core), primary CTA, recent entries.
- **Saisie** — free-text dream capture that types itself in (serif, terracotta
  caret), mic / keyboard affordances, "Analyser ce rêve".
- **Analyse** — meditative loading: three pulsing overlapping blobs + cycling
  pipeline steps; auto-advances after ~3s.
- **Cartographie (résultat)** — the emotion map. **Two variants** (Tweak):
  *blobs* (a constellation of sized, positioned emotion blobs) or *bars* (a
  ranked list with coloured fills). Dominant emotion called out in Fraunces.
- **Lecture** — full-bleed generated-dream gradient + veil, emotion tag pills,
  play / scrub controls, "Voir la forme 3D".
- **Journal** — month-grouped list of past dreams, each with its emotion orb.
- **Profil** — avatar blob, streak, stat cards, settings rows.

## Tweaks (toolbar)

- **Accent** colour — drives the global `--terracotta` (titles, buttons, dials).
- **Cartographie** — switch the result screen between *blobs* and *bars*.
- A "Revenir à l'accueil" button to restart the flow.

## Notes / cut corners

- Icons are inline hairline SVGs (`AppIcon`) matching the documented Lucide
  style; swap for Lucide proper in production.
- Generated dream "images" are gradients keyed to the dominant emotion; audio &
  3D-form buttons are inert. All data is in-world sample content.
- Status-bar text is the iOS default black (reads fine on cream).
- Screen entrance uses a fade; a `prefers-reduced-motion` fallback keeps content
  visible when motion is disabled.
