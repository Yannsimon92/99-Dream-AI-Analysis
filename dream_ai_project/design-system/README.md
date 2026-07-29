# Dream AI — Design System

**Dream AI** is a web app that analyses and generates dreams. A user writes their dream in plain language; the product embeds it, classifies its emotional register and dream-type, interprets it editorially, and places it in a *latent space* alongside similar dreams from the corpus.

The aesthetic keyword is **Dreamcore · surréalisme numérique · espace latent** — soft, poetic, scientific-poster-meets-journaling-app, **always light mode, never dark**. Warm sand backgrounds, blurred aurora blobs (rose / lavender / periwinkle / peach), an editorial serif-italic voice for emotion, and an airy sans for the interface. Coral/rust is the single warm action color.

The product is bilingual-leaning **French-first** (copy examples here are in French). It is intended to ship as **Streamlit** or plain **HTML/CSS**, so this system is token-first and component-first rather than framework-bound.

> ⚠️ **No source files were attached** — this system was built from a written art-direction brief and moodboard description, not from an existing codebase or Figma. There is no canonical logo; the wordmark here is a typographic proposal. Treat everything as a v1 to react to.

---

## Sources

- **Brief**: written art-direction spec (palette, type, components, usage rules) — provided in-chat, not as a file.
- **Moodboard** (described, not attached): warm cream background, aurora gradient blobs, editorial serif-italic titles, minimal mobile journaling UI with colored content bubbles, organic scatter/blob dataviz of a dream latent space, coral/rust editorial accents, "dreamy scientific poster" with concentric rings + annotations.
- No GitHub repo, no Figma URL, no codebase path was supplied.

---

## Content Fundamentals

**Language.** French-first, informal. The product addresses the user as **« tu »** ("Raconte-moi ton rêve", "Analyser mon rêve"), which sets an intimate, confidant tone — closer to a journal than a clinical tool.

**Voice — two registers, mirroring the type system:**
- *Editorial / interpretive copy* (the serif-italic voice): warm, literary, a little oracular but never mystical-kitsch. It speaks **about** the dream. e.g. *"Tu sembles chercher un contrôle sur une situation qui t'échappe."* — observational, second person, present tense, no jargon.
- *Interface copy* (the sans voice): plain, short, lowercase-leaning sentence case. Buttons are verbs in the imperative ("Analyser mon rêve", "Voir l'historique"). Labels are terse nouns ("Espace latent", "Confiance", "Rêves voisins").

**Casing.** Sentence case everywhere for prose and buttons. ALL-CAPS only for tiny tracked labels/eyebrows (`.ds-label`, +0.14em). Never title-case headlines.

**Numbers & data.** State confidence and similarity as plain percentages with a soft qualifier ("confiance · 84%", "92% proche"). Tabular-numerals for any aligned figures. Don't over-quantify — one or two numbers per card, max.

**Emoji.** **None.** The brand expresses warmth through color, type and aurora — not emoji. Avoid unicode-symbol icons too.

**Vibe.** Poetic but precise. A line of editorial serif should feel like it could open a paragraph in a literary magazine; the surrounding UI should feel like a calm, well-lit research tool. *Examples that fit:* "Chaque rêve trouve ses voisins." · "Raconte-moi ton rêve, sans filtre…" *Examples that don't:* "🌙 Unlock your subconscious!!!", "AI-POWERED DREAM DECODER".

---

## Visual Foundations

**Color.** Warm, low-saturation, light. The page is sand (`--bg #EDE8DF`); surfaces are a rosé-white (`--surface #FBF7F1`) or faintly rosé (`--surface-rose #FAF2F0`). Text is warm espresso, **never `#000`**. A single coral/rust (`--accent #C85B3A`) carries all primary action and editorial highlight; lavender (`--accent-2 #9385C0`) is the quiet secondary. Aurora hues (rose/violet/periwinkle/peach) are **decoration only** — backgrounds and dataviz, never text or buttons. Dream-types each own a tint+ink pair.

