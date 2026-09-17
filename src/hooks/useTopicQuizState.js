import { useState } from 'react';

export function useTopicQuizState(questions = []) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const selectOption = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
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
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOption) {
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
