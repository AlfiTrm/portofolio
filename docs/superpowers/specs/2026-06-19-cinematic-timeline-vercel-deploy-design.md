# Cinematic Timeline And Vercel Deploy Design

## Objective

Replace the current straight, card-like experience timeline with a cinematic story path that feels like a journey being drawn as the user scrolls. In the same task, add a lightweight GitHub Actions deployment workflow that sends `dev` to a Vercel preview deployment and `main` to production.

## Goals

- Build a scroll-driven timeline that feels dramatic, editorial, and alive.
- Use a curved path instead of a rigid vertical line.
- Make the path reveal itself progressively on downward scroll and rewind naturally on upward scroll.
- Alternate milestones left and right so the timeline feels like a journey rather than a stacked list.
- Reduce each milestone to the essential information:
  - `Title`
  - `Waktu - Kategori`
- Normalize milestone categories into a cleaner shared set:
  - `education`
  - `organization`
  - `hackathon`
  - `contract`
  - `internship`
  - `personal`
- Add GitHub Actions workflows that support:
  - `dev` pushes deploying to Vercel preview
  - `main` pushes deploying to Vercel production

## Non-Goals

- Rework the About intro, lanyard, hero, navbar, or chatbot in this task.
- Add long descriptions, highlights, or expandable detail panels to timeline entries.
- Build a fully filterable or interactive project explorer.
- Introduce a complicated CI matrix, lint gate, or PR comment bot.

## Current Problems

The existing timeline is structurally correct but visually generic:

- the central line is straight and static
- entries still read like default portfolio cards
- descriptions and badges add noise to a section that should feel like narrative progression
- the scroll animation scales a simple line, but it does not feel like the story is being traced

The repository also does not yet include any `.github/workflows` deployment automation, so publishing still depends on manual steps.

## Chosen Direction

Use a `curved narrative spine` as the core visual device.

- The timeline becomes one long SVG-driven path that snakes vertically through the section.
- Milestones are attached to that path and alternate left/right.
- Scroll progress controls a foreground stroke so the route appears to be drawn in real time.
- Reversing scroll should visually rewind the path instead of leaving it permanently completed.
- Each milestone remains minimal and typographic, matching the cinematic tone established in Hero and About.

For deployment, use a `two-lane branch model`.

- `dev` is the safe integration branch and deploys to preview.
- `main` is reserved for production releases.
- Workflows use the Vercel CLI with prebuilt output, following Vercel's GitHub Actions guidance.

## Timeline Experience

### Narrative Structure

- The timeline should read like a path through creative and professional milestones, not like a resume table.
- Entries alternate left and right around a central motion path.
- The path should bend with intention: broad arcs, not noisy zig-zags.
- Milestones should feel anchored to the path, as if each one is a stop on the route.

### Motion Model

- A muted background path remains visible at low contrast.
- A brighter foreground path is tied to scroll progress and grows along the route.
- When the user scrolls back upward, that bright path retracts accordingly.
- Milestones become visually active when the bright stroke reaches their segment.
- Motion should be smooth and cinematic, not springy or playful.

### Information Density

Each milestone only shows:

- project or role title
- a second line with `Waktu - Kategori`

Do not show:

- description paragraphs
- highlight chips
- company prefixed with `@`
- pill-heavy metadata clusters

If an organization or client name is still needed, it should be folded into the title string instead of becoming a third visible row.

## Data Model

The current grouped-by-period structure is not ideal for a continuous path. Normalize the timeline data into a flatter ordered milestone list designed for presentation and path mapping.

Each milestone should expose:

- `title`
- `timeLabel`
- `category`
- `side` or a derived alternating position
- optional positioning metadata only if needed for path layout

Category values should be mapped into:

- `education`
- `organization`
- `hackathon`
- `contract`
- `internship`
- `personal`

The visible label can remain lowercase to fit the editorial tone unless the final typography treatment makes small caps feel better.

## Component Design

### `ExperienceTimeline`

This component becomes the orchestration layer for:

- scroll tracking
- SVG path rendering
- foreground progress stroke
- milestone placement
- activation state for visited milestones

It should stop behaving like a simple mapped list with a centered border line.

### Supporting Timeline Units

Split the implementation into smaller pieces if the main file starts getting heavy. Likely boundaries:

- a path renderer component for the base and progress strokes
- a milestone item component for typography and active state
- a small data helper for path anchors or alternating layout logic

The goal is to keep the timeline readable and adjustable without making one giant animation file.

## Visual Language

- Background stays black and in tone with the About section.
- Base path should be dim, dusty, and almost archival.
- Progress path should glow softly in warm off-white, not neon.
- Milestones should use typography and spacing as the primary drama.
- Active states can brighten text and add a subtle node glow, but should avoid generic glass-card effects.
- The line should feel hand-directed and cinematic, not like a chart or enterprise timeline.

## Layout Rules

- Desktop: alternating left/right milestones around a centered curved spine.
- Mobile: collapse to a more compact single-column reading flow while preserving the sense of a progressive route.
- The mobile version does not need full left/right alternation if legibility suffers, but it must still retain the scroll-drawn path.
- Keep enough vertical spacing between milestones so the path arcs can breathe.

## Deployment Workflow Design

Follow the branch strategy:

- `dev` -> preview deployment
- `main` -> production deployment

Use GitHub Actions with the Vercel CLI and prebuilt output:

- install dependencies needed to build
- install Vercel CLI
- pull environment data from Vercel
- run `vercel build`
- deploy using `vercel deploy --prebuilt`

Environment target by branch:

- `dev` workflow uses `--environment=preview`
- `main` workflow uses `--environment=production` and `--prod`

Required GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

This mirrors Vercel's official GitHub Actions guidance published on May 26, 2026.

## Error Handling And Operational Notes

- If Vercel secrets are missing, the workflow should fail clearly rather than silently skipping deployment.
- The workflow should only react to direct pushes on `dev` and `main`.
- Do not add branch rules for every feature branch in this task.
- Do not depend on Vercel's native Git integration for the automated path implemented here; GitHub Actions should own the deploy flow.

## Testing

### Timeline

- Update tests so the old straight-line timeline assumptions are removed.
- Add assertions that the timeline no longer renders descriptions and highlights.
- Add assertions that the normalized category-driven structure is used.
- Add assertions that the timeline implementation includes SVG path/progress behavior rather than the old simple line scaling approach.

### Deployment

- Add repository workflow files under `.github/workflows/`.
- Verify the workflow YAML references the expected branches and Vercel secrets.
- Run the project build locally to confirm the new timeline does not break production compilation.

## Implementation Notes

- Keep the path generation deterministic and maintainable. A few intentional anchor points are better than procedural chaos.
- Prefer scroll progress derived from the section container, not global window math scattered across multiple components.
- Avoid over-decorating milestones; the path itself should carry the drama.
- Keep file boundaries clean so future milestone content changes do not require touching path animation logic.
