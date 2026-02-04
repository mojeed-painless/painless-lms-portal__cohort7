import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useAssignments } from '../hooks/useAssignments';
import { Link } from 'react-router-dom';
import { statsData, learningPath, topics } from "../data.js";
import '../assets/styles/dashboard.css';
import profileImage from '../assets/profile-image.jpg';
import {
    BookOpenCheck,
    LockKeyhole,
    ChevronRight,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/users/admin/all`;

const DashboardScreen = () => {

  const { user } = useAuth();
  const token = user?.token;
  const { getCompletedCount, getCompletionPercentage } = useProgress();
  const { 
    pending, 
    submitted, 
    graded, 
    fetchPendingAssignments,
    fetchSubmittedAssignments,
    fetchGradedAssignments
  } = useAssignments(token);
  const [courseAccess, setCourseAccess] = useState({
    htmlAccess: user?.htmlAccess || false,
    jsAccess: user?.jsAccess || false,
    reactAccess: user?.reactAccess || false
  });

  // Fetch assignments on component mount
  useEffect(() => {
    if (token) {
      fetchPendingAssignments();
      fetchSubmittedAssignments();
      fetchGradedAssignments();
    }
  }, [token, fetchPendingAssignments, fetchSubmittedAssignments, fetchGradedAssignments]);

  useEffect(() => {
    // Initial setup from user object
    if (user) {
      setCourseAccess({
        htmlAccess: user.htmlAccess || false,
        jsAccess: user.jsAccess || false,
        reactAccess: user.reactAccess || false
      });
    }
  }, [user?.htmlAccess, user?.jsAccess, user?.reactAccess]);

  // Poll for access updates every 3 seconds (only for admins)
  useEffect(() => {
    // Only poll if user is admin - regular students don't need this polling
    if (!user || !user.token || user.role !== 'admin') return;

    const pollAccessUpdates = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        // Fetch all users to get current user's updated data (admin only)
        const { data: allUsers } = await axios.get(API_URL, config);
        
        // console.log('Poll response:', allUsers);
        
        if (Array.isArray(allUsers)) {
          // Find current user in the list
          const currentUserData = allUsers.find(u => u._id === user._id);
          
          // console.log('Current user data found:', currentUserData);
          
          if (currentUserData) {
            const newAccess = {
              htmlAccess: currentUserData.htmlAccess || false,
              jsAccess: currentUserData.jsAccess || false,
              reactAccess: currentUserData.reactAccess || false
            };
            console.log('Setting new access:', newAccess);
            setCourseAccess(newAccess);
          }
        }
      } catch (err) {
        // console.error('Polling error:', err.response?.status, err.message);
      }
    };

    // Poll immediately and then every 3 seconds
    pollAccessUpdates();
    const interval = setInterval(pollAccessUpdates, 3000);
    
    return () => clearInterval(interval);
  }, [user?.token, user?._id, user?.role]);

  // Map stage to access permission
  const getAccessStatus = (stage) => {
    const accessMap = {
      'Beginner': courseAccess.htmlAccess,
      'Intermediate': courseAccess.jsAccess,
      'Advanced': courseAccess.reactAccess
    };
    return accessMap[stage] || false;
  };

  const totalLessons = 
    topics[0].subjects.length + 
    topics[1].subjects.length + 
    topics[2].subjects.length + 
    topics[3].subjects.length + 3

  return (

        <section className="dashboard-content">
          <div className="content__greetings">
            <div className="greetings__profile-image">
              <img src={profileImage} alt="user profile" />
            </div>

            <div className="greetings__text">
              <h2 className="section-title">Welcome back, {user.firstName} 👋</h2>
              <p>{user.role}</p>

              {/* <h2 className="section-title">Welcome back, Mojeed 👋</h2>
              <p>student</p> */}
            </div>
          </div>

          <div className="dashboard__stats">
            {statsData.map(({title, figure, description, Icon}) => {
              // Replace the figure with actual completion data
              let displayFigure = figure;
              let displayDescription = description;
              
              if (title === 'Lessons Completed') {
                const completed = getCompletedCount();
                const percentage = getCompletionPercentage(totalLessons);
                displayFigure = `${completed}/${totalLessons}`;
                displayDescription = `${percentage}% completed`;
              }

              if (title === 'Assignments Done') {
                const done = submitted.length + graded.length;
                const pendingCount = pending.length;
                displayFigure = `${done}`;
                displayDescription = `${pendingCount} pending assignment${pendingCount !== 1 ? 's' : ''}`;
              }
              
              return (
                <div key={title} className="stats__box">
                  <div>
                    <p>{title}</p>
                    <h1>{displayFigure}</h1>
                    <small>{displayDescription}</small>
                  </div>
                  
                  <span><Icon/></span>
                </div>
              );
            })}
          </div>


          <div className="dashboard__others">
            <div className='dashboard__courses'>
              <div className='dashboard__learning-path'>
                <span><BookOpenCheck/></span>
                <h3>Your Learning Path</h3>
              </div>

              {learningPath.map(({Icon, stage, title, ...props}) => {
                const hasAccess = getAccessStatus(stage);
                return (
                <div key={stage} className={`dashboard__courses-box ${stage}`}>
                  <div className='dashboard__courses-left'>
                    <span><Icon/></span>
                  </div>

                  <div className='dashboard__courses-right'>
                    <div>
                      <p>{stage}</p>
                      {!hasAccess && <span className='dashboard__lock'><LockKeyhole size='14'/></span>}
                    </div>

                    <h3 className={!hasAccess ? 'dashboard__courses-title' : ''}>{title}</h3>

                    <p>{props.description}</p>

                    <span className="dashboard__back-icon"><Icon size={140}/></span>

                    <div>
                      <small>{props.module}</small>
                      {hasAccess ? 
                      <Link to={props.link}>Continue <span><ChevronRight size={15}/></span></Link> : 
                      <menu>Locked <span><LockKeyhole size={14}/></span></menu>}
                    </div>
                  </div>
                </div>
              );
              })}
            </div>

            <div className='dashboard__quiz'></div>
          </div>

        </section>
  );
};

export default DashboardScreen;