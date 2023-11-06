import { Link, useNavigate, useSearchParams } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";
import HeroWithForm from "~/components/Hero/HeroWithForm";
import TextInput from "~/components/Inputs/TextInput";
import GithubIcon from "~/components/icons/Github";
import GoogleIcon from "~/components/icons/Google";
import { company, oauth } from "~/config/constants";
import DefaultLayout from "~/layouts/DefaultLayout";
import { authStore, register } from "~/stores/auth";

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
  const [errors, setErrors] = createSignal({ email: "", password: '' })

  async function registerHandler() {
    setInTransit(true)
    setErrors({ email: "", password: "" })

    const fd = formData()
    const errs = await register(fd.email || "", fd.password || "", fd.firstName, fd.lastName)

    if (errs) {
      for (let message of errs.message) {
        if (message.includes("email")) setErrors({ ...errors(), email: "Invalid email address" })
        if (message.includes("password")) setErrors({
          ...errors(),
          password: "Password must include 8 characters, alphanumberic, mixed-case characters, and a special character"
        })
      }
    }

    setInTransit(false)
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
      <HeroWithForm title="Register a New Account" subtitle={`Welcome to ${company.DISPLAY_NAME}. Your one-stop shop for everything cloud.`}>
        <div classList={{ "animate-pulse": inTransit() }}>
          <TextInput
            label="First Name"
            value={formData().firstName}
            placeholder="First Name"
            inputClass="input-primary"
            onInput={(e) => setFormData({ ...formData(), firstName: e.currentTarget.value })}
          />

          <TextInput
            label="Last Name"
            value={formData().lastName}
            placeholder="Last Name"
            inputClass="input-primary"
            onInput={(e) => setFormData({ ...formData(), lastName: e.currentTarget.value })}
          />

          <TextInput
            label="Email"
            type="email"
            value={formData().email || ''}
            placeholder="Email"
            inputClass="input-primary"
            onInput={(e) => setFormData({ ...formData(), email: e.currentTarget.value })}
            error={errors().email}
          />

          <TextInput
            label="Password"
            type="password"
            value={formData().password || ''}
            placeholder="Password"
            inputClass="input-primary"
            onInput={(e) => setFormData({ ...formData(), password: e.currentTarget.value })}
            error={errors().password}
          />

          <label class="label">
            <Link href={`/login${location.search}`} class="label-text-alt link link-hover">Already have an account?</Link>
          </label>

          <label class="label-text">
            By continuing, you agree to {company.DISPLAY_NAME}'s <Link href="/legal/terms-of-service-agreement" class="link">Terms of Service</Link> and <Link href="/legal/privacy-policy" class="link">Privacy Policy</Link>.
          </label>

          <div class="form-control mt-6">
            <button class="btn btn-primary" disabled={inTransit()} onClick={registerHandler}>Register</button>
          </div>

          <div class="divider">or</div>

          <div class="flex flex-col gap-4">
            <button class="btn btn-ghost border-black gap-2 flex-1">
              <GoogleIcon classList="w-5" />
              Register
            </button>

            <Link
              href={`https://github.com/login/oauth/authorize?client_id=${oauth.github.CLIENT_ID}`}
              target="_blank" class="btn btn-ghost border-black gap-2 flex-1"
            >
              <GithubIcon classList="w-7" />
              Register
            </Link>
          </div>
        </div>
      </HeroWithForm>
    </DefaultLayout>
  )
}

export default Register