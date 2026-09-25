import * as Sentry from '@sentry/react';

const isSentryConfigured = () => Boolean(import.meta.env.VITE_SENTRY_DSN);

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

  if (process.env.NODE_ENV !== 'test') {
    console.error(payload);
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
