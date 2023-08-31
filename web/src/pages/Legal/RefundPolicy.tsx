import { Component } from "solid-js";
import { Link } from "@solidjs/router";
import DefaultLayout from "~/layouts/DefaultLayout";
import { company } from "~/config/constants";

const RefundPolicy: Component = () => {
  return (
    <DefaultLayout title="Refund Policy">
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
        #document ul {
          list-style: disc;
          padding-left: 2.25rem;
          margin-bottom: 1.25rem;
        }
        `}
      </style>

      <section class="flex flex-col h-96 place-content-center">
        <h1 class="text-5xl text-center mb-4">Refund Policy</h1>
        <p class="text-center">Please read this agreement carefully, as it contains important information regarding your legal rights and remedies.</p>
      </section>

      <div class="flex m-10">
        <aside class="w-96 hidden lg:block">
          Sidebar
        </aside>

        <section class="mx-10 w-fit">
          <div id="document">
            <div class="p-20">
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

            <p class="text-h-gray pt-30">
              Last Revised: 2023-06-25 14:53:15
            </p>

            <div class="document-content">
              <h3>
                <strong>STANDARD REFUND TERMS</strong>
              </h3>
              <p>
                Products purchased from {company.DISPLAY_NAME} may be refunded only if
                canceled within 30 days of the date of the transaction.
              </p>
              <p>
                Note: Due to their nature, cryptocurrencies, tokens and digital
                assets are generally irreversible and their exchange rates are
                highly volatile and transitory. We can not be responsible for
                any risk including but not limited to exchange rate risk and
                market risk.&nbsp;
                <strong>
                  Products purchased using cryptocurrencies, tokens or digital
                  assets will not be refunded.
                </strong>
              </p>
              <p>
                <strong>“Date of the transaction,”</strong>&nbsp;for the purpose
                of this Refund Policy, means the date of purchase of any product
                or service, which includes the date any renewal is processed by {company.DISPLAY_NAME} in
                accordance with the terms and conditions of the
                applicable product or service agreement (
                <Link href="https://www.rentakloud.com/legal/terms-of-use-agreement">
                  Terms of Use
                </Link>
                ). You may cancel a product at any time, but a refund will only
                be issued if cancellation is requested within the refund
                timeframe specified for the applicable product, if available at
                all. Note: Some products have different policies or requirements
                for a refund associated with them, including some products that
                are not eligible for a refund under any circumstance. Please see
                below for refund terms applicable to such products:
              </p>

              <h3>
                <strong>
                  PRODUCTS AVAILABLE FOR REFUND UNDER STANDARD TERMS
                </strong>
              </h3>
              <ul>
                <li>
                  Hosting (all plans, except first payment after Free Trial)
                </li>
                <li>SSL Certificates</li>
                <li>Daily Backups</li>
                <li>CloudFlare</li>
                <li>{company.DISPLAY_NAME} Email</li>
                <li>Titan Email</li>
                <li>Priority Support</li>
                <li>NordVPN 6 and 12-month plans</li>
                <li>Windows VPS</li>
                <li>Minecraft VPS</li>
                <li>Linux VPS</li>
              </ul>

              <h3>
                <strong>PRODUCTS NOT AVAILABLE FOR REFUNDS</strong>
              </h3>
              <ul>
                <li>Redemption Fees</li>
                <li>Domain Name Renewals</li>
                <li>Domain Name Transfers (if the transfer is successful)</li>
                <li>Privacy Protection</li>
                <li>SEO Toolkit</li>
                <li>SEO Marketing Panel</li>
                <li>Google Workspace Email</li>
                <li>VPS License</li>
              </ul>
              <p>
                Any products or services that were suspended, canceled, or
                terminated due to the abusive usage of the products, services,
                or any other violation of the Terms and Conditions are not
                eligible for a refund.
              </p>
              <p>
                The purpose of the refund is for customers to try and understand
                whether the services provided by {company.DISPLAY_NAME} suit their needs. In
                any way, {company.DISPLAY_NAME} will not tolerate abusive usage of refunds
                (i.e., refunding the same services multiple times and (or)
                repetitively purchasing and asking for a refund for services
                purchased in bulk, etc.). {company.DISPLAY_NAME} remains a right to
                unilaterally decline the request for a refund if any of the
                signs related to the abusage of the refunds occur.
              </p>

              <h3>
                <strong>PRODUCTS WITH SPECIAL REFUND TERMS</strong>
              </h3>
              <p>
                <strong>New Domain Name Registrations:</strong> Refundable if
                canceled and processed within four days of registration (96
                hours),<strong>&nbsp;</strong>except .br (including .com.br and
                .net.br) domain.
              </p>
              <p>
                .br (including .com.br and .net.br) domain registration is
                refundable if canceled and processed within seven days of
                registration.
              </p>
              <p>
                <strong>Domain Name Transfers:</strong> Refundable only if the
                transfer is unsuccessful and (a) within four days of
                registration (96 hours) or (b) in case of .br (including .com.br
                and .net.br) domain, within seven days of registration
              </p>
              <p>
                The following ccTLD registries DO NOT permit refunds upon
                cancellation:
              </p>
              <ul>
                <li>.be</li>
                <li>.ca</li>
                <li>.ch</li>
                <li>.cz</li>
                <li>.dk</li>
                <li>.es (including .com.es, .nom.es, and .org.es)</li>
                <li>.eu</li>
                <li>.fr</li>
                <li>.hu</li>
                <li>.it</li>
                <li>.nl</li>
                <li>.nu</li>
                <li>.ru (including .com.ru, .net.ru, and .org.ru)</li>
                <li>.se</li>
                <li>.cat</li>
                <li>.asia</li>
                <li>.de</li>
                <li>.uk (including .co.uk, .org.uk, .me.uk)</li>
                <li>.eu</li>
                <li>.in</li>
                <li>.us</li>
                <li>.pl</li>
                <li>.se</li>
                <li>.pw</li>
                <li>.co.in</li>
                <li>.ag</li>
                <li>.xxx</li>
                <li>.vc</li>
                <li>.tf</li>
                <li>.re</li>
                <li>.pm</li>
                <li>.net.mx</li>
                <li>.mn</li>
                <li>.lv</li>
                <li>.lt</li>
                <li>.lc</li>
                <li>.jp.net</li>
                <li>.in.net</li>
                <li>.frl</li>
                <li>.dk</li>
                <li>.com.se</li>
                <li>.com.pl</li>
                <li>.com.de</li>
                <li>.cl</li>
                <li>.bz</li>
                <li>.at</li>
                <li>.am</li>
                <li>.ae.org</li>
                <li>.yt</li>
                <li>.wf</li>
                <li>.tv</li>
                <li>.sc</li>
                <li>.pt</li>
                <li>.net.pl</li>
                <li>.mx</li>
                <li>.lu</li>
                <li>.li</li>
                <li>.la</li>
                <li>.info.pl</li>
                <li>.gr.com</li>
                <li>.fm</li>
                <li>.cx</li>
                <li>.com.pt</li>
                <li>.com.mx</li>
                <li>.cn.com</li>
                <li>.cc</li>
                <li>.biz.pl</li>
                <li>.ar.com</li>
                <li>.com.au</li>
              </ul>
              <p>
                <strong>REFUNDS FOR SPECIAL DEALS</strong>
              </p>
              <p>
                From time to time, {company.DISPLAY_NAME.toUpperCase()} offers special&nbsp;deals such as a
                free domain when buying 12/24/48 months hosting plan. Keeping in
                mind that there are different conditions for domain refunds (as
                described in this Refund Policy), {company.DISPLAY_NAME} remains the right to
                refund you a difference between your paid amount and the domain
                you received for free price. In such a case, you can keep using
                a domain name for the remaining billing period term.
              </p>
              <p>
                <strong>PAYMENT METHODS WITH SPECIAL REFUND TERMS:</strong>
              </p>
              <p>
                Please note that all payment processors have different policies
                and requirements for refunds&nbsp;and there are some payment
                methods that are not eligible for a refund under any
                circumstance.&nbsp;
              </p>
              <p>
                Please be informed that products purchased using these payment
                methods can not be refunded to the original payment source:
              </p>
              <ul>
                <li>Multibanco&nbsp;(Portugal)</li>
              </ul>
              <p>
                However, we can offer refunds to your {company.DISPLAY_NAME} Balance and/or
                to PayPal in case when you provide a valid PayPal account that
                belongs to you.&nbsp;
                <br />
                <br />
                The following payment method supports full refunds only:
              </p>
              <ul>
                <li>VTC Pay (Vietnam)</li>
              </ul>
              <h3>
                <strong>REFUNDS FROM BALANCE</strong>
              </h3>
              <p>
                Over-funded balance can be refunded within 30 days of the
                payment that resulted in the over-funding. In special cases,
                other payments can be refunded instead of the original payment
                if the 30-day time-frame can be applied to those payments.
              </p>
              <h3>
                <strong>CHARGEBACKS</strong>
              </h3>
              <p>
                If at any time, we record a decline, chargeback, reversal,
                payment dispute, risk of payment fraud or other rejection of a
                charge of any payable fees on your {company.DISPLAY_NAME} account (“
                <strong>Chargeback</strong>”), this will be considered as a
                breach of your payment obligations hereunder, therefore you
                agree that {company.DISPLAY_NAME} may pursue all available lawful remedies in
                order to obtain payment, including but not limited to, immediate
                termination, without notice to you, of your {company.DISPLAY_NAME} account
                and any domain names or {company.DISPLAY_NAME} services registered or renewed
                on your behalf (“<strong>Services</strong>”). In addition, this
                will also result in disabling the option to checkout with a
                credit card for your {company.DISPLAY_NAME} account to limit the risk of
                payment fraud.
              </p>
              <p>
                In the event a Chargeback is performed, your {company.DISPLAY_NAME} account
                may be blocked without the option to re-purchase or re-use it,
                and any data contained in such a {company.DISPLAY_NAME} account, including
                any certain content, features, or capacity of your {company.DISPLAY_NAME} account
                may be subject to cancellation and loss of data.&nbsp;
              </p>
              <p>
                Your use of the {company.DISPLAY_NAME} Services and the ability to checkout
                using credit card will not resume until you:
              </p>
              <ul>
                <li>
                  <p>
                    verify the payment method used for the disputed transaction,
                    either by providing:&nbsp;
                  </p>
                </li>
              </ul>
              <ul>
                <li>
                  <p>proof of the payment; or&nbsp;</p>
                </li>
                <li>
                  <p>
                    a simple censored photo of the credit card, with uncovered
                    first 6 (six) and last 4 (four)&nbsp; digits.&nbsp;
                  </p>
                </li>
              </ul>
              <ul>
                <li>
                  <p>
                    pay any applicable fees in full, including any fees and
                    expenses incurred by {company.DISPLAY_NAME} and/or any third party
                    services for each Chargeback received (including fees for {company.DISPLAY_NAME} Services
                    provided prior to the Chargeback, handling and processing charges and fees incurred by the
                    payment processor).
                  </p>
                </li>
              </ul>
              <p>
                Cases related to criminal fraud chargebacks or obvious payment
                fraud (i.e. cases where compromised credit card details were
                used to make purchases) will result in permanent service
                termination without any option to recover.
              </p>
              <p>
                If you have any questions or concerns regarding a payment made
                to {company.DISPLAY_NAME}, we encourage you to first contact our Customer
                Support team before filing a Chargeback or reversal of payment,
                in order to prevent the {company.DISPLAY_NAME} Services from being canceled
                and your {company.DISPLAY_NAME} account being blocked, and to avoid the
                filing of an unwarranted or erroneous Chargeback, which may
                result in your being liable for its applicable fees, in addition
                to re-payment of all the fees applicable to the {company.DISPLAY_NAME} Services
                purchased (and charged-back) by you.
              </p>
              <p>
                We reserve our right to dispute any Chargeback received,
                including by providing the relevant credit card company or
                financial institution with any information and documentation
                proving that the User responsible for such Chargeback did in
                fact authorize the transaction and make use of the Services
                rendered thereafter.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default RefundPolicy;
