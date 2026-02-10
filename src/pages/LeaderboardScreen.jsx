import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
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
  const [leaders, setLeaders] = useState([]);
  const [dailyQuizLeaders, setDailyQuizLeaders] = useState([]);
  const [dailyQuizLoading, setDailyQuizLoading] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (user && user.token) headers['Authorization'] = `Bearer ${user.token}`;

        let res;
        let data;

        // Admins: try admin-specific aggregated endpoint, fall back to admin/all
        if (user && user.role === 'admin') {
          res = await fetch(`${API_BASE}/api/users/admin/grades`, { headers });

          if (res.status === 401 || res.status === 403) {
            setAuthRequired(true);
            return;
          }

          if (!res.ok) {
            console.warn('/admin/grades failed, falling back to /admin/all', res.status);
            res = await fetch(`${API_BASE}/api/users/admin/all`, { headers });
          }

          if (res.status === 401 || res.status === 403) {
            setAuthRequired(true);
            return;
          }

          if (!res.ok) throw new Error('Failed to fetch admin users');
          data = await res.json();
        } else {
          // Non-admin (students): call the authenticated grades endpoint
          res = await fetch(`${API_BASE}/api/users/grades`, { headers });

          if (res.status === 401 || res.status === 403) {
            setAuthRequired(true);
            return;
          }

          if (!res.ok) throw new Error('Failed to fetch grades');
          data = await res.json();
        }

        const users = Array.isArray(data) ? data : (data.users || []);
        // Prefer server-provided overall; compute a safe default otherwise
        const mapped = users.map(u => ({ ...u, overall: Math.round(u.overall || u.overallGrade || 0) }));
        mapped.sort((a, b) => (b.overall || 0) - (a.overall || 0));
        if (mounted) setLeaders(mapped);
      } catch (err) {
        console.error('Failed to load leaderboard', err);
      }
    };

    load();
    return () => { mounted = false; };
  }, [user]);

  // Fetch daily quiz leaderboard (aggregated points from all daily quizzes)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setDailyQuizLoading(true);
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (user && user.token) headers['Authorization'] = `Bearer ${user.token}`;

        const res = await fetch(`${API_BASE}/api/quiz-attempts/leaderboard/daily/aggregate`, { headers });

        if (!res.ok) {
          console.warn('Failed to fetch daily quiz leaderboard:', res.status);
          setDailyQuizLeaders([]);
          return;
        }

        const data = await res.json();
        const leaders = Array.isArray(data) ? data : (data.leaders || []);
        if (mounted) setDailyQuizLeaders(leaders);
      } catch (err) {
        console.error('Failed to load daily quiz leaderboard', err);
        setDailyQuizLeaders([]);
      } finally {
        setDailyQuizLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [user]);

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
            {authRequired && (
              <p style={{ color: '#b04545', marginTop: 8 }}></p>
            )}
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

        { isActive === 'overall grade' &&
          <div className="grade-leaderboard__container">
            <div className="top__leaders">
                <div className="quiz__leader-header">
                    <h4><span><Trophy size={20}/></span>Overall Top 3</h4>
                    <small className="top__leaders-date">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</small>
                </div>

                <div className="top__leaders-list">
                  {leaders.slice(0, 3).map((u, idx) => (
                    <div key={u._id || u.id || idx} className="top__leaders-item">
                      <span className="top__leaders-rank">
                        {idx === 0 ? <TbHexagonNumber1Filled/> : (idx === 1 ? <TbHexagonNumber2Filled/> : <TbHexagonNumber3Filled/>)}
                      </span>
                      <div className="top__leaders-info">
                        <h5>{u.firstName ? `${u.firstName} ${u.lastName || ''}`.trim() : (u.name || `Student ${idx+1}`)}</h5>
                        <small><span>{u.overall || 0}</span></small>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            <div className="other__leaders">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Grade</th>
                  </tr>
                </thead>

                <tbody>
                  {leaders.slice(3).map((u, i) => (
                    <tr key={u._id || u.id || i}>
                      <td><span>{i + 4}</span></td>
                      <td>{u.firstName ? `${u.firstName} ${u.lastName || ''}`.trim() : (u.name || 'Student')}</td>
                      <td>{u.overall || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }

        { isActive === 'daily quiz' &&
          <div className="quiz-leaderboard__container">
            <div className="top__leaders">
                <div className="quiz__leader-header">
                    <h4><span><Trophy size={20}/></span>Overall Top 3</h4>
                    <small className="top__leaders-date">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</small>
                </div>

                <div className="top__leaders-list">
                  {dailyQuizLoading && <div style={{ padding: 12, color: '#666' }}>Loading leaderboard…</div>}
                  {!dailyQuizLoading && dailyQuizLeaders.length === 0 && (
                    <div style={{ padding: 12, color: '#666' }}>No quiz attempts yet.</div>
                  )}
                  {!dailyQuizLoading && dailyQuizLeaders.slice(0, 3).map((leader, idx) => (
                    <div key={leader.studentId || leader._id || idx} className="top__leaders-item">
                      <span className="top__leaders-rank">
                        {idx === 0 ? <TbHexagonNumber1Filled /> : (idx === 1 ? <TbHexagonNumber2Filled /> : <TbHexagonNumber3Filled />)}
                      </span>
                      <div className="top__leaders-info">
                        <h5>{leader.name || leader.username || `Student ${idx + 1}`}</h5>
                        <small><span>{leader.totalPoints || 0}</span></small>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            <div className="other__leaders">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Points</th>
                  </tr>
                </thead>

                <tbody>
                  {dailyQuizLoading && (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', color: '#666', padding: 12 }}>Loading…</td>
                    </tr>
                  )}
                  {!dailyQuizLoading && dailyQuizLeaders.length === 0 && (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', color: '#666', padding: 12 }}>No quiz attempts yet.</td>
                    </tr>
                  )}
                  {!dailyQuizLoading && dailyQuizLeaders.slice(3).map((leader, idx) => (
                    <tr key={leader.studentId || leader._id || idx}>
                      <td><span>{idx + 4}</span></td>
                      <td>{leader.name || leader.username || 'Student'}</td>
                      <td>{leader.totalPoints || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
  );
}
