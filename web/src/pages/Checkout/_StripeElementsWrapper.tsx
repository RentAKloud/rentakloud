import { createEffect } from "solid-js"
import { Card, useStripeElements } from "solid-stripe"
import { useCheckoutContext } from "./context"
import { NotificationService } from "~/services/NotificationService"
import { PaymentIntentResult } from "@stripe/stripe-js"

export const StripeElementsWrapper = () => {
  const {
    stripe, clientSecret, subClientSecrets,
    setInTransit, setPaymentSuccess,
    setSubscriptionsPaid, setIsCardInfoComplete
  } = useCheckoutContext()
  const elements = useStripeElements()

  createEffect(async () => {
    if (!clientSecret()) return

    try {
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
        setPaymentSuccess(true)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setInTransit(false)
    }
  })

  createEffect(() => {

    if (subClientSecrets() === undefined || subClientSecrets()!.length === 0) return

    try {
      const results: PaymentIntentResult[] = [];
      (async () => {
        for (const secret of subClientSecrets()!) {
          const r = await stripe()!.confirmCardPayment(secret, {
            payment_method: {
              card: elements().getElement(Card)!,
              billing_details: {},
            }
          })
          results.push(r)
        }

        if (results.some(r => !!r.error)) {
          NotificationService.error("One of the payments failed")
        }
        else {
          NotificationService.success("Subscription successfull")
          setSubscriptionsPaid(true)
          // TODO should check which subscriptions failed and on retry only try payment for those
        }
      })()
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Card onChange={(e) => setIsCardInfoComplete(e.complete)} />
  )
}