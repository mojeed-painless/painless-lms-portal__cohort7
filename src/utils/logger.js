import * as Sentry from '@sentry/react';

let errorSink = null;

const isSentryConfigured = () => Boolean(import.meta.env.VITE_SENTRY_DSN);

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

/**
 * Formats log payload into a standardized JSON structure.
 */
export function formatLogPayload(level, message, context = {}) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message: typeof message === 'string' ? message : String(message),
    context,
  });
}

export function logInfo(message, context = {}) {
  const payload = formatLogPayload('INFO', message, context);

  console.log(payload);
  if (process.env.NODE_ENV !== 'test') {
    console.info(payload);
  }

  if (isSentryConfigured()) {
    Sentry.addBreadcrumb({
      category: 'logger',
      message: typeof message === 'string' ? message : JSON.stringify(message),
      level: 'info',
      data: context,
    });
  }

  return payload;
}

export function logError(message, context = {}) {
  const payload = formatLogPayload('ERROR', message, context);
  const errorObj = context?.error instanceof Error
    ? context.error
    : new Error(typeof message === 'string' ? message : JSON.stringify(message));

  console.error(payload);

  if (typeof errorSink === 'function') {
    try {
      errorSink(message, context);
    } catch (err) {
      console.error('Failed to dispatch error to tracking sink', err);
    }
  } else if (isSentryConfigured()) {
    tryCaptureSentry(message, context);
  }

  if (isSentryConfigured()) {
    Sentry.addBreadcrumb({
      category: 'logger',
      message: typeof message === 'string' ? message : JSON.stringify(message),
      level: 'error',
      data: context,
    });

    Sentry.withScope((scope) => {
      scope.setExtra('context', context);
      scope.setTag('logger', 'painless-lms-client');
      Sentry.captureException(errorObj);
    });
  }

  return payload;
}
