import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';

  const setVh = () => {
  const height = window.visualViewport?.height ?? window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
  };

  setVh();
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);
  // If visualViewport API exists, keep its resize in sync
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
  </StrictMode>,
)
