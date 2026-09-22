const VITE_BASE = import.meta.env.VITE_API_BASE_URL;
// Use Vite-provided mode detection instead of `process` (browser-friendly)
const IS_TEST = import.meta.env.MODE === 'test';

const API_HOST_FOR_TEST = 'http://localhost:5000';

const API_BASE_URL = VITE_BASE || (IS_TEST ? API_HOST_FOR_TEST : '/api');

function buildUrl(endpoint) {
  // In test environment we want requests to go to the test host and
  // ensure the path contains a single `/api` segment so MSW handlers
  // that match `*/api/*` will intercept correctly.
  if (IS_TEST) {
    const ep = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    return `${API_HOST_FOR_TEST}${ep}`;
  }
  // In non-test env keep previous behavior (API_BASE_URL may be '/api' or a full base)
  return `${API_BASE_URL}${endpoint}`;
}

export async function fetchJson(endpoint, options = {}) {
  const url = buildUrl(endpoint);
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error = new Error(
      errorBody.message || `API request failed with status ${response.status}`
    );
    error.status = response.status;
    throw error;
  }

  return response.json();
}
