import { createEffect } from "solid-js"
import { Card, useStripeElements } from "solid-stripe"
import { useCheckoutContext } from "./context"
import { NotificationService } from "../../services/NotificationService"

export const StripeElementsWrapper = () => {
  const { stripe, clientSecret } = useCheckoutContext()
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
      }
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Card />
  )
}