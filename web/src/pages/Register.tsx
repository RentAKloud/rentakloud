import { Link, useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";
import HeroWithForm from "../components/Hero/HeroWithForm";
import GithubIcon from "../components/icons/Github";
import GoogleIcon from "../components/icons/Google";
import { company, oauth } from "../config/constants";
import DefaultLayout from "../layouts/DefaultLayout";
import { authStore, register } from "../stores/auth";
import { NotificationService } from "../services/NotificationService";

const Register: Component = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = createSignal<{
    email: string | null,
    password: string | null,
    firstName: string,
    lastName: string
  }>({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  })
  const [inTransit, setInTransit] = createSignal(false)

  async function registerHandler() {
    try {
      setInTransit(true)
      const fd = formData()
      await register(fd.email || "", fd.password || "", fd.firstName, fd.lastName)
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        NotificationService.error("Invalid email or password")
      } else {
        NotificationService.error("Something went wrong. Please contact support or try again later.")
      }
    } finally {
      setInTransit(false)
    }
  }

  createEffect(() => {
    const { user } = authStore

    if (user) {
      navigate("/dashboard")
    }
  })

  return (
    <DefaultLayout>
      <HeroWithForm title="Register a New Account" subtitle={`Welcome to ${company.DISPLAY_NAME}. Your one-stop shop for everything cloud.`}>
        <div class="form-control">
          <label class="label">
            <span class="label-text">First Name</span>
          </label>
          <input
            type="text" placeholder="First Name" class="input input-bordered input-primary"
            onInput={(e) => setFormData({ ...formData(), firstName: e.currentTarget.value })}
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Last Name</span>
          </label>
          <input
            type="text" placeholder="Last Name" class="input input-bordered input-primary"
            onInput={(e) => setFormData({ ...formData(), lastName: e.currentTarget.value })}
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email" placeholder="Email" class="input input-bordered input-primary"
            onInput={(e) => setFormData({ ...formData(), email: e.currentTarget.value })}
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password" placeholder="Password" class="input input-bordered input-primary"
            onInput={(e) => setFormData({ ...formData(), password: e.currentTarget.value })}
            required
          />

          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>

        <div class="form-control mt-6">
          <button class="btn btn-primary" disabled={inTransit()} onClick={registerHandler}>Register</button>
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
          Register
        </Link>
      </HeroWithForm>
    </DefaultLayout>
  )
}

export default Register