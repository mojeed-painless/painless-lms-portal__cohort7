import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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
});
