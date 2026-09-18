import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { logInfo, logError, setErrorSink } from './logger';

describe('logger utilities', () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.resetModules();
    // reset sink
    setErrorSink(null);
  });

  it('logInfo formats and logs to console.log', () => {
    const out = logInfo('hello', { a: 1 });
    expect(typeof out).toBe('string');
    expect(logSpy).toHaveBeenCalled();
    expect(out).toContain('hello');
  });

  it('logError logs and dispatches to sink, and handles sink exceptions', () => {
    // set a sink that throws to hit the catch branch
    setErrorSink(() => {
      throw new Error('sink fail');
    });

    const formatted = logError('bad', { code: 123 });
    expect(typeof formatted).toBe('string');
    expect(errorSpy).toHaveBeenCalled();
    // ensure sink exception was caught and logged
    expect(
      errorSpy.mock.calls.some((call) =>
        String(call[0]).includes('Failed to dispatch error to tracking sink')
      )
    ).toBe(true);
  });

  it('emits logInfo as valid structured JSON with required fields', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logInfo('User session started', { userId: 'usr_101' });

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const loggedOutput = JSON.parse(consoleSpy.mock.calls[0][0]);

    expect(loggedOutput).toHaveProperty('timestamp');
    expect(loggedOutput.level).toBe('INFO');
    expect(loggedOutput.message).toBe('User session started');
    expect(loggedOutput.context).toEqual({ userId: 'usr_101' });

    consoleSpy.mockRestore();
  });

  it('emits logError as valid structured JSON with error context', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    logError('Network request failed', { status: 500 });

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const loggedOutput = JSON.parse(consoleSpy.mock.calls[0][0]);

    expect(loggedOutput).toHaveProperty('timestamp');
    expect(loggedOutput.level).toBe('ERROR');
    expect(loggedOutput.message).toBe('Network request failed');
    expect(loggedOutput.context).toEqual({ status: 500 });

    consoleSpy.mockRestore();
  });

  it('handles primitive context and a configured Sentry sink', async () => {
    vi.resetModules();
    vi.stubEnv('VITE_SENTRY_DSN', 'https://example.com/123');
    const captureException = vi.fn();
    vi.stubGlobal('window', { ...window, Sentry: { captureException } });

    const { logInfo: importLogInfo, logError: importLogError } = await import('./logger');

    const infoOutput = importLogInfo('Session started', 'plain-string');
    const errorOutput = importLogError('Tracking sink fired', { status: 500 });

    expect(JSON.parse(infoOutput).context).toEqual({ detail: 'plain-string' });
    expect(JSON.parse(errorOutput).context).toEqual({ status: 500 });
    expect(captureException).toHaveBeenCalledTimes(1);
  });
});
