# Architecture

Code organization and markdown content management

## Goals

- Keeps content editing markdown-first for easy changes
- Separates data parsing from UI rendering.

## Folder Layout

- `src/components/`
  - UI rendering
  - General site wide UI helpers are located in `src/components/markdown/`
- `src/data/`
  - content fetching and + module parsing from data presented in markdown files
  - Current modules:
    - `useExperienceData.js`
    - `useProjectsData.js`
    - `useOtherProjectsData.js`
    - `useProfileData.js`
    - `useTagData.js`

- `src/utils/`
  - Shared util logic
  - Current modules:
    - `markdownSectionData.js` (shared markdown list/section parsing)
    - `mediaLinks.js` (shared media URL normalization such as YouTube embed links)

## Content Sources

- `public/content/Experience.md`
- `public/content/Projects.md`
- `public/content/OtherProjects.md`
- `public/content/projects/*.md` (specific project detail pages)

## Data Flow

1. Data module in `src/data/` fetches markdown from `public/content/...`.
2. The module parses markdown into JS objects using shared helpers from `src/utils/`.
3. Section/page components in `src/components/` uses those parsed objects to render UI.


## Markdown Parsing Conventions

Shared helpers in `src/utils/markdownSectionData.js` support consistent parsing for patterns like:

- `- Badges:` with nested items: `  - Label [color]`
- `- Buttons:` with nested items: `  - Label [href]`
- Nested list item extraction for bullet sections.
- HTML comment stripping so commented markdown does not leak into parsed data.

## Naming Conventions

- Use `use*Data` for hook-based dataset modules in `src/data/`.
- Use `parse*` for parser functions.
- Use `create*` for factory functions that return render config objects.
- Keep page/section UI logic in `src/components/`.

## Change Guidelines

When adding a new markdown section format:

- Add or extend parser helpers in `src/utils/markdownSectionData.js`.
- Reuse those helpers in the relevant `src/data/*Data.js` module.
- Add or update parser tests.
- Update `README.md` content format examples if user-editable syntax changed.

When adding markdown-specific rendering behavior:

- Update `src/components/markdown/projectMarkdownComponents.js`to keep data extraction and rendering logic separate.
