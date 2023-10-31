import { CouponCode, CouponType, Order } from "./types/order"

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

export function getOrderSubTotal(order: Order) {
  return order.items.reduce((sum, curr) => {
    const price = curr.product.prices[0]
    return sum + (price.saleAmount || price.amount)
  }, 0)
}

export function getTotalDiscounts(couponCodes: CouponCode[], total: number) {
  return couponCodes.reduce((sum, curr) => {
    return (curr.type === CouponType.Percentage ? total * curr.percentageDiscount / 100 : +curr.flatDiscount) + sum
  }, 0)
}