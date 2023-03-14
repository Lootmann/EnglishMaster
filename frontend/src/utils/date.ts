// handle to date, datetime
function getCurrentDate(): [number, number, number] {
  const today = new Date();
  return [today.getFullYear(), today.getMonth() + 1, today.getDate()];
}

// padding 0 at head when getMonth() + 1 is between 0 and 9
export function dateToString(dateString: Date): string {
  const date = new Date(dateString);
  const [month, day] = [date.getMonth() + 1, date.getDate()];

  return `${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

/**
 * withinWeek
 * (from, to) = (7 days ago, today)
 *
 * @param {Date}dateString
 * @returns
 */
export function withinWeek(dateString: Date): boolean {
  const from = new Date();
  from.setDate(from.getDate() - 7);
  const to = new Date();
  const createdAt = new Date(dateString);

  return (
    from.getTime() <= createdAt.getTime() && createdAt.getTime() <= to.getTime()
  );
}

export function isMonth(dateString: Date): boolean {
  const date = new Date(dateString);
  const [year, month] = getCurrentDate();
  return date.getFullYear() == year && date.getMonth() + 1 == month;
}

export function isWeek(dateString: Date): boolean {
  const date = new Date(dateString);
  const today = new Date();

  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  return diffWeeks === 0 && date.getDay() <= today.getDay();
}

export function isToday(dateString: Date): boolean {
  const date = new Date(dateString);
  const [year, month, day] = getCurrentDate();

  return (
    date.getFullYear() == year &&
    date.getMonth() + 1 == month &&
    date.getDate() == day
  );
}
