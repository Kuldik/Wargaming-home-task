// src/shared/lib/debounce.ts
import { useEffect, useState } from 'react';

export const useDebouncedValue = <T,>(value: T, delay: number) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
};
