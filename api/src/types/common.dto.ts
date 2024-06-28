export type Paginated<T> = {
  data: T[],
  total: number
}

export type AppSettings = {
  isStripeTestMode: boolean
  disableCheckout: boolean
  limits: {
    "rak-daas": number
  }
}