import '@testing-library/jest-dom/vitest'; // <- дает toBeInTheDocument и др. + типы для Vitest
import 'whatwg-fetch';

import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from './src/shared/api/__tests__/mswServer';

// MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),            
    removeListener: vi.fn(),         
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
