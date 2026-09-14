const ERROR_REPORTING_URL = import.meta.env.VITE_ERROR_REPORTING_URL;

function createLogObject(level, message, context = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    environment: import.meta.env.MODE || 'development',
  };
}

export function logInfo(message, context = {}) {
  const payload = createLogObject('INFO', message, context);
  console.log(JSON.stringify(payload));
  return payload;
}

export function logError(message, context = {}) {
  const payload = createLogObject('ERROR', message, context);
  console.error(JSON.stringify(payload));

  // Optional external error reporting hook
  if (ERROR_REPORTING_URL) {
    try {
      fetch(ERROR_REPORTING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {}); // Suppress network failures from logger
    } catch (err) {
      // Silently ignore reporting errors
    }
  }
  return payload;
}