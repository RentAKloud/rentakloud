import { Link } from "@solidjs/router";
import { Component, For } from "solid-js";
import { company } from "~/config/constants";
import TwitterIcon from "./icons/logos/Twitter";
import YoutubeIcon from "./icons/logos/Youtube";
import FacebookIcon from "./icons/logos/Facebook";
import { footer } from "~/config/data";

const Footer: Component = () => {
  return (
    <>
      <footer class="footer p-10 bg-base-200 text-base-content">
        <div>
          <span class="footer-title">Cloud Products</span>
          <For each={footer().cloud}>
            {(p) => (
              <Link href={`/our-products/${p.slug}`} class="link link-hover">
                {p.name}
              </Link>
            )}
          </For>
        </div>
        <div>
          <span class="footer-title">Products</span>
          <For each={footer().hardware}>
            {(p) => (
              <Link href={`/our-products/${p.slug}`} class="link link-hover">
                {p.name}
              </Link>
            )}
          </For>
        </div>
        <div>
          <span class="footer-title">Company</span>
          <Link href="/about" class="link link-hover">
            About us
          </Link>
          <Link href="/support" class="link link-hover">
            Contact
          </Link>
          <Link href="/careers" class="link link-hover">
            Jobs
          </Link>
          <Link href="/payment-methods" class="link link-hover">
            Payment Options
          </Link>
        </div>
        <div>
          <span class="footer-title">Legal</span>
          <Link
            href="/legal/terms-of-service-agreement"
            class="link link-hover"
          >
            Terms of Service
          </Link>
          <Link href="/legal/privacy-policy" class="link link-hover">
            Privacy policy
          </Link>
          <Link href="/legal/cookie-policy" class="link link-hover">
            Cookie policy
          </Link>
          <Link href="/legal/refund-policy" class="link link-hover">
            Refund policy
          </Link>
          <Link href="/legal" class="link link-hover">
            All Legal Documents
          </Link>
        </div>
      </footer>

      <footer class="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <div class="items-center grid-flow-col">
          <img src={company.LOGO_URL} style={{ width: "60px" }} />
          <p>
            {company.LEGAL_NAME} <br />
            Next-gen cloud computing solutions.
          </p>
        </div>
        <div class="md:place-self-center md:justify-self-end">
          <div class="grid grid-flow-col gap-4">
            <a href="https://x.com/rentakloud" target="_blank">
              <TwitterIcon class="fill-current" />
            </a>
            <a href="https://youtube.com/@rentakloud" target="_blank">
              <YoutubeIcon class="fill-current" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61558489845466"
              target="_blank"
            >
              <FacebookIcon class="fill-current" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
