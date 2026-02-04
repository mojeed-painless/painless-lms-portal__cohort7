import UnderDevelopment from "../components/common/UnderDevelopment";
import '../assets/styles/transcript.css';
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

export default function TranscriptScreen() {
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
        <StatCard icon={<BadgeCheck size= {150} />} percentage={0} label="Overall Average" sub="Across all assessments" borderColor="#3b82f6" />
        <StatCard icon={<NotepadText size= {150} />} percentage={0} label="Assignment Average" sub="0 assignments graded" borderColor="#60a5fa" />
        <StatCard icon={<Sparkles size={150} />} percentage={0} label="Quiz Average" sub="0 quizzes taken" borderColor="#22d3ee" />
      </div>




      {/* Quizzes Section */}
      <section className="transcript__milestones">
        <h2 className="transcript__milestones-header">
          <span><Flag size={20} /></span> Milestones Scores
        </h2>

        <div className="transcript__milestones-content">
          <ListRow icon={<CodeXml size={20}/>} title="HTML Fundamentals" score={0} />
          <ListRow icon={<Paintbrush size={20}/>} title="CSS Basics"  score={0} />
          <ListRow icon={<PenTool size={20}/>} title="CSS Layout" score={0} />
          <ListRow icon={<BrainCircuit size={20}/>} title="Javascript Basics" score={0} />
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
