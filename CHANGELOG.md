# Changelog

All notable changes to the Painless LMS Portal frontend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Structured JSON logging utility (`src/utils/logger.js`) with support for environment-controlled remote reporting.
- Input validation boundary checks using Zod schemas for assignment submissions and quiz attempts (`src/schemas/`).
- Centralized `apiClient.js` wrapper using `fetchJson` to standardize network error handling across all features.
- Test coverage gate set to 70% in `vitest.config.js` enforced directly via GitHub Actions CI pipeline.
- Integration tests for `QuizScreen`, `AdminDashboardScreen`, and `TopicQuiz` components using MSW.

### Changed

- Modularized route imports in `src/App.jsx` using section configuration objects (`cssRoutes`, `jsRoutes`).
- Refactored `useAssignments.js` by splitting student logic into `useStudentAssignments` and admin logic into `useAdminAssignments`.
- Deconstructed monolithic page components (`AssignmentScreen.jsx` and `quizData.js`) into focused sub-components under 250 LOC.
- Replaced raw `console.error` calls across components with the structured `logError` utility.

### Fixed

- Fixed unhandled network request leaks in unit tests by enforcing strict MSW error modes (`onUnhandledRequest: 'error'`).
