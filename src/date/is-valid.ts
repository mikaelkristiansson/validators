export function isValidDate(year: number, month: number, day: number) {
  // Check if year, month, and day are numbers and within valid ranges
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return false;
  }
  if (month < 1 || month > 12 || day < 1) {
    return false;
  }

  // Define the number of days in each month
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const date = new Date(year, month - 1, day);

  if (
    Object.prototype.toString.call(date) !== '[object Date]' ||
    isNaN(date.getTime())
  ) {
    return false;
  }

  // Check if the day is within the valid range for the given month
  return day <= daysInMonth[month - 1];
}

// Function to check if a year is a leap year
export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
