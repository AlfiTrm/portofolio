# Hero Editorial Stage Design

## Objective

Redesign the home hero into a dramatic, art-house leaning editorial stage that matches the new text-only navbar and minimal loader. The hero should stop behaving like a generic portfolio intro and instead work as a cinematic opening beat for the site.

## Goals

- Remove repeated identity text from the hero. `Tsan` already exists in the navbar and `Alfi Tsani` will move to the About section.
- Keep a minimal amount of text in the hero, with a personal-reflective tone instead of a title-card introduction.
- Preserve the top-down spotlight as the main dramatic device.
- Keep the visual personal through a treated portrait layer, but avoid making the portrait the central object.
- Remove gamey and futuristic elements that break the new editorial tone.

## Non-Goals

- Redesign the About, Projects, Skills, or Contact sections in this task.
- Introduce a CTA-heavy hero.
- Build an abstract-only hero with no personal connection.
- Rework the global navbar, loader, or scroll system beyond what the hero needs.

## Current Problems

The existing hero is centered around a large full-name heading, a rotating job-title treatment, and a circular portrait composition with tech-ring decoration. That combination reads as a conventional portfolio template and conflicts with the quieter editorial direction already established by the navbar and loading sequence.

## Chosen Direction

Use a `centered stage` composition with dramatic negative space.

- The hero remains full-screen.
- The spotlight from above stays and becomes a primary mood element.
- Copy sits lower than dead center, creating a staged composition rather than a typical centered intro block.
- The portrait becomes a subtle atmospheric layer rather than the main focal object.

## Layout

### Stage Composition

- Full-height hero with a black base and restrained tonal layering.
- Large central empty space to let the spotlight breathe.
- Copy grouped in a compact block around the center-lower area.
- Supporting visual layers behind the copy, kept soft and low contrast.

### Text Structure

Use only two text levels:

- One micro-line for mood or framing.
- One short reflective copy block in 2-3 lines.

The hero must not include:

- `Tsan`
- `Alfi Tsani`
- rotating role text
- oversized headline typography

### Visual Structure

- Keep the portrait as a ghosted image treatment, likely via large crop, masking, low contrast, and shadow.
- Avoid circular hero framing and visible tech-ring ornament.
- Use subtle gradients, vignette, and optional grain if needed, but avoid decorative clutter.

## Component Changes

### `HeroContent`

- Replace the current name-heading and rotating role pattern with a minimal editorial copy block.
- Rework vertical alignment to create a staged, weighted composition.
- Coordinate with the spotlight and supporting visual layer so the copy remains readable.

### `HeroImage`

- Remove the circular portrait framing and curved tech text treatment.
- Rebuild the image as a restrained background-presence layer rather than a central avatar object.
- Preserve responsive behavior and image performance.

### Supporting Hero Elements

- Remove `PixelCharacter` from the hero.
- Re-evaluate `HeroStats`; keep it only if it can sit outside the central stage without adding noise. If it disrupts the calm composition, remove it from the hero.
- Keep `ScrollIndicator` only if it can remain understated and aligned with the editorial tone.

## Visual Language

- Base palette: black, warm off-white, reduced gray values.
- Keep the current overhead light motif.
- Remove cyan-led visual emphasis from the hero area.
- Motion should be slow and cinematic, with fade and drift preferred over playful transforms.

## Interaction and Motion

- Initial entrance should feel calm and controlled, not flashy.
- The hero should reveal through soft opacity and position shifts that align with the existing loader handoff.
- No looping text gimmicks.
- Any ambient motion in the visual layer should be subtle enough to read as atmosphere, not effect choreography.

## Accessibility

- Maintain sufficient contrast for all hero copy against the background layers.
- Preserve semantic section structure.
- Ensure decorative visual layers do not interfere with focus order or screen-reader output.
- Keep motion restrained enough to avoid discomfort.

## Testing

- Add or update tests that assert removal of the old hero-title pattern and circular tech-ring treatment.
- Verify the app still builds successfully.
- Manually verify that the hero remains stable on refresh and does not visually conflict with the loader-to-content transition.
- Manually verify mobile and desktop composition so the stage feeling survives smaller screens.

## Implementation Notes

- Prefer evolving the existing hero components rather than introducing many new files.
- Keep logic simple: the redesign is primarily compositional and presentational.
- If `HeroStats` weakens the composition, remove it from the hero in this task instead of forcing it to fit.
