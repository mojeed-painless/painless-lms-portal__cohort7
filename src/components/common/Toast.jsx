import React, { useState, useEffect } from 'react';

export function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColors = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  return (
    <div
      role="alert"
      className={`fixed bottom-4 right-4 px-4 py-3 rounded shadow-lg transition-all z-50 ${bgColors[type] || bgColors.info}`}
    >
      <div className="flex items-center space-x-2">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 font-bold opacity-75 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
}