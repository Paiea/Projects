from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class HawaiiArchiveLiveCacheTests(unittest.TestCase):
    def test_public_feed_bypasses_stale_browser_cache(self):
        page = (ROOT / "hawaii-archive" / "index.html").read_text(encoding="utf-8")
        script = (ROOT / "hawaii-archive" / "app.js").read_text(encoding="utf-8")

        self.assertIn('app.js?v=', page)
        self.assertIn('cache: "no-store"', script)
        self.assertIn('fetchFreshJson', script)
        self.assertIn('loadWindowChain', script)
        self.assertIn('fetchFreshJson(`data/weeks/${filename}`)', script)
        self.assertIn('loadWindowChain(windowPayload.extends)', script)


if __name__ == "__main__":
    unittest.main()
