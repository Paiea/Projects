# Hawaiʻi Archive Source Density Batch 003 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the live Hawaiʻi Archive from 65 grounded text records to at least 68 with a dense July 1, 1897 micro-feed, add a third batch of exact artifact receipts, and open one new Hawaiʻi State Archives letter lane without changing the reader architecture.

**Architecture:** Reuse the existing `1897-06-01.json` text fixture, `data/artifacts/index.json` attachment manifest, resource/source drawer, and current media renderer. This batch is data-first. Do not change Image OS, reconstructed image authority, or `data/images/index.json`. Only touch renderer/CSS if an exact historical artifact cannot be displayed correctly through the existing path and a failing regression proves the need.

**Tech Stack:** Static HTML/CSS/JavaScript, JSON fixtures/manifests, Python `unittest` regression scripts, GitHub Pages.

**Spec:** `hawaii-archive/PROJECT_STATE.md` and `hawaii-archive/data/ITEM_CONTRACT.md`

## Global Constraints

- Fresh-read `main` before editing. Current planning authority is `d543d294a67746ad532f17487c9149c699406a8b`, but newer `main` wins.
- Preserve the June 1 to September 12, 1897 chronology and information-lag behavior.
- Follow historical attention. Do not manufacture balance.
- Feed copy is derived accessibility, never historical quotation.
- Do not manufacture Hawaiian from English-only material. For an English item, `hawaiian` may preserve only Hawaiian words, names, or place terms actually visible in the source. If no meaningful source-facing Hawaiian is available, do not force promotion merely to satisfy the batch.
- `voice_actor` requires explicit attribution.
- Exact artifact receipts must be labeled `exact`; contextual or later material must not masquerade as the event artifact.
- Do not use UH Mānoa IHLRT as a new mining lane.
- Do not edit `systems/image-os/**`, reconstruction manifests, or `hawaii-archive/data/images/index.json` in this batch.
- Remote archival images are preferred when stable. If a source only exposes a PDF or awkward binary, render/download it deterministically and use one ZIP handoff with exact destination paths rather than asking the user to place files one by one.
- Keep current artifact/media layout behavior, including intrinsic document sizing that avoids blank dead space.

## Source Set Already Resolved

### Library of Congress, The Independent, July 1, 1897, p. 3

Authoritative page/text route:
`https://www.loc.gov/resource/sn85047097/1897-07-01/ed-1/?sp=3&st=text`

Authoritative page PDF surfaced by LOC search:
`https://tile.loc.gov/storage-services/service/ndnp/hihouml/batch_hihouml_eel_ver01/data/sn85047097/00211100370/1897070101/0012.pdf`

Useful atomic seams on the page:
- `SAVED.` editorial: Hawaiʻi remains unannexed and independent; the paper explicitly says the fight is not yet won.
- `The Mariposa slipped into Honolulu harbor...`: 6½ days from San Francisco, taking on 200 tons of coal, then leaving for the Colonies.
- `Dangerously Hurt.`: a pre-dawn Maunakea Street fire; Assistant Chief John Clark falls from the burning building and is seriously injured.

### UH Mānoa Library petition pages already represented as text posts

Promote each district's own scan. Do not reuse a generic petition image.

- Lahaina, Maui, women: post `HAR-1897-09-11-PETITION-MAUI-W-001`, record `https://libweb.hawaii.edu/digicoll/annexation/petition/pet099.php`, scan `https://libweb.hawaii.edu/digicoll/annexation/petition/pet099.gif`
- Hāna, Maui, women: post `HAR-1897-09-11-PETITION-MAUI-HANA-W-001`, record `https://libweb.hawaii.edu/digicoll/annexation/petition/pet146.php`, scan `https://libweb.hawaii.edu/digicoll/annexation/petition/pet146.gif`
- Kalawao, Molokaʻi, men: post `HAR-1897-09-11-PETITION-MOLOKAI-KALAWAO-M-001`, record `https://libweb.hawaii.edu/digicoll/annexation/petition/pet699.php`, scan `https://libweb.hawaii.edu/digicoll/annexation/petition/pet699.gif`
- Līhuʻe, Kauaʻi, women: post `HAR-1897-09-11-PETITION-KAUAI-W-001`, record `https://libweb.hawaii.edu/digicoll/annexation/petition/pet084.php`, scan `https://libweb.hawaii.edu/digicoll/annexation/petition/pet084.gif`
- Kawaihau, Kauaʻi, men: post `HAR-1897-09-11-PETITION-KAUAI-KAWAIHAU-M-001`, record `https://libweb.hawaii.edu/digicoll/annexation/petition/pet611.php`, scan `https://libweb.hawaii.edu/digicoll/annexation/petition/pet611.gif`

