export function getNumberOfDaysBetweenMonthYearAndToday(
  targetDate: string
): number {
  // Split the targetDate string into year and month parts
  const [year, month] = targetDate.split("-");

  // Set the default day to the 1st of the month
  const day = 1;

  // Create a new Date object for the target date using the year, month, and day
  const targetDateObj = new Date(parseInt(year), parseInt(month) - 1, day);

  // Get today's date
  const today = new Date();

  // Calculate the time difference in milliseconds between the target date and today
  const timeDifferenceMs = targetDateObj.getTime() - today.getTime();

  // Calculate the number of days by dividing the time difference by the number of milliseconds in a day
  const numberOfDays = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

  return numberOfDays;
}
