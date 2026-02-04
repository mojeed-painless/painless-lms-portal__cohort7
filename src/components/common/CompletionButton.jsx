import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import '../../assets/styles/completion-btn.css';

export default function CompletionButton() {
  const { isLessonComplete, markLessonComplete } = useProgress();
  const location = useLocation();

  const isCompleted = isLessonComplete(location.pathname);

  const handleMarkComplete = () => {
    if (!isCompleted) {
      markLessonComplete(location.pathname);
    }
  };

  return (
    <button
      className={`completion-btn ${isCompleted ? 'completed' : ''}`}
      onClick={handleMarkComplete}
      disabled={isCompleted}
      title={isCompleted ? 'Lesson completed!' : 'Mark as complete'}
    >
      <Check size={20} />
      <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
    </button>
  );
}
