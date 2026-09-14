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
      reporter: ['text', 'lcov'],
      // Only include source JS/TS files in coverage and exclude styles/html/mocks
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        '**/*.css',
        '**/*.html',
        'src/assets/**',
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/mocks/**'
      ],
      thresholds: {
        // Enforce 60% minimum coverage across all metrics
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60
      }
    }
  },
});