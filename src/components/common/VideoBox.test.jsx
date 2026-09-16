import React from 'react';
import { render, screen } from '@testing-library/react';

import VideoBox from './VideoBox';

describe('VideoBox', () => {
  it('renders title and iframe with correct video code', () => {
    render(<VideoBox title="React Tutorial" code="abc123" />);

    expect(screen.getByText(/React Tutorial/i)).toBeInTheDocument();

    const iframe = screen.getByTitle(/YouTube video player/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toContain('youtube.com/embed/abc123');
  });
});
