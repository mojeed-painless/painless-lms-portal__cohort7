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
