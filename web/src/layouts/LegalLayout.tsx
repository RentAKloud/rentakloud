import { Component } from "solid-js";
import { LayoutProps } from "~/types/ui";
import DefaultLayout from "./DefaultLayout";
import { Link } from "@solidjs/router";

const LegalLayout: Component<LayoutProps & {
  revisionDateTime: string
  heading?: string
}> = (props) => {
  return (
    <DefaultLayout title={props.title}>
      <style>
        {`
        #document h3 {
          margin-bottom: 1.0rem;
          margin-top: 2.25rem;
          font-size: 1.5rem;
          line-height: 2rem;
        }
        #document p {
          margin-bottom: 1.25rem;
        }
        #document a {
          text-decoration: underline;
        }
        #document ul, #document ol {
          padding-left: 2.25rem;
          margin-bottom: 1.25rem;
        }
        #document ul {
          list-style: disc;
        }
        #document ol {
          list-style: decimal;
        }
        #document table {
          margin-bottom: 1.25rem;
        }
        `}
      </style>

      <section class="flex flex-col h-96 place-content-center">
        <h1 class="text-5xl text-center mb-4">{props.heading || props.title}</h1>
        <p class="text-center px-6">Please read this agreement carefully, as it contains important information regarding your legal rights and remedies.</p>
      </section>

      <div class="flex m-10">
        <aside class="w-96 hidden lg:block">
          <div class="card card-body bg-base-100">

          <ul class="mb-6">
            <li><Link href="/legal">Legal Directory</Link></li>
            <li><Link href="/legal/terms-of-service-agreement" class="link link-hover [&.active]:text-indigo-500">Terms of Service</Link></li>
            <li><Link href="/legal/privacy-policy" class="link link-hover [&.active]:text-indigo-500">Privacy Policy</Link></li>
          </ul>

          <h2 class="font-bold">Other Policies</h2>
          <ul>
            {/* <li><Link href="/legal/privacy-policy" class="link link-hover [&.active]:text-indigo-500">Privacy Policy</Link></li> */}
            <li><Link href="/legal/cookie-policy" class="link link-hover [&.active]:text-indigo-500">Cookie Policy</Link></li>
            <li><Link href="/legal/delivery-policy" class="link link-hover [&.active]:text-indigo-500">Delivery/Shipping Policy</Link></li>
            <li><Link href="/legal/refund-policy" class="link link-hover [&.active]:text-indigo-500">Refund Policy</Link></li>
          </ul>
          </div>
        </aside>

        <section class="md:mx-10 w-fit">
          <div id="document">
            <div class="p-4">
              <p class="alert alert-info">
                The English version of legal agreements and policies is
                considered as the only current and valid version of this
                document. Any translated version is provided for your
                convenience only, to facilitate reading and understanding of the
                English version. Any translated versions are not legally binding
                and cannot replace the English versions. In the event of
                disagreement or conflict, the English language legal agreements
                and policies shall prevail.
              </p>
            </div>

            <p class="text-neutral-500 pt-30">
              Last Revised: <time>{props.revisionDateTime}</time>
            </p>

            <div class="prose">
              {props.children}
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  )
}

export default LegalLayout