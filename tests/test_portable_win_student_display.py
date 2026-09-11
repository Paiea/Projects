from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "portable-win" / "index.html"
DISPLAY = ROOT / "portable-win" / "student-display.css"
BASE = ROOT / "portable-win" / "win-a.css"


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def test_student_display_layer_contract():
    index = INDEX.read_text(encoding="utf-8")
    require("student-display.css" in index, "student display stylesheet must be loaded")
    require(index.index("win.css") < index.index("student-display.css"), "student display must load after base styles")

    css = DISPLAY.read_text(encoding="utf-8")
    for selector in (
        ".morning-problem .problem-text",
        ".morning-ready",
        ".movement-box",
        ".finish-box",
        ".reset-note",
        ".timer",
        ".teach-prompt",
        ".teach-subprompt",
        ".precheck-prompt",
        ".prof-choice",
        ".prof-timer",
    ):
        require(selector in css, f"student display layer must style {selector}")

    require("clamp(24px" in css, "Morning student text should start substantially above the old 16px floor")
    require("clamp(44px" in css, "Teach projector prompt should have a classroom-size floor")
    require("clamp(40px" in css, "proficiency prompt/timer should have a classroom-size floor")
    require("body:has(#morning.screen.active)" in css, "Morning overrides should be scoped to the student-facing surface")


def test_short_height_does_not_force_student_text_to_sixteen_pixels():
    base = BASE.read_text(encoding="utf-8")
    display = DISPLAY.read_text(encoding="utf-8")
    require("@media(max-height:700px)" in base, "baseline must still contain the legacy short-height rule for this regression test")
    require("short-height readability override" in display, "final layer must explicitly override short-height shrinking")
    short_section = display.split("short-height readability override", 1)[1]
    require("font-size:16px" not in short_section.replace(" ", ""), "final short-height student overrides must not collapse text to 16px")


if __name__ == "__main__":
    test_student_display_layer_contract()
    test_short_height_does_not_force_student_text_to_sixteen_pixels()
    print("Portable WIN student display contract: PASS")
