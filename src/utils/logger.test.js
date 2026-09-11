import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logError, logWarn, logInfo } from './logger';

describe('logger', () => {
  let errorSpy, warnSpy, infoSpy;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logError writes to console.error with an [ERROR] prefix and meta', () => {
    logError('save failed', { userId: '123' });
    expect(errorSpy).toHaveBeenCalledWith('[ERROR] save failed', { userId: '123' });
  });

  it('logWarn writes to console.warn with a [WARN] prefix', () => {
    logWarn('deprecated call');
    expect(warnSpy).toHaveBeenCalledWith('[WARN] deprecated call', {});
  });

  it('logInfo writes to console.info with an [INFO] prefix', () => {
    logInfo('assignment created', { id: 'a1' });
    expect(infoSpy).toHaveBeenCalledWith('[INFO] assignment created', { id: 'a1' });
  });

  it('defaults meta to an empty object when omitted', () => {
    logError('no meta provided');
    expect(errorSpy).toHaveBeenCalledWith('[ERROR] no meta provided', {});
  });
});
