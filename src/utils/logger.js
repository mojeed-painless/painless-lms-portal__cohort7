let errorSink = null;

function isSentryConfigured() {
  return Boolean(import.meta.env?.VITE_SENTRY_DSN);
}

function tryCaptureSentry(message, context = {}) {
  if (
    typeof window !== 'undefined' &&
    window.Sentry &&
    typeof window.Sentry.captureException === 'function'
  ) {
    try {
      const errorObj = context?.error instanceof Error
        ? context.error
        : new Error(typeof message === 'string' ? message : JSON.stringify(message));
      window.Sentry.captureException(errorObj, { extra: context });
    } catch (e) {
      // ignore
    }
  }
}

// Initialize default sink if Sentry DSN is provided and Sentry is available on window
// Uses window.Sentry which is injected by @sentry/react at app init, avoiding hard dependency at import time
if (isSentryConfigured()) {
  errorSink = (message, context) => {
    tryCaptureSentry(message, context);
  };
}

/**
 * Allows overriding or registering a custom error sink (used in testing & custom setup)
 */
export function setErrorSink(customSink) {
  errorSink = customSink;
}

function createLogObject(level, message, context = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    environment: import.meta.env.MODE || 'development',
  };
}

/**
 * Formats log parameters into a structured JSON payload
 */
function formatLog(level, message, context = {}) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    context: typeof context === 'object' && context !== null ? context : { detail: context },
    environment: import.meta.env.MODE || 'development',
  });
}

export function logInfo(message, context = {}) {
  const formatted = formatLog('INFO', message, context);
  console.log(formatted);
  return formatted;
}

export function logError(message, context = {}) {
  const payload = createLogObject('ERROR', message, context);
  const formatted = JSON.stringify(payload);
  console.error(formatted);

  if (typeof errorSink === 'function') {
    try {
      errorSink(message, context);
    } catch (err) {
      console.error('Failed to dispatch error to tracking sink', err);
    }
  } else if (isSentryConfigured()) {
    // Fallback to direct Sentry capture if no error sink is set but DSN is configured
    tryCaptureSentry(message, context);
  }

  return formatted;
}
