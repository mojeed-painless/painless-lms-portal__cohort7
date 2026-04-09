import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnderDevelopment from '../components/common/UnderDevelopment';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';
import { getTotalUnlockedRoutes, getFirstRouteForDay, getDayLabel } from '../utils/htmlCourseUnlockConfig';
import '../assets/styles/settings.css';
import { FileText } from 'lucide-react';

export default function SettingsScreen() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();
  const [currentReleaseDay, setCurrentReleaseDay] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current release day from server
  useEffect(() => {
    const fetchCurrentDay = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/config/html-release-day`);
        if (!response.ok) throw new Error('Failed to fetch release day');
        const data = await response.json();
        setCurrentReleaseDay(Number(data.value) || 0);
      } catch (err) {
        setError(err.message);
      }
    };

    if (isAdmin) fetchCurrentDay();
  }, [isAdmin]);

  // Handle day button click
  const handleDayClick = async (day) => {
    if (!user?.token || isUpdating) return;

    setIsUpdating(true);
    setError(null);

    try {
      // Update release day on server
      const response = await fetch(`${API_BASE_URL}/api/config/html-release-day`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ value: day }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to update release day');
      }

      // Update local state
      setCurrentReleaseDay(day);

      // Navigate to first route of the selected day
      const firstRoute = getFirstRouteForDay(day);
      if (firstRoute) {
        navigate(firstRoute);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isAdmin) {
    return <UnderDevelopment section="Settings" />;
  }

  const totalUnlocked = getTotalUnlockedRoutes(currentReleaseDay);

  return (
    <div className="settings__container">
      <div className="settings__header">
        <div className="settings__header-title">
          <h1><FileText size={25} /> Settings</h1>
          <p className="settings__header-subtitle">Manage course content release</p>
        </div>
      </div>

      <div className="content__release">
        <div className="release__header">
          <p>{getDayLabel(currentReleaseDay)}</p>
          <p>{totalUnlocked} routes currently unlocked</p>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="days__btn">
          {Array.from({ length: 29 }, (_, i) => i + 1).map((day) => {
            const isActive = day === currentReleaseDay;
            const isUnlocked = day <= currentReleaseDay;
            return (
              <button
                key={day}
                className={`day-button ${isActive ? 'active' : ''} ${isUnlocked ? 'unlocked' : ''}`}
                onClick={() => handleDayClick(day)}
                disabled={isUpdating}
                aria-pressed={isActive}
              >
                Day {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}