# Floating Chat Sheet Design

## Objective

Add a floating dark chat sheet triggered from the `ask` control in the lower-right corner. The panel should feel like a cinematic conversation surface that belongs to the current editorial portfolio tone, while honestly presenting the chat system as still in progress.

## Goals

- Introduce a floating conversation UI instead of a full modal or generic support widget.
- Make the opening motion feel like a folded sheet that unfolds from the lower-right corner toward the upper-left.
- Preserve the portfolio's dark, restrained, editorial tone.
- Guide visitors toward two primary intents:
  - learning who Tsan is
  - reaching out for a project
- Make the experience feel like chat, even before live chat functionality exists.

## Non-Goals

- Build a real AI or backend-powered chatbot in this task.
- Add freeform live message sending.
- Replace the existing contact section.
- Turn the panel into a bright SaaS messenger widget.

## Product Framing

This is a `guided preview chat`, not a fake fully working assistant. The UI should be complete enough that visitors understand the future intention of the feature, but the copy and disabled input should clearly communicate that live conversation is still in progress.

## Entry Point

- Trigger: the existing `ask` control in the lower-right corner of the viewport.
- Trigger style remains minimal and text-led with the spark icon language already used in navigation.
- Clicking the trigger opens the chat sheet.
- Clicking the trigger again, clicking a close control, or clicking outside the panel should close it.

## Motion Direction

Use a three-phase motion sequence:

1. `Folded`
   - The panel begins as a compact surface visually anchored to the `ask` trigger.
2. `Unfold`
   - The panel expands toward the upper-left with a slight perspective/fold cue.
3. `Settle`
   - The panel lands in its final size and the content fades in shortly after.

The motion should feel closer to a floating sheet than a drawer:

- no hard slide-from-edge behavior
- no aggressive 3D gimmicks
- no spring bounce that feels playful or toy-like

## Layout

### Container

- Fixed to the lower-right area of the viewport.
- Compact but substantial enough to read as a conversation surface.
- Dark surface, subtle border, controlled blur, soft shadow.
- Rounded corners, but not overly pill-like.

### Header

- Minimal top bar.
- Title can be `ask tsan` or another final approved label during implementation if needed, but should remain understated.
- Small close control on the right.

### Body

The body should contain:

- a small system note that live chat is still in progress
- one opening assistant message:
  - `if you're curious, i can help you start in one of two ways.`
- two primary quick actions:
  - `know me`
  - `start a project`

### Transcript Behavior

The panel should feel chat-like. When a quick action is clicked:

- that option appears as a user bubble
- the interface shows a short assistant preview response
- a small note makes it clear that full live conversation is still in progress

The preview response should be concise and useful, not lorem ipsum or fake-AI filler.

### Input Area

- A real-looking chat input row should exist at the bottom.
- The input is disabled for now.
- The placeholder should clearly signal work-in-progress status.

## Tone

- calm
- editorial
- intimate
- slightly cinematic
- not robotic
- not startup support chat

The copy should avoid sounding like a customer support bot or an LLM demo.

## Visual Language

- dark palette with the existing warm-white text treatment
- subtle hierarchy through opacity, spacing, and weight
- motion and surface treatment should align with the hero and loader
- no bright accent-heavy buttons unless absolutely necessary

## Accessibility

- Trigger and close control must be keyboard reachable.
- Escape should close the sheet if practical within the current patterns.
- The disabled input must still communicate status clearly.
- Color contrast must remain readable on dark backgrounds.

## Testing

- Add tests asserting the presence of the `ask` trigger and the new floating chat sheet component wiring.
- Verify the build still passes.
- Manually verify open/close behavior and that the panel does not conflict with the hero composition.
- Manually verify the sheet remains usable on mobile and does not cover the entire experience unless intentionally adapted.

## Implementation Notes

- Prefer a dedicated shared component for the floating chat sheet.
- Keep the initial logic scripted and local-state-driven.
- Separate trigger state from transcript preview state so future live chat can replace only the conversation layer.
