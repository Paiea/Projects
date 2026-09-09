from pathlib import Path
import json


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "hawaii-archive"


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{label}: expected one match, found {count}")
    return text.replace(old, new, 1)


def patch_app():
    path = ARCHIVE / "app.js"
    text = path.read_text(encoding="utf-8")

    asset_fn = '''function assetForState(imageRecord, state) {
  const field = STATE_ASSET_FIELDS[state];
  return field ? imageRecord[field] : null;
}
'''
    asset_with_gate = asset_fn + '''
function publicReconstructedAsset(imageRecord) {
  return imageRecord.reconstruction_decision === "approved"
    ? imageRecord.reconstructed_asset
    : null;
}
'''
    if "function publicReconstructedAsset" not in text:
        text = replace_once(text, asset_fn, asset_with_gate, "reconstruction gate")

    old_image = '''  const image = document.createElement("img");
  image.src = imageRecord.reconstructed_asset
    || (imageRecord.color_decision === "approved" && imageRecord.color_asset ? imageRecord.color_asset : null)
    || imageRecord.restored_asset
    || imageRecord.original_asset;
'''
    new_image = '''  const reconstructedAsset = publicReconstructedAsset(imageRecord);
  const image = document.createElement("img");
  image.src = reconstructedAsset
    || (imageRecord.color_decision === "approved" && imageRecord.color_asset ? imageRecord.color_asset : null)
    || imageRecord.restored_asset
    || imageRecord.original_asset;
'''
    text = replace_once(text, old_image, new_image, "default image gate")

    text = replace_once(
        text,
        '''  if (imageRecord.reconstructed_asset) {
    const reconstructedButton = makeMediaButton("Reconstructed", "reconstructed");
''',
        '''  if (imageRecord.reconstruction_decision === "approved" && imageRecord.reconstructed_asset) {
    const reconstructedButton = makeMediaButton("Reconstructed", "reconstructed");
''',
        "reconstructed control gate",
    )

    text = replace_once(
        text,
        '    const originalButton = makeMediaButton("Original", "original");',
        '    const originalButton = makeMediaButton(imageRecord.original_label || "Original", "original");',
        "original label",
    )

    old_default = '''  const defaultState = imageRecord.reconstructed_asset ? "reconstructed"
    : imageRecord.color_decision === "approved" && imageRecord.color_asset ? "color"
      : imageRecord.restored_asset ? "restored"
        : "original";
'''
    new_default = '''  const defaultState = reconstructedAsset ? "reconstructed"
    : imageRecord.color_decision === "approved" && imageRecord.color_asset ? "color"
      : imageRecord.restored_asset ? "restored"
        : "original";
'''
    text = replace_once(text, old_default, new_default, "default state")

    old_context = '''  if (imageRecord.reconstructed_asset) {
    const reconstructedConfidence = document.createElement("span");
    reconstructedConfidence.className = "media-color-confidence";
    reconstructedConfidence.textContent = `Reconstructed view · ${imageRecord.reconstruction_confidence || "derived"}`;
    context.append(reconstructedConfidence);
  } else if (imageRecord.color_decision === "approved") {
'''
    new_context = '''  if (reconstructedAsset) {
    const reconstructedConfidence = document.createElement("span");
    reconstructedConfidence.className = "media-color-confidence";
    reconstructedConfidence.textContent = `Reconstructed view · ${imageRecord.reconstruction_confidence || "derived"}`;
    context.append(reconstructedConfidence);
  } else if (imageRecord.reconstruction_decision === "hold") {
    const held = document.createElement("span");
    held.className = "media-color-confidence";
    held.textContent = "Reconstruction held · archive reference shown";
    context.append(held);
  } else if (imageRecord.color_decision === "approved") {
'''
    text = replace_once(text, old_context, new_context, "held reconstruction label")

    old_media_route = '''  if (item.image_ref && imageMap.has(item.image_ref)) {
    article.append(makePostMedia(imageMap.get(item.image_ref)));
  }
'''
    new_media_route = '''  const mediaRef = item.media_ref || item.image_ref;
  if (mediaRef && imageMap.has(mediaRef)) {
    article.append(makePostMedia(imageMap.get(mediaRef)));
  }
'''
    text = replace_once(text, old_media_route, new_media_route, "media routing")

    old_map = '  const imageMap = new Map(imagePayload.images.map((imageRecord) => [imageRecord.id, imageRecord]));\n'
    new_map = '''  const allImages = [
    ...(imagePayload.images || []),
    ...(imagePayload.feed_images || []),
  ];
  const imageMap = new Map(allImages.map((imageRecord) => [imageRecord.id, imageRecord]));
'''
    text = replace_once(text, old_map, new_map, "feed image map")

    path.write_text(text, encoding="utf-8")


def patch_routes():
    routes = {
        "1897-06-01.json": {
            "HAR-1897-06-17-LILIU-001": "HAR-IMG-0011",
        },
        "1897-09-06.json": {
            "HAR-1897-09-06-ALOHA-003": "HAR-IMG-0016",
            "HAR-1897-09-10-KUOKOA-001": "HAR-IMG-0012",
        },
    }
    weeks = ARCHIVE / "data" / "weeks"
    for filename, mapping in routes.items():
        path = weeks / filename
        payload = json.loads(path.read_text(encoding="utf-8"))
        by_id = {item["id"]: item for item in payload["items"]}
        missing = set(mapping) - set(by_id)
        if missing:
            raise RuntimeError(f"{filename}: missing {sorted(missing)}")
        for item_id, image_id in mapping.items():
            by_id[item_id]["media_ref"] = image_id
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    patch_app()
    patch_routes()


if __name__ == "__main__":
    main()
