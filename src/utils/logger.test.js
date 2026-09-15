import { describe, it, expect, vi } from 'vitest';
import { logInfo, logError } from './logger';

describe('Structured Logger Utility', () => {
  it('formats info logs as structured JSON objects', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const result = logInfo('User logged in', { userId: '123' });

    expect(result.level).toBe('INFO');
    expect(result.message).toBe('User logged in');
    expect(result.context.userId).toBe('123');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('formats error logs as structured JSON objects', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = logError('API Request failed', { status: 500 });

    expect(result.level).toBe('ERROR');
    expect(result.context.status).toBe(500);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('formats network rejection errors with context and message shape', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const networkError = new Error('Failed to fetch leaderboard data');

    const result = logError('QuizScreen Leaderboard Fetch Failure', {
      error: networkError.message,
    });

    expect(result.level).toBe('ERROR');
    expect(result.message).toBe('QuizScreen Leaderboard Fetch Failure');
    expect(result.context.error).toBe('Failed to fetch leaderboard data');
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});