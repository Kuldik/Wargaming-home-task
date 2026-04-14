import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** Только деплой с корня домена (Vercel). Не используйте подкаталог в base — иначе 404 ассетов. */
export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    restoreMocks: true,
    clearMocks: true,
    fakeTimers: { toFake: ['setTimeout', 'clearTimeout', 'Date'] },
  },
});
