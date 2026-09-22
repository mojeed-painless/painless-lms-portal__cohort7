import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logInfo, logError, setErrorSink } from './logger';

describe('Logger integration and structured output', () => {
  let consoleErrorSpy;
  let consoleLogSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    setErrorSink(null);
    delete window.Sentry;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
    vi.unstubAllEnvs();
    setErrorSink(null);
    delete window.Sentry;
  });

  it('calls registered error sink when logError is invoked', () => {
    const mockSink = vi.fn();
    setErrorSink(mockSink);

    logError('Database connection lost', { retries: 3 });

    expect(mockSink).toHaveBeenCalledTimes(1);
    expect(mockSink).toHaveBeenCalledWith('Database connection lost', { retries: 3 });
  });

  it('safely no-ops and logs to console when no error sink is configured', () => {
    setErrorSink(null);

    expect(() => {
      logError('Unhandled API Exception', { status: 500 });
    }).not.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it('forwards error to window.Sentry when VITE_SENTRY_DSN is configured', () => {
    vi.stubEnv('VITE_SENTRY_DSN', 'https://mock@sentry.io/123456');

    const mockCaptureException = vi.fn();
    window.Sentry = {
      captureException: mockCaptureException,
    };

    const testError = new Error('DB error');
    logError('Failed to load user profile', { error: testError, userId: 'usr-99' });

    expect(mockCaptureException).toHaveBeenCalledTimes(1);
    expect(mockCaptureException).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        extra: expect.objectContaining({ userId: 'usr-99' }),
      })
    );
  });

  it('skips window.Sentry when VITE_SENTRY_DSN is unset or window.Sentry is unavailable', () => {
    delete window.Sentry;
    vi.unstubAllEnvs();

    expect(() => {
      logError('Transient network failure', { code: 500 });
    }).not.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('emits logInfo as valid structured JSON with required fields', () => {
    logInfo('User session started', { userId: 'usr_101' });

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const loggedOutput = JSON.parse(consoleLogSpy.mock.calls[0][0]);

    expect(loggedOutput).toHaveProperty('timestamp');
    expect(loggedOutput.level).toBe('INFO');
    expect(loggedOutput.message).toBe('User session started');
    expect(loggedOutput.context).toEqual({ userId: 'usr_101' });
  });

  it('emits logError as valid structured JSON with error context', () => {
    logError('Network request failed', { status: 500 });

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    const loggedOutput = JSON.parse(consoleErrorSpy.mock.calls[0][0]);

    expect(loggedOutput).toHaveProperty('timestamp');
    expect(loggedOutput.level).toBe('ERROR');
    expect(loggedOutput.message).toBe('Network request failed');
    expect(loggedOutput.context).toEqual({ status: 500 });
  });
});
