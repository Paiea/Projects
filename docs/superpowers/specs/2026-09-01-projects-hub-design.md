# Projects Hub Design

## Goal

Create a lightweight public Projects website in `Paiea/Projects` that acts as a durable launchpad for many different projects. Portable WIN is one project inside the hub, not the site’s only purpose.

## Product Shape

The root site is a broad project index. Projects are grouped into human-readable categories so the collection can grow without turning into a flat wall of links.

Initial categories:

- Classroom Tools
- Writing & Story Projects
- Utilities & Experiments

Only categories with at least one visible project need to render on day one. The category model should be easy to extend later without redesigning the whole site.

## Initial Projects

### Classroom Tools

#### Portable WIN

- Host the current tested Room 22 WIN Lab build inside this repository.
- Route: `/portable-win/`
- The hub card should clearly identify it as a classroom tool.
- Clicking the card opens the working app directly.
- Preserve the current WIN experience, including WIN groups, Morning, Teach, Q1 Show What You Know, Big Red Lollipop, and the new `Bar Models: Parts & Whole` teaching lane.

### Writing & Story Projects

#### Peg-Leg Greg Reader

- List it on the hub as a project.
- Link externally to the existing Peg-Leg Greg Reader site rather than copying the reader into this repository.

## Information Architecture

The root page should provide:

1. A simple site title such as `Projects`.
2. A short description that makes clear this is a collection of active tools, experiments, and creative work.
3. Category navigation near the top.
4. Project cards grouped under category headings.
5. Each card contains:
   - project name
   - short plain-language description
   - category label
   - action such as `Open Project`
6. Internal projects open within this site.
7. External projects link to their existing public site.

No account system, database, search engine, CMS, analytics dashboard, or framework is required.

## Technical Architecture

Use plain static web files suitable for GitHub Pages:

- `index.html` for the project hub
- `assets/styles.css` for shared hub styling
- `portable-win/index.html` for the Portable WIN app

Portable WIN may remain self-contained if that best preserves its existing portable architecture. The hub must not introduce runtime dependencies into Portable WIN.

The root site should work when served from the repository’s GitHub Pages project path, so internal links must be relative rather than assuming domain-root hosting.

## Classification Model

Categories are presentation and navigation structure, not separate applications.

A project belongs to one primary category. Initial classification:

- Portable WIN -> Classroom Tools
- Peg-Leg Greg Reader -> Writing & Story Projects

Future examples may include classroom apps, writing projects, utilities, experiments, or other tools. Adding a project should normally require only:

1. adding its folder if hosted internally, and
2. adding one new project card to the hub.

## Portable WIN Integration

The Portable WIN source should come from the exact tested build created from the current `Big Red Lollipop Assessment` authority with the Bar Models addition layered on top.

Do not rebuild WIN from older archived packages.

Do not remove or redesign working WIN features merely to make it fit the Projects site.

The project hub is a wrapper and launcher. Portable WIN remains its own classroom tool.

## Visual Direction

The hub should be clean, compact, and useful rather than decorative-heavy.

Priorities:

- readable on desktop and mobile
- obvious categories
- obvious project names
- large click targets
- no unnecessary animations
- no visual style that makes Classroom Tools look like the entire identity of the site

Portable WIN keeps its own existing visual design after launch.

## Public-Site Boundary

`Paiea/Projects` is public. Do not expose private repository links, private planning documents, classroom student data, localStorage exports, or internal-only project information in the rendered hub.

Only intentionally public project names, descriptions, and links belong on the site.

## Testing

Before completion:

- verify the root hub loads as static HTML
- verify category navigation reaches the correct sections
- verify Portable WIN launches from its project card
- regression-test the Portable WIN flows already validated before migration
- verify the Peg-Leg Greg external link points to the existing public reader
- verify relative paths work under GitHub Pages project-site hosting
- verify there are no required network dependencies for Portable WIN itself

## Out of Scope

For this first pass, do not add:

- authentication
- project editing UI
- database-backed project catalog
- search
- tags beyond the primary category labels
- automated project discovery from GitHub
- dashboards
- private-project listings
- duplicated Peg-Leg Greg source

The architecture should stay intentionally small so additional projects can be added later without creating a maintenance burden.
