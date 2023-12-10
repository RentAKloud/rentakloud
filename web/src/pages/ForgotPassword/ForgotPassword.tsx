import { Component, Show } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import DefaultLayout from "~/layouts/DefaultLayout";
import HeroWithForm from "~/components/Hero/HeroWithForm";
import { RequestResetForm } from "./_RequestResetForm";
import { ResetPasswordForm } from "./_ResetPasswordForm";

const ForgotPassword: Component = () => {
  const [params] = useSearchParams()

  return (
    <DefaultLayout>
      <HeroWithForm
        title={params.token ? "Reset Password" : "Forgot Password"}
        subtitle={
          params.token ? 'Set a secure password containing upper and lowercase characters, numbers and special characters.' :
            `We will send a password reset email to the email address you registered your account with.`}
      >
        <Show
          when={params.token}
          fallback={<RequestResetForm />}
        >
          <ResetPasswordForm />
        </Show>
      </HeroWithForm>
    </DefaultLayout>
  )
}

export default ForgotPassword