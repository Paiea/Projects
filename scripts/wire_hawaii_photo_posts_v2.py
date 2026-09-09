from pathlib import Path
import json


ROOT = Path(__file__).resolve().parents[1]
WEEKS = ROOT / "hawaii-archive" / "data" / "weeks"


ROUTES = {
    "1897-06-01.json": {
        "HAR-1897-06-17-LILIU-001": "HAR-IMG-0011",
    },
    "1897-09-06.json": {
        "HAR-1897-09-06-ALOHA-003": "HAR-IMG-0016",
        "HAR-1897-09-10-KUOKOA-001": "HAR-IMG-0012",
    },
}


def main():
    for filename, routes in ROUTES.items():
        path = WEEKS / filename
        payload = json.loads(path.read_text(encoding="utf-8"))
        items = {item["id"]: item for item in payload["items"]}
        missing = sorted(set(routes) - set(items))
        if missing:
            raise KeyError(f"{filename} missing expected feed items: {missing}")
        for item_id, media_ref in routes.items():
            items[item_id]["media_ref"] = media_ref
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
