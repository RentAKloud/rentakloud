import { createEffect } from "solid-js"
import { Card, useStripeElements } from "solid-stripe"
import { useCheckoutContext } from "./context"
import { NotificationService } from "../../services/NotificationService"
import { useNavigate } from "@solidjs/router"

export const StripeElementsWrapper = () => {
  const { stripe, clientSecret, setInTransit } = useCheckoutContext()
  const elements = useStripeElements()
  const navigate = useNavigate()

  createEffect(async () => {
    if (!clientSecret()) return

    try {
      setInTransit(true)
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
        navigate("/dashboard")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setInTransit(false)
    }
  })

  return (
    <Card />
  )
}