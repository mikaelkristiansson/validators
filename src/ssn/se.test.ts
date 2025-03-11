import { describe, expect, it } from 'vitest';
import { isValidSwedishSSN } from './se';

describe('Swedish ssn validation', () => {
  it.each([
    {
      v: '202302185760',
      expected: true,
      description: 'valid SSN with current century',
    },
    {
      v: '2302185760',
      expected: true,
      description: 'valid SSN without century',
    },
    {
      v: '195403018798',
      expected: true,
      description: 'valid SSN with mid 20th century',
    },
    {
      v: '193207264171',
      expected: true,
      description: 'valid SSN with early 20th century',
    },
    { v: '19', expected: false, description: 'too short SSN' },
    { v: '1932072641712', expected: false, description: 'too long SSN' },
    { v: '', expected: false, description: 'empty SSN' },
    { v: '193207264172', expected: false, description: 'invalid checksum' },
    {
      v: '199902294171',
      expected: false,
      description: 'invalid date (Feb 29 on non-leap year)',
    },
  ])('$description: $v should return $expected', ({ v, expected }) => {
    expect(isValidSwedishSSN(v)).toBe(expected);
  });
});
