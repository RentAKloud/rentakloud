import { Component, createSignal } from "solid-js";
import { Link, useNavigate } from "@solidjs/router";
import DefaultLayout from "../layouts/DefaultLayout";
import HeroWithForm from "../components/Hero/HeroWithForm";
import GithubIcon from "../components/icons/Github";
import GoogleIcon from "../components/icons/Google";
import { company, oauth } from "../config/constants";
import { login } from "../stores/auth";

const Login: Component = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = createSignal<{
    email: string|null,
    password: string|null
  }>({
    email: "",
    password: ""
  })

  function loginHandler() {
    login(formData().email || "", formData().password || "")
    navigate("/dashboard")
  }

  return (
    <DefaultLayout>
      <HeroWithForm title="Login now!" subtitle={`Welcome to ${company.DISPLAY_NAME}. Your one-stop shop for everything cloud.`}>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="text" placeholder="Email" class="input input-bordered input-primary"
            onInput={(e) => setFormData({...formData(), email: e.currentTarget.value})}
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            type="text" placeholder="Password" class="input input-bordered input-primary"
            onInput={(e) => setFormData({...formData(), password: e.currentTarget.value})}
          />

          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>

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