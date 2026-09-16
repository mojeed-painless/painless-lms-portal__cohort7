import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

// Mock TakeQuizButton and TopicQuiz to keep test focused
vi.mock('./TakeQuizButton', () => ({ __esModule: true, default: ({ onSelect }) => <button onClick={onSelect}>Take</button> }));
vi.mock('./TopicQuiz', () => ({ __esModule: true, default: ({ onSelect, currentCategory, currentTopic }) => (
  <div>
    TopicQuiz - Category: {currentCategory?.name}, Topic: {currentTopic?.name}
    <button onClick={onSelect}>Close Quiz</button>
  </div>
) }));

import QuizBox from './QuizBox';

describe('QuizBox', () => {
  it('toggles active quiz class when Take is clicked', () => {
    const { container } = render(
      <QuizBox currentCategory={{ name: 'Programming' }} currentTopic={{ name: 'Variables' }} />
    );

    const article = container.querySelector('article.topic-quiz__container');
    expect(article.className).not.toContain('active-quiz');

    const btn = screen.getByText(/Take/i);
    fireEvent.click(btn);

    expect(article.className).toContain('active-quiz');
  });

  it('toggles quiz off when Close Quiz is clicked', () => {
    const { container } = render(
      <QuizBox currentCategory={{ name: 'Programming' }} currentTopic={{ name: 'Variables' }} />
    );

    const article = container.querySelector('article.topic-quiz__container');
    const takeBtn = screen.getByText(/Take/i);
    
    fireEvent.click(takeBtn);
    expect(article.className).toContain('active-quiz');

    const closeBtn = screen.getByText(/Close Quiz/i);
    fireEvent.click(closeBtn);
    expect(article.className).not.toContain('active-quiz');
  });

  it('passes currentCategory and currentTopic to TopicQuiz', () => {
    const category = { name: 'JavaScript' };
    const topic = { name: 'Functions' };

    render(<QuizBox currentCategory={category} currentTopic={topic} />);

    expect(screen.getByText(/Category: JavaScript, Topic: Functions/i)).toBeInTheDocument();
  });

  it('has active-quiz class in article initially false', () => {
    const { container } = render(
      <QuizBox currentCategory={{}} currentTopic={{}} />
    );

    const article = container.querySelector('article.topic-quiz__container');
    expect(article.className).not.toContain('active-quiz');
  });
});
