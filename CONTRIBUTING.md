# Contributing Guidelines

Thank you for contributing to Painless LMS Portal! To maintain code quality and historical discipline, please follow these guidelines.

## 1. Test-Backed Increments Rule

Every implementation file (`src/hooks/useX.js`, `src/pages/XScreen.jsx`, `src/utils/X.js`) **MUST** be committed together with its corresponding test file (`*.test.js` or `*.test.jsx`) in the exact same commit.

Never submit or land an implementation file without its matching test suite.

## 2. Commit Message Format

We follow the Conventional Commits specification:

- `feat(scope): ...`
- `refactor(scope): ...`
- `fix(scope): ...`
- `test(scope): ...`
- `chore(scope): ...`

## 3. Contributor Diversity & Co-Authorship

To reflect all contributions accurately in Git history, include co-author metadata in commit trailers when pairing or collaborating:

```text
git commit -m "feat(hooks): add useQuiz custom hook with vitest suite

Co-authored-by: Alex Developer <alex@example.com>"
```

## 4. Release Tagging

Releases follow Semantic Versioning (vX.Y.Z). Only maintainers may tag releases on main.

## Commit Style & Testing Guidelines

All commits submitted to this repository must follow the [Conventional Commits specification](https://www.conventionalcommits.org/). This rule is strictly enforced on local commits via `commitlint` and Husky `commit-msg` hooks.

### Approved Commit Prefixes

* **`feat:`** A new user-facing or technical feature
* **`fix:`** A bug fix or error resolution
* **`test:`** Adding or refactoring unit/integration tests
* **`refactor:`** Code changes that neither fix a bug nor add a feature
* **`chore:`** Maintenance tasks, dependency updates, build tooling updates
* **`docs:`** Documentation updates (`README.md`, `CONTRIBUTING.md`)
* **`ci:`** Modifications to CI workflow configurations (`.github/workflows/`)

### Mandatory Test Pairing Rule

When fixing bugs or refactoring logic inside `src/pages/` or `src/hooks/`:
1. **Land the fix and its corresponding unit test (`*.test.jsx` / `*.test.js`) in the EXACT same commit.**
2. Do NOT separate implementation changes and tests into detached follow-up commits.

#### Example Commit Format:
```bash
git commit -m "fix(hooks): resolve race condition in useAssignments and pair with regression test"
```
