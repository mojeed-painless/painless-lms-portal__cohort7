import { useState } from 'react';
import '../assets/styles/leaderboard.css';
import { TbHexagonNumber1Filled, TbHexagonNumber2Filled, TbHexagonNumber3Filled } from "react-icons/tb";
import {
  Sparkles,
  WandSparkles,
  Award,
  Crown,
  Trophy,
} from 'lucide-react';

export default function LeaderboardScreen() {

  const [isActive, setIsActive] = useState('daily quiz');

  return (
      <div className="leaderboard__container">
        <div className="transcript__header">
          <div className="transcript__header-title">
            <h1>
              <span><Crown size={25}/></span>
              {isActive === 'daily quiz' ? 'Quiz' : 'Grade'} Leaderboard
            </h1>
            <p className="transcript__header-subtitle">
              Challenge others to climb up the leaderboard
            </p>
          </div>

          <div className="quiz__nav-btn">
            <button 
              className={isActive === 'daily quiz' ? 'active-quiz' : ''} 
              onClick={() => setIsActive('daily quiz')}
            >
              <WandSparkles size={18} /> Daily Quiz
            </button>
            <button 
              className={isActive === 'overall grade' ? 'active-quiz' : ''} 
              onClick={() => setIsActive('overall grade')}
            >
              <Award size={18} /> Overall Grade
            </button>
          </div>
        </div>

        <div className="quiz-leaderboard__container">
          <div className="top__leaders">
              <div className="quiz__leader-header">
                  <h4><span><Trophy size={20}/></span>Overall Top 3</h4>
                  <small className="top__leaders-date">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</small>
              </div>

              <div className="top__leaders-list">
                      <div className="top__leaders-item">
                        <span className="top__leaders-rank"><TbHexagonNumber1Filled/></span>
                        <div className="top__leaders-info">
                          <h5>Student 3</h5>
                          <small>Points: <span>27</span></small>
                        </div>
                      </div>

                      <div className="top__leaders-item">
                        <span className="top__leaders-rank"><TbHexagonNumber2Filled/></span>
                        <div className="top__leaders-info">
                          <h5>Student 2</h5>
                          <small>Points: <span>25</span></small>
                        </div>
                      </div>

                      <div className="top__leaders-item">
                        <span className="top__leaders-rank"><TbHexagonNumber3Filled/></span>
                        <div className="top__leaders-info">
                          <h5>Student 1</h5>
                          <small>Points: <span>19</span></small>
                        </div>
                      </div>
              </div>
          </div>

          <div className="other-leaders">

          </div>
        </div>
      </div>
  );
}
