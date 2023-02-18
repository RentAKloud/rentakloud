import { Component } from "solid-js";
import HeroWithForm from "../components/Hero/HeroWithForm";
import { company } from "../config/constants";
import DefaultLayout from "../layouts/DefaultLayout";

const Login: Component = () => {
  return (
    <DefaultLayout>
      <HeroWithForm title="Login now!" subtitle={`Welcome to ${company.DISPLAY_NAME}. Your one-stop shop for everything cloud.`}>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="text" placeholder="Email" class="input input-bordered input-primary" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="text" placeholder="Password" class="input input-bordered input-primary" />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary">Login</button>
        </div>
      </HeroWithForm>
    </DefaultLayout>
  )
}

export default Login