/// <reference types="vitest/globals" />
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Splash } from '../Splash';

const HIDE_DELAY = 2000;
const ANIM_MS = 450;

describe('Splash', () => {
  beforeEach(() => {
    cleanup();
    sessionStorage.clear();
    vi.useFakeTimers();
  });

  it('appears and hides after 2s', () => {
    render(<Splash />);

    // виден сразу
    expect(screen.getByRole('dialog', { name: /splash/i })).toBeInTheDocument();

    // продвигаем все таймеры внутри act
    act(() => {
      vi.advanceTimersByTime(HIDE_DELAY + ANIM_MS);
    });

    // должен размонтироваться
    expect(screen.queryByRole('dialog', { name: /splash/i })).toBeNull();

    vi.useRealTimers();
  });

  it('does not show again within the same session', () => {
    // первый показ в этой сессии
    render(<Splash />);
    act(() => {
      vi.advanceTimersByTime(HIDE_DELAY + ANIM_MS);
    });

    // второй рендер в той же сессии — сразу null
    cleanup();
    render(<Splash />);
    expect(screen.queryByRole('dialog', { name: /splash/i })).toBeNull();

    vi.useRealTimers();
  });
});
