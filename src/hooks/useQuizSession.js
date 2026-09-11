import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config/api';

/**
 * Encapsulates the daily-quiz session lifecycle that previously lived
 * inline in QuizScreen.jsx:
 *  - polling the server for today's quiz session window (falling back to a
 *    client-side default of 21:00 local time if the server has none)
 *  - a "before quiz" countdown that ticks every second until the window opens
 *  - a "during quiz" 2-minute countdown once the window is live and the
 *    student has started
 *
 * @param {{ token?: string } | null} user
 */
export function useQuizSession(user) {
  const [quizIsLive, setQuizIsLive] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [dailySession, setDailySession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    beforeQuiz: { hours: 0, minutes: 0, seconds: 0 },
    duringQuiz: { minutes: 0, seconds: 0 },
  });

  const timerCompletedRef = useRef(false);
  const sessionStartRef = useRef(null);
  const sessionEndRef = useRef(null);

  // Fetch (and poll) today's session window from the server, falling back to
  // a client-side default (21:00 local, 2-minute window) when the server has
  // no session configured.
  useEffect(() => {
    let poll = null;
    const fetchSession = async () => {
      setSessionLoading(true);
      try {
        const iso = new Date().toISOString().slice(0, 10);
        const headers = {};
        if (user && user.token) headers['Authorization'] = `Bearer ${user.token}`;

        const res = await fetch(`${API_BASE_URL}/api/quiz-attempts/session?date=${iso}`, { headers });
        const data = await res.json().catch(() => null);
        let session = data && data.session ? data.session : null;
        if (!session) {
          const nowLocal = new Date();
          const startLocal = new Date(nowLocal);
          startLocal.setHours(21, 0, 0, 0);
          const endLocal = new Date(startLocal.getTime() + 2 * 60 * 1000);
          if (nowLocal > endLocal) {
            startLocal.setDate(startLocal.getDate() + 1);
          }
          const finalStart = startLocal;
          const finalEnd = new Date(finalStart.getTime() + 2 * 60 * 1000);
          session = {
            date: finalStart.toISOString().slice(0, 10),
            startAt: finalStart.toISOString(),
            endAt: finalEnd.toISOString(),
            _clientFallback: true,
          };
        }

        setDailySession(session);
        sessionStartRef.current = session && session.startAt ? new Date(session.startAt) : null;
        sessionEndRef.current = session && session.endAt ? new Date(session.endAt) : null;

        const now = new Date();
        if (sessionStartRef.current && now < sessionStartRef.current) {
          const secs = Math.max(0, Math.round((sessionStartRef.current - now) / 1000));
          const hours = Math.floor(secs / 3600);
          const minutes = Math.floor((secs % 3600) / 60);
          const seconds = secs % 60;
          setTimeLeft(prev => ({ ...prev, beforeQuiz: { hours, minutes, seconds } }));
          setQuizIsLive(false);
        } else if (sessionStartRef.current && sessionEndRef.current && now >= sessionStartRef.current && now < sessionEndRef.current) {
          const remaining = Math.max(0, Math.round((sessionEndRef.current - now) / 1000));
          setTimeLeft(prev => ({ ...prev, duringQuiz: { minutes: Math.floor(remaining / 60), seconds: remaining % 60 } }));
          setQuizIsLive(true);
        } else {
          setQuizIsLive(false);
        }
      } catch (err) {
        console.error('Error fetching session', err);
        setDailySession(null);
      } finally {
        setSessionLoading(false);
      }
    };

    fetchSession();
    poll = setInterval(fetchSession, 3000);
    return () => clearInterval(poll);
  }, [user]);

  // Update the "before quiz" countdown every second so it ticks smoothly
  useEffect(() => {
    let t = null;
    const tick = () => {
      const now = new Date();
      if (sessionStartRef.current && now < sessionStartRef.current) {
        const secs = Math.max(0, Math.round((sessionStartRef.current - now) / 1000));
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor((secs % 3600) / 60);
        const seconds = secs % 60;
        setTimeLeft(prev => ({ ...prev, beforeQuiz: { hours, minutes, seconds } }));
      } else {
        // live, or no session / window passed - keep zeros
        setTimeLeft(prev => ({ ...prev, beforeQuiz: { hours: 0, minutes: 0, seconds: 0 } }));
      }
    };

    tick();
    t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [dailySession, quizIsLive]);

  // When the quiz starts, run a 2-minute during-quiz timer, then close the
  // live window
  useEffect(() => {
    let interval = null;
    if (quizIsLive && !timerCompletedRef.current && quizStarted) {
      const now = new Date();
      let remaining = 120; // default seconds
      if (sessionEndRef.current) {
        remaining = Math.max(0, Math.round((sessionEndRef.current - now) / 1000));
      }

      setTimeout(() => {
        const mins0 = Math.floor(remaining / 60);
        const secs0 = remaining % 60;
        setTimeLeft(prev => ({ ...prev, duringQuiz: { minutes: mins0, seconds: secs0 } }));
      }, 0);

      interval = setInterval(() => {
        remaining -= 1;
        const mins = Math.floor(Math.max(0, remaining) / 60);
        const secs = Math.max(0, remaining) % 60;
        setTimeLeft(prev => ({ ...prev, duringQuiz: { minutes: mins, seconds: secs } }));

        if (remaining <= 0) {
          clearInterval(interval);
          timerCompletedRef.current = true;
          setQuizIsLive(false);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quizIsLive, quizStarted]);

  return {
    quizIsLive,
    quizStarted,
    setQuizStarted,
    dailySession,
    sessionLoading,
    timeLeft,
  };
}
