import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UnderDevelopment from './UnderDevelopment';

// Mock react-icons to avoid SVG rendering complexity
vi.mock('react-icons/fa', () => ({
  FaLaptopCode: () => <svg data-testid="laptop-icon" />,
}));

describe('UnderDevelopment', () => {
  it('renders the under development message', () => {
    render(<UnderDevelopment section="Dashboard" />);

    expect(screen.getByText('🚧 Under Development 🚧')).toBeInTheDocument();
  });

  it('displays the section name in the message', () => {
    render(<UnderDevelopment section="Analytics" />);

    expect(screen.getByText('The Analytics section is coming soon')).toBeInTheDocument();
  });

  it('renders the laptop code icon', () => {
    render(<UnderDevelopment section="Features" />);

    expect(screen.getByTestId('laptop-icon')).toBeInTheDocument();
  });

  it('applies the under-development class', () => {
    const { container } = render(<UnderDevelopment section="Test" />);

    expect(container.querySelector('.under-development')).toBeInTheDocument();
  });

  it('displays small text with section', () => {
    render(<UnderDevelopment section="Reports" />);

    const smallText = screen.getByText('The Reports section is coming soon');
    expect(smallText.tagName).toBe('SMALL');
  });

  it('works with different section names', () => {
    const { rerender } = render(<UnderDevelopment section="First" />);

    expect(screen.getByText('The First section is coming soon')).toBeInTheDocument();

    rerender(<UnderDevelopment section="Second" />);

    expect(screen.getByText('The Second section is coming soon')).toBeInTheDocument();
  });
});
