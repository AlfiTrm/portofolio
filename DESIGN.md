---
name: Alfi Tsani Portfolio
description: Clean, cinematic portfolio system for a frontend developer who should feel capable, elegant, and distinct.
colors:
  obsidian-stage: "#000000"
  soft-ivory: "#F2EDE6"
  linen-glow: "#F0E7D4"
  warm-sand: "#D8B08C"
  terracotta-haze: "#C97B63"
  mist-gray: "#888888"
  signal-cyan: "#22D3EE"
  ghost-white-10: "#FFFFFF1A"
typography:
  display:
    fontFamily: "Akira Expanded Demo, sans-serif"
    fontSize: "clamp(2.85rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 0.95
  title:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.22em"
rounded:
  sm: "0.625rem"
  md: "1rem"
  lg: "1.75rem"
  xl: "2rem"
  pill: "999px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "8rem"
components:
  nav-link:
    textColor: "{colors.ghost-white-10}"
    typography: "{typography.label}"
    padding: "0"
  nav-link-active:
    textColor: "{colors.soft-ivory}"
    typography: "{typography.label}"
    padding: "0"
  recognition-chip:
    backgroundColor: "{colors.ghost-white-10}"
    textColor: "{colors.soft-ivory}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.75rem"
  project-card:
    backgroundColor: "{colors.obsidian-stage}"
    textColor: "{colors.soft-ivory}"
    rounded: "{rounded.md}"
    padding: "2rem"
  cta-button:
    backgroundColor: "{colors.soft-ivory}"
    textColor: "{colors.obsidian-stage}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.75rem"
---

# Design System: Alfi Tsani Portfolio

## 1. Overview

**Creative North Star: "Quiet Signal"**

This system is built to feel calm before it feels loud. The page opens like a dark stage: deep black surfaces, pale ink, controlled warmth, and a few precise moments of glow. The design should not beg for attention. It should make visitors pause, look closer, and conclude that the work is serious.

The portfolio is personal, but it is not diaristic. It should feel elegant and deliberate rather than expressive for its own sake. Motion is smooth, not flashy. Surfaces stay mostly flat. Depth comes from layering, perspective, and light falloff rather than decorative shadow stacks.

This system explicitly rejects generic AI-portfolio grammar, noisy experiment-for-experiment's-sake interfaces, and cold corporate personal sites. It should never look crowded, over-rounded, or dependent on decorative tricks to feel premium.

**Key Characteristics:**
- Quiet black-first surfaces with pale editorial ink
- Display typography used sparingly as a signature move
- Mostly flat layers with occasional cinematic cyan projection accents
- High whitespace and controlled density to create trust
- Minimal but expressive details that reward closer attention

## 2. Colors

The palette is anchored in black and pale ink, with warmth used for intimacy and cyan reserved for technical projection moments.

### Primary
- **Obsidian Stage** (`#000000`): The dominant body and section surface. It creates seriousness and gives the type, glow, and imagery room to breathe.
- **Soft Ivory** (`#F2EDE6`): The primary ink for navigation, bright labels, and moments that need immediate clarity against the black stage.

### Secondary
- **Signal Cyan** (`#22D3EE`): Reserved for projection states, interactive scan moments, and technical emphasis inside project previews. Its rarity is the point.

### Tertiary
- **Terracotta Haze** (`#C97B63`): A restrained atmospheric accent used as a glow tint or background haze, not as a primary interface color.
- **Warm Sand** (`#D8B08C`): A warmer accent for metadata, subtle chips, and humanizing details on otherwise dark surfaces.

### Neutral
- **Linen Glow** (`#F0E7D4`): Hero typography and large warm-ink moments. Slightly warmer than Soft Ivory, used when the interface should feel more personal than technical.
- **Mist Gray** (`#888888`): Supporting tone for gradients, subdued labels, and secondary emphasis. Never use it as the dominant body-copy color on critical content.
- **Ghost White 10** (`#FFFFFF1A`): Hairline borders, translucent fills, and low-contrast containment. It provides structure without making the interface feel boxed in.

**The Rare Accent Rule.** Cyan is not a theme wash. It appears only where the interface needs a technical pulse: active projection, hover confirmation, or a deliberate interaction state.

**The Black Stage Rule.** Large surfaces stay black or nearly black. Warmth enters through ink, haze, and detail accents, not through beige body backgrounds.

## 3. Typography

**Display Font:** Akira Expanded Demo (with sans-serif fallback)  
**Body Font:** Geist (with Arial, Helvetica, sans-serif fallback)  
**Label/Mono Font:** Geist Mono (with monospace fallback)

**Character:** The pairing is intentionally asymmetric. Akira Expanded carries identity and memory; Geist carries clarity and composure. Mono is used as instrumentation, never as the page's dominant personality.

### Hierarchy
- **Display** (`400`, `clamp(2.85rem, 8vw, 6rem)`, `0.92`): Reserved for hero words, marquee section statements, and other signature moments. It is a spotlight, not a utility.
- **Headline** (`700`, `clamp(2rem, 4vw, 3.75rem)`, `0.95`): Used for section anchors and strong narrative pivots. This is the working hierarchy beneath the hero.
- **Title** (`600`, `1.5rem`, `1.15`): Used in cards, project titles, and compact content blocks where hierarchy must remain firm without becoming theatrical.
- **Body** (`400`, `1rem`, `1.65`): Used for all explanatory copy. Keep paragraphs around `65ch` when possible so clean spacing still feels readable.
- **Label** (`500`, `0.72rem`, `1.4`, `0.22em`): Used for metadata, nav, chips, and interface instrumentation. All-caps is acceptable here because the scale is short and the role is directional.

