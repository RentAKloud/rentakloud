import { Component, Show, createSignal } from "solid-js";
import { createForm, email } from "@modular-forms/solid";
import { NotificationService } from "~/services/NotificationService";
import TextInput from "~/components/Inputs/TextInput";
import AuthApi from "~/api/auth";

type RequestResetForm = {
  email: string
}

export const RequestResetForm: Component = () => {
  const [requestResetForm, { Form, Field }] = createForm<RequestResetForm>()
  const [done, setDone] = createSignal(false)

  async function requestReset(data: RequestResetForm) {
    const { result, error } = await AuthApi.requestPasswordReset(data.email)

    if (result) {
      setDone(true)
    }
    if (error) {
      NotificationService.error("Something went wrong. Please contact support or try again later.")
    }

    return true
  }

  return (
    <Show
      when={!done()}
      fallback={
        <>
          <h4 class="font-bold">Done!</h4>
          <p>You will receive an email with the reset link if the email you provided was registered with us.</p>
        </>
      }>
      <Form onSubmit={requestReset}>
        <Field name="email" validate={[email("Must be a valid email")]}>
          {(field, props) => (
            <TextInput
              {...props}
              value={field.value}
              error={field.error}
              type="email"
              label="Email"
              placeholder="john.doe@example.com"
              inputClass="input-primary"
              required
            />
          )}
        </Field>

        <div class="form-control mt-6">
          <button class="btn btn-primary" disabled={requestResetForm.submitting || requestResetForm.invalid} type="submit">Request Reset</button>
        </div>
      </Form>
    </Show>
  )
}