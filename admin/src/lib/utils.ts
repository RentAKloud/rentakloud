export function price(amount: number, currency = 'usd') {
  const f = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  })

  return `${f.format(amount)} ${currency.toUpperCase()}`
}

export function formatDateForDB(date: string | Date | null): Date | null {
  if (date) {
    return new Date(date)
  }
  return null
}