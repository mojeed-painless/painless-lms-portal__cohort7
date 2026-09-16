import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import CodeBox from './CodeBox';

describe('CodeBox', () => {
  it('toggles output visibility when Run code clicked', () => {
    const { container } = render(
      <CodeBox lang="JS" outputImg="/img.png">
        <div>CONTENT</div>
      </CodeBox>
    );

    const runBtn = screen.getByText(/Run code/i);
    // initially showOutput true -> hide-output div should NOT have active-output
    const outDiv = container.querySelector('.example.hide-output');
    expect(outDiv.className).not.toContain('active-output');

    fireEvent.click(runBtn);
    expect(outDiv.className).toContain('active-output');
  });
});
