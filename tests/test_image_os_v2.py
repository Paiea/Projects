from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]


class ImageOSV2Tests(unittest.TestCase):
    def test_v2_pipeline_contract_demotes_legacy_tint_and_routes_specialists(self):
        current = (ROOT / "systems" / "image-os" / "CURRENT.md").read_text(encoding="utf-8")
        pipeline_path = ROOT / "systems" / "image-os" / "rules" / "pipeline-v2.md"
        self.assertTrue(pipeline_path.exists())
        pipeline = pipeline_path.read_text(encoding="utf-8")

        self.assertIn("legacy", current.lower())
        self.assertIn("semantic color", current.lower())
        self.assertIn("SOURCE", pipeline)
        self.assertIn("PREFLIGHT", pipeline)
        self.assertIn("RESTORE_BW", pipeline)
        self.assertIn("RESTORED_APPROVAL", pipeline)
        self.assertIn("SEMANTIC_COLOR", pipeline)
        self.assertIn("DDColor", pipeline)
        self.assertIn("Real-ESRGAN", pipeline)
        self.assertIn("GFPGAN", pipeline)
        self.assertIn("CSS", pipeline)

    def test_kaulia_v2_route_is_conservative_and_colorizes_after_restoration(self):
        preflight_path = ROOT / "hawaii-archive" / "images" / "jobs" / "HAR-IMG-0001" / "preflight.md"
        runner_path = ROOT / "scripts" / "run_image_os_v2_kaulia.py"
        self.assertTrue(preflight_path.exists())
        self.assertTrue(runner_path.exists())

        preflight = preflight_path.read_text(encoding="utf-8")
        runner = runner_path.read_text(encoding="utf-8")

        self.assertIn("skip Real-ESRGAN", preflight)
        self.assertIn("skip GFPGAN", preflight)
        self.assertIn("stain", preflight.lower())
        self.assertIn("onnxruntime", runner)
        self.assertIn("DDColor", runner)
        self.assertIn("v2-restored.jpg", runner)
        self.assertIn("v2-color.jpg", runner)
        self.assertLess(runner.index("v2-restored.jpg"), runner.index("v2-color.jpg"))

    def test_kaulia_v2_run_records_reviewable_metrics_when_generated(self):
        run_path = ROOT / "hawaii-archive" / "images" / "jobs" / "HAR-IMG-0001" / "v2-run.json"
        if not run_path.exists():
            self.fail("Kaulia v2-run.json has not been generated")

        run = json.loads(run_path.read_text(encoding="utf-8"))
        self.assertEqual(run["image_id"], "HAR-IMG-0001")
        self.assertEqual(run["color_backend"], "DDColor-tiny-ONNX")
        self.assertEqual(run["detail_route"], "skipped")
        self.assertEqual(run["face_route"], "skipped")
        self.assertIn("structural_correlation", run["metrics"])
        self.assertIn("mean_chroma", run["metrics"])
        self.assertIn("luminance_mae", run["metrics"])
        self.assertIn(run["automated_review"], {"pass", "hold"})

    def test_kaulia_artistic_escalation_records_a_reviewable_candidate(self):
        asset = ROOT / "hawaii-archive" / "assets" / "images" / "HAR-IMG-0001" / "v2-artistic-color.jpg"
        run_path = ROOT / "hawaii-archive" / "images" / "jobs" / "HAR-IMG-0001" / "v2-artistic-run.json"
        self.assertTrue(asset.exists(), "DDColor artistic candidate has not been generated")
        self.assertGreater(asset.stat().st_size, 1000)
        self.assertTrue(run_path.exists(), "DDColor artistic review metrics are missing")

        run = json.loads(run_path.read_text(encoding="utf-8"))
        self.assertEqual(run["image_id"], "HAR-IMG-0001")
        self.assertEqual(run["color_backend"], "DDColor-artistic")
        self.assertEqual(run["input_stage"], "v2-restored")
        self.assertIn("mean_chroma", run["metrics"])
        self.assertIn("luminance_mae", run["metrics"])
        self.assertIn(run["automated_review"], {"pass", "hold"})
        self.assertEqual(run["publication_gate"], "human-review-required")


if __name__ == "__main__":
    unittest.main()
