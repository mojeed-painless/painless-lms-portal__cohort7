export const reactQuizzes = [
  {
    id: 'react-fundamentals',
    title: 'React Core Concepts',
    questions: [
      {
        id: 1,
        question: 'What is used to pass data to child components?',
        options: ['State', 'Props', 'Context', 'Redux'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Which hook is used to manage component state?',
        options: ['useEffect', 'useState', 'useMemo', 'useRef'],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'What does JSX return?',
        options: ['HTML string', 'JavaScript object', 'React elements', 'CSS rules'],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: 'Which method is used to render a list of items in React?',
        options: ['map()', 'filter()', 'reduce()', 'sort()'],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 'react-hooks',
    title: 'React Hooks Essentials',
    questions: [
      {
        id: 1,
        question: 'Which hook runs after the component renders?',
        options: ['useState', 'useMemo', 'useEffect', 'useRef'],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'What does useRef do?',
        options: ['Creates a mutable reference', 'Creates CSS classes', 'Fetches data', 'Updates props'],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: 'What is a common use case for useCallback?',
        options: ['Styling', 'Preventing unnecessary re-renders', 'Setting localStorage', 'Reading files'],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: 'Which hook is best for memoized expensive calculations?',
        options: ['useReducer', 'useMemo', 'useCallback', 'useContext'],
        correctAnswer: 1,
      },
    ],
  },
];
