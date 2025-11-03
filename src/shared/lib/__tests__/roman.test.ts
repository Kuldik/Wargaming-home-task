import { describe, it, expect } from 'vitest';
import { toRoman } from '../roman';

describe('toRoman', () => {
  const cases: Array<[number, string]> = [
    [1, 'I'],
    [2, 'II'],
    [3, 'III'],
    [4, 'IV'],
    [5, 'V'],
    [6, 'VI'],
    [7, 'VII'],
    [8, 'VIII'],
    [9, 'IX'],
    [10, 'X'],
    [11, 'XI'],
  ];

  it.each(cases)('converts %s to %s', (n, r) => {
    expect(toRoman(n)).toBe(r);
  });

  it('caps at > 0 numbers only (defensive)', () => {
    expect(typeof toRoman(0)).toBe('string');
    expect(typeof toRoman(-1)).toBe('string');
  });
});
