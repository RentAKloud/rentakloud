import { CouponType, type CouponCode, type Order, Product, type ProductPrice, type PlanPrice, ProductType } from "./types"

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

export function getProductPrice(product: Partial<Product>, priceId?: string): ProductPrice {
  if (priceId) {
    return product.prices?.find(p => p.prices!.find(px => px.priceId === priceId))!
  }

  return product.prices![0]
}

export function getPlanPrice(plan: ProductPrice, priceId: string): PlanPrice | undefined {
  return plan.prices?.find(p => p.priceId === priceId)
}

export function getOrderSubTotal(order: Order) {
  return order.items.reduce((sum, curr) => {
    const price = curr.product.productType === ProductType.Physical ? curr.product.prices[0] : curr.product.prices[0].prices![0]
    return sum + +(price.saleAmount || price.amount) * curr.quantity
  }, 0)
}

export function getTotalDiscounts(couponCodes: CouponCode[], total: number, products: { id: number, price: number, qty: number }[]) {
  return couponCodes.reduce((sum, curr) => {
    const apply = (value: number) => curr.type === CouponType.Percentage ?
      value * curr.percentageDiscount / 100 :
      +curr.flatDiscount

    const applicableProducts = curr.products.map(p => p.id)
    if (applicableProducts.length > 0) {
      return products.reduce(
        (psum, pcurr) =>
          applicableProducts.includes(pcurr.id) ?
            apply(pcurr.price * pcurr.qty) :
            psum
        , 0
      ) + sum
    }

    return apply(total) + sum
  }, 0)
}