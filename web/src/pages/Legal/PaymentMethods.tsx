import { Link } from "@solidjs/router"
import { Component } from "solid-js"
import Accordion from "~/components/Accordion/Accordion"
import Card from "~/components/Card/Card"
import HeroWithBg from "~/components/Hero/HeroWithBg"
import { company } from "~/config/constants"
import DefaultLayout from "~/layouts/DefaultLayout"

const PaymentMethods: Component = () => {
  return (
    <DefaultLayout title="Payment Methods">
      <section>
        <HeroWithBg
          title="Payment Methods"
          subtitle="You can purchase our services & products using a wide range of payment methods."
          bgUrl="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          notFullScreen
        >
        </HeroWithBg>
      </section>

      <section class="pt-16">
        <h2 class="text-4xl font-bold text-center mb-4">Payment Options</h2>
        <p class="text-center mb-10">We accept a variety of credit and debit cards, and e-wallets.</p>

        <div class="flex flex-col gap-5 md:flex-row justify-center mx-20">
          <Card title="Credit & Debit Cards" class="w-96">
            <div class="flex gap-5 flex-wrap mt-6">
              <img src="/images/payment-methods/cards/visa.svg" class="w-16" alt="Visa" />
              <img src="/images/payment-methods/cards/mastercard.svg" class="w-16" alt="MasterCard" />
              <img src="/images/payment-methods/cards/amex.svg" class="w-16" alt="AmEx" />
              <img src="/images/payment-methods/cards/union-pay.svg" class="w-16" alt="UnionPay" />
              <img src="/images/payment-methods/cards/discover.svg" class="w-16" alt="Discover" />
              <img src="/images/payment-methods/cards/jcb.svg" class="w-16" alt="JCB" />
              <img src="/images/payment-methods/cards/maestro.svg" class="w-16" alt="Maestro" />
              <img src="/images/payment-methods/cards/dinersclub.svg" class="w-16" alt="Diners Club" />
            </div>
          </Card>

          <Card title="E-Wallets" class="w-96">
            <div class="flex gap-5 flex-wrap mt-6">
              <img src="/images/payment-methods/e-wallets/paypal.svg" class="w-16" alt="PayPal" />
              <img src="/images/payment-methods/e-wallets/applepay.svg" class="w-16" alt="Apple Pay" />
              <img src="/images/payment-methods/e-wallets/gpay.svg" class="w-16" alt="Google Pay" />
              <img src="/images/payment-methods/e-wallets/alipay.svg" class="w-16" alt="Alipay" />
            </div>
          </Card>

          <Card title="Cryptocurrency" class="w-96">
            <p class="mt-3 text-neutral-500">Not supported yet.</p>
          </Card>
        </div>
      </section>

      <section class="py-16">
        <h2 class="text-4xl font-bold text-center mb-4">Payments FAQ</h2>
        <p class="text-center mb-12">Find answers to frequently asked questions about payment methods.</p>

        <div class="mx-20">
          <Accordion items={[
            {
              heading: "How do you ensure payments are secure?",
              body: "Payment security is our top priority. Encrypted payment details are stored in an external vault separate from our system. The vault has the highest PCI-DSS Level 1 compliance to ensure the highest security standards are met."
            },
            {
              heading: "What is your refund policy?",
              body: <>
                We offer a 30-day money back guarantee. For more information, please view
                our <Link href='/legal/refund-policy' class="link">Refund Policy</Link>.
              </>
            },
            {
              heading: "Having issues making a payment?",
              body: `At ${company.DISPLAY_NAME}, we make sure that all your payments reach us safely. If you’re having issues making a payment, you may contact us at support@rentakloud.com`
            }
          ]} />
        </div>
      </section>
    </DefaultLayout>
  )
}

export default PaymentMethods