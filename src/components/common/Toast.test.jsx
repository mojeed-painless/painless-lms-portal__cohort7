import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Toast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it('renders the message', () => {
    const onClose = vi.fn();
    render(<Toast message="Test message" onClose={onClose} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('applies success styling when type is success', () => {
    const onClose = vi.fn();
    const { container } = render(<Toast message="Success!" type="success" onClose={onClose} />);

    const toastDiv = container.querySelector('[role="alert"]');
    expect(toastDiv).toHaveClass('bg-green-600');
    expect(toastDiv).toHaveClass('text-white');
  });

  it('applies error styling when type is error', () => {
    const onClose = vi.fn();
    const { container } = render(<Toast message="Error!" type="error" onClose={onClose} />);

    const toastDiv = container.querySelector('[role="alert"]');
    expect(toastDiv).toHaveClass('bg-red-600');
    expect(toastDiv).toHaveClass('text-white');
  });

  it('applies info styling by default', () => {
    const onClose = vi.fn();
    const { container } = render(<Toast message="Info" onClose={onClose} />);

    const toastDiv = container.querySelector('[role="alert"]');
    expect(toastDiv).toHaveClass('bg-blue-600');
    expect(toastDiv).toHaveClass('text-white');
  });

  it('applies info styling when type is unknown', () => {
    const onClose = vi.fn();
    const { container } = render(<Toast message="Test" type="unknown" onClose={onClose} />);

    const toastDiv = container.querySelector('[role="alert"]');
    expect(toastDiv).toHaveClass('bg-blue-600');
  });

  it('calls onClose after default duration', () => {
    const onClose = vi.fn();
    render(<Toast message="Test" onClose={onClose} />);

    vi.advanceTimersByTime(3000);

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose after custom duration', () => {
    const onClose = vi.fn();
    render(<Toast message="Test" onClose={onClose} duration={5000} />);

    vi.advanceTimersByTime(4999);
    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Toast message="Test" onClose={onClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('clears timer on unmount', () => {
    const onClose = vi.fn();
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    const { unmount } = render(<Toast message="Test" onClose={onClose} />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('renders close button with × symbol', () => {
    const onClose = vi.fn();
    render(<Toast message="Test" onClose={onClose} />);

    const closeButton = screen.getByRole('button');
    expect(closeButton).toHaveTextContent('×');
  });

  it('has fixed positioning and z-50 class', () => {
    const onClose = vi.fn();
    const { container } = render(<Toast message="Test" onClose={onClose} />);

    const toastDiv = container.querySelector('[role="alert"]');
    expect(toastDiv).toHaveClass('fixed');
    expect(toastDiv).toHaveClass('z-50');
    expect(toastDiv).toHaveClass('bottom-4');
    expect(toastDiv).toHaveClass('right-4');
  });

  it('has transition class for animations', () => {
    const onClose = vi.fn();
    const { container } = render(<Toast message="Test" onClose={onClose} />);

    const toastDiv = container.querySelector('[role="alert"]');
    expect(toastDiv).toHaveClass('transition-all');
  });
});
