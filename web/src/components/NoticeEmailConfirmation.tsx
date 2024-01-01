import { Component, Match, Switch, createSignal } from "solid-js"
import AuthApi from "~/api/auth"

const NoticeEmailConfirmation: Component = () => {
  const [sentConfirmation, setSentConfirmation] = createSignal(false)
  const [error, setError] = createSignal()

  async function resendConfirmationEmail() {
    const { result, error } = await AuthApi.requestConfirmationEmail()

    if (error) {
      setError(error)
    }

    if (result) {
      setSentConfirmation(true)
    }
  }

  return (
    <div class="py-2 px-10" classList={{
      "bg-warning text-warning-content": !sentConfirmation(),
      "bg-error text-error-content": !!error(),
      "bg-info text-info-content": sentConfirmation()
    }}>
      <Switch fallback={
        <>
          We have sent you a confirmation email, please check your inbox. If you did not receive it,{" "}
          <button class="link" onclick={resendConfirmationEmail}>click here</button> to resend confirmation email.
        </>
      }>
        <Match when={!!error()}>
          Something went wrong! Could not send confirmation email.
        </Match>
        <Match when={sentConfirmation()}>
          We have sent another confirmation email! Please check your inbox and click on the verification link given in the email.
        </Match>
      </Switch>

    </div>
  )
}

export default NoticeEmailConfirmation