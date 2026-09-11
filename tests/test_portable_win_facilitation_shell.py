from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
LOADER = ROOT / "portable-win" / "win-3.js"
SHELL = ROOT / "portable-win" / "facilitation-shell.js"


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def test_loader_contract():
    loader = LOADER.read_text(encoding="utf-8")
    require('facilitation-shell.js' in loader, "facilitation shell must be loaded")
    require(
        loader.index('teaching-kernel-runtime.js') < loader.index('facilitation-shell.js'),
        "facilitation shell must load after the teaching kernel runtime",
    )


def test_pure_facilitation_contract():
    node_program = r'''
const assert = require('node:assert/strict');
const shell = require('./portable-win/facilitation-shell.js');

assert.deepEqual(shell.PRIMARY_WORKFLOWS, ['GUIDED PAGE','QUICK FIRE','WIN / STUDENT']);
assert.deepEqual(shell.GUIDED_PAGE_ROLES, ['EASY START','DO TOGETHER','TRY IT','TABLE TALK','STRETCH','QUICK CHECK']);

const page = shell.compileGuidedPage({
  quick:[{prompt:'quick 1'},{prompt:'quick 2'}],
  figure:[{prompt:'figure 1'},{prompt:'figure 2'}],
  btc:[{prompt:'btc 1'}],
  discuss:[{prompt:'discuss 1'}]
});
assert.equal(page.length, 6);
assert.deepEqual(page.map(x => x.role), shell.GUIDED_PAGE_ROLES);
assert.equal(page[0].prompt, 'quick 1');
assert.equal(page[3].prompt, 'btc 1');
assert.equal(page[4].prompt, 'discuss 1');
assert.equal(page[5].prompt, 'quick 2');
assert.equal(shell.pickDeepMode(0), 'BTC');
assert.equal(shell.pickDeepMode(1), 'DISCUSS');
'''
    result = subprocess.run(
        ["node", "-e", node_program],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    require(result.returncode == 0, f"facilitation pure contract failed:\n{result.stdout}\n{result.stderr}")


def test_browser_orchestration_contract():
    source = SHELL.read_text(encoding="utf-8")
    for text in (
        "GUIDED PAGE",
        "QUICK FIRE",
        "WIN / STUDENT",
        "MORE OPTIONS",
        "DEEPER",
        "START TOGETHER",
        "TABLES",
        "SHARE",
        "CHECK",
        "FIGURE IT OUT",
        "BTC",
        "DISCUSS",
    ):
        require(text in source, f"facilitation shell must retain {text}")

    require("hideNormalControl('#teachIntentButtons')" in source, "intent controls should be hidden from the normal setup")
    require("hideNormalControl('#teachModeButtons')" in source, "legacy facilitation controls should be hidden from the normal setup")
    require("$('#mrFrankModeBadge')" in source and "style.display='none'" in source, "Mr. Frank badge should not add first-line setup noise")
    require("$('#teachContextSummary')" in source, "context summary should be handled by the simplified shell")
    require("advanced.appendChild(context)" in source, "current-week context editor should live under More Options")
    require("selectMode('QUICK FIRE')" in source, "Quick Fire launch must route through the existing Quick Fire engine")
    require("window.print()" in source or "root.print()" in source, "Guided Page must be printable")
    require("teachState.mode=originalMode" in source, "DEEPER must restore Quick Fire instead of switching modes")


if __name__ == "__main__":
    test_loader_contract()
    test_pure_facilitation_contract()
    test_browser_orchestration_contract()
    print("Portable WIN facilitation shell contract: PASS")
