import { useState, useRef } from 'react';

export function useTopicQuizState(questions = []) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const selectedAnswersRef = useRef({});

  const selectOption = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    // keep a synchronous ref copy so score calculation reads latest selections
    selectedAnswersRef.current = { ...selectedAnswersRef.current, [questionId]: optionIndex };
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      calculateScore();
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    let calculated = 0;
    const answers = selectedAnswersRef.current || selectedAnswers;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctOption) {
        calculated += 1;
      }
    });
    setScore(calculated);
  };

  return {
    currentQuestion: questions[currentIndex],
    currentIndex,
    totalQuestions: questions.length,
    selectedAnswers,
    score,
    isFinished,
    selectOption,
    nextQuestion,
  };
}
