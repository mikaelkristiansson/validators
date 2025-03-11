import { describe, expect, it } from 'vitest';
import { isValidDanishSSN } from './dk';

describe('Danish ssn validation', () => {
  it.each([
    {
      v: '1306729647',
      expected: true,
      description: 'valid SSN',
    },
    {
      v: '1005081307',
      expected: true,
      description: 'valid SSN',
    },
    {
      v: '2210539592',
      expected: true,
      description: 'valid SSN',
    },
  ])('$description: $v should return $expected', ({ v, expected }) => {
    expect(isValidDanishSSN(v)).toBe(expected);
  });

  it('should return false for empty input', () => {
    expect(isValidDanishSSN('')).toBe(false);
  });

  it('should return false for input with invalid length', () => {
    expect(isValidDanishSSN('123456789')).toBe(false);
    expect(isValidDanishSSN('12345678901')).toBe(false);
  });

  it('should return false for input with invalid format', () => {
    expect(isValidDanishSSN('3212991234')).toBe(false); // Invalid day
    expect(isValidDanishSSN('0113991234')).toBe(false); // Invalid month
    expect(isValidDanishSSN('0113001234')).toBe(false); // Invalid year
  });

  it('should return false for input with invalid date', () => {
    expect(isValidDanishSSN('2902991234')).toBe(false); // Invalid date (Feb 29 on a non-leap year)
  });

  it('should return true for valid input', () => {
    expect(isValidDanishSSN('0101011234')).toBe(true); // Valid date
    expect(isValidDanishSSN('2902001234')).toBe(true); // Valid date (Feb 29 on a leap year)
  });
});
