# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-09-22

### Added

- Standardized structured logging utilities (`logError`, `logInfo`) across page components.
- Zod schema validation at API data fetching entry points.
- Prettier configuration and `format:check` integration in CI workflow.
- MSW offline mock server setup for Vitest test isolation.

### Changed

- Refactored page component data-fetching logic into dedicated hooks (`useLeaderboard`, `useAdminDashboard`).
- Enforced test-driven workflow: every new feature or hook module must be committed alongside its corresponding `*.test.js` / `*.test.jsx` file.

### Fixed

- Fixed unhandled API payload validation errors in leaderboard screens.
