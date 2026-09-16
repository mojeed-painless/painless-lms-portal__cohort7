import { describe, it, expect, vi } from 'vitest';
import { logInfo, logError } from './logger';

describe('Structured JSON Logger', () => {
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
});