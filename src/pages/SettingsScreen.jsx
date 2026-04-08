import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnderDevelopment from "../components/common/UnderDevelopment";
import { useAuth } from '../context/AuthContext';
import { htmlCourseRouteOrder, getHtmlReleaseCount, getUnlockedHtmlPaths, HTML_RELEASE_DAY_KEY, getReleaseLabel, getFirstDayRoute } from '../utils/htmlCourseUnlockConfig';
import '../assets/styles/settings.css';
import { 
  FileText,
 } from 'lucide-react';

export default function SettingsScreen() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(() => {
      const savedDay = Number(localStorage.getItem(HTML_RELEASE_DAY_KEY));
      return Number.isNaN(savedDay) ? 0 : savedDay;
    });

    const unlockedCount = useMemo(() => getHtmlReleaseCount(selectedDay), [selectedDay]);
    const unlockedPaths = useMemo(() => getUnlockedHtmlPaths(selectedDay), [selectedDay]);
    const unlockedMessage = selectedDay > 0 ? getReleaseLabel(selectedDay) : 'Select a day to unlock routes.';

    const handleDayClick = (day) => {
      localStorage.setItem(HTML_RELEASE_DAY_KEY, String(day));
      setSelectedDay(day);
      const firstDayRoute = getFirstDayRoute(day);
      if (firstDayRoute) {
        navigate(firstDayRoute);
      }
    };

  return (
    <>
    {!isAdmin && (<UnderDevelopment section="Settings" />)}

    {isAdmin && (
          <div className="settings__container">
            <div className="settings__header">
              <div className="settings__header-title">
                <h1><span><FileText size={25}/></span>Settings</h1>
                <p className="settings__header-subtitle">Your complete performance record</p>
              </div>
            </div>


            <div className="content__release">
              <div className="release__header">
                <p>{unlockedMessage}</p>
                <p>{unlockedCount ? `${unlockedCount} routes unlocked` : 'No routes unlocked yet.'}</p>
              </div>

              <div className="days__btn">
                {Array.from({ length: 29 }, (_, index) => {
                  const day = index + 1;
                  const isActive = day === selectedDay;
                  const isUnlocked = day <= selectedDay;
                  const className = `day-button ${isActive ? 'active' : ''} ${isUnlocked ? 'unlocked' : ''}`.trim();
                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      className={className}
                      onClick={() => handleDayClick(day)}
                      aria-pressed={isActive}
                    >
                      Day {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
    )}
    
    </>
      
  );
}