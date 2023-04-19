import { Link, useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";
import HeroWithForm from "../components/Hero/HeroWithForm";
import GithubIcon from "../components/icons/Github";
import GoogleIcon from "../components/icons/Google";
import { company, oauth } from "../config/constants";
import DefaultLayout from "../layouts/DefaultLayout";
import { authStore, register } from "../stores/auth";

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
  const { access_token } = authStore

  function registerHandler() {
    const fd = formData()
    register(fd.email || "", fd.password || "", fd.firstName, fd.lastName)
  }

  createEffect(() => {
    if (access_token) {
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
          <button class="btn btn-primary" onClick={registerHandler}>Register</button>
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