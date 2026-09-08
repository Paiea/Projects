from pathlib import Path
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "pidgin-olelo"


def run_node(script: str) -> str:
    result = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip()


def test_extra_70_are_existing_items_in_explicit_utility_order():
    script = r'''
      global.window = {};
      require("./pidgin-olelo/phrases.js");
      const curriculum = require("./pidgin-olelo/curriculum.js");
      const items = window.PIDGIN_OLELO_ITEMS;
      const extra = curriculum.extraItems(items);
      console.log(JSON.stringify({
        count: extra.length,
        unique: new Set(extra.map(x => x.id)).size,
        firstTen: extra.slice(0, 10).map(x => x.id),
        overlap: extra.filter(x => curriculum.CORE_IDS.includes(x.id)).map(x => x.id),
      }));
    '''
    data = json.loads(run_node(script))
    assert data["count"] == 70
    assert data["unique"] == 70
    assert data["overlap"] == []
    assert data["firstTen"] == [
        "and-you",
        "no-problem",
        "me-too",
        "you-okay",
        "hungry-q",
        "hungry-a",
        "full",
        "ono",
        "thirsty",
        "tired",
    ]


def test_core_learn_keeps_more_phrases_entry_quiet_and_locked_until_five_solid():
    html = (APP / "index.html").read_text()
    app = (APP / "app.js").read_text()

    assert 'id="more-phrases-link"' in html
    assert 'href="more.html"' in html
    assert 'hidden' in html.split('id="more-phrases-link"', 1)[0].split("<a", 1)[-1]
    assert "MORE_PHRASES_UNLOCK_SOLID = 5" in app
    assert "els.morePhrasesLink.hidden = solid < MORE_PHRASES_UNLOCK_SOLID" in app


def test_more_page_reuses_the_same_practice_engine_instead_of_a_second_mode_system():
    page = APP / "more.html"
    assert page.exists()
    html = page.read_text()

    assert 'data-deck="extra"' in html
    assert '<script src="core-engine.js"></script>' in html
    assert '<script src="app.js"></script>' in html
    assert 'href="index.html"' in html
    assert "extra.js" not in html


def test_extra_deck_uses_separate_progress_but_same_six_vector_engine():
    app = (APP / "app.js").read_text()

    assert 'const IS_EXTRA_DECK = document.body.dataset.deck === "extra";' in app
    assert 'const PRACTICE_ITEMS = IS_EXTRA_DECK ? CURRICULUM.extraItems(ALL_ITEMS) : CURRICULUM.coreItems(ALL_ITEMS);' in app
    assert '"pidgin-olelo-extra-v1"' in app
    assert "ENGINE.pickVector" in app
    assert "ENGINE.buildQuestion" in app


def test_extra_pool_starts_small_and_expands_in_utility_order():
    app = (APP / "app.js").read_text()

    assert "EXTRA_STARTING_ACTIVE_COUNT = 10" in app
    assert "EXTRA_REPS_PER_UNLOCK = 8" in app
    assert "Math.min(PRACTICE_ITEMS.length, startingActiveCount() + Math.floor(state.repCount / repsPerUnlock()))" in app
