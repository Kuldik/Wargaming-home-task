import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from '../debounce';

describe('useDebouncedValue', () => {
  it('returns updated value after delay', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ v, d }) => useDebouncedValue(v, d),
      { initialProps: { v: 'a', d: 300 } }
    );

    expect(result.current).toBe('a');

    rerender({ v: 'b', d: 300 });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('a'); 

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('b');

    vi.useRealTimers();
  });
});
