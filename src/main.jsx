import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE || 'development',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

const setVh = () => {
  const height = window.visualViewport?.height ?? window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
};

setVh();
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', setVh);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </AuthProvider>
  </StrictMode>
);
