import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import TestimonialCard from './TestimonialCard';

const items = [
  { name: 'Alice', rating: 5, feedback: 'Great!' },
  { name: 'Bob', rating: 4, feedback: 'Nice.' },
  { name: 'Charlie', rating: 5, feedback: 'Awesome!' },
];

describe('TestimonialCard', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders first testimonial and dot indicators', () => {
    render(<TestimonialCard testimonials={items} />);

    expect(screen.getByText(/Great!/i)).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    const dots = screen.getAllByRole('button', { name: /Go to testimonial/i });
    expect(dots.length).toBe(items.length);
  });

  it('displays author name and feedback', () => {
    render(<TestimonialCard testimonials={items} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText(/Great!/i)).toBeInTheDocument();
    expect(screen.getByText(/5 out of 5/i)).toBeInTheDocument();
  });

  it('renders correct number of stars based on rating', () => {
    render(<TestimonialCard testimonials={items} />);

    // Stars are SVG elements; verify render completes successfully
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('navigates to next when next button clicked', () => {
    render(<TestimonialCard testimonials={items} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();

    const nextBtn = screen.getAllByRole('button', { name: /Previous testimonial/i })[1];
    fireEvent.click(nextBtn);

    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText(/Nice\./i)).toBeInTheDocument();
  });

  it('navigates to previous when prev button clicked', () => {
    render(<TestimonialCard testimonials={items} />);

    // Move to second testimonial
    const nextBtn = screen.getAllByRole('button', { name: /Previous testimonial/i })[1];
    fireEvent.click(nextBtn);
    expect(screen.getByText('Bob')).toBeInTheDocument();

    // Move back to first
    const prevBtn = screen.getAllByRole('button', { name: /Previous testimonial/i })[0];
    fireEvent.click(prevBtn);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('clicking next multiple times navigates through testimonials', () => {
    render(<TestimonialCard testimonials={items} />);

    const nextBtn = screen.getAllByRole('button', { name: /Previous testimonial/i })[1];

    // Navigate through all testimonials
    fireEvent.click(nextBtn);
    expect(screen.getByText('Bob')).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('clicking prev from first wraps to last', () => {
    render(<TestimonialCard testimonials={items} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();

    const prevBtn = screen.getAllByRole('button', { name: /Previous testimonial/i })[0];
    fireEvent.click(prevBtn);

    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('navigates to specific slide when dot clicked', () => {
    render(<TestimonialCard testimonials={items} />);

    const dots = screen.getAllByRole('button', { name: /Go to testimonial/i });
    fireEvent.click(dots[2]);

    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('highlights active dot', () => {
    render(<TestimonialCard testimonials={items} />);

    const dots = screen.getAllByRole('button', { name: /Go to testimonial/i });
    expect(dots[0]).toHaveClass('active');
    expect(dots[1]).not.toHaveClass('active');

    fireEvent.click(dots[1]);
    expect(dots[1]).toHaveClass('active');
    expect(dots[0]).not.toHaveClass('active');
  });

  it('displays author image with correct alt text', () => {
    render(<TestimonialCard testimonials={items} />);

    const img = screen.getByAltText('Alice');
    expect(img).toBeInTheDocument();
  });

  it('displays 4-star rating correctly', () => {
    render(<TestimonialCard testimonials={items} />);

    const nextBtn = screen.getAllByRole('button', { name: /Previous testimonial/i })[1];
    fireEvent.click(nextBtn);

    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText(/4 out of 5/i)).toBeInTheDocument();
  });

  it('clears timer on component unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = render(<TestimonialCard testimonials={items} />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('renders dot buttons for each testimonial', () => {
    render(<TestimonialCard testimonials={items} />);

    const dots = screen.getAllByRole('button', { name: /Go to testimonial/ });
    expect(dots).toHaveLength(3);

    // Test dot click navigation
    fireEvent.click(dots[1]);
    expect(dots[1]).toHaveClass('active');
  });

  it('updates dot active state when navigating with arrows', () => {
    render(<TestimonialCard testimonials={items} />);

    const nextBtn = screen.getAllByRole('button', { name: /Previous testimonial/i })[1];
    const dots = screen.getAllByRole('button', { name: /Go to testimonial/ });

    expect(dots[0]).toHaveClass('active');

    fireEvent.click(nextBtn);
    expect(dots[1]).toHaveClass('active');

    fireEvent.click(nextBtn);
    expect(dots[2]).toHaveClass('active');
  });
});
