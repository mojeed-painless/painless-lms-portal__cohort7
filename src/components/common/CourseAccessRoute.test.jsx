import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';

import * as AuthContext from '../../context/AuthContext';
import * as htmlCourseUnlock from '../../utils/htmlCourseUnlockConfig';
import CourseAccessRoute from './CourseAccessRoute';

describe('CourseAccessRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading overlay while auth is loading', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: null, isLoading: true });

    const { container } = render(
      <MemoryRouter initialEntries={["/course"]}>
        <Routes>
          <Route path="/course" element={<CourseAccessRoute courseType="js" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    
    const loadingOverlay = container.querySelector('.loading-overlay');
    expect(loadingOverlay).toBeInTheDocument();
    expect(screen.queryByText(/CHILD/i)).toBeNull();
  });

  it('renders child outlet for admin on js course', async () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'admin' }, isLoading: false });

    render(
      <MemoryRouter initialEntries={["/course"]}>
        <Routes>
          <Route path="/course" element={<CourseAccessRoute courseType="js" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/CHILD/i)).toBeInTheDocument();
  });

  it('redirects to no-access for non-admin without js access', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student', jsAccess: false }, isLoading: false });

    render(
      <MemoryRouter initialEntries={["/course"]}>
        <Routes>
          <Route path="/course" element={<CourseAccessRoute courseType="js" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
          <Route path="/no-access" element={<div>NO ACCESS</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/CHILD/i)).toBeNull();
    expect(screen.getByText(/NO ACCESS/i)).toBeInTheDocument();
  });

  it('renders child outlet for student with js access', async () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student', jsAccess: true }, isLoading: false });

    render(
      <MemoryRouter initialEntries={["/course"]}>
        <Routes>
          <Route path="/course" element={<CourseAccessRoute courseType="js" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/CHILD/i)).toBeInTheDocument();
  });

  it('renders child outlet for student with react access', async () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student', reactAccess: true }, isLoading: false });

    render(
      <MemoryRouter initialEntries={["/course"]}>
        <Routes>
          <Route path="/course" element={<CourseAccessRoute courseType="react" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/CHILD/i)).toBeInTheDocument();
  });

  it('redirects to no-access for non-admin without react access', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student', reactAccess: false }, isLoading: false });

    render(
      <MemoryRouter initialEntries={["/course"]}>
        <Routes>
          <Route path="/course" element={<CourseAccessRoute courseType="react" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
          <Route path="/no-access" element={<div>NO ACCESS</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/CHILD/i)).toBeNull();
    expect(screen.getByText(/NO ACCESS/i)).toBeInTheDocument();
  });

  it('shows loading overlay while fetching html release day', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student' }, isLoading: false });
    vi.spyOn(htmlCourseUnlock, 'isPathUnlocked').mockReturnValue(true);
    global.fetch = vi.fn(() => new Promise(() => {})); // Never resolves

    const { container } = render(
      <MemoryRouter initialEntries={["/course"]}>
        <Routes>
          <Route path="/course" element={<CourseAccessRoute courseType="html" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    
    const loadingOverlay = container.querySelector('.loading-overlay');
    expect(loadingOverlay).toBeInTheDocument();
  });

  it('renders child outlet for html content when path is unlocked', async () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student' }, isLoading: false });
    vi.spyOn(htmlCourseUnlock, 'isPathUnlocked').mockReturnValue(true);
    global.fetch = vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ value: '0' })
    }));

    render(
      <MemoryRouter initialEntries={["/html-content"]}>
        <Routes>
          <Route path="/html-content" element={<CourseAccessRoute courseType="html" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/CHILD/i)).toBeInTheDocument();
    });
  });

  it('handled fetch error gracefully for html release day', async () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student' }, isLoading: false });
    vi.spyOn(htmlCourseUnlock, 'isPathUnlocked').mockReturnValue(true);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    render(
      <MemoryRouter initialEntries={["/html-content"]}>
        <Routes>
          <Route path="/html-content" element={<CourseAccessRoute courseType="html" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/CHILD/i)).toBeInTheDocument();
    });
  });

  it('handles non-ok response for html release day fetch', async () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student' }, isLoading: false });
    vi.spyOn(htmlCourseUnlock, 'isPathUnlocked').mockReturnValue(true);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ value: '0' })
    }));

    render(
      <MemoryRouter initialEntries={["/html-content"]}>
        <Routes>
          <Route path="/html-content" element={<CourseAccessRoute courseType="html" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/CHILD/i)).toBeInTheDocument();
    });
  });

  it('redirects to no-access for html content when path is locked', async () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student' }, isLoading: false });
    vi.spyOn(htmlCourseUnlock, 'isPathUnlocked').mockReturnValue(false);
    global.fetch = vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ value: '5' })
    }));

    render(
      <MemoryRouter initialEntries={["/html-content"]}>
        <Routes>
          <Route path="/html-content" element={<CourseAccessRoute courseType="html" />}>
            <Route index element={<div>CHILD</div>} />
          </Route>
          <Route path="/no-access" element={<div>NO ACCESS</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/NO ACCESS/i)).toBeInTheDocument();
    });
  });
});
