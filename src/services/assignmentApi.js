import { fetchJson } from './apiClient';
import { logError } from '../utils/logger';

export async function fetchDashboardMetrics() {
  try {
    return await fetchJson('/dashboard/summary');
  } catch (err) {
    logError('Failed fetching dashboard summary metrics', { error: err.message });
    throw err;
  }
}

export async function fetchAssignments() {
  try {
    return await fetchJson('/assignments');
  } catch (err) {
    logError('Failed fetching assignments list', { error: err.message });
    throw err;
  }
}

export async function submitAssignment(assignmentId, payload) {
  try {
    return await fetchJson(`/assignments/${assignmentId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    logError('Failed submitting assignment payload', { assignmentId, error: err.message });
    throw err;
  }
}
