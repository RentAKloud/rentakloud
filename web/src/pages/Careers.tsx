import { Component } from "solid-js";
import DefaultLayout from "../layouts/DefaultLayout";
import { createForm } from "@modular-forms/solid";
import TextInput from "~/components/Inputs/TextInput";
import { NotificationService } from "~/services/NotificationService";
import Card from "~/components/Card/Card";
import Textarea from "~/components/Inputs/Textarea";
import HeroWithBg from "~/components/Hero/HeroWithBg";
import { Icon } from "~/components/icons";

type ContactForm = {
  email: string;
  name: string;
  subject: string;
  body: string;
};

const Careers: Component<{}> = () => {
  async function submitHandler(values: ContactForm) {
    try {
      // await login(values.email, values.name)
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        NotificationService.error("Invalid email or password");
      } else {
        NotificationService.error(
          "Something went wrong. Please contact Careers or try again later.",
        );
      }
    }
  }

  const [contactForm, { Form, Field }] = createForm<ContactForm>();

  return (
    <DefaultLayout>
      <HeroWithBg
        title="Careers"
        subtitle="Find your dream job. Join the RentAKloud family."
        bgUrl="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920"
        class="h-[40vh]"
        notFullScreen
      />

      <section class="container flex flex-col md:flex-row gap-6 justify-between mt-10 px-10 mb-10">
        <div class="md:w-1/3">
          <h3 class="font-bold text-4xl mb-4">No Available Positions</h3>
          <p class="mb-6">
            Unfortunately, we do not have any open jobs right. Please check back
            later to see if we have any.
          </p>
          <p class="mb-6">
            Or just send us your resume, who knows what fate has in store for
            you :)
          </p>

          <div class="flex gap-4 items-center">
            <Icon.Mail />
            <a href="mailto:info@rentakloud.com" class="font-bold text-2xl">
              careers@rentakloud.com
            </a>
          </div>
        </div>

        <Card title="Apply Now" hasGradientShadow class="md:w-1/2">
          <Form onSubmit={submitHandler} class="flex flex-col gap-2">
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

            <Field name="name">
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

            <Field name="subject">
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

            <Field name="body">
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

export default Careers;
