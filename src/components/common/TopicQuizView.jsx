import React from 'react';
import '../../assets/styles/topicQuiz.css';

export default function TopicQuizView({
  topic,
  currentQuestion,
  selectedAnswers,
  onSelect,
  onSubmit,
  result,
  submissionState,
  error,
}) {
  if (!currentQuestion) return null;

  if (result) {
    return (
      <div className="topic-quiz__box">
        <p>Passed - Score: {result.score} / {result.total}</p>
      </div>
    );
  }

  return (
    <div className="topic-quiz__box">
      <div className="topic-quiz__header">
        <span>{topic}</span>
      </div>

      <div className="topic-quiz__questions">
        <div className="topic-quiz__question active-question" key={currentQuestion.id}>
          <h4>{currentQuestion.question || currentQuestion.text}</h4>
          <div className="topic-quiz__options">
            {currentQuestion.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              const optionText = typeof option === 'string' ? option : option.text;
              const isSelected = selectedAnswers[currentQuestion.id] === index;

              return (
                <button
                  key={`${currentQuestion.id}-${optionText}`}
                  type="button"
                  aria-label={`${optionLetter}. ${optionText}`}
                  aria-pressed={isSelected}
                  className={`topic-quiz__option ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelect(currentQuestion.id, index)}
                >
                  <span>{optionLetter}</span> {optionText}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="topic-quiz__nav">
        <button type="button" onClick={onSubmit} aria-label="Submit quiz">
          Submit
        </button>
      </div>

      {error && <p role="alert">{error}</p>}
      {submissionState?.status === 'error' && (
        <p role="alert">Error submitting quiz: {submissionState.message}</p>
      )}
    </div>
  );
}
