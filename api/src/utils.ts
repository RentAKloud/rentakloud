export const DAY = 24 * 60 * 60 * 1000;
export const YEAR = 365 * DAY;

export function nextDay() {
  return new Date(+new Date() + DAY);
}

export function daysAgo(days: number) {
  return new Date(+new Date() - days * DAY);
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