### Hawaiʻi Digital Archives candidate letter lane

Primary candidate:
`https://digitalarchives.hawaii.gov/item/ark%3A70111/1FXc`

Record title: `Letters, 1897-05-22; 1897-06-30, James K. Kaulia to Ke Aliʻi Ka Mōʻīwahine Liliʻuokalani; James Keauiluna Kaulia to Ka Repubalika o Amerika Huipūʻia`

The archive identifies the record as Hawaiian/English and says Kaulia writes about political affairs between the U.S. and Hawaiʻi and, on behalf of Ka Lāhui Hawaiʻi Aloha ʻĀina, writes in support of Liliʻuokalani.

Secondary candidate if the June 30 text is not clean enough for atomic promotion:
`https://digitalarchives.hawaii.gov/item/ark%3A70111/1FXd`

Record title: `Letter, 1897-08-19, D. W. Keawe-Kaunahi to Liliʻuokalani Mōʻī o ko Hawaiʻi Pae ʻāina`

The archive identifies it as Hawaiian/English and says Keawe-Kaunahi advises Liliʻuokalani to seek Queen Victoria's help regarding restoration of the Kingdom.

---

### Task 1: Add a RED regression for source-density batch 003

**Files:**
- Create: `tests/test_hawaii_archive_source_density_003.py`
- Modify: `.github/workflows/project-hub-tests.yml`

**Interfaces:**
- Consumes: existing JSON fixture and artifact manifest.
- Produces: a mandatory CI gate for the three July 1 posts and artifact batch 003.

- [ ] **Step 1: Create the failing test**

Use this structure:

```python
from pathlib import Path
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"


class HawaiiArchiveSourceDensity003Tests(unittest.TestCase):
    def test_july_first_micro_feed_is_grounded(self):
        payload = json.loads(
            (ARCHIVE / "data" / "weeks" / "1897-06-01.json").read_text(encoding="utf-8")
        )
        items = {item["id"]: item for item in payload["items"]}

        required = {
            "HAR-1897-07-01-IND-SAVED-001",
            "HAR-1897-07-01-IND-MARIPOSA-001",
            "HAR-1897-07-01-IND-FIRE-001",
        }
        self.assertTrue(required.issubset(items))
        for item_id in required:
            item = items[item_id]
            self.assertEqual(item["date"], "1897-07-01")
            self.assertIn("loc.gov", item["source_url"])
            self.assertTrue(item["hawaiian"])
            self.assertTrue(item["feed_rendering"])

        self.assertIn("unannexed", items["HAR-1897-07-01-IND-SAVED-001"]["english_close"].lower())
        self.assertIn("200", items["HAR-1897-07-01-IND-MARIPOSA-001"]["feed_rendering"])
        self.assertIn("Maunakea", items["HAR-1897-07-01-IND-FIRE-001"]["hawaiian"])

    def test_artifact_batch_003_expands_petition_geography(self):
        payload = json.loads(
            (ARCHIVE / "data" / "artifacts" / "index.json").read_text(encoding="utf-8")
        )
        self.assertEqual(payload["batch_id"], "artifact-receipts-003")
        images = {image["id"]: image for image in payload["images"]}
        attachments = {entry["item_id"]: entry["media_ref"] for entry in payload["attachments"]}

        targets = {
            "HAR-1897-09-11-PETITION-MAUI-W-001": "HAR-ART-0011",
            "HAR-1897-09-11-PETITION-MAUI-HANA-W-001": "HAR-ART-0012",
            "HAR-1897-09-11-PETITION-MOLOKAI-KALAWAO-M-001": "HAR-ART-0013",
            "HAR-1897-09-11-PETITION-KAUAI-W-001": "HAR-ART-0014",
            "HAR-1897-09-11-PETITION-KAUAI-KAWAIHAU-M-001": "HAR-ART-0015",
        }
        for item_id, media_ref in targets.items():
            self.assertEqual(attachments[item_id], media_ref)
            self.assertEqual(images[media_ref]["image_class"], "document")
            self.assertEqual(images[media_ref]["relationship_default"], "exact")
            self.assertTrue(images[media_ref]["original_asset"].endswith(".gif"))

        self.assertEqual(len(set(targets.values())), len(targets))

        self.assertEqual(
            attachments["HAR-1897-07-01-IND-SAVED-001"],
            "HAR-ART-0010",
        )
        self.assertEqual(images["HAR-ART-0010"]["image_class"], "newspaper")
        self.assertEqual(images["HAR-ART-0010"]["relationship_default"], "exact")


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Wire the test into CI**

Add `tests/test_hawaii_archive_source_density_003.py` to both workflow path filters and add:

```yaml
- name: Verify Hawaiʻi Archive source density batch 003
  run: python tests/test_hawaii_archive_source_density_003.py
