import { isValidDate } from '../date/is-valid';

const checksumTable: string[] = '0123456789ABCDEFHJKLMNPRSTUVWXY'.split('');

const SSN_REGEX =
  /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d[-|U-Y]|[012]\d[A-F])\d{3}[\dA-Z]$/;

export function isValidFinnishSSN(input: string) {
  try {
    return validate(input);
  } catch (_) {
    return false;
  }
}

function validate(input: string) {
  if (!input) {
    throw new Error('SSN is required');
  }

  if (input.length !== 11) {
    throw new Error('SSN need to be 11 characters long');
  }

  if (!SSN_REGEX.test(input)) {
    throw new Error('Not valid SSN format');
  }

  const centuryMap: Map<string, number> = new Map();
  centuryMap.set('F', 2000);
  centuryMap.set('E', 2000);
  centuryMap.set('D', 2000);
  centuryMap.set('C', 2000);
  centuryMap.set('B', 2000);
  centuryMap.set('A', 2000);
  centuryMap.set('U', 1900);
  centuryMap.set('V', 1900);
  centuryMap.set('W', 1900);
  centuryMap.set('X', 1900);
  centuryMap.set('Y', 1900);
  centuryMap.set('-', 1900);
  centuryMap.set('+', 1800);

  const centuryId = input.charAt(6);
  const day = parseInt(input.substring(0, 2), 10);
  const month = parseInt(input.substring(2, 4), 10);
  const year = parseInt(input.substring(4, 6), 10) + centuryMap.get(centuryId)!;

  if (!isValidDate(year, month, day)) {
    throw new Error('Not valid Date');
  }

  const rollingId = input.substring(7, 10);
  const checksum = input.substring(10, 11);
  const checksumBase = parseInt(input.substring(0, 6) + rollingId, 10);

  return checksum === checksumTable[checksumBase % 31];
}
