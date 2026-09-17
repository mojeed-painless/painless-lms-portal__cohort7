import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTopicQuizState } from './useTopicQuizState';

const mockQuestions = [
  { id: 'q1', text: 'Q1', options: ['A', 'B'], correctOption: 0 },
  { id: 'q2', text: 'Q2', options: ['C', 'D'], correctOption: 1 },
];

describe('useTopicQuizState Hook', () => {
  it('manages active question index and computes final score', () => {
    const { result } = renderHook(() => useTopicQuizState(mockQuestions));

    act(() => {
      result.current.selectOption('q1', 0);
      result.current.nextQuestion();
    });

    expect(result.current.currentIndex).toBe(1);

    act(() => {
      result.current.selectOption('q2', 1);
      result.current.nextQuestion();
    });

    expect(result.current.isFinished).toBe(true);
    expect(result.current.score).toBe(2);
  });
});
