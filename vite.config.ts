import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Vercel: always root base. Local/other: VITE_BASE_PATH from .env.*
  const base =
    mode === 'vercel' || process.env.VERCEL ? '/' : env.VITE_BASE_PATH || '/';

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
