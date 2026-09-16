const ERROR_REPORTING_URL = import.meta.env.VITE_ERROR_REPORTING_URL;

function createLogObject(level, message, context = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    environment:
      (typeof process !== 'undefined' && process.env && (process.env.NODE_ENV || process.env.MODE)) ||
      'development',
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
    environment:
      (typeof process !== 'undefined' && process.env && (process.env.NODE_ENV || process.env.MODE)) ||
      'development',
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

  // Optional external error reporting hook
  if (ERROR_REPORTING_URL) {
    try {
      fetch(ERROR_REPORTING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: formatted,
      }).catch(() => {}); // Suppress network failures from logger
    } catch (err) {
      // Silently ignore reporting errors
    }
  }
  return formatted;
}