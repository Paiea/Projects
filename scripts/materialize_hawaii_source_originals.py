from __future__ import annotations

import json
import shutil
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "hawaii-archive" / "assets" / "images"
DATA = ROOT / "hawaii-archive" / "data" / "images"

USER_AGENT = "Paiea-Hawaii-Archive-Revival/1.0"


def commons_redirect(filename: str) -> str:
    return "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + urllib.parse.quote(filename)


ITEMS = [
    {
        "id": "HAR-IMG-0011",
        "subject": "Queen Liliʻuokalani portrait",
        "source_filename": "Liliuokalani in 1891 (PPWD-16-4.019).jpg",
        "source_authority_url": "https://commons.wikimedia.org/wiki/File:Liliuokalani_in_1891_(PPWD-16-4.019).jpg",
        "source_record": "Hawaiʻi State Archives, PPWD-16-4.019, Queen Liliʻuokalani, c. 1891",
        "source_date": "c. 1891",
        "relationship_label": "Same person · earlier portrait",
        "rights_note": "Public-domain archival photograph; Commons record identifies Hawaiʻi State Archives as source.",
        "reconstruction_from": "HAR-IMG-0003/reconstructed.png",
    },
    {
        "id": "HAR-IMG-0012",
        "subject": "Sanford B. Dole portrait",
        "source_filename": "Sanford B. Dole (1896).jpg",
        "source_authority_url": "https://commons.wikimedia.org/wiki/File:Sanford_B._Dole_(1896).jpg",
        "source_record": "S. B. Dole, President of the Republic of Hawaii, published 1896",
        "source_date": "c. 1896",
        "relationship_label": "Same person · period portrait",
        "rights_note": "Public domain in the United States; period publication predates 1931.",
        "reconstruction_from": "HAR-IMG-0004/reconstructed.png",
    },
    {
        "id": "HAR-IMG-0013",
        "subject": "Honolulu Harbor",
        "source_filename": "Honolulu Harbor in 1890.jpg",
        "source_authority_url": "https://commons.wikimedia.org/wiki/File:Honolulu_Harbor_in_1890.jpg",
        "source_record": "Honolulu Harbor in 1890, Hawaiʻi State Archives",
        "source_date": "1890",
        "relationship_label": "Same place · near-period harbor context",
        "rights_note": "Public-domain archival photograph; Commons record identifies Hawaiʻi State Archives as source.",
        "reconstruction_from": "HAR-IMG-0005/reconstructed.png",
    },
    {
        "id": "HAR-IMG-0014",
        "subject": "Waikīkī Beach and Diamond Head",
        "source_filename": "Waikiki Beach, with Diamond Head, photograph by Brother Bertram.jpg",
        "source_authority_url": "https://commons.wikimedia.org/wiki/File:Waikiki_Beach,_with_Diamond_Head,_photograph_by_Brother_Bertram.jpg",
        "source_record": "Brother Bertram Photo Collection, Waikīkī Beach with Diamond Head",
        "source_date": "1883–1905",
        "relationship_label": "Same place · period recreation context",
        "rights_note": "Public-domain photograph by Brother Bertram Bellinghausen.",
        "reconstruction_from": "HAR-IMG-0006/reconstructed.png",
    },
    {
        "id": "HAR-IMG-0015",
        "subject": "Fort and King Streets, Honolulu",
        "source_filename": "Fort and King Streets, Honolulu, photograph by Frank Davey (PP-38-6-005).jpg",
        "source_authority_url": "https://commons.wikimedia.org/wiki/File:Fort_and_King_Streets,_Honolulu,_photograph_by_Frank_Davey_(PP-38-6-005).jpg",
        "source_record": "Hawaiʻi State Archives, PP-38-6-005, Fort and King Streets, Frank Davey",
        "source_date": "c. 1900",
        "relationship_label": "Same district · near-period street context",
        "rights_note": "Public domain in the United States; Hawaiʻi State Archives source record.",
        "reconstruction_from": "HAR-IMG-0007/reconstructed.png",
    },
    {
        "id": "HAR-IMG-0016",
        "subject": "Anti-annexation meeting at Hilo",
        "source_filename": "Anti-Annexation meeting at Hilo, 1897.jpg",
        "source_authority_url": "https://commons.wikimedia.org/wiki/File:Anti-Annexation_meeting_at_Hilo,_1897.jpg",
        "source_record": "Anti-annexation meeting at Hilo, September 16, 1897; San Francisco Call, Sept. 30, 1897",
        "source_date": "1897-09-16",
        "relationship_label": "Same movement · later 1897 crowd evidence",
        "rights_note": "Public domain in the United States; historical newspaper image.",
        "reconstruction_from": "HAR-IMG-0009/reconstructed.png",
    },
    {
        "id": "HAR-IMG-0017",
        "subject": "ʻIolani Palace close reconstructed view",
        "source_authority_url": "https://digitalarchives.hawaii.gov/browse/parent/ark%3A70111/1z1Z",
        "source_record": "Hawaiʻi State Archives, PPWD-1-8-010, ʻIolani Palace, c. 1890",
        "source_date": "c. 1890",
        "relationship_label": "Same place · reconstructed close view",
        "rights_note": "Uses the existing project Palace archival source authority.",
        "copy_original_from": "HAR-IMG-0002/original.jpg",
        "reconstruction_from": "HAR-IMG-0010/reconstructed.png",
    },
    {
        "id": "HAR-IMG-0018",
        "subject": "Poi making reconstructed view",
        "source_authority_url": "https://www.loc.gov/item/2018648914/",
        "source_record": "Library of Congress, Pounding poi - preparing dinner, Hawaiian Islands, 1896",
        "source_date": "1896",
        "relationship_label": "Same activity · reconstructed daily-life view",
        "rights_note": "Library of Congress lists no known restrictions on publication for the source stereograph.",
        "copy_original_from": "HAR-IMG-0003/original.jpg",
        "reconstruction_from": "HAR-IMG-0008/reconstructed.png",
    },
]


def download(url: str, destination: Path) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=60) as response, destination.open("wb") as output:
        shutil.copyfileobj(response, output)


def main() -> None:
    manifest_items = []
    for item in ITEMS:
        folder = ASSETS / item["id"]
        folder.mkdir(parents=True, exist_ok=True)

        original = folder / "original.jpg"
        if item.get("source_filename"):
            if not original.exists():
                download(commons_redirect(item["source_filename"]), original)
        else:
            source = ASSETS / item["copy_original_from"]
            shutil.copy2(source, original)

        reconstruction_source = ASSETS / item["reconstruction_from"]
        if not reconstruction_source.exists():
            raise FileNotFoundError(f"missing reconstruction source: {reconstruction_source}")
        shutil.copy2(reconstruction_source, folder / "reconstructed.png")

        manifest_items.append(
            {
                "id": item["id"],
                "subject": item["subject"],
                "source_authority_url": item["source_authority_url"],
                "source_record": item["source_record"],
                "source_date": item["source_date"],
                "relationship_label": item["relationship_label"],
                "rights_note": item["rights_note"],
                "original_asset": f"assets/images/{item['id']}/original.jpg",
                "reconstructed_asset": f"assets/images/{item['id']}/reconstructed.png",
                "reconstructed_is_derived": True,
            }
        )

    payload = {
        "batch_id": "hawaii-archive-source-originals-002",
        "purpose": "Corrected archival-source pairing for reconstructed Batch 001 visuals using fresh stable IDs.",
        "items": manifest_items,
    }
    DATA.mkdir(parents=True, exist_ok=True)
    (DATA / "source-originals-002.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
