import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

// Mock useLocation from react-router-dom
vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/lesson-1' }),
}));

// Mock the progress context hook
vi.mock('../../context/ProgressContext', () => ({
  useProgress: () => ({
    isLessonComplete: (p) => false,
    markLessonComplete: vi.fn(),
  }),
}));

import CompletionButton from './CompletionButton';
import * as ProgressContext from '../../context/ProgressContext';

describe('CompletionButton', () => {
  it('renders as enabled when lesson not complete and calls markLessonComplete on click', () => {
    const mockMark = vi.fn();
    // replace mock implementation
    vi.spyOn(ProgressContext, 'useProgress').mockReturnValueOnce({
      isLessonComplete: () => false,
      markLessonComplete: mockMark,
    });

    render(<CompletionButton />);

    const btn = screen.getByRole('button');
    expect(btn).toBeEnabled();
    expect(screen.getByText(/Mark as Complete/i)).toBeInTheDocument();

    fireEvent.click(btn);
    expect(mockMark).toHaveBeenCalledWith('/lesson-1');
  });

  it('renders as disabled when lesson is complete', () => {
    const mockMark = vi.fn();
    vi.spyOn(ProgressContext, 'useProgress').mockReturnValueOnce({
      isLessonComplete: () => true,
      markLessonComplete: mockMark,
    });

    render(<CompletionButton />);

    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
  });
});
