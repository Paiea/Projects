from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SLUGS = [
    'tower-of-aescalon',
    'auric-world',
    'veils-of-power',
    'gravitys-embrace',
    'dragon-spotter',
    'triggerman',
    'umbral-healer',
]


def test_all_story_projects_have_required_files():
    for slug in SLUGS:
        base = ROOT / 'stories' / slug
        for rel in ['index.html', 'README.md', 'PROJECT_STATE.md', 'STORY_SEED.md', 'reader-data.js', 'manuscript/README.md']:
            assert (base / rel).is_file(), f'{slug} missing {rel}'


def test_reader_data_contract_is_seed_only_until_manuscript_exists():
    for slug in SLUGS:
        text = (ROOT / 'stories' / slug / 'reader-data.js').read_text()
        assert 'window.PAIEA_STORY' in text
        assert f'slug: "{slug}"' in text
        assert 'kind: "seed"' in text
        assert 'chapters: []' in text
        for field in ['title:', 'subtitle:', 'status:', 'hook:', 'signals:', 'seedSections:']:
            assert field in text, f'{slug} missing {field}'
        assert 'conversation_id' not in text


def test_shared_reader_allowlist_matches_promoted_story_slugs():
    app = (ROOT / 'stories' / 'light-reader' / 'app.js').read_text()
    match = re.search(r'const ALLOWED_STORIES = new Set\(\[(.*?)\]\);', app, re.S)
    assert match, 'reader must define explicit ALLOWED_STORIES set'
    found = re.findall(r'[\"\']([^\"\']+)[\"\']', match.group(1))
    assert found == SLUGS
    assert 'URLSearchParams' in app
    assert 'reader-data.js' in app
    assert 'window.PAIEA_STORY' in app
    assert 'renderError' in app


def test_story_hub_links_every_project_and_light_reader():
    hub = (ROOT / 'stories' / 'index.html').read_text()
    for slug in SLUGS:
        assert f'href="{slug}/"' in hub
        assert f'href="light-reader/?story={slug}"' in hub
    cards = re.findall(r'class="[^"]*\bstory-card\b[^"]*"', hub)
    assert len(cards) == len(SLUGS)


def test_public_story_files_do_not_expose_private_recovery_ids():
    for path in (ROOT / 'stories').rglob('*'):
        if not path.is_file():
            continue
        text = path.read_text(errors='ignore')
        assert 'conversation_id' not in text
        assert 'conversations-00' not in text
        assert 'file_00000000' not in text
