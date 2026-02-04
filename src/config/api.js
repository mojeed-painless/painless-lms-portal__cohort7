// API Configuration
// Point to the backend server running on port 5000

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  QUIZ: {
    ADD_QUESTION: `${API_BASE_URL}/api/quizzes/daily/add-question`,
    GET_QUESTIONS: `${API_BASE_URL}/api/quizzes/daily/questions`,
    CHECK_ATTEMPT: `${API_BASE_URL}/api/quizzes/daily/check-attempt`,
    SUBMIT_QUIZ: `${API_BASE_URL}/api/quizzes/daily/submit`,
    GET_SETTINGS: `${API_BASE_URL}/api/quizzes/settings`,
    UPDATE_SETTINGS: `${API_BASE_URL}/api/quizzes/settings`,
    WINDOW_STATUS: `${API_BASE_URL}/api/quizzes/daily/window-status`,
  }
};
