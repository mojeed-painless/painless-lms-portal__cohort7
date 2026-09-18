import React from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import '../assets/styles/leaderboard.css';

export default function LeaderboardScreen() {
  const { leaders, dailyQuizLeaders, authRequired, dailyQuizLoading, validationError } =
    useLeaderboard();

  if (authRequired) {
    return <div className="auth-warning">Please sign in to view the leaderboard.</div>;
  }

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard</h2>
      {validationError && <p className="error-message">{validationError}</p>}
      {dailyQuizLoading ? (
        <p>Loading daily quiz scores...</p>
      ) : (
        <section>
          <h3>Daily Top Performers</h3>
          <ul>
            {dailyQuizLeaders.map((item) => (
              <li key={item.studentId || item.id}>
                {item.name}: {item.score ?? item.points} pts
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
