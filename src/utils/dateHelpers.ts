export const checkIsDate = (date: string) => {
  return Date.parse(date);
};

export const checkIsNowOrDate = (date: string) => {
  return checkIsDate(date) || date === 'now';
};

/**
 * Finds difference between two dates in days
 *
 * @example 30
 */
export const getDaysDifferenceBetweenTwoStringDates = (firstDate: string, secondDate: string) => {
  if (checkIsNowOrDate(firstDate) && checkIsNowOrDate(secondDate)) {
    const date1 = firstDate === 'now' ? new Date() : new Date(firstDate);
    const date2 = secondDate === 'now' ? new Date() : new Date(secondDate);

    const differenceInTime = date2.getTime() - date1.getTime();

    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  }
  return NaN;
};
