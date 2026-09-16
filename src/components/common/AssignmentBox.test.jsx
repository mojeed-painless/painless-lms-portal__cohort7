import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AssignmentBox from './AssignmentBox';

describe('AssignmentBox', () => {
  it('renders title, children and link', () => {
    render(
      <MemoryRouter>
        <AssignmentBox title="Test">
          <div>Inner</div>
        </AssignmentBox>
      </MemoryRouter>
    );

    expect(screen.getByText(/Assignment: \(Test\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Inner/i)).toBeInTheDocument();
    expect(screen.getByText(/Click to Submit Assignment/i)).toBeInTheDocument();
  });
});
