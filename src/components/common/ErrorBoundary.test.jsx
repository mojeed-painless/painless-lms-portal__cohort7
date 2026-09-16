import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
import * as logger from '../../utils/logger';

const ProblemChild = () => {
  throw new Error('Test render crash');
};

describe('ErrorBoundary Component', () => {
  it('catches render errors, logs via logError, and renders fallback UI', () => {
    const logErrorSpy = vi.spyOn(logger, 'logError').mockImplementation(() => {});
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(logErrorSpy).toHaveBeenCalledWith(
      'Uncaught React Render Error',
      expect.objectContaining({ errorMessage: 'Test render crash' })
    );

    logErrorSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
