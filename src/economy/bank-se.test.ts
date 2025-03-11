import { describe, it, expect } from 'vitest';
import { accountNumberCheck } from './bank-se';

describe('accountNumberCheck', () => {
  it('should validate a valid Nordea account number', () => {
    const result = accountNumberCheck('3300-7505092556');
    expect(result).toEqual({
      bank: 'Nordea Personkonto',
      clearing: '3300',
      number: '7505092556',
    });
  });

  it('should validate a valid Svea Bank account number', () => {
    const result = accountNumberCheck('9660-1000010');
    expect(result).toEqual({
      bank: 'Svea Bank',
      clearing: '9660',
      number: '1000010',
    });
  });

  it('should validate a valid Nordnet Bank account number', () => {
    const result = accountNumberCheck('9100-0000100');
    expect(result).toEqual({
      bank: 'Nordnet Bank',
      clearing: '9100',
      number: '0000100',
    });
  });

  it('should return false for an invalid account number', () => {
    const result = accountNumberCheck('1234567890');
    expect(result).toBe(false);
  });

  it('should return false for an account number with invalid characters', () => {
    const result = accountNumberCheck('9551-23456789');
    expect(result).toBe(false);
  });
});
