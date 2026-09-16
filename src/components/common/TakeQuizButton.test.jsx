import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import TakeQuizButton from './TakeQuizButton';

describe('TakeQuizButton', () => {
  it('calls onSelect when clicked', () => {
    const fn = vi.fn();
    render(<TakeQuizButton onSelect={fn} />);

    const btn = screen.getByText(/Take Quiz/i);
    fireEvent.click(btn);
    expect(fn).toHaveBeenCalled();
  });
});