```

immediately after the batch 002 test.

- [ ] **Step 3: Run/trigger CI and verify RED**

Expected: existing archive tests pass; batch 003 fails because the three July 1 IDs and `artifact-receipts-003` do not exist yet.

- [ ] **Step 4: Commit the RED gate**

Suggested message:

```text
test: require Hawaiʻi Archive source density batch 003
```

---

### Task 2: Publish the July 1 mini-feed cluster

**Files:**
- Modify: `hawaii-archive/data/weeks/1897-06-01.json`
- Modify: `hawaii-archive/data/weeks/1897-06-01.sources.md`

**Interfaces:**
- Consumes: exact LOC July 1 page text.
- Produces: three new atomic feed records and a grounded same-day social-media-like cluster.

- [ ] **Step 1: Add `HAR-1897-07-01-IND-SAVED-001`**

Source-facing requirements:
- publication: `The Independent`
- place: `Honolulu, Oʻahu`
- kind: `editorial-status`
- source URL: exact LOC July 1 page
- preserve the source's distinction between current status and final outcome: Hawaiʻi remains unannexed/independent, but the fight is not yet won.
- do not render this as completed victory or as evidence that the treaty had disappeared.
- `voice_actor` should be omitted unless the item is intentionally attributed to the newspaper/editorial voice under the project's established rules.

Suggested derived feed shape, not a quote:

```text
Still unannexed. Still independent. The paper says the advantage is real, but the fight is not over yet.
```

- [ ] **Step 2: Add `HAR-1897-07-01-IND-MARIPOSA-001`**

Source facts to preserve:
- Mariposa arrives in Honolulu from San Francisco in 6½ days.
- She takes on 200 tons of coal.
- She is expected to leave for the Colonies that afternoon.

Suggested derived feed shape:

```text
Mariposa is in from San Francisco in 6½ days. She is taking on 200 tons of coal before heading for the Colonies this afternoon.
```

Use only source-facing Hawaiian/place wording in `hawaiian`; `Honolulu` is acceptable if no broader Hawaiian wording is present in the English item. Explain this limitation in `voice_evidence`.

- [ ] **Step 3: Add `HAR-1897-07-01-IND-FIRE-001`**

Source facts to preserve:
- fire begins among rockeries on Maunakea Street before daylight.
- firefighters bring it under control after hard work.
- Assistant Chief John Clark falls from a burning building and is seriously injured.

Suggested derived feed shape:

```text
Fire broke out on Maunakea Street before daylight. Firefighters got it under control, but Assistant Chief John Clark fell from a burning building and was seriously injured.
```

Use `Maunakea` as the source-facing Hawaiian field. Do not amplify the injury beyond the source.

- [ ] **Step 4: Update the fixture scope note and source ledger**

The composed evidence count moves from 65 to 68 after these three posts. Record the LOC page once in the source ledger and list the three atomic uses beneath it rather than pretending they came from three separate sources.

- [ ] **Step 5: Run archive tests**

Run at minimum:

```bash
python tests/test_hawaii_archive.py
python tests/test_hawaii_archive_june_window.py
python tests/test_hawaii_archive_source_density_002.py
python tests/test_hawaii_archive_source_density_003.py
```

Expected: all pass except Task 3's artifact assertions until artifact batch 003 lands.

- [ ] **Step 6: Commit**

Suggested message:

```text
content: add July 1 Hawaiʻi Archive micro-feed
```

---

### Task 3: Publish artifact-receipts-003

**Files:**
- Modify: `hawaii-archive/data/artifacts/index.json`
- Optional create if LOC does not expose a stable direct image: `hawaii-archive/assets/artifacts/HAR-ART-0010.png`

**Interfaces:**
- Consumes: July 1 LOC page plus five existing UH petition records.
- Produces: one exact newspaper receipt and five exact district petition receipts.

- [ ] **Step 1: Create `HAR-ART-0010` for the July 1 page**

Preferred order:
1. use a stable direct LOC image derivative if the record exposes one;
2. otherwise download the authoritative LOC PDF and render the page/crop deterministically to PNG;
3. if the connector cannot commit the binary, produce one ZIP using `docs/IMAGE_BINARY_HANDOFF.md`, with the exact target path `hawaii-archive/assets/artifacts/HAR-ART-0010.png`.

Metadata requirements:
- `image_class`: `newspaper`
- title: `The Independent, July 1, 1897`
- `relationship_default`: `exact`
- relationship label: `Exact publication artifact · July 1 page`
- source authority: exact LOC page, not a secondary mirror
- attach only to `HAR-1897-07-01-IND-SAVED-001` for this batch so the same full page does not visually repeat three times in a row.

- [ ] **Step 2: Create five district petition receipts**

Assign:
- `HAR-ART-0011` → Lahaina women → `pet099.gif`
- `HAR-ART-0012` → Hāna women → `pet146.gif`
- `HAR-ART-0013` → Kalawao men → `pet699.gif`
- `HAR-ART-0014` → Līhuʻe women → `pet084.gif`
- `HAR-ART-0015` → Kawaihau men → `pet611.gif`

Each must use:
- `image_class`: `document`
- `relationship_default`: `exact`
- `crop_mode`: `none`
- `review_status`: `approved`
- `color_decision`: `skipped`
- `reconstruction_decision`: `skipped`
- district-specific title/caption and UH record URL

- [ ] **Step 3: Bump the manifest batch id**

Set:

```json
"batch_id": "artifact-receipts-003"
```

Preserve all existing `HAR-ART-0001` through `HAR-ART-0009` records and attachments.

- [ ] **Step 4: Run artifact/media tests**

```bash
python tests/test_hawaii_archive_artifact_receipts.py
python tests/test_hawaii_archive_source_density_003.py
python tests/test_hawaii_archive.py
node --check hawaii-archive/app.js
```

Expected: pass without reader or CSS changes.

- [ ] **Step 5: Commit**

Suggested message:

```text
content: add Hawaiʻi Archive artifact receipts batch 003
```

---

### Task 4: Probe and promote one Hawaiʻi State Archives letter

**Files:**
- Modify if promoted: `hawaii-archive/data/weeks/1897-06-01.json`
- Modify if promoted: `hawaii-archive/data/weeks/1897-06-01.sources.md`
- Modify if exact scan is useful: `hawaii-archive/data/artifacts/index.json`
- Modify if not promoted: `hawaii-archive/PROJECT_STATE.md` research-lead note only

**Interfaces:**
- Consumes: Hawaiʻi Digital Archives record text/image.
- Produces: zero or one additional grounded letter post. This task has a hard evidence gate, so non-promotion is a valid outcome.

- [ ] **Step 1: Resolve the June 30 Kaulia record directly**

Open/download the text and page images for:
`https://digitalarchives.hawaii.gov/item/ark%3A70111/1FXc`

