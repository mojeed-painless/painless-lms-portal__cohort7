import UnderDevelopment from "../components/common/UnderDevelopment";
import '../assets/styles/transcript.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAssignments } from '../hooks/useAssignments';
import { 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Flag, 
  FileText,
  CodeXml,
  PenTool,
  Paintbrush,
  BrainCircuit,
  BadgeCheck,
  NotepadText,
  Sparkles
 } from 'lucide-react';
import { TopicQuizData } from '../quizData';

export default function TranscriptScreen() {
  const { user } = useAuth();
  const token = user?.token;
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const { graded, fetchGradedAssignments } = useAssignments(token);

  const [quizAttempts, setQuizAttempts] = useState([]);

  useEffect(() => {
    if (token) fetchGradedAssignments();
  }, [token]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/quiz-attempts`, {
          headers: {
            'Content-Type': 'application/json',
            ...(user && user._id ? { 'x-user-id': user._id } : {}),
          },
        });
        if (!res.ok) throw new Error('Failed to fetch quiz attempts');
        const data = await res.json();
        if (mounted) setQuizAttempts(data);
      } catch (err) {
        try {
          const stored = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
          if (mounted) setQuizAttempts(stored);
        } catch (e) {
          console.error('Failed to load quiz attempts', e);
        }
        console.error('Failed to load quiz attempts from backend', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, [API_BASE, user]);

  const assignmentAverage = graded && graded.length
    ? Math.round(graded.reduce((acc, a) => acc + (parseFloat(a.score || 0) || 0), 0) / graded.length)
    : 0;

  const totalScore = quizAttempts.reduce((acc, a) => acc + (a.score || 0), 0);
  const totalPossible = quizAttempts.reduce((acc, a) => acc + (a.total || 0), 0);
  const quizAverage = totalPossible ? Math.round((totalScore / totalPossible) * 100) : 0;

  const getCategoryAverage = (categoryKey) => {
    const attemptsForCategory = quizAttempts.filter(a => {
      const td = TopicQuizData.find(t => t.topic === a.topic);
      return td && td.category === categoryKey;
    });
    const s = attemptsForCategory.reduce((acc, a) => acc + (a.score || 0), 0);
    const t = attemptsForCategory.reduce((acc, a) => acc + (a.total || 0), 0);
    return t ? Math.round((s / t) * 100) : 0;
  };

  const htmlAvg = getCategoryAverage('html');
  const css1Avg = getCategoryAverage('css1');
  const css2Avg = getCategoryAverage('css2');
  const jsAvg = getCategoryAverage('javascript');

  return (
      // <UnderDevelopment section="Transcript" />
    <div className="transcript__container">
      <div className="transcript__header">
        <div className="transcript__header-title">
          <h1><span><FileText size={25}/></span> Academic Transcript</h1>
          <p className="transcript__header-subtitle">Your complete performance record</p>
        </div>

        <button className="transcript__export-btn">
          <Download size={18} /> Export PDF
        </button>
      </div>

      {/* Stats Grid */}
      <div className="transcript__stats-grid">
        <StatCard icon={<BadgeCheck size= {150} />} percentage={Math.round((assignmentAverage + quizAverage) / ( (assignmentAverage>0)+(quizAverage>0) || 1 ))} label="Overall Average" sub="Across all assessments" borderColor="#3b82f6" />
        <StatCard icon={<NotepadText size= {150} />} percentage={assignmentAverage} label="Assignment Average" sub={`${graded.length} assignments graded`} borderColor="#60a5fa" />
        <StatCard icon={<Sparkles size={150} />} percentage={quizAverage} label="Quiz Average" sub={`${quizAttempts.length} quizzes taken`} borderColor="#22d3ee" />
      </div>




      {/* Quizzes Section */}
      <section className="transcript__milestones">
        <h2 className="transcript__milestones-header">
          <span><Flag size={20} /></span> Milestones Scores
        </h2>

        <div className="transcript__milestones-content">
          <ListRow icon={<CodeXml size={20}/>} title="HTML Fundamentals" score={htmlAvg} />
          <ListRow icon={<Paintbrush size={20}/>} title="CSS Basics"  score={css1Avg} />
          <ListRow icon={<PenTool size={20}/>} title="CSS Layout" score={css2Avg} />
          <ListRow icon={<BrainCircuit size={20}/>} title="Javascript Basics" score={jsAvg} />
        </div>
      </section>

    
    </div>
  );
};

const StatCard = ({ percentage, label, sub, icon }) => (
  <div className="transcript__stat-card">
    <div className="transcript__progress-text">
      <h3>{label}</h3>
      <p>{sub}</p>
    </div>
    
    <div className="transcript__progress-circle">
      <span className="transcript__percentage-text">{percentage}%</span>
    </div>

    <div className="transcript__stat-icon">
      {icon}
    </div>
  </div>
);

const ListRow = ({ icon, title, score}) => (
  <div className="transcript__milestones-list">
    <div>
      <span>{icon}</span>
      <p>{title}</p>
    </div>

    <h3 className="score-main" style={{ color: '#22d3ee' }}>{score}%</h3>
  </div>

  );
