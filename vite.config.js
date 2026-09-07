import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            const normalized = id.replace(/\\/g, '/');

            if (
              normalized.includes('/node_modules/react/') ||
              normalized.includes('/node_modules/react-dom/') ||
              normalized.includes('/node_modules/scheduler/')
            ) {
              return 'react-vendor';
            }

            return 'vendor';
          }

          if (id.includes('/src/data/') || id.includes('/quizData')) {
            return 'quiz-data';
          }
        },
      },
    },
  },
})