**The Signature Font Rule.** Akira Expanded appears only where the page needs a memorable stamp. If every heading uses it, it stops feeling special and starts feeling costume-like.

**The Calm Body Rule.** Supporting copy should stay easy to read and never compete with the display moments. If body copy feels ornamental, the hierarchy has failed.

## 4. Elevation

This system is flat by default. Depth is expressed through atmospheric overlays, projection beams, blur, perspective, and restrained glows rather than conventional card shadows. When a shadow appears, it should feel like a state change or a cinematic spill of light, not like a floating SaaS panel.

### Shadow Vocabulary
- **Projection Bloom** (`0 0 30px rgba(34, 211, 238, 0.2)`): Used only on active project states and technical emphasis zones. It is an energy field, not a card shadow.
- **Hero Ambient Wash** (`radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent 26%)`): Used behind loaders and stage moments to keep black surfaces from feeling dead.
- **Soft Edge Glow** (`0 0 20px rgba(255, 255, 255, 0.1)`): A quiet focus or hover amplification for controls that need polish without visible lift.

**The Flat-First Rule.** Surfaces rest flat. Elevation arrives only as interaction feedback or cinematic atmosphere.

**The No Ghost Card Rule.** Do not pair thin decorative borders with large soft shadows on ordinary cards or buttons. If an element needs emphasis, choose border, glow, or movement, never all three at once.

## 5. Components

### Buttons
- **Character:** Minimal but expressive. Buttons should feel intentional, not ornamental.
- **Shape:** Full pill for primary CTAs and compact roundness for secondary controls (`999px` for pills, `0.625rem` to `1rem` for compact controls).
- **Primary:** Soft Ivory fill (`#F2EDE6`) on Obsidian Stage text (`#000000`) for immediate trust and clarity.
- **Hover / Focus:** Small luminance shifts, subtle shadow or glow, and clean focus rings. Movement should stay small and controlled.
- **Secondary / Ghost:** Transparent or translucent black surfaces with hairline white borders (`#FFFFFF1A`) and pale text.

### Chips
- **Style:** Rounded pills with translucent fills and pale or warm text. Chips should look integrated into the atmosphere, not like tag UI from a dashboard.
- **State:** Static chips can stay low-contrast. Interactive chips may brighten ink or border, but they should not become colorful badges unless the state truly matters.

### Cards / Containers
- **Corner Style:** Soft but not inflated (`1rem` to `1.75rem`). Large sections may stretch to `2rem`, but never beyond that.
- **Background:** Mostly black or translucent black with subtle white containment.
- **Shadow Strategy:** Flat at rest. Light spill, glow, or projection on hover/active.
- **Border:** Use low-opacity white hairlines rather than thick accent edges.
- **Internal Padding:** Generous (`1.5rem` to `2rem`) to preserve the clean signal this portfolio depends on.

### Inputs / Fields
- **Style:** Dark surfaces with low-contrast white borders and clear pale text.
- **Focus:** White or pale focus treatment first. Cyan can appear only when the surrounding surface already uses the technical projection language.
- **Error / Disabled:** Errors should read clearly without turning the interface bright red by default. Disabled elements should lose energy, not disappear.

### Navigation
- **Style:** Uppercase, narrow, lightly tracked labels with one active spark marker. Navigation should feel editorial and directional, not app-shell heavy.
- **Active State:** Pale ivory text with tighter tracking and a single icon marker.
- **Mobile Treatment:** Keep the same quiet editorial voice while increasing spacing and touch area. Mobile nav should feel like a temporary stage takeover, not a utility drawer.

### Project Projection Card
- **Character:** This is the portfolio's most cinematic component. It earns stronger depth and cyan glow because it represents live work stepping forward.
- **Core Moves:** Perspective tilt, scan-line overlays, projection beams, pale framing corners, and hover-driven image activation.
- **Constraint:** The effect should still feel crisp and employable. If it crosses into sci-fi toy territory, pull it back.

## 6. Do's and Don'ts

### Do:
- **Do** use black or near-black as the dominant canvas and let whitespace create the sense of luxury.
- **Do** reserve Akira Expanded for true signature moments instead of turning it into a universal heading font.
- **Do** keep motion smooth, eased, and controlled so the interface feels polished rather than busy.
- **Do** use exact, readable pale ink values like `#F2EDE6` and `#F0E7D4` when text needs to feel warm without sacrificing contrast.
- **Do** let spacing carry confidence. If a section feels tight, add room before adding decoration.

### Don't:
- **Don't** let the interface feel like a generic AI-made portfolio. That means no reflex gradients, no repetitive eyebrow scaffolding, and no decorative effects that are there only to say "design."
- **Don't** make the site noisy or experimentation-heavy. The portfolio can be expressive, but it should still feel hireable.
- **Don't** make the site cold, stiff, or overly corporate. Precision matters, but personality must stay visible.
- **Don't** over-round cards, sections, or inputs beyond `2rem`. This system is soft-edged, not bubbly.
- **Don't** rely on gradient text as a core emphasis device. Use contrast, scale, or weight instead.
