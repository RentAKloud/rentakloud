import { CouponType, type CouponCode, type Order } from "./types"

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

export function getOrderSubTotal(order: Order) {
  return order.items.reduce((sum, curr) => {
    const price = curr.product.prices[0]
    return sum + +(price.saleAmount || price.amount)
  }, 0)
}

export function getTotalDiscounts(couponCodes: CouponCode[], total: number) {
  return couponCodes.reduce((sum, curr) => {
    return (curr.type === CouponType.Percentage ? total * curr.percentageDiscount / 100 : +curr.flatDiscount) + sum
  }, 0)
}