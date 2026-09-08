from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class ProjectHubRegistrationTests(unittest.TestCase):
    def test_praxis_is_a_first_class_public_project(self):
        hub = (ROOT / "index.html").read_text(encoding="utf-8")
        registry = (ROOT / "state" / "PROJECT_REGISTRY.md").read_text(encoding="utf-8")
        state_path = ROOT / "praxis" / "PROJECT_STATE.md"

        self.assertIn("<h3>Praxis 5001 Study Tool</h3>", hub)
        self.assertIn('href="praxis/"', hub)

        self.assertIn("## Praxis 5001 Study Tool", registry)
        self.assertIn("- Public route: `praxis/`", registry)
        self.assertIn("- Durable state: `praxis/PROJECT_STATE.md`", registry)

        self.assertTrue(state_path.exists(), "Praxis needs a durable project state file")
        state = state_path.read_text(encoding="utf-8")
        self.assertIn("V2.3 Iteration 11", state)
        self.assertIn("Study Full Test", state)
        self.assertIn("Exam Simulation", state)
        self.assertIn("`main`", state)

    def test_the_islands_is_a_first_class_public_project(self):
        hub = (ROOT / "index.html").read_text(encoding="utf-8")
        registry = (ROOT / "state" / "PROJECT_REGISTRY.md").read_text(encoding="utf-8")
        state_path = ROOT / "alii" / "PROJECT_STATE.md"

        self.assertIn("<h3>The Islands</h3>", hub)
        self.assertIn('href="alii/"', hub)

        self.assertIn("## The Islands", registry)
        self.assertIn("- Public route: `alii/`", registry)
        self.assertIn("- Durable state: `alii/PROJECT_STATE.md`", registry)

        self.assertTrue(state_path.exists(), "The Islands needs a durable project state file")
        state = state_path.read_text(encoding="utf-8")
        self.assertIn("hidden deterministic simulation", state)
        self.assertIn("browser-local", state)
        self.assertIn("`main`", state)


if __name__ == "__main__":
    unittest.main()
