import { isValidDate } from '../date/is-valid';

/** In Norway there are several different ID numbers */
enum IDNumberType {
  /**
   * A national identity number (birth number) is an ID number for you who
   * have a residence permit and are going to live in Norway for more than
   * six months.
   */
  BirthNumber,
  /**
   * A D number is a temporary identification number that you get if you have
   * applied for protection (asylum), or if you have a residence permit and
   * are going to stay in Norway for less than six months.
   */
  DNumber,
  /**
   * A H number is a number used for assistance, a unique identification of a
   * person that does not have a national ID or a D number or in cases where
   * this is not known. A H number contains information about age and gender.
   */
  HNumber,
  /**
   * A FH number is used in health care to uniquely identify patients that
   * does not have a known national ID or D number. A FH number does not have
   * any information about age or gender.
   */
  FHNumber,
}

export function isValidNorwegianSSN(input: string) {
  try {
    return validate(input);
  } catch (_) {
    return false;
  }
}

function validate(input: string) {
  const ssn = input.trim();
  if (!ssn) {
    throw new Error('SSN is required');
  }

  if (isNaN(Number(ssn))) {
    throw new Error('SSN must be a number');
  }

  if (ssn.toString().length !== 11) {
    throw new Error('SSN need to be 11 characters long');
  }

  if (!isValidCheckDigits(ssn)) {
    throw new Error('Not valid check digits');
  }

  const type = idNumberType(ssn);
  if (type === IDNumberType.FHNumber) {
    return true;
  }
  return possibleAgesOfPersonWithIdNumber(ssn).length > 0;
}

/**
 * Get the ID number kind/type. This function does not validate
 */
function idNumberType(elevenDigits: string): IDNumberType {
  const firstDigit = parseInt(elevenDigits[0]);
  if (firstDigit === 8 || firstDigit === 9) {
    return IDNumberType.FHNumber;
  }
  if (firstDigit >= 4 && firstDigit <= 7) {
    return IDNumberType.DNumber;
  }
  const thirdDigit = parseInt(elevenDigits[2]);
  if (thirdDigit === 4 || thirdDigit === 5) {
    return IDNumberType.HNumber;
  } else {
    return IDNumberType.BirthNumber;
  }
}

/**
 * Find possible age of person based of ID number
 * @param elevenDigits Identification number
 */
export function possibleAgesOfPersonWithIdNumber(
  elevenDigits: string,
): number[] {
  const possibleAge = possibleAgeOfPersonWithIdNumber(elevenDigits);
  return possibleAge == null ? [] : [possibleAge];
}

/**
 * Returns the age of a person with given Norwegian national identity number.
 * Returns `undefined` when birth date could not be determined (e.g. for FH-numbers and invalid ID-numbers).
 */
function possibleAgeOfPersonWithIdNumber(
  elevenDigits: string,
): number | undefined {
  const birthDate = possibleBirthDateOfIdNumber(elevenDigits);
  if (birthDate == null) {
    return undefined;
  }

  const years = diffYears(new Date(), birthDate);
  return years >= 0 && years < 125 ? years : undefined;
}

/**
 * Get possible birth date from ID number
 */
export function possibleBirthDateOfIdNumber(
  elevenDigits: string,
): Date | undefined {
  if (elevenDigits.length !== 11) return undefined;
  const type = idNumberType(elevenDigits);
  switch (type) {
    case IDNumberType.BirthNumber:
      return possibleBirthDateOfBirthNumber(elevenDigits);
    case IDNumberType.DNumber:
      return possibleBirthDateOfDNumber(elevenDigits);
    case IDNumberType.HNumber:
      return possibleBirthDateOfHNumber(elevenDigits);
  }
  return undefined;
}

/**
 * Get possible birth date from HNumber
 */
function possibleBirthDateOfHNumber(elevenDigits: string): Date | undefined {
  const correctedThirdDigit = (parseInt(elevenDigits[2]) - 4).toString();
  return getBirthDate(
    elevenDigits.slice(0, 2) + correctedThirdDigit + elevenDigits.slice(3, 11),
    IDNumberType.HNumber,
  );
}

/**
 * Get possible birth date from DNumber
 */
function possibleBirthDateOfDNumber(elevenDigits: string): Date | undefined {
  const correctedFirstDigit = (parseInt(elevenDigits[0]) - 4).toString();
  return getBirthDate(
    correctedFirstDigit + elevenDigits.slice(1, 11),
    IDNumberType.DNumber,
  );
}

/**
 * Get possible birth date from BirthNumber
 * @param elevenDigits BirthNumber
 */
function possibleBirthDateOfBirthNumber(
  elevenDigits: string,
): Date | undefined {
  return getBirthDate(elevenDigits, IDNumberType.BirthNumber);
}

function getBirthDate(
  elevenDigitsWithDDMMYY: string,
  idNumberType: IDNumberType,
): Date | undefined {
  const DD = elevenDigitsWithDDMMYY.slice(0, 2);
  const MM = elevenDigitsWithDDMMYY.slice(2, 4);
  const YY = elevenDigitsWithDDMMYY.slice(4, 6);
  const YY_int = parseInt(YY);
  const ageGroupNumber = parseInt(elevenDigitsWithDDMMYY.slice(6, 9));

  let centuryPrefix = '20';
  if (ageGroupNumber >= 0 && ageGroupNumber < 500) {
    centuryPrefix = '19';
  } else if (idNumberType === IDNumberType.DNumber) {
    centuryPrefix = '20';
  } else if (ageGroupNumber >= 500 && ageGroupNumber < 750 && YY_int >= 54) {
    centuryPrefix = '18';
  } else if (ageGroupNumber >= 900 && ageGroupNumber < 1000 && YY_int >= 40) {
    centuryPrefix = '19';
  }

  const fullYear = `${centuryPrefix}${YY}`;
  const isoStr = [fullYear, MM, DD].join('-') + 'T00:00:00';
  const birthDate = new Date(isoStr);

  if (!isValidDate(YY_int, parseInt(MM, 10), parseInt(DD, 10))) {
    return undefined;
  }

  return birthDate;
}

/**
 * Calculated the difference between two dates.
 */
export function diffYears(startDate: Date, endDate: Date) {
  const yStart = startDate.getFullYear();
  const mStart = startDate.getMonth();
  const dStart = startDate.getDate();

  const yEnd = endDate.getFullYear();
  const mEnd = endDate.getMonth();
  const dEnd = endDate.getDate();

  const diff = yStart - yEnd;
  if (mEnd > mStart || (mEnd === mStart && dEnd > dStart)) {
    return diff - 1;
  }

  return diff;
}

function isValidCheckDigits(elevenDigits: string): boolean {
  const staticSequenceFirstCheckDigit = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1];
  const staticSequenceSecondCheckDigit = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

  const elevenDigitsArray = elevenDigits.split('').map(Number);

  return (
    isValidCheckDigit(staticSequenceFirstCheckDigit, elevenDigitsArray) &&
    isValidCheckDigit(staticSequenceSecondCheckDigit, elevenDigitsArray)
  );
}

function isValidCheckDigit(
  staticSequence: number[],
  elevenDigits: number[],
): boolean {
  const productSum = staticSequence.reduce(
    (acc, value, index) => acc + value * elevenDigits[index],
    0,
  );

  return productSum % 11 === 0;
}
