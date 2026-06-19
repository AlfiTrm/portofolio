# About Hybrid Bento Design

## Objective

Redesign the `About` section into a dark editorial-hybrid composition that follows the new hero tone. The section should feel like one large framed layout instead of a conventional content block, with a dominant left panel and two stacked right panels.

## Goals

- Replace the current draggable ID-card style layout with a stronger framed composition.
- Build a three-panel grid:
  - one large panel on the left
  - two smaller stacked panels on the right
- Keep the overall tone aligned with the hero:
  - dark
  - restrained
  - image-led
  - slightly hybrid/playful through details, not through clutter
- Use `public/about/cartoon-chill.svg` as the main visual asset in the left panel.
- Combine visual identity and personal introduction in the left panel.
- Reserve the lower-right panel for a keycap-style tech stack treatment.
- Keep the upper-right panel intentionally light so the user can judge the composition before its content is fully locked.

## Non-Goals

- Remove `TechStackTransition` in this task. Keep it as a fallback until the new `About` section is validated.
- Redesign the entire page flow outside the `About` section.
- Turn the section into a bright, app-like dashboard.
- Keep the current draggable developer-ID card interaction.

## Chosen Layout

The section should read visually as:

```text
┌───────────────────────┬───────────────┐
│                       │               │
│                       │   right top   │
│       left large      ├───────────────┤
│                       │               │
│                       │ right bottom  │
│                       │   tech stack  │
└───────────────────────┴───────────────┘
```

The left panel is the visual anchor and should dominate both scale and attention.

## Left Panel

### Purpose

Combine character, identity, and short introduction in one premium surface.

### Content

- `cartoon-chill.svg` as the main image
- name / identity text
- short introduction copy

The asset should now be treated as the dominant actor inside the panel, not just a supporting illustration. The SVG should scale up significantly so the visual weight of the panel comes primarily from the character asset.

### Motion

The left panel should carry the most distinctive interaction:

- subtle parallax or 3D frame perspective
- cursor-responsive tilt or layered depth
- motion should feel premium, not playful-gimmicky

This should feel more like a framed object reacting to presence than a draggable widget.

In addition, the text inside the left panel should use an autoplay reveal treatment:

- cinematic
- elegant
- staged
- not glitchy

Recommended reveal pattern:

- identity line appears first
- supporting intro line follows
- motion uses fade, lift, and slight stagger

The reveal should feel dramatic but restrained, with the asset still remaining the main focal point.

### Visual Treatment

- dark framed surface
- thin border
- controlled shadow and depth
- enough spacing for the image and text to breathe

## Right Top Panel

### Purpose

Provide visual balance and support the grid composition without over-committing the content yet.

### Content Strategy

Keep this intentionally light for now:

- minimal placeholder editorial content
- or a small quick-facts treatment
- or a light-text block that supports the section rhythm

The key requirement is that it should help establish the layout without pulling too much attention away from the left panel.

## Right Bottom Panel

### Purpose

Hold the tech stack presentation.

### Content

- a compact tech stack section
- keycap-like tech items
- each keycap should include the tech label and, where appropriate, the matching logo/asset above or within the treatment

### Tone

This should feel tactile and clean, not arcade or neon.

## Content Hierarchy

- left panel carries the story
- right top supports
- right bottom organizes tools/tech

Within the left panel specifically:

- asset first
- text second
- motion supports the text, not the other way around

The section should be readable at a glance even if the right-top content is still sparse.

## Visual Language

- black / near-black base
- warm off-white text
- restrained borders
- framed, editorial geometry
- hybrid details through keycaps and motion, not through busy decoration

## Components to Replace or Retire

Within this section, the following current treatments should be removed or substantially replaced:

- draggable card
- hanging cable / anchor line concept
- BentoGridBackground as the main organizing idea
- current `My Story` centered block styling

`ExperienceTimeline` should be re-evaluated after the new panel layout is in place. It may remain below if it still fits the rhythm.

## Accessibility

- keep text contrast readable against dark surfaces
- ensure the interactive left panel motion remains subtle and does not block readability
- preserve semantic structure for the `About` section

## Testing

- add/update tests asserting the new `cartoon-chill.svg` usage and removal of the draggable-card pattern
- verify app build passes
- manually verify the three-panel composition on desktop and mobile
- manually verify the cursor-responsive left panel remains stable and tasteful

## Implementation Notes

- Prefer evolving `AboutSection.tsx` rather than scattering this across many new files unless a split improves clarity
- Keep `TechStackTransition` untouched for now
- Use the new `About` section as the main experiment surface; supporting cleanup can happen later once the composition is approved
