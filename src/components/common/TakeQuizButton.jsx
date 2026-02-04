import { Link } from 'react-router-dom';

/**
 * Reusable Take Quiz Button Component
 * @param {string} topicId - The topic ID for the quiz (used in URL param: ?topicId=)
 * @param {string} [className] - Optional CSS class name
 */
export default function TakeQuizButton({ topicId, className = '' }) {
  if (!topicId) return null;

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      margin: '24px 0',
    }}>
      <Link 
        to={`/quizzes?topicId=${topicId}`} 
        className={`take-quiz-btn ${className}`}
        style={{
          padding: '7px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 600,
          display: 'inline-block',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        Take Quiz
      </Link>
    </div>
  );
}
