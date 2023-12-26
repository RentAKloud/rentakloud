import { Component } from "solid-js";
import DefaultLayout from "~/layouts/DefaultLayout";
import HeroWithBg from "~/components/Hero/HeroWithBg";

const About: Component = () => {
  return (
    <DefaultLayout>
      <HeroWithBg
        title="About Us"
        subtitle="Your Trusted Partner In Cloud & Data Center Solutions"
        bgUrl="https://unsplash.com/photos/lVZjvw-u9V8/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8c2VydmVyc3xlbnwwfHx8fDE3MDAwMDE1MDl8MA&force=true&w=1920"
        bgFixed
        notFullScreen
      />

      <section class="py-20 px-8 flex flex-col items-center text-xl text-center">
        <p class="max-w-2xl mb-10"><span class="text-5xl">At RentAKloud</span>, we understand that in the rapidly evolving landscape of technology, businesses require robust
          and reliable solutions to support their digital infrastructure. That's why we are dedicated to providing
          high-performance physical servers tailored to meet your unique needs.</p>
      </section>

      <HeroWithBg
        subtitle={`As a leading provider in the server rental industry, RentAKloud is committed to delivering top-notch
        hardware, unmatched service, and a seamless experience for our clients.`}
        bgUrl="https://images.unsplash.com/photo-1530333821974-f9fcfd6718c8?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="h-[40vh]"
        notFullScreen
        bgFixed
      />

      <section class="max-w-2xl m-auto text-center py-20 text-xl">
        <h2 class="text-4xl font-bold mb-4">Our Mission</h2>

        <p class="text-xl">
          Our mission at RentAKloud is simple: empower businesses with the tools they need to thrive in the digital age.
          We believe that a solid foundation is crucial for any online venture, and our physical servers are designed to provide
          the stability, security, and scalability necessary for success. Whether you're a startup, a growing enterprise, or an
          established business, RentAKloud is here to be your reliable partner in server solutions.
        </p>
      </section>

      {/* <section class="py-20 px-10 text-xl max-w-5xl m-auto">
        <h2 class="text-4xl font-bold text-center mb-6">Why Choose RentAKloud?</h2>

        <div class="flex items-center">
          <img class="w-60" src="https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/value-server-512.png" />
          <p>1. Cutting-edge Technology:
            Our servers are equipped with the latest technology to ensure optimal performance. We stay ahead of the curve, so you can too.</p>
        </div>

        <div class="flex items-center flex-row-reverse">
          <img class="w-60" src="https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/value-server-512.png" />
          <p>2. Customization Options:
            We understand that every business is unique. That's why we offer customizable server configurations to meet your specific requirements.</p>
        </div>

        <div class="flex items-center">
          <img class="w-60" src="https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/value-server-512.png" />
          <p>3. Reliability You Can Trust:
          RentAKloud is synonymous with reliability. Our servers undergo rigorous testing to guarantee uptime and performance, giving you peace of mind.</p>
        </div>

        <div class="flex items-center flex-row-reverse">
          <img class="w-60" src="https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/value-server-512.png" />
          <p>4. 24/7 Support:
            Our dedicated support team is available around the clock to assist you. Whether you have a question, need technical support, or want advice on optimizing your server setup, we're here for you.</p>
        </div>

        <div class="flex items-center">
          <img class="w-60" src="https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/value-server-512.png" />
          <p>5. Flexible Rental Plans:
            We offer flexible rental plans to accommodate businesses of all sizes. Whether you need a server for a short-term project or a long-term commitment, we have the right plan for you.</p>
        </div>
      </section> */}

      <HeroWithBg bgUrl="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1920&auto=format&fit=crop" notFullScreen bgFixed>
        <div>
          <h2 class="text-4xl font-bold mb-4">Our Commitment</h2>

          <p class="mb-4 text-xl">At RentAKloud, we are committed to excellence in every aspect of our service. From the quality of our servers to
            the responsiveness of our support team, we strive to exceed your expectations. We believe that your success is our
            success, and we are dedicated to helping you achieve your goals in the ever-evolving digital landscape.</p>

          <p class="mb-8 text-xl">Thank you for considering RentAKloud as your partner in server solutions. We look forward to the opportunity to
            serve you and contribute to the success of your business. If you have any questions or would like to discuss your
            server needs, feel free to contact us – we're here to help.</p>
        </div>
      </HeroWithBg>

      <section class="max-w-5xl m-auto text-center py-20 text-xl">
        <h2 class="text-4xl italic font-bold">Welcome to a new era of cloud & data center solutions!</h2>
      </section>
    </DefaultLayout>
  )
}

export default About