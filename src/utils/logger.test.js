import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logInfo, logError, setErrorSink } from './logger';

describe('Logger integration and structured output', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    setErrorSink(null);
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

  it('emits logInfo as valid structured JSON with required fields', () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    logInfo('User session started', { userId: 'usr_101' });

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const loggedOutput = JSON.parse(consoleLogSpy.mock.calls[0][0]);

    expect(loggedOutput).toHaveProperty('timestamp');
    expect(loggedOutput.level).toBe('INFO');
    expect(loggedOutput.message).toBe('User session started');
    expect(loggedOutput.context).toEqual({ userId: 'usr_101' });

    consoleLogSpy.mockRestore();
  });

  it('emits logError as valid structured JSON with error context', () => {
    const consoleErrorSpyLocal = vi.spyOn(console, 'error').mockImplementation(() => {});

    logError('Network request failed', { status: 500 });

    expect(consoleErrorSpyLocal).toHaveBeenCalledTimes(1);
    const loggedOutput = JSON.parse(consoleErrorSpyLocal.mock.calls[0][0]);

    expect(loggedOutput).toHaveProperty('timestamp');
    expect(loggedOutput.level).toBe('ERROR');
    expect(loggedOutput.message).toBe('Network request failed');
    expect(loggedOutput.context).toEqual({ status: 500 });

    consoleErrorSpyLocal.mockRestore();
  });
});
