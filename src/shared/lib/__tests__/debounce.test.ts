import { describe, it, expect, vi } from 'vitest';
import { useDebouncedValue } from '../debounce';
import { renderHook, act } from '@testing-library/react';

describe('useDebouncedValue', () => {
  it('returns updated value after delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ v, d }) => useDebouncedValue(v, d),
      { initialProps: { v: 'a', d: 300 } }
    );

    expect(result.current).toBe('a');

    rerender({ v: 'abc', d: 300 });
    // Пока не истёк таймер — предыдущее значение
    expect(result.current).toBe('a');

    act(() => { vi.advanceTimersByTime(299); });
    expect(result.current).toBe('a');

    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current).toBe('abc');

    vi.useRealTimers();
  });
});
