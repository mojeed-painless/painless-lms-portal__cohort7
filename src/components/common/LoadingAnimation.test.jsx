import React from 'react';
import { render } from '@testing-library/react';

import LoadingAnimation from './LoadingAnimation';

describe('LoadingAnimation', () => {
  it('renders loading container', () => {
    const { container } = render(<LoadingAnimation />);
    expect(container.querySelector('.loading__container')).toBeTruthy();
  });
});
