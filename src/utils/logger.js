/**
 * Thin logging wrapper. Every call site logs through here instead of
 * calling console directly, so swapping in a real error-tracking backend
 * (Sentry, LogRocket, Datadog, etc.) later is a one-file change.
 */
export function logError(message, meta = {}) {
  console.error(`[ERROR] ${message}`, meta);
}

export function logWarn(message, meta = {}) {
  console.warn(`[WARN] ${message}`, meta);
}

export function logInfo(message, meta = {}) {
  console.info(`[INFO] ${message}`, meta);
}
