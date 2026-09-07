import { htmlCssQuizzes } from './htmlCss';
import { javascriptQuizzes } from './javascript';
import { reactQuizzes } from './react';

const normalizeQuestion = (question) => {
  const normalizedOptions = (question.options || []).map((option, index) => {
    if (typeof option === 'string') {
      return {
        id: String.fromCharCode(65 + index),
        text: option,
      };
    }

    return {
      id: option.id || String.fromCharCode(65 + index),
      text: option.text,
    };
  });

  const correctIndex = Number.isInteger(question.correctAnswer)
    ? question.correctAnswer
    : 0;

  return {
    ...question,
    options: normalizedOptions,
    correctAnswer: String.fromCharCode(65 + correctIndex),
  };
};

const normalizeQuizSet = (quizzes, category) =>
  quizzes.map((quiz) => ({
    topic: quiz.title,
    category,
    questions: (quiz.questions || []).map(normalizeQuestion),
  }));

export { htmlCssQuizzes } from './htmlCss';
export { javascriptQuizzes } from './javascript';
export { reactQuizzes } from './react';

export const TopicQuizData = [
  ...normalizeQuizSet(htmlCssQuizzes, 'html'),
  ...normalizeQuizSet(javascriptQuizzes, 'javascript'),
  ...normalizeQuizSet(reactQuizzes, 'react'),
];

export const DailyQuizData = [
  {
    day: 1,
    date: '02/06/2026',
    questions: htmlCssQuizzes[0].questions.map(normalizeQuestion),
  },
  {
    day: 2,
    date: '02/07/2026',
    questions: htmlCssQuizzes[1].questions.map(normalizeQuestion),
  },
  {
    day: 3,
    date: '02/08/2026',
    questions: javascriptQuizzes[0].questions.map(normalizeQuestion),
  },
  {
    day: 4,
    date: '02/10/2026',
    questions: javascriptQuizzes[1].questions.map(normalizeQuestion),
  },
  {
    day: 5,
    date: '02/12/2026',
    questions: reactQuizzes[0].questions.map(normalizeQuestion),
  },
  {
    day: 6,
    date: '02/13/2026',
    questions: reactQuizzes[1].questions.map(normalizeQuestion),
  },
];

export const allQuizzes = [
  ...htmlCssQuizzes,
  ...javascriptQuizzes,
  ...reactQuizzes,
];

export default allQuizzes;