Identify which page/letter is dated June 30, 1897. Do not mix the May 22 and June 30 letters.

- [ ] **Step 2: Decide promotion using this exact gate**

Promote only if all are true:
- the June 30 text itself is accessible, not only a catalog summary;
- the speaker/author is clearly James Keauiluna Kaulia;
- one compact sentence/claim can stand as an atomic feed item;
- Hawaiian source text is directly available for the atomic claim;
- date and addressee are unambiguous.

If any condition fails, do not fabricate. Record the source as a future research lead in `PROJECT_STATE.md` and stop this task.

- [ ] **Step 3: If promoted, create one post**

Use ID:
`HAR-1897-06-30-KAULIA-LETTER-001`

Set `voice_actor` only because the archive identifies Kaulia as author. Derive `english_close` from the archival translation or a careful close translation of the direct text. Keep the feed compact and letter-like.

- [ ] **Step 4: If the exact scan materially adds value, attach it**

Use next free artifact ID after `HAR-ART-0015`, expected `HAR-ART-0016`, but re-read the manifest first in case another chat has advanced it. Label it `Exact document · Kaulia letter` only if it is the actual page containing the promoted text.

- [ ] **Step 5: Fallback probe only if June 30 is not promotable**

Check:
`https://digitalarchives.hawaii.gov/item/ark%3A70111/1FXd`

