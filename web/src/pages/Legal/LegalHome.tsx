import { Component } from "solid-js";
import DefaultLayout from "../../layouts/DefaultLayout";

const LegalHome: Component = () => {
  return (
    <DefaultLayout>
      <section>
        <h1 class="font-bold text-4xl mb-3">Company Information</h1>

        <p class="mb-5">
          Corporate Headquarters<br />
          1567 E. RentAKloud Way<br />
          Tempe, AZ 85284 USA<br />
        </p>

        <p>
          Phone number: +1 480 463 8811<br />
          Fax number: (480) 624-2546<br />
          Email address: info@rentakloud.com<br />
          Report Abuse<br />
          <br />
          RentAKloud.com, LLC is a wholly-owned subsidiary of RentAKloud Inc.
        </p>
      </section>
    </DefaultLayout>
  )
}

export default LegalHome