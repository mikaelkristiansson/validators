import { isValidDate } from '../date/is-valid';

// DDMMYYSSSS
export function isValidDanishSSN(input: string) {
  if (!input) {
    return false;
  }

  // valid length
  if (input.length !== 10) {
    return false;
  }

  // valid format
  if (
    !input.match(/^(0[1-9]|[1-2][0-9]|3[0-1])(0[1-9]|1[0-2])(\d{2})(\d{4})$/)
  ) {
    return false;
  }
  // valid date
  const day = parseInt(input.substring(0, 2), 10);
  const month = parseInt(input.substring(2, 4), 10);
  const year = parseInt(input.substring(4, 6), 10);

  if (!isValidDate(year, month, day)) {
    return false;
  }

  return true;
}
