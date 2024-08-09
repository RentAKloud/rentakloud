import { Component } from "solid-js";
import DefaultLayout from "../layouts/DefaultLayout";
import { createForm, email, required } from "@modular-forms/solid";
import TextInput from "~/components/Inputs/TextInput";
import { NotificationService } from "~/services/NotificationService";
import Card from "~/components/Card/Card";
import Textarea from "~/components/Inputs/Textarea";
import HeroWithBg from "~/components/Hero/HeroWithBg";
import FacebookIcon from "~/components/icons/logos/Facebook";
import TwitterIcon from "~/components/icons/logos/Twitter";
import YoutubeIcon from "~/components/icons/logos/Youtube";
import PublicApi from "~/api/public";
import { Icon } from "~/components/icons";

type ContactForm = {
  email: string;
  name: string;
  subject: string;
  message: string;
};

const Support: Component<{}> = () => {
  async function submitHandler(values: ContactForm) {
    try {
      await PublicApi.contactForm(values);
      // console.log("sending", values)
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        NotificationService.error("Invalid email or password");
      } else {
        NotificationService.error(
          "Something went wrong. Please contact support or try again later.",
        );
      }
    }
  }

  const [contactForm, { Form, Field }] = createForm<ContactForm>({
    validateOn: "input",
  });

  return (
    <DefaultLayout>
      <HeroWithBg
        title="Help & Support"
        subtitle="Find all the help you need here"
        bgUrl="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920"
        class="h-[40vh]"
        notFullScreen
      />

      <section class="container flex flex-col md:flex-row gap-6 justify-between mt-10 px-10 mb-10">
        <div class="md:w-1/3">
          <h3 class="font-bold text-4xl mb-4">
            Need Help or Have Any Queries?
          </h3>
          <p class="mb-6">
            Feel free to contact us any time using the contact form, or just
            shoot us an email directly.
          </p>

          <div class="flex flex-col gap-4">
            <div class="flex gap-4 items-center">
              <Icon.Mail />
              <a href="mailto:info@rentakloud.com" class="font-bold text-2xl">
                info@rentakloud.com
              </a>
            </div>

            <a
              href="https://www.facebook.com/profile.php?id=61558489845466"
              target="_blank"
            >
              <div class="flex gap-4 items-center">
                <FacebookIcon class="fill-current" />
                <span class="font-bold text-2xl">@RentAKloud</span>
              </div>
            </a>

            <a href="https://x.com/rentakloud" target="_blank">
              <div class="flex gap-4 items-center">
                <TwitterIcon class="fill-current" />
                <span class="font-bold text-2xl">@RentAKloud</span>
              </div>
            </a>

            <a href="https://youtube.com/@rentakloud" target="_blank">
              <div class="flex gap-4 items-center">
                <YoutubeIcon class="fill-current" />
                <span class="font-bold text-2xl">@RentAKloud</span>
              </div>
            </a>
          </div>
        </div>

        <Card title="Contact Us" hasGradientShadow class="md:w-1/2">
          <Form onSubmit={submitHandler} class="flex flex-col gap-2">
            <Field
              name="email"
              validate={[
                required("Please enter your email."),
                email("Please enter a valid email address."),
              ]}
            >
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

            <Field name="name" validate={[required("Please enter your name.")]}>
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="text"
                  label="Name"
                  placeholder="John Doe"
                  inputClass="input-primary"
                  required
                />
              )}
            </Field>

            <Field
              name="subject"
              validate={[required("Please enter a subject.")]}
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="text"
                  label="Subject"
                  placeholder="Subject"
                  inputClass="input-primary"
                  required
                />
              )}
            </Field>

            <Field
              name="message"
              validate={[required("A message is required.")]}
            >
              {(field, props) => (
                <Textarea
                  {...props}
                  value={field.value}
                  error={field.error}
                  label="Message"
                  placeholder="Message body"
                  inputClass="textarea-primary"
                  required
                />
              )}
            </Field>

            <div class="form-control mt-6">
              <button
                class="btn btn-primary"
                type="submit"
                disabled={
                  !contactForm.dirty ||
                  contactForm.invalid ||
                  contactForm.submitting
                }
              >
                Submit
              </button>
            </div>
          </Form>
        </Card>
      </section>
    </DefaultLayout>
  );
};

export default Support;
