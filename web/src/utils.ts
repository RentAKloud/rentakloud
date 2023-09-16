export function pluralize(qty: number, word: string, plural = word + 's') {
  return [1, -1].includes(Number(qty)) ? word : plural
}