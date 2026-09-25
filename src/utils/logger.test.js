import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as Sentry from '@sentry/react';
import { logInfo, logError } from './logger';

vi.mock('@sentry/react', () => ({
  captureException: vi.fn(),
  addBreadcrumb: vi.fn(),
  withScope: vi.fn((cb) => cb({ setExtra: vi.fn(), setTag: vi.fn() })),
}));

describe('logger - Structured JSON Output & Sentry Breadcrumbs', () => {
  const originalEnv = import.meta.env.VITE_SENTRY_DSN;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    import.meta.env.VITE_SENTRY_DSN = originalEnv;
    console.info.mockRestore();
    console.error.mockRestore();
  });

  it('formats logInfo into a valid JSON object with timestamp, level, message, and context', () => {
    const rawPayload = logInfo('User session started', { userId: 'usr-101' });
    const parsed = JSON.parse(rawPayload);

    expect(parsed).toHaveProperty('timestamp');
    expect(parsed.level).toBe('INFO');
    expect(parsed.message).toBe('User session started');
    expect(parsed.context).toEqual({ userId: 'usr-101' });
    expect(isNaN(Date.parse(parsed.timestamp))).toBe(false);
  });

  it('formats logError into a valid JSON object with ERROR level', () => {
    const testError = new Error('Database connection timeout');
    const rawPayload = logError('Failed to fetch dashboard metrics', { error: testError, screen: 'AdminDashboard' });
    const parsed = JSON.parse(rawPayload);

    expect(parsed.level).toBe('ERROR');
    expect(parsed.message).toBe('Failed to fetch dashboard metrics');
    expect(parsed.context.screen).toBe('AdminDashboard');
  });

  it('sends Sentry breadcrumb and captures exception when VITE_SENTRY_DSN is set', () => {
    import.meta.env.VITE_SENTRY_DSN = 'https://mock@sentry.io/654321';

    const testError = new Error('Auth token expired');
    logError('Unauthorized request', { error: testError });

    expect(Sentry.addBreadcrumb).toHaveBeenCalledWith({
      category: 'logger',
      message: 'Unauthorized request',
      level: 'error',
      data: { error: testError },
    });
    expect(Sentry.captureException).toHaveBeenCalledWith(testError);
  });

  it('skips Sentry breadcrumbs when VITE_SENTRY_DSN is unset', () => {
    delete import.meta.env.VITE_SENTRY_DSN;

    logInfo('Local dev info', { debug: true });

    expect(Sentry.addBreadcrumb).not.toHaveBeenCalled();
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });
});
