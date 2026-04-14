import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Vercel always serves the app at domain root; ignore VITE_BASE_PATH from
  // project env (e.g. GitHub Pages /repo/) so asset URLs stay /assets/...
  const base = process.env.VERCEL ? '/' : env.VITE_BASE_PATH || '/';

  return {
    plugins: [react()],
    base,
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
