import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import DefaultLayout from "~/layouts/DefaultLayout";
import HeroWithForm from "~/components/Hero/HeroWithForm";
import { NotificationService } from "~/services/NotificationService";

const ForgotPassword: Component = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = createSignal<{
    email: string | null,
    password: string | null
  }>({
    email: "",
    password: ""
  })

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
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email" placeholder="Email" class="input input-bordered input-primary"
            onInput={(e) => setFormData({ ...formData(), email: e.currentTarget.value })}
          />
        </div>

        <div class="form-control mt-6">
          <button class="btn btn-primary" onClick={loginHandler}>Reset</button>
        </div>
      </HeroWithForm>
    </DefaultLayout>
  )
}

export default ForgotPassword