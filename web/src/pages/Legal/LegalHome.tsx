import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import { company } from "~/config/constants";
import DefaultLayout from "~/layouts/DefaultLayout";

const LegalHome: Component = () => {
  return (
    <DefaultLayout title="Legal Agreements & Policies">
      <section class="px-20 py-20">
        <h1 class="text-4xl font-bold mb-3">{company.DISPLAY_NAME} Legal Agreements & Policies</h1>
        <p>
          This page contains links to current corporate policies, agreements for the products and services
          available through {company.DISPLAY_NAME}, and notices for employees, candidates, and applicants.
          To view any of the documents presented on this page, click on the policy/agreement.
        </p>
      </section>

      <section class="px-20 flex flex-col md:flex-row gap-10">
        <div>
          <h1 class="text-4xl font-bold mb-3">Company Information</h1>

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
        </div>

        <div>
          <h1 class="text-4xl font-bold mb-3">Legal Documents</h1>
          
          <ul class="list-disc pl-8">
            <li><Link class="link-hover" href="/legal/terms-of-service-agreement">Terms of Service</Link></li>
            <li><Link class="link-hover" href="/legal/privacy-policy">Privacy Policy</Link></li>
            <li><Link class="link-hover" href="/legal/refund-policy">Refund Policy</Link></li>
            <li><Link class="link-hover" href="/legal/delivery-policy">Delivery Policy</Link></li>
            <li><Link class="link-hover" href="/legal/cookie-policy">Cookie Policy</Link></li>
          </ul>
        </div>
      </section>
    </DefaultLayout>
  )
}

export default LegalHome