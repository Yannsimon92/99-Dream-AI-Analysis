---
name: dream-ai-design
description: Use this skill to generate well-branded interfaces and assets for Dream AI ("Analyse / Cartographie Rêves") — the "Cream & Blobs" dream-analysis design system — either for production or throwaway prototypes/mocks/decks. Contains essential design guidelines, colors, type, fonts, reference imagery, reusable component CSS, and an editorial deck template.
user-invocable: true
---

# Dream AI — "Cream & Blobs"

Read **`README.md`** first — it holds the full context, content fundamentals,
visual foundations and iconography. Then explore the other files:

- `colors_and_type.css` — all design tokens (colors, type scale, spacing,
  motion) plus semantic type roles. Load this before anything else.
- `components.css` — reusable primitives: blobs, pills, cards, section blocks,
  dividers, em-dash lists, pipeline steps, moodboard grid, todo grid, fade-up.
- `assets/imagery/` — reference / mood imagery (blob maps, constellations,
  liminal figures). Copy these out when you need atmosphere.
- `preview/` — small specimen cards for every foundation & component.
- `slides/` — an editorial deck template (`index.html` + JSX slide archetypes:
  cover, section, pipeline, approach, moodboard, big-quote). Copy a slide
  component as the starting point for a new deck.

## How to work with this system

- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets
  you need into your working folder, link `colors_and_type.css` +
  `components.css`, and build static HTML for the user to view.
- **Production code**: read the rules here and reuse the tokens to become an
  expert in designing with this brand.

## Non-negotiables (the short version)

- Warm **cream** backgrounds, never dark mode. Near-black warm-brown ink.
- Two fonts only: **Fraunces** (always weight 300; keyword *italics* in
  terracotta) for emotion; **JetBrains Mono** (300 body / 400–500 labels) for
  rigour.
- **Blobs** are the signature — blurred, organic, background-only, max 4 per
  surface, never carry text. Each emotion maps to one blob colour.
- Subtle **dot grid** behind every surface. Flat — no box-shadows; depth comes
  from blurred blobs under translucent white surfaces with hairline borders.
- Muted accents only (terracotta / soft blue / violet). No vivid colour.
- Gentle motion: staggered fade-up (0.7s) on enter, horizontal slide on nav.
- **No emoji.** Icons are hairline Lucide in circular chips; ✦ is the one
  "AI / magic" glyph.
- Editorial minimalism — one idea per surface, generous whitespace, no classic
  bullet lists (use em-dash detail lists).

If invoked without guidance, ask what the user wants to build, ask a few
focused questions, then act as an expert designer who outputs HTML artifacts
or production code as needed.