**Type.** Two families. **Playfair Display Italic** for emotion (H1/H2, dream quotes, accent words, the input placeholder). **DM Sans** — light/airy, slightly tracked — for everything that is interface (H3 down, body, labels, data). The serif is always *italic*; the sans is upright. Full scale in `colors_and_type.css` (`.ds-h1`…`.ds-label`). Minimum body size 15px, default 17px.

**Spacing.** Base-4 scale (4 · 8 · 12 · 16 · 24 · 32 · 48 · 64). Generous — the layout breathes; whitespace is part of the calm.

**Backgrounds.** Flat warm sand, occasionally lifted by **aurora blobs**: large (`160–280px`), `border-radius:50%`, `filter:blur(60px)`, `opacity .4–.55`, `mix-blend-mode:multiply` over a light surface, built from a `radial-gradient`. **Max 2–3 blobs per screen.** No photographic imagery in the core flow; the "imagery" is generative aurora. No repeating patterns, no noise/grain by default.

**Gradients.** Only two sanctioned uses: (1) aurora blobs, (2) the confidence/data bar (lavender→coral). Never gradient-fill buttons, text, or large surfaces. Absolutely no bluish-purple SaaS gradients.

**Shadows.** Soft and **color-tinted (lavender/rose), never black.** `--shadow-sm/md/lg` use `rgba(140,118,170,…)`; the CTA gets a coral glow (`--shadow-coral`). Shadows are diffuse and low-contrast — elevation is a whisper.

**Borders.** Hairline, warm (`--border #D6CBBA`, `--border-soft #E4DCCF`). 1–1.5px. Used on inputs and quiet cards; raised cards lean on shadow instead.

**Corner radii.** Generous. Cards `16px` (md) → `24px` (lg); inputs `24px`; badges & buttons full `pill` (999px); thumbnails `10px`. Nothing sharp.

**Cards.** Rosé-white or sand-100 fill, `radius-md/lg`, soft tinted shadow, optional hairline border. Quiet by default; never heavy.

**Animation.** Slow and fluid — *oneiric*. Durations 200–460ms, default ~320ms. Easing `--ease-dream cubic-bezier(0.22,1,0.36,1)` (gentle overshoot-free settle). Transitions favor opacity + transform fades and soft scale; aurora blobs may drift very slowly. **No bounces, no snappy springs, no spinners-as-personality.**

**Hover states.** Primary button darkens (coral-500→600) and scales up slightly (`scale(1.035)`). Cards lift (shadow-sm→md) and may translate up 2px. Links shift to `--lav-600`. Hovers are gentle, never high-contrast.

**Press states.** Darken further (coral-700) and **shrink** (`scale(0.97)`). Quick (200ms).

**Focus.** 4px soft lavender ring (`--ring`, `color-mix` of lavender at 55%) plus border color shift to lavender. Visible but soft.

**Transparency & blur.** Reserved for aurora (blur) and the focus ring (alpha). Avoid frosted-glass panels in the core flow — they muddy the warm sand. A faint inset highlight (`--shadow-inset`) is allowed on raised surfaces.

**Imagery vibe.** Warm, soft-focus, low-saturation. When real imagery is eventually added it should read like dawn light — never cool, never high-contrast, never b&w. Until then, aurora blobs stand in as generative thumbnails.

---

## Iconography

There is **no brand icon set** in the source material (no codebase, no Figma). The brief explicitly avoids emoji and decorative unicode.

