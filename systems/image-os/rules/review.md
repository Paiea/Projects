# Image OS Rule — Review & Approval

Review generated/edited results against the locked source, not against how attractive the result looks.

## Review order

1. **Identity / people**
   - same person?
   - face shape, age, expression, hairline, pose, limbs preserved?
   - any people added/removed/merged?
   - when hands are visible or salient, inspect finger count and finger attachment rather than assuming a plausible silhouette is enough;
   - do hands connect cleanly through wrist → forearm → elbow → shoulder?
   - any duplicated, missing, fused, floating, or impossible limbs?
   - in crowds, inspect repeated faces and body fragments at occlusion boundaries;
   - any **demographic drift** away from the documented event/source/context toward a generic stock-historical crowd?
   - do not infer an individual person's ethnicity from appearance alone; compare the crowd as a whole against documentary/context evidence and relevant archival references.

2. **Geometry / objects**
   - buildings, windows, doors, streets, tools, furniture, vehicles, landscape boundaries preserved?
   - object count and placement preserved?
   - perspective/camera angle unchanged?
   - for a source-locked reconstruction, does this still read as the same photograph rather than a restaged scene?

3. **Text / symbols**
   - signage, lettering, flags, emblems, labels, printed matter preserved?
   - did the model invent legible text?
   - generated banners, slogans, business signs, headlines, labels, or flags must not be treated as historical evidence unless they are visibly constrained by the locked source.

4. **Restoration / reconstruction quality**
   - damage reduced without erasing real texture?
   - tonal recovery useful?
   - over-sharpening, waxy faces, synthetic materials, or fake detail?
   - if the target is the second public layer, is it a **source-locked reconstruction** of the original rather than an interpretive restaging?
   - if the result is an interpretive third layer, is that role explicit and separate from the source-locked version?

5. **Color evidence** when applicable
   - which important colors are verified/supported/plausible/unknown?
   - does saturation or lighting imply more certainty than the evidence supports?
   - did colorization alter identity, geometry, or atmosphere?

6. **Feed usefulness** for Hawaiʻi Archive Revival
   - does this image materially improve a post/week?
   - is the relationship `exact`, `near`, or `context`?
   - would the public presentation accidentally imply a stronger relationship than the evidence supports?

## Crowd-specific retry rule

Crowd scenes deserve a harder gate because defects multiply with every visible body.

Before accepting a crowd reconstruction:

- scan prominent hands individually for finger errors;
- scan the room for missing arms, duplicated arms, floating hands, fused bodies, and impossible shoulders;
- compare crowd composition and visible social mix against the source/context instead of trusting model defaults;
- check whether a style/identity reference leaked into unrelated people;
- reduce the number of visually dominant gestures on retry when that preserves the historical action while making anatomy more reliable;
- prefer targeted revision or a simpler source-faithful interpretation over a spectacular but broken crowd.

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
