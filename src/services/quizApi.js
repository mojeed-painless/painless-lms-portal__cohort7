import { fetchJson } from './apiClient';
import { logError } from '../utils/logger';

export async function fetchQuiz(quizId) {
  try {
    return await fetchJson(`/quizzes/${quizId}`);
  } catch (err) {
    logError('Failed fetching quiz payload', { quizId, error: err.message });
    throw err;
  }
}

export async function submitQuizAnswer(quizId, answers) {
  try {
    return await fetchJson('/quizzes/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, answers }),
    });
  } catch (err) {
    if (err && err.status === 409) {
      return { status: 409, message: err.message || 'Already submitted today' };
    }
    logError('Error submitting quiz answers', { quizId, error: err.message });
    throw err;
  }
}

export async function fetchLeaderboard() {
  try {
    return await fetchJson('/quiz-attempts/leaderboard/daily/aggregate');
  } catch (err) {
    logError('Failed fetching daily leaderboard', { error: err.message });
    throw err;
  }
}

export async function fetchTopicAttempts(topicId) {
  try {
    return await fetchJson(`/topics/${topicId}/attempts`);
  } catch (err) {
    logError('Failed fetching topic attempts', { topicId, error: err.message });
    throw err;
  }
}

export async function fetchQuizAttempts(userId) {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (userId) headers['x-user-id'] = userId;
    return await fetchJson('/quiz-attempts', { headers });
  } catch (err) {
    logError('Failed fetching quiz attempts', { userId, error: err.message });
    throw err;
  }
}
