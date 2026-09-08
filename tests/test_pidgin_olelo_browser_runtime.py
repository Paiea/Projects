from pathlib import Path
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT / "pidgin-olelo"


class PidginOleloBrowserRuntimeTests(unittest.TestCase):
    def test_shared_classic_script_scope_boots_curriculum_and_engine(self):
        script = r'''
const fs = require("fs");
const vm = require("vm");
const context = vm.createContext({ window: {} });
for (const path of process.argv.slice(1)) {
  const source = fs.readFileSync(path, "utf8");
  vm.runInContext(source, context, { filename: path });
}
if (!context.window.PIDGIN_OLELO_ITEMS) throw new Error("phrase bank did not boot");
if (!context.window.PIDGIN_OLELO_CURRICULUM) throw new Error("curriculum did not boot");
if (!context.window.PIDGIN_OLELO_CORE_ENGINE) throw new Error("core engine did not boot");
const core = context.window.PIDGIN_OLELO_CURRICULUM.coreItems(context.window.PIDGIN_OLELO_ITEMS);
const first = context.window.PIDGIN_OLELO_CORE_ENGINE.buildIntro(core[0]);
if (!first || !first.prompt || !first.answer) throw new Error("first Learn question is empty");
'''
        completed = subprocess.run(
            [
                "node",
                "-e",
                script,
                str(PROJECT / "phrases.js"),
                str(PROJECT / "curriculum.js"),
                str(PROJECT / "core-engine.js"),
            ],
            capture_output=True,
            text=True,
        )
        self.assertEqual(
            completed.returncode,
            0,
            f"browser-style script boot failed:\n{completed.stderr}",
        )


if __name__ == "__main__":
    unittest.main()
