# Image OS Rule — Review & Approval

Review generated/edited results against the locked source, not against how attractive the result looks.

## Review order

1. **Identity / people**
   - same person?
   - face shape, age, expression, hairline, pose, limbs preserved?
   - any people added/removed/merged?

2. **Geometry / objects**
   - buildings, windows, doors, streets, tools, furniture, vehicles, landscape boundaries preserved?
   - object count and placement preserved?
   - perspective/camera angle unchanged?

3. **Text / symbols**
   - signage, lettering, flags, emblems, labels, printed matter preserved?
   - did the model invent legible text?

4. **Restoration quality**
   - damage reduced without erasing real texture?
   - tonal recovery useful?
   - over-sharpening, waxy faces, synthetic materials, or fake detail?

5. **Color evidence** when applicable
   - which important colors are verified/supported/plausible/unknown?
   - does saturation or lighting imply more certainty than the evidence supports?
   - did colorization alter identity, geometry, or atmosphere?

6. **Feed usefulness** for Hawaiʻi Archive Revival
   - does this image materially improve a post/week?
   - is the relationship `exact`, `near`, or `context`?
   - would the public presentation accidentally imply a stronger relationship than the evidence supports?

## Review outcomes

Use one of:

- `approve`
- `approve_with_caveat`
- `revise_targeted`
- `reject`
- `skip_color`

Prefer targeted revision over full regeneration when preservation matters and the defect is local.

## Approval rule

Approval points to one exact output/version. It does not promote the output to source authority, and it does not automatically approve related variants.

## Learning rule

After approval/rejection, classify useful residue as:

- `job-local`
- `profile-local`
- `global-image-os`

Global promotion should be rare. A single lucky or unlucky generation is not a universal rule.
