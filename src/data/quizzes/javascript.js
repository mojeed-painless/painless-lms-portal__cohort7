export const javascriptQuizzes = [
  {
    id: 'js-basics',
    title: 'JavaScript Syntax & ES6',
    questions: [
      {
        id: 1,
        question: 'Which keyword declares a block-scoped variable?',
        options: ['var', 'let', 'global', 'set'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Which method converts a JSON string to an object?',
        options: ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'parse()'],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: 'Which array method creates a new array with the results of a callback?',
        options: ['forEach()', 'map()', 'sort()', 'reduce()'],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'What is the output of typeof null?',
        options: ['null', 'undefined', 'object', 'string'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 'js-dom',
    title: 'JavaScript DOM & Events',
    questions: [
      {
        id: 1,
        question: 'Which method selects the first matching element in the DOM?',
        options: ['querySelector()', 'getElementById()', 'select()', 'find()'],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: 'Which event fires when a user clicks an element?',
        options: ['keydown', 'click', 'submit', 'load'],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'What does addEventListener do?',
        options: ['Creates a new element', 'Registers a callback for an event', 'Stops page loading', 'Executes CSS'],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Which property sets text content of an element?',
        options: ['innerHTML', 'textContent', 'className', 'value'],
        correctAnswer: 1,
      },
    ],
  },
];
