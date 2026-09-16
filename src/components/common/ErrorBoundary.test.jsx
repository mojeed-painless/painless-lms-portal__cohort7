import React from 'react';
import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/Safe content/i)).toBeInTheDocument();
  });

  it('renders error message when child throws error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    // suppress console.error for this test
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    console.error.mockRestore();
  });
});
