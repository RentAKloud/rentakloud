export type Paginated<T> = {
  data: T[],
  total: number
}

export type CountryCode = { name: string, code: string }
export type StateCode = CountryCode

export type AppSettings = {
  isStripeTestMode: boolean
  disableCheckout: boolean
}