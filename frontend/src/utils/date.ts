// handle to date, datetime
function getCurrentDate(): [number, number, number] {
  const today = new Date();
  return [today.getFullYear(), today.getMonth() + 1, today.getDate()];
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
