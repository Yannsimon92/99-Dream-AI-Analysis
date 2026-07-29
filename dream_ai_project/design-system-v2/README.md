# Dream AI — Design System

**"Cream & Blobs"** — an editorial, oneiric, luminous visual language for a
data-science / AI project that analyses dream narratives and turns them into a
sensory experience: emotions → colours, images, sounds and 3D forms.

> Working title of the product: **Analyse / Cartographie Rêves** ("Dream
> Analysis / Dream Cartography"). Each emotion detected in a dream is mapped to
> a soft, blurred colour **blob**; the whole system feels like a scientific
> design journal, not a cold tool.

Visual keywords: `#dreamcore` · `#liminalspaces` · `#datavisualization` ·
`#blob` · `#organic` · `#dreamy` · `#gradient` · `#constellation`

---

## Sources & provenance

There was **no codebase and no Figma file** behind this system. It was authored
from:

1. **A complete written brief** (in French) specifying the "Cream & Blobs"
   direction — colours, type, spacing, components, animation and layout. That
   brief is the source of truth and is reflected verbatim in the tokens.
2. **12 mood / reference images** (now in `assets/imagery/` and `uploads/`).
   These are *inspiration*, not product screenshots — gradient blob maps,
   liminal pastel figures, constellation data-viz, grainy blue "Zeronode"
   posters, and dreamy mobile mockups. They establish the atmosphere; none are
   recreated literally.

If you have access to a future codebase or Figma, cross-check the tokens here
against it and update.

---

## Index — what's in this folder

| File / folder | What it is |
|---|---|
| `README.md` | This document — context, content & visual foundations, iconography |
| `colors_and_type.css` | All design tokens: colour vars, type scale, spacing, motion, semantic type roles |
| `components.css` | Reusable component primitives (blobs, pills, cards, lists, pipeline, moodboard, todo) |
| `SKILL.md` | Agent-Skills manifest so this system works inside Claude Code |
| `assets/imagery/` | Reference / mood imagery (blob maps, constellations, liminal figures) |
| `fonts/` | (Placeholder) drop `.woff2` here to run fully offline |
| `preview/` | Small HTML specimen cards that populate the Design System tab |
| `slides/` | Editorial deck template — `index.html` + one HTML file per slide archetype |
| `ui_kits/website/` | Responsive marketing-site UI kit (hero · pipeline · gallery · manifesto · dream modal) |

Fonts (**Fraunces** + **JetBrains Mono**) load from Google Fonts; both are
freely available there, so **no substitution was needed**. See note in
`colors_and_type.css` for going offline.

---

## CONTENT FUNDAMENTALS

How copy is written across the system.

**Voice.** Calm, literary, scientifically curious. It reads like the wall text
of a thoughtful exhibition — never salesy, never cute. Confidence through
restraint. The interface should "feel like an experience, not a tool."

**Person.** Mostly impersonal / observational ("Today I feel…", "What's been on
your mind lately?"). Speaks *to* the dreamer with gentle second person when
prompting them; describes the system in quiet third person. Avoid "we" marketing
voice.

**Casing.**
- **Headings (Fraunces):** sentence case or Title Case, never ALL-CAPS. One or
  two words are set in *terracotta italic* to carry the emotion of the line —
  e.g. *Smarter Decision, Made **Easy** with AI*; "Today I feel **Calm**".
- **Labels / categories / tags (JetBrains Mono):** UPPERCASE with wide
  letter-spacing for category labels (`SUSTAINABILITY`, `CONTEXTS`), and
  **lowercase** for hashtag-style pills (`#dreamcore`, `blob`, `gradient`).
- **Metadata / slide numbers:** mono, spaced, lowercase or numeric (`01 / 12`).

**Sentence shape.** Short. Fragments are welcome. A single idea per slide; no
classic bullet lists — use em-dash detail lists instead. Body copy stays terse;
when it must run long it sits in mono at generous 1.8 line-height so it breathes.

**Tone examples (in-world).**
- Cover line: *"Where everything connects and begins again."*
- Prompt: *"You can share anything — a thought, a feeling, or something that's
  been bothering you."*
- Poetic register (allowed, used sparingly): *"Deep inside, you know what you
  want — let no one decide that for you. Not even your mind."*
- Emotion read-out: `Today I feel` → **Sadness** · `80%`.

**Emoji.** None. The brand never uses emoji. Warmth comes from colour blobs and
serif italics, not from pictographs.

**Numbers & data.** Presented quietly and precisely — `90 mg/dL`, `48%`,
`6.8%`. Percentages and units sit in mono. Don't manufacture stats for
decoration; every number should mean something.

---

## VISUAL FOUNDATIONS

**Overall mood.** Light, warm, dreamy editorial. *Not* dark mode. The page is
warm cream paper; colour arrives only as soft, out-of-focus blobs. The result
sits between a scientific journal and a meditation app.

**Colour.**
- Backgrounds are warm cream `#f0ece2` / luminous beige `#e8e4da`.
- Text is a near-black warm brown `#1a1410`, stepped down through 70% / 50% /
  35% opacity for secondary, tertiary and marker text.
- Accents are muted, never neon: terracotta `#b85040` (primary, used for
  italic highlights), soft blue `#5070b0`, violet `#8050a0`.
- A six-colour **emotion blob palette** (peach/warmth, sky/calm, yellow/joy,
  lavender/mystery, sage/serenity, coral/energy) — all desaturated and dreamy.
  Each detected emotion maps to one blob colour.
- **No vivid colours, no hard saturation.** Everything is hazy and soft.

**Type.** Two families only. **Fraunces** (variable serif) always at weight 300
for all headings, feature names and important labels — emotional, with optional
terracotta *italic* keywords. **JetBrains Mono** at 300 (body) / 400–500
(labels) for everything technical: body copy, tags, metadata, slide numbers.
Serif carries feeling; mono carries rigour.

**Spacing.** Strict 8px grid (8/16/24/32/48/80). Whitespace is generous and
deliberate — slides are allowed to feel empty. One idea per surface.

**Backgrounds & texture.** Every slide/page carries a subtle **dot grid** —
`radial-gradient(circle, rgba(26,20,16,0.12) 1px, transparent 1px)` at
`22px` tiles, `opacity 0.5` — sitting at z-0. Some reference imagery adds film
**grain**; grain is welcome on full-bleed image surfaces but never on text. No
flat colour fills; depth comes from layered translucency, not shadow.

**Blobs (the signature motif).** Circular, heavily blurred organic shapes.
Large background blobs: `blur(80px)`, `opacity 0.35–0.55`, `160–380px`, placed
`absolute` and often bleeding off-screen. Small inline blobs (pipeline steps):
`blur(12px)`, `56–80px`. **Never more than 4 blobs per surface**, and **never
put text on a blob** — they are breathing room and colour, nothing else.

**Elevation / shadows.** Essentially none. The design is flat; cards have a
0.5px hairline border and a translucent white fill (`rgba(255,255,255,0.5)`)
instead of a drop shadow. Depth is created by blurred blobs behind translucent
surfaces, not by box-shadow.

**Transparency & blur.** Core to the language. Surfaces are semi-transparent
white over cream; the nav bar uses `backdrop-filter: blur(20px)`. Elements
overlap with soft opacities so layers read through one another.

**Borders & corners.** Hairlines only — `0.5px solid rgba(26,20,16,0.12–0.2)`.
Corner radii: cards `14px`, pills/tags fully rounded `100px`, blobs and step
dots `50%`. No heavy outlines, no double borders.

**Cards.** Translucent white fill, 14px radius, 0.5px hairline border, 20px
padding, **no shadow**. Section blocks are the same card with a small colored
uppercase category label on top (terracotta = supervised, blue = unsupervised,
violet = deep learning).

**Imagery vibe.** Two registers: (1) warm — cream/peach/coral grainy gradients
and liminal figures; (2) cool — soft blue auras and starfields. Both are
dreamlike, slightly out of focus, often a blurred human silhouette dissolving
into gradient. Always atmospheric, never literal product photography.

**Animation.** Gentle and slow. Slide entrance is a staggered **fade-up**:
`opacity 0 → 1`, `translateY(24px → 0)`, `0.7s cubic-bezier(0.4,0,0.2,1)`, with
children staggered (label 0.1s → components 0.5s). Navigation between slides
slides horizontally (`translateX`, `0.8s`, same easing). No bounce, no spring,
no aggressive motion — everything eases softly like a breath.

**Hover / press states.** Quiet. Hover lifts opacity slightly or deepens the
hairline border; pills may fill a touch whiter. Press is a gentle scale-down
(~0.98) and/or a small opacity drop. No colour flips, no glow, no large
transforms — restraint matches the meditative tone.

**Layout rules.** Each slide is `100vw × 100vh`, layered:
`grid-bg (z0) → blobs (z1) → content (z2, max-width 1100px, centred,
padding 100px 80px 60px) → footer slide-number (absolute, bottom 40px)`. A fixed
top nav bar (translucent, blurred) holds a left label, centred progress dots
(active dot scales to 1.8× and fills) and a right counter.

**Design principles.**
1. Generous whitespace — let it breathe, never crowd.
2. Blobs are breath — they bring life and colour, never carry text.
3. Clear type hierarchy — Fraunces for emotion, JetBrains for rigour.
4. No vivid colour — everything desaturated, soft, oneiric.
5. Editorial minimalism — one idea per slide, no classic bullets.
6. Transparency & layering — soft overlapping opacities.
7. It should feel like an experience, not a tool.

---

## ICONOGRAPHY

The brand is **icon-light by design** — meaning comes from blobs, type and
space, not from a dense icon set. When icons do appear they are:

- **Thin, monoline, minimal** — hairline strokes (~1.5px), rounded caps, no
  fill, matching the 0.5px-border restraint of the rest of the system.
- **Small and quiet** — used only for genuine affordances (back arrow `←`,
  search, close `×`, share, sliders, a small "+" in a circular button).
- **Often inside a circular chip** — a 36px white circle with a 0.5px hairline
  border (see `.ds-todo-icon`), echoing the blob's round geometry.

**Recommended set:** [**Lucide**](https://lucide.dev) — its hairline,
rounded-cap monoline style is the closest CDN match to the references and is
used in the slides/UI via CDN:
`<script src="https://unpkg.com/lucide@latest"></script>`. This is a
**substitution** (there was no native icon set in the brief) — flag for the
user if a house icon set exists.

**Sparkle / star.** A recurring four-point sparkle (✦) appears as the one
"magic / AI" mark (mood prompts, emotion dials). Treat it as a brand glyph, not
decoration — use Lucide's `sparkle` / `sparkles`, or the unicode `✦` in mono.

**Unicode as icons.** The em-dash `—` is used as the list bullet throughout
(`.ds-list li::before`). Arrows (`←` `↗`) are acceptable as inline glyphs.

**Emoji.** Never. (Repeated from Content Fundamentals because it matters.)

**Logos.** No fixed wordmark was provided. In mockups the product name is simply
set in the type system (e.g. a barcode-like glyph + "Nextly" in references is
*not* this brand). If/when a logo is delivered, store it in `assets/` and
document it here.
