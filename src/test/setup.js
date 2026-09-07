import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../mocks/server';

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers after each test (prevents test pollution)
afterEach(() => server.resetHandlers());

// Close server when all tests finish
afterAll(() => server.close());