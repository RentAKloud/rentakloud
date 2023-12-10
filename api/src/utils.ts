export function nextDay() {
  return new Date(+new Date() + 24 * 60 * 60 * 1000)
}