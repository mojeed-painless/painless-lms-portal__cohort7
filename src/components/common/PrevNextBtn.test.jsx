import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock CompletionButton to avoid internals
vi.mock('./CompletionButton', () => ({
  __esModule: true,
  default: () => <button>MockCompletion</button>,
}));

import * as ProgressContext from '../../context/ProgressContext';
import PrevNextBtn from './PrevNextBtn';

describe('PrevNextBtn', () => {
  it('shows disabled next button when lesson not complete', () => {
    vi.spyOn(ProgressContext, 'useProgress').mockReturnValue({
      isLessonComplete: () => false,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/lesson-1']}>
        <PrevNextBtn prevPath="/p" nextPath="/n" />
      </MemoryRouter>
    );

    // previous link present
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    // next should be a disabled button
    const nextBtn = container.querySelector('button.next-btn-disabled');
    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
    // our mocked CompletionButton should render
    expect(screen.getByText(/MockCompletion/i)).toBeInTheDocument();
  });

  it('shows next as link when lesson complete', () => {
    vi.spyOn(ProgressContext, 'useProgress').mockReturnValue({
      isLessonComplete: () => true,
    });

    render(
      <MemoryRouter initialEntries={['/lesson-1']}>
        <PrevNextBtn prevPath="/p" nextPath="/n" />
      </MemoryRouter>
    );

    // next should be rendered as a link
    const nextLink = screen
      .getAllByText(/next/i)
      .find((n) =>
        n.tagName.toLowerCase() === 'span' ? n.parentElement.tagName.toLowerCase() === 'a' : false
      );
    expect(nextLink).toBeTruthy();
  });
});
