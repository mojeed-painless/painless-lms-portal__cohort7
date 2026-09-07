import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import TopicQuiz from './TopicQuiz';

const mockQuestions = [
  {
    id: 1,
    question: 'What is React?',
    options: ['A JavaScript Library', 'A CSS Framework', 'A Database', 'An OS'],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: 'What hook is used for side effects?',
    options: ['useState', 'useContext', 'useEffect', 'useReducer'],
    correctAnswer: 2,
  },
];

describe('TopicQuiz Component', () => {
  it('renders quiz question and options correctly', () => {
    render(<TopicQuiz questions={mockQuestions} topic="React Basics" />);

    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('A JavaScript Library')).toBeInTheDocument();
    expect(screen.getByText('A CSS Framework')).toBeInTheDocument();
  });

  it('allows user to select option and submit quiz results', async () => {
    const onCompleteMock = vi.fn();

    render(
      <TopicQuiz
        questions={mockQuestions}
        topic="React Basics"
        onComplete={onCompleteMock}
      />
    );

    // Select correct option for Q1
    fireEvent.click(screen.getByText('A JavaScript Library'));

    // Move to next question or submit
    const nextOrSubmitBtn = screen.getByRole('button', { name: /next|submit/i });
    fireEvent.click(nextOrSubmitBtn);

    // Select option for Q2
    if (screen.queryByText('What hook is used for side effects?')) {
      fireEvent.click(screen.getByText('useEffect'));
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    }

    // Verify API call completed via MSW and UI updated
    await waitFor(() => {
      expect(screen.getByText(/score|passed|completed/i)).toBeInTheDocument();
    });
  });

  it('handles submission error gracefully', async () => {
    // Override MSW handler to return 500
    server.use(
      http.post('*/api/quiz-attempts', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<TopicQuiz questions={mockQuestions} topic="React Basics" />);

    fireEvent.click(screen.getByText('A JavaScript Library'));
    fireEvent.click(screen.getByRole('button', { name: /submit|next/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/error submitting quiz|failed/i)
      ).toBeInTheDocument();
    });
  });
});