Apply the same gate to the August 19 D. W. Keawe-Kaunahi letter. Promote at most one of these candidate letters in batch 003.

- [ ] **Step 6: Test and commit if promoted**

If a letter post is added, increase the composed grounded-text count to 69 and add a focused assertion to `tests/test_hawaii_archive_source_density_003.py` for the exact chosen ID/source. If neither letter is promoted, keep the minimum batch completion count at 68.

Suggested commit if promoted:

```text
content: add 1897 Hawaiʻi State Archives letter post
```

---

### Task 5: Final state, verification, and release

**Files:**
- Modify: `hawaii-archive/PROJECT_STATE.md`

**Interfaces:**
- Consumes: completed text/artifact batch.
- Produces: durable authority and a clean handoff to future chats.

- [ ] **Step 1: Refresh `PROJECT_STATE.md`**

Record:
- grounded text count: 68 minimum, 69 if one State Archives letter is promoted;
- `artifact-receipts-003` and its six new receipts;
- the July 1 micro-feed as a proof that one newspaper page can generate politics, shipping, and local emergency posts without manufacturing topical balance;
- Hawaiʻi Digital Archives as a productive permitted source lane when direct item text/images are available;
- no Image OS/reconstruction files touched.

- [ ] **Step 2: Run the full project workflow locally or through PR CI**

Required checks:

```bash
python tests/test_project_hub.py
python tests/test_hawaii_archive.py
python tests/test_hawaii_archive_live_cache.py
python tests/test_hawaii_archive_june_window.py
python tests/test_hawaii_archive_resource_links.py
python tests/test_hawaii_archive_artifact_receipts.py
python tests/test_hawaii_archive_source_density_002.py
python tests/test_hawaii_archive_source_density_003.py
python tests/test_hawaii_image_asset_states.py
python tests/test_hawaii_reconstructed_default.py
python tests/test_hawaii_archive_photo_posts_v2.py
python tests/test_hawaii_archive_visual_feed_batch.py
node --check hawaii-archive/app.js
node --check hawaii-archive/image-pilot.js
```

- [ ] **Step 3: Re-read fresh `main` before merge**

If concurrent image work advanced `main`, confirm this branch does not overwrite `hawaii-archive/data/images/index.json`, `systems/image-os/**`, or newly added artifact IDs. Rebase/reconcile IDs if necessary.

- [ ] **Step 4: Merge only after fresh PR CI is green**

Do not claim completion from branch tests alone.

- [ ] **Step 5: Verify the exact merge SHA on `main`**

Confirm Project Hub Tests pass on the merge SHA.

- [ ] **Step 6: Verify GitHub Pages deployment**

Confirm the Pages build/deploy succeeds for the same merge SHA before telling the user the batch is live.

## Done When

- At least 3 new grounded July 1 posts are live, bringing the evidence count to at least 68.
- The July 1 page has one exact in-feed newspaper receipt.
- Five additional petition posts show their own exact district sheets across Maui, Molokaʻi, and Kauaʻi.
- `artifact-receipts-003` preserves all prior artifacts and adds `HAR-ART-0010` through at least `HAR-ART-0015`.
- One Hawaiʻi Digital Archives letter has either been promoted from direct evidence or explicitly left unpromoted with the reason recorded.
- No Image OS or reconstruction authority is overwritten.
- Full `main` CI and Pages are green on the exact merge SHA.