**Recommendation (flagged substitution):** use **[Lucide](https://lucide.dev)** via CDN — thin, rounded-cap, 1.5–1.75px stroke icons that match the airy, soft personality. Color them `--ink-2` at rest, `--accent` when active. Keep them sparse: icons support labels, they don't replace them.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<!-- <i data-lucide="moon"></i> then lucide.createIcons() -->
```

Suggested set: `moon`, `sparkles`, `wand-2`, `git-compare`, `scatter-chart`, `history`, `arrow-right`, `chevron-right`, `x`, `loader`. Use the *moon* and *sparkles* glyphs sparingly as the only lightly thematic icons.

- **Logo / wordmark:** typographic — *Dream* in Playfair italic + *AI* in DM Sans (coral), preceded by a small aurora-gradient dot as the "mark". See `preview/brand-logo.html`. This is a proposal, not a delivered logo — replace with a real mark when available.
- No SVG illustration library exists yet; the generative aurora blob *is* the illustration system. Do not hand-draw surreal SVG scenes.

> ⚠️ Lucide is a substitution chosen to fit the aesthetic, not a brand-mandated set. Confirm or swap.

---

## Layout & Grid

- **Shape:** single-column, centered, scroll-driven — it reads like a calm document, not a dashboard. No persistent sidebar in the core analyse-flow (a thin left rail for history is optional on desktop).
- **Max content width:** **720px** for the reading/analysis column; up to **960px** for the latent-space / dataviz view. Center within the viewport with generous gutters.
- **Responsive stance:** **Desktop-first but mobile-safe** for a Streamlit target — Streamlit centers a single column by default, which suits this layout. Stack everything; never rely on multi-column at narrow widths. Hit targets ≥ 44px.
- The aurora blobs sit *behind* the column at the page edges, bleeding off-canvas.

---

## Accessibility

- Body and label text must hit **≥ 4.5:1**. Validated combinations:
  - `--ink-1 #2C2622` on `--bg #EDE8DF`, on `--surface`, and on every dream-type tint bg → all pass AAA-ish.
  - Dream-type **ink** tokens (e.g. `--dream-lucid-ink #54519B`) on their matching **bg** tints → all ≥ 4.5:1; use the `-ink` token for the label, never the mid `-500`.
  - White on `--coral-500 #C85B3A` → ~4.0:1 (large/bold text & buttons only — OK for the 15px+ semibold CTA; don't use coral-500 for small body text).
  - `--ink-3 #8C8275` is for **captions on light surfaces only** (~3.3:1) — never for essential body copy.
- Aurora blobs are decorative: keep them behind text on a light fill so contrast is measured against the *surface*, not the blob.
- Don't encode dream-type by color alone — always pair the dot/tint with its text label.
- Respect `prefers-reduced-motion`: disable blob drift and reduce transitions to opacity-only.

---

## Streamlit adaptation

- **Style natively (via `config.toml` theme):** base background `#EDE8DF`, primary color `#C85B3A`, text `#2C2622`, font for body. Set `st.set_page_config(layout="centered")`.
- **Style via `st.markdown(unsafe_allow_html=True)` + injected `<style>`:** the result card, classification badges, pipeline steps, similar-dream cards, latent-space nodes, and aurora background — none map cleanly to native widgets, so render them as HTML strings using the tokens.
- **Contournements / workarounds:** Streamlit's default `st.button` can't take a pill+coral+glow look reliably across versions — inject CSS targeting `button[kind="primary"]`. For the dream input use `st.text_area` and override its border/radius/placeholder via CSS; the serif-italic placeholder needs a CSS `::placeholder` rule. Load Playfair + DM Sans with an `@import` at the top of the injected style block.
- **Avoid** Streamlit's default shadow/box chrome on containers — flatten with CSS and apply the tinted shadow system instead.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `colors_and_type.css` | **Start here.** All design tokens: palette, semantic vars, type classes, aurora utilities, shadow/radius/spacing/motion. |
| `README.md` | This file — context, content & visual foundations, iconography, layout, a11y, Streamlit notes. |
| `SKILL.md` | Agent-Skills front-matter wrapper so this system can be used as a downloadable skill. |
| `preview/` | 21 small specimen cards powering the **Design System** tab (colors, type, spacing, components, brand). |
| `ui_kits/dream-ai-app/` | High-fidelity, click-through recreation of the Dream AI app: `index.html` + JSX components. See its own README. |
| `assets/` | Brand/visual assets (currently the typographic wordmark proposal). |

**Do / Don't (quick reference)**
- ✅ Light sand backgrounds always · ✅ 2–3 aurora blobs max · ✅ serif-italic for emotion, sans for UI · ✅ colored soft shadows · ✅ « tu » voice
- ❌ Dark/black backgrounds · ❌ emoji or unicode icons · ❌ gradient buttons or bluish-purple SaaS gradients · ❌ aurora without a light backing surface · ❌ title-case headlines · ❌ more than ~2 numbers per card
