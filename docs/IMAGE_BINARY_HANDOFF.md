# IMAGE BINARY HANDOFF

Cross-project production rule for generated and edited image assets.

## Why this exists

Text, JSON, HTML, CSS, JavaScript, manifests, mappings, and other UTF-8 project state travel reliably through the normal AI/GitHub workflow. Generated image binaries have shown a different failure mode: a file can appear to upload successfully while the resulting repository asset is corrupted or visually unusable.

Do not make the image-generation pipeline depend on a transport path that has already proven unreliable.

## Default rule

**AI owns visual planning and integration state. The user owns the final binary drop when direct binary transport is unreliable.**

Normal image workflow:

1. AI reads current project authority and plans the image job.
2. AI generates or reviews visual output.
3. Human approves the useful output.
4. AI prepares a deterministic handoff containing exact filenames, target paths, roles, and any manifest/mapping changes required.
5. AI may package handoff metadata and multiple approved assets as a ZIP when safe file bytes are available.
6. If the AI cannot safely package the generated image bytes, the user manually saves/uploads the approved image binary into the exact target path.
7. AI verifies that the repository now contains the expected files and that they open correctly.
8. Only after binary verification does AI wire or promote the images into manifests, galleries, readers, or visual continuity state.

## Do not

- do not push generated image bytes through a GitHub write path that has produced corruption before
- do not claim an image is integrated merely because a blob exists
- do not update manifests to point at an asset before the actual binary is verified
- do not silently rename user-uploaded approved art after handoff
- do not mix rejected generations, contact sheets, scratch images, and approved production files in the same final handoff
- do not require the user to rediscover where a file belongs

## Handoff contract

Every manual image handoff should provide:

- project
- batch ID when relevant
- exact filename
- exact repository-relative destination path
- image role, such as site hero, chapter anchor, support, texture, character reference, or historical source
- source scene/chapter when relevant
- approval status
- whether the image is visual canon, mood/site art, source evidence, or another non-canon role
- any required dimensions/aspect ratio only when materially important
- the next verification action after upload

For batches, prefer a small machine-readable manifest plus a short README. The user should be able to unzip or copy the approved files into one obvious destination without reconstructing context from chat.

## ZIP rule

When safe image bytes are available to the AI, prefer a ZIP for multi-image handoff:

```text
<project>-image-handoff-<batch>/
  README.md
  manifest.json
  assets/
    <approved image files only>
```

A final handoff ZIP should contain approved production assets, not the entire generation workspace.

If safe image bytes are not available, still provide the same README/manifest contract and let the user supply the binary at the named path.

## Verification gate

After manual upload, verify all of the following before integration:

- file exists at expected path
- file decodes successfully
- image visually matches the approved output rather than a corrupted transport artifact
- dimensions/aspect ratio are plausible for the intended role
- filename matches the manifest
- no stale corrupted asset is still referenced

For a site hero or other highly visible image, load the public/deployed page after merge and visually confirm the actual rendered asset.

## Project isolation

This is a transport and handoff rule, not a shared visual-style rule.

Each project keeps its own visual authority, references, style, continuity, and historical-evidence standards. Shared process must not cause visual memory from one project to leak into another.
