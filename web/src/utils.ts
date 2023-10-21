import { CouponCode, CouponType } from "./types/order"

export function formatPrice(amount: number, currency = 'usd') {
  const f = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  })

  return `${f.format(amount)} ${currency.toUpperCase()}`
}

export function pluralize(qty: number, word: string, plural = word + 's') {
  return [1, -1].includes(Number(qty)) ? word : plural
}

export function truncate(text: string, limit: number): string {
  return text.length <= limit ? text : text.slice(0, limit) + '...'
}

export function getTotalDiscounts(couponCodes: CouponCode[], total: number) {
  return couponCodes.reduce((sum, curr) => {
    return (curr.type === CouponType.Percentage ? total * curr.percentageDiscount / 100 : +curr.flatDiscount) + sum
  }, 0)
}