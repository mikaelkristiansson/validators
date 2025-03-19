import { describe, expect, it } from 'vitest';
import { isValidFinnishSSN } from './fi';

describe('Finish ssn validation', () => {
  it('Should fail when given empty String', () => {
    expect(isValidFinnishSSN('')).toBe(false);
  });
  it('Should fail when given birthdate with month out of bounds', () => {
    expect(isValidFinnishSSN('301398-1233')).toBe(false);
  });

  it('Should fail when given birthdate with date out of bounds in January', () => {
    expect(isValidFinnishSSN('320198-123P')).toBe(false);
  });

  it('Should fail when given birthdate with date out of bounds in February, non leap year', () => {
    expect(isValidFinnishSSN('290299-123U')).toBe(false);
  });

  it('Should fail when given birth date with date out of bounds in February, a leap year', () => {
    expect(isValidFinnishSSN('300204-123Y')).toBe(false);
  });

  it('Should fail when given birth date with alphabets', () => {
    expect(isValidFinnishSSN('0101AA-123A')).toBe(false);
  });

  it('Should fail when given invalid separator char for year 1900', () => {
    const invalidSeparatorChars = 'ABCDEFGHIJKLMNOPQRST1234567890'.split('');
    invalidSeparatorChars.forEach((invalidChar) => {
      expect(isValidFinnishSSN('010195' + invalidChar + '433X')).toBe(false);
      expect(
        isValidFinnishSSN('010195' + invalidChar.toLowerCase() + '433X'),
      ).toBe(false);
    });
  });

  it('Should fail when given invalid separator char for year 2000', () => {
    const invalidSeparatorChars = 'GHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
    invalidSeparatorChars.forEach((invalidChar) => {
      expect(isValidFinnishSSN('010103' + invalidChar + '433X')).toBe(false);
      expect(
        isValidFinnishSSN('010103' + invalidChar.toLowerCase() + '433X'),
      ).toBe(false);
    });
  });

  it('Should fail when given too long date', () => {
    expect(isValidFinnishSSN('01011995+433X')).toBe(false);
  });

  it('Should fail when given too short date', () => {
    expect(isValidFinnishSSN('01015+433X')).toBe(false);
  });

  it('Should fail when given too long checksum part', () => {
    expect(isValidFinnishSSN('010195+4433X')).toBe(false);
  });

  it('Should fail when given too long checksum part', () => {
    expect(isValidFinnishSSN('010195+33X')).toBe(false);
  });

  it('Should pass when given valid FinnishSSN from 19th century', () => {
    expect(isValidFinnishSSN('010195+433X')).toBe(true);
  });

  it('Should pass when given valid FinnishSSN from 20th century', () => {
    expect(isValidFinnishSSN('010197-100P')).toBe(true);
  });

  it('Should pass when given valid FinnishSSN from 21st century', () => {
    expect(isValidFinnishSSN('010114A173M')).toBe(true);
  });

  it('Should pass when given valid FinnishSSN with leap year, divisible only by 4', () => {
    expect(isValidFinnishSSN('290296-7808')).toBe(true);
  });

  it('Should fail when given valid FinnishSSN with leap year, divisible by 100 and not by 400', () => {
    expect(isValidFinnishSSN('290200-101P')).toBe(false);
  });

  it('Should fail when given SSN longer than 11 chars, bogus in the end', () => {
    expect(isValidFinnishSSN('010114A173M ')).toBe(false);
  });

  it('Should fail when given SSN longer than 11 chars, bogus in the beginning', () => {
    expect(isValidFinnishSSN(' 010114A173M')).toBe(false);
  });

  it('Should pass when given valid FinnishSSN with leap year, divisible by 100 and by 400', () => {
    expect(isValidFinnishSSN('290200A248A')).toBe(true);
  });

  it('Should pass when given new intermediate characters', () => {
    // List taken from https://dvv.fi/en/reform-of-personal-identity-code
    const newHypotheticalIndividuals = [
      '010594Y9021',
      '020594X903P',
      '020594X902N',
      '030594W903B',
      '030694W9024',
      '040594V9030',
      '040594V902Y',
      '050594U903M',
      '050594U902L',
      '010516B903X',
      '010516B902W',
      '020516C903K',
      '020516C902J',
      '030516D9037',
      '030516D9026',
      '010501E9032',
      '020502E902X',
      '020503F9037',
      '020504A902E',
      '020504B904H',
      '010594Y9032',
    ];
    newHypotheticalIndividuals.forEach((individual) => {
      expect(isValidFinnishSSN(individual)).toBe(true);
    });
  });
});
