import { Component, createEffect } from "solid-js";
import { Link, useNavigate, useSearchParams } from "@solidjs/router";
import { FormError, createForm } from "@modular-forms/solid";
import DefaultLayout from "~/layouts/DefaultLayout";
import HeroWithForm from "~/components/Hero/HeroWithForm";
import GithubIcon from "~/components/icons/logos/Github";
import GoogleIcon from "~/components/icons/logos/Google";
import { company, oauth } from "~/config/constants";
import { authStore, login } from "~/stores/auth";
import { LoginForm } from "~/types/auth";
import TextInput from "~/components/Inputs/TextInput";

const Login: Component = () => {
  const navigate = useNavigate();

  async function loginHandler(values: LoginForm) {
    const error = await login(values.email, values.password);

    if (error) {
      if (error.message === "Unauthorized") {
        throw new FormError<LoginForm>("Invalid email or password");
      } else {
        throw new FormError(
          "Something went wrong. Please contact support or try again later.",
        );
      }
    }
  }

  createEffect(() => {
    const { user } = authStore;
    if (user) {
      const [params] = useSearchParams();
      navigate(params.next || "/dashboard");
    }
  });

  const [loginForm, { Form, Field }] = createForm<LoginForm>();

  return (
    <DefaultLayout>
      <HeroWithForm
        title="Login now!"
        subtitle={`Welcome to ${company.DISPLAY_NAME}. Your one-stop shop for everything cloud.`}
        inTransit={loginForm.submitting}
        formClass={loginForm.response.message ? "border-error border-2" : ""}
      >
        <Form onSubmit={loginHandler} class="flex flex-col gap-2">
          <div class="text-error">{loginForm.response.message}</div>

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

          <Field name="password">
            {(field, props) => (
              <TextInput
                {...props}
                value={field.value}
                error={field.error}
                type="password"
                label="Password"
                placeholder="********"
                inputClass="input-primary"
                required
              />
            )}
          </Field>

          <label>
            <Link href="/forgot-password" class="label-text link link-hover">
              Forgot password?
            </Link>
          </label>

          <label>
            Don't have an account?{" "}
            <Link href={`/register${location.search}`} class="link link-hover">
              Register now
            </Link>
            .
          </label>

          <div class="form-control mt-6">
            <button
              class="btn btn-primary"
              type="submit"
              disabled={
                !loginForm.dirty || loginForm.invalid || loginForm.submitting
              }
            >
              Login
            </button>
          </div>
        </Form>

        <div class="divider">or</div>

        <button class="btn btn-ghost border-black gap-2">
          <GoogleIcon classList="w-5" />
          Login
        </button>

        <Link
          href={`https://github.com/login/oauth/authorize?client_id=${oauth.github.CLIENT_ID}`}
          target="_blank"
          class="btn btn-ghost border-black gap-2"
        >
          <GithubIcon classList="w-7" />
          Login
        </Link>
      </HeroWithForm>
    </DefaultLayout>
  );
};

export default Login;
