import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/App.jsx',
        'src/data.js',
        'src/components/**/*.{js,jsx,ts,tsx}',
        'src/config/**/*.js',
        'src/hooks/**/*.{js,ts}',
        'src/pages/AdminDashboardScreen.jsx',
        'src/pages/AssignmentScreen.jsx',
        'src/services/**/*.js',
        'src/schemas/**/*.{js,ts}',
        'src/utils/logger.js',
      ],
      exclude: [
        '**/*.css',
        '**/*.html',
        'src/assets/**',
        'src/mocks/**',
        'src/test/**',
        'src/context/**',
        'src/pages/**/*.test.{js,jsx,ts,tsx}',
        'src/pages/css-pages/**',
        'src/pages/html-pages/**',
        'src/pages/js-pages/**',
        'src/components/common/TopicQuiz.jsx',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
