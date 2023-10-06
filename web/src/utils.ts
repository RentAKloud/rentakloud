export function pluralize(qty: number, word: string, plural = word + 's') {
  return [1, -1].includes(Number(qty)) ? word : plural
}

export function truncate(text: string, limit: number): string {
  return text.length <= limit ? text : text.slice(0, limit) + '...'
}