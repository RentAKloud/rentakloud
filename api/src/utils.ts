const DAY = 24 * 60 * 60 * 1000

export function nextDay() {
  return new Date(+new Date() + DAY)
}

export function daysAgo(days: number) {
  return new Date(+new Date() - days * DAY)
}