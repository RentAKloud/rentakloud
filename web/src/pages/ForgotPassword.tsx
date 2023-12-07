import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createForm } from "@modular-forms/solid";
import DefaultLayout from "~/layouts/DefaultLayout";
import HeroWithForm from "~/components/Hero/HeroWithForm";
import { NotificationService } from "~/services/NotificationService";
import TextInput from "~/components/Inputs/TextInput";

type ResetPasswordForm = {
  email: string
}

const ForgotPassword: Component = () => {
  const navigate = useNavigate()
  const [resetPasswordForm, { Form, Field }] = createForm<ResetPasswordForm>()

  async function loginHandler() {
    try {
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        NotificationService.error("Invalid email or password")
      } else {
        NotificationService.error("Something went wrong. Please contact support or try again later.")
      }
    }
  }

  return (
    <DefaultLayout>
      <HeroWithForm
        title="Forgot Password"
        subtitle={`We will send a password reset email to the email address you registered your account with`}
      >
        <Form onSubmit={() => { }}>
          <Field name="email">
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
            <button class="btn btn-primary" onClick={loginHandler}>Reset</button>
          </div>
        </Form>
      </HeroWithForm>
    </DefaultLayout>
  )
}

export default ForgotPassword