import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const repo = 'Wargaming-home-task'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/Wargaming-home-task/' : '/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    restoreMocks: true,
    clearMocks: true,
    fakeTimers: {
      toFake: ['setTimeout', 'clearTimeout', 'Date'],
    },
  },
}));
