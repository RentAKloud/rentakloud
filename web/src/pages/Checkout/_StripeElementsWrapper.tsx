import { createEffect } from "solid-js"
import { Card, useStripeElements } from "solid-stripe"
import { useCheckoutContext } from "./context"
import { NotificationService } from "../../services/NotificationService"

export const StripeElementsWrapper = () => {
  const {
    stripe, clientSecret, subClientSecrets,
    setInTransit, setStep, setPaymentSuccess,
    setSubscriptionsPaid,
  } = useCheckoutContext()
  const elements = useStripeElements()

  createEffect(async () => {
    if (!clientSecret()) return

    try {
      setInTransit(true) // TODO this does not work for some reason
      const result = await stripe()!.confirmCardPayment(clientSecret()!, {
        payment_method: {
          card: elements().getElement(Card)!,
          billing_details: {},
        }
      })

      if (result.error) {
        NotificationService.error("Payment failed")
      }
      else {
        NotificationService.success("Payment successfull")
        setStep('congrats')
        setPaymentSuccess(true)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setInTransit(false)
    }
  })

  createEffect(async () => {
    if (!subClientSecrets()) return

    try {
      const promises = subClientSecrets()!.map((secret) => {
        return stripe()!.confirmCardPayment(secret, {
          payment_method: {
            card: elements().getElement(Card)!,
            billing_details: {},
          }
        })
      })
      const results = await Promise.all(promises)

      if (results.some(r => !!r.error)) {
        NotificationService.error("One of the payments failed")
      }
      else {
        NotificationService.success("Subscription successfull")
        setStep('congrats')
        setSubscriptionsPaid(true)
        // TODO should check which subscriptions failed and on retry only try payment for those
      }
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Card />
  )
}