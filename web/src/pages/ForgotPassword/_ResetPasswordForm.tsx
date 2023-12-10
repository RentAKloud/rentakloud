import { Component, Show, createSignal } from "solid-js";
import { FormError, createForm, pattern, value } from "@modular-forms/solid";
import { NotificationService } from "~/services/NotificationService";
import TextInput from "~/components/Inputs/TextInput";
import { complexPasswordRegEx } from "~/utils";
import AuthApi from "~/api/auth";
import { useSearchParams } from "@solidjs/router";

type ResetPasswordForm = {
  password: string
  confirmPassword: string
}

export const ResetPasswordForm: Component = () => {
  const [resetPasswordForm, { Form, Field }] = createForm<ResetPasswordForm>()
  const [params] = useSearchParams()
  const [done, setDone] = createSignal(false)

  async function resetPassword(data: ResetPasswordForm) {
    if (data.confirmPassword !== data.password) {
      throw new FormError<ResetPasswordForm>({
        confirmPassword: "Confirm Password doesn't matches password."
      })
    }
    const { result, error } = await AuthApi.passwordReset(data.password, params.token)

    if (result) {
      setDone(true)
    }

    if (error) {
      NotificationService.error("Something went wrong. Please contact support or try again later.")
    }
  }

  return (
    <Show
      when={!done()}
      fallback={
        <>
          <h4 class="font-bold">Done!</h4>
          <p>Your password has been reset successfully!</p>
        </>
      }
      >
      <Form onSubmit={resetPassword}>
        <Field
          name="password"
          validate={[
            pattern(
              complexPasswordRegEx,
              "Password must be minimum 8 characters long, containing uppercase, lowercase, and special characters"
            )
          ]}>
          {(field, props) => (
            <TextInput
              {...props}
              value={field.value}
              error={field.error}
              type="password"
              label="New Password"
              placeholder="********"
              inputClass="input-primary"
              required
            />
          )}
        </Field>

        <Field name="confirmPassword">
          {(field, props) => (
            <TextInput
              {...props}
              value={field.value}
              error={field.error}
              type="password"
              label="Confirm Password"
              placeholder="********"
              inputClass="input-primary"
              required
            />
          )}
        </Field>

        <div class="form-control mt-6">
          <button class="btn btn-primary" disabled={resetPasswordForm.invalid || resetPasswordForm.submitting}>Reset</button>
        </div>
      </Form>
    </Show>
  )
}