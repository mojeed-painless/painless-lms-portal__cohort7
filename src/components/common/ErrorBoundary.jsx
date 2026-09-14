import React from 'react';
import { logError } from '../../utils/logger';

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError('Uncaught React Render Error', {
      error: error.message,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-600">Something went wrong.</div>;
    }
    return this.props.children;
  }
}