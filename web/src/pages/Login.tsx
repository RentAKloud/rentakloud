import { Component, createEffect, createSignal } from "solid-js";
import { Link, useNavigate, useSearchParams } from "@solidjs/router";
import DefaultLayout from "~/layouts/DefaultLayout";
import HeroWithForm from "~/components/Hero/HeroWithForm";
import GithubIcon from "~/components/icons/Github";
import GoogleIcon from "~/components/icons/Google";
import { company, oauth } from "~/config/constants";
import { authStore, login } from "~/stores/auth";
import { NotificationService } from "~/services/NotificationService";

const Login: Component = () => {
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
      await login(formData().email || "", formData().password || "")
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        NotificationService.error("Invalid email or password")
      } else {
        NotificationService.error("Something went wrong. Please contact support or try again later.")
      }
    }
  }

  createEffect(() => {
    const { user } = authStore
    if (user) {
      const [params] = useSearchParams()
      navigate(params.next || "/dashboard")
    }
  })

  return (
    <DefaultLayout>
      <HeroWithForm title="Login now!" subtitle={`Welcome to ${company.DISPLAY_NAME}. Your one-stop shop for everything cloud.`}>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email" placeholder="Email" class="input input-bordered input-primary"
            onInput={(e) => setFormData({ ...formData(), email: e.currentTarget.value })}
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password" placeholder="Password" class="input input-bordered input-primary"
            onInput={(e) => setFormData({ ...formData(), password: e.currentTarget.value })}
          />

          <label class="label">
            <Link href="/forgot-password" class="label-text-alt link link-hover">Forgot password?</Link>
          </label>
        </div>

        <label class="">
          Don't have an account? <Link href={`/register${location.search}`} class="link link-hover">Register now</Link>.
        </label>

        <div class="form-control mt-6">
          <button class="btn btn-primary" onClick={loginHandler}>Login</button>
        </div>

        <div class="divider">or</div>

        <button class="btn btn-ghost border-black gap-2">
          <GoogleIcon classList="w-5" />
          Login
        </button>

        <Link
          href={`https://github.com/login/oauth/authorize?client_id=${oauth.github.CLIENT_ID}`}
          target="_blank" class="btn btn-ghost border-black gap-2"
        >
          <GithubIcon classList="w-7" />
          Login
        </Link>
      </HeroWithForm>
    </DefaultLayout>
  )
}

export default Login