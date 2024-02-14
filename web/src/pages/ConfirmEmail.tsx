import { useNavigate, useSearchParams } from "@solidjs/router";
import { Component, createSignal, onMount } from "solid-js";
import AuthApi from "~/api/auth";
import Hero from "~/components/Hero/Hero";
import DefaultLayout from "~/layouts/DefaultLayout";
import { getUserProfile } from "~/stores/auth";

const ConfirmEmail: Component = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = createSignal(false)
  const [error, setError] = createSignal(false)

  onMount(async () => {
    if (!params.token) {
      navigate("/")
    } else {
      const { error, result } = await AuthApi.confirmEmail(params.token)

      if (!error && result === 'true') {
        setConfirmed(true)
        getUserProfile() // refresh user data to remove the unconfirmed email notice
        setTimeout(() => {
          navigate("/dashboard")
        }, 3000)
      } else {
        setError(true)
      }
    }
  })

  return (
    <DefaultLayout title="Confirming Email">
      <Hero
        title={
          confirmed() ? "Your Email Address Has Been Confirmed!" :
            error() ? "Could Not Verify Email" :
              "Confirming Your Email Address..."
        }
        subtitle={
          confirmed() ? "You'll be redirected shortly" :
          error() ? "Either your email address is already verified, or you need to request verification again (the verification link expires after 1 day)." :
          ""
        }
      />
    </DefaultLayout>
  )
}

export default ConfirmEmail