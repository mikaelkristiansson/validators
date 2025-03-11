import { describe, expect, test } from 'vitest';
import { isValidDate, isLeapYear } from './is-valid';

describe('isValidDate', () => {
  test('should return false for non-integer year, month, or day', () => {
    expect(isValidDate(2021.5, 12, 25)).toBe(false);
    expect(isValidDate(2021, 12.5, 25)).toBe(false);
    expect(isValidDate(2021, 12, 25.5)).toBe(false);
  });

  test('should return false for month out of range', () => {
    expect(isValidDate(2021, 0, 25)).toBe(false);
    expect(isValidDate(2021, 13, 25)).toBe(false);
  });

  test('should return false for day out of range', () => {
    expect(isValidDate(2021, 1, 0)).toBe(false);
    expect(isValidDate(2021, 1, 32)).toBe(false);
  });

  test('should return true for valid dates', () => {
    expect(isValidDate(2021, 1, 1)).toBe(true);
    expect(isValidDate(2021, 12, 31)).toBe(true);
    expect(isValidDate(2020, 2, 29)).toBe(true); // Leap year
  });

  test('should return false for invalid dates', () => {
    expect(isValidDate(2021, 2, 29)).toBe(false); // Not a leap year
    expect(isValidDate(2021, 4, 31)).toBe(false); // April has 30 days
  });

  describe('isValidDate', () => {
    test('should return false for non-integer year, month, or day', () => {
      expect(isValidDate(2021.5, 12, 25)).toBe(false);
      expect(isValidDate(2021, 12.5, 25)).toBe(false);
      expect(isValidDate(2021, 12, 25.5)).toBe(false);
    });

    test('should return false for month out of range', () => {
      expect(isValidDate(2021, 0, 25)).toBe(false);
      expect(isValidDate(2021, 13, 25)).toBe(false);
    });

    test('should return false for day out of range', () => {
      expect(isValidDate(2021, 1, 0)).toBe(false);
      expect(isValidDate(2021, 1, 32)).toBe(false);
    });

    test('should return true for valid dates', () => {
      expect(isValidDate(2021, 1, 1)).toBe(true);
      expect(isValidDate(2021, 12, 31)).toBe(true);
      expect(isValidDate(2020, 2, 29)).toBe(true); // Leap year
    });

    test('should return false for invalid dates', () => {
      expect(isValidDate(2021, 2, 29)).toBe(false); // Not a leap year
      expect(isValidDate(2021, 4, 31)).toBe(false); // April has 30 days
    });
  });

  describe('isLeapYear', () => {
    test('should return true for leap years', () => {
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(1600)).toBe(true);
    });

    test('should return false for non-leap years', () => {
      expect(isLeapYear(2021)).toBe(false);
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
    });
  });
});
