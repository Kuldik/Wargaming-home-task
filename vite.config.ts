import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/', 
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      globals: true,
      restoreMocks: true,
      clearMocks: true,
      fakeTimers: { toFake: ['setTimeout', 'clearTimeout', 'Date'] },
    },
  };
});
