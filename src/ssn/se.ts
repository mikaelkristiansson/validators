import { isValidDate } from '../date/is-valid';

// yyyymmdd-xxxx yymmdd-xxxx yyyymmddxxxx yymmddxxxx with luhn algorithm
export function isValidSwedishSSN(input: string) {
  // Check valid length & form
  if (!input) return false;

  if (input.indexOf('-') == -1) {
    if (input.length === 10) {
      input = input.slice(0, 6) + '-' + input.slice(6);
    } else {
      input = input.slice(0, 8) + '-' + input.slice(8);
    }
  }
  if (
    !input.match(
      /^(\d{2})(\d{2})(\d{2})-(\d{4})|(\d{4})(\d{2})(\d{2})-(\d{4})$/,
    )
  )
    return false;

  // Clean input
  input = input.replace('-', '');
  if (input.length === 12) {
    input = input.substring(2);
  }

  const ssnArray = input.replace(/\D/g, '').split('');

  const year = Number(ssnArray[0] + ssnArray[1]),
    month = Number(ssnArray[2] + ssnArray[3]),
    day = Number(ssnArray[4] + ssnArray[5]);

  if (!isValidDate(year, month, day)) {
    return false;
  }

  // Declare variables
  const numdigits = input.length,
    parity = numdigits % 2;

  let sum = 0,
    digit;

  // Check luhn algorithm
  for (let i = 0; i < numdigits; i = i + 1) {
    digit = parseInt(input.charAt(i));
    if (i % 2 == parity) digit *= 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  return sum % 10 == 0;
}
