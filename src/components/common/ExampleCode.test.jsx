import React from 'react';
import { render, screen } from '@testing-library/react';

import ExampleCode from './ExampleCode';

describe('ExampleCode', () => {
  it('renders code block with language class', () => {
    const { container } = render(
      <ExampleCode language="js">console.log('hi');</ExampleCode>
    );

    const codeEl = container.querySelector('code.language-js');
    expect(codeEl).toBeInTheDocument();
    // tokenized output may split the full string; join textContent
    const text = codeEl.textContent.replace(/\s+/g, '');
    expect(text).toContain("console.log('hi');");
  });
});
