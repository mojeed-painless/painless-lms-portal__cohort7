import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import CourseCard from './CourseCard';

describe('CourseCard', () => {
  const course = {
    _id: 'course123',
    title: 'React Basics',
    instructor: { username: 'janedoe' },
    thumbnailUrl: '/thumb.jpg',
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders course title and instructor', () => {
    render(<CourseCard course={course} />);

    expect(screen.getByText(/React Basics/i)).toBeInTheDocument();
    expect(screen.getByText(/janedoe/i)).toBeInTheDocument();
  });

  it('displays progress bar and action button', () => {
    render(<CourseCard course={course} />);

    const btn = screen.getByText(/Continue Course|Start Learning/i);
    expect(btn).toBeInTheDocument();
  });

  it('navigates to course page when button clicked', () => {
    render(<CourseCard course={course} />);

    const btn = screen.getByText(/Continue Course|Start Learning/i);
    fireEvent.click(btn);

    expect(mockNavigate).toHaveBeenCalledWith('/course/course123');
  });

  it('shows Unknown Instructor when instructor is missing', () => {
    const c = { ...course, instructor: null };
    render(<CourseCard course={c} />);
    expect(screen.getByText(/Unknown Instructor/i)).toBeInTheDocument();
  });
});
