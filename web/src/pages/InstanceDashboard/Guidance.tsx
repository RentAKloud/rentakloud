import { Component } from "solid-js"

const Guidance: Component<{}> = () => {
  return (
    <>
      <section class="mb-6">
        <h2 class="text-4xl font-bold mb-4">Guidance</h2>
        <p class="mb-2">Need help getting started with your new instace? Look no further.</p>
      </section>

      <section class="mb-6">
        <h3 class="text-2xl font-bold mb-2">How Do I Log In?</h3>
        <p class="mb-2">Check your email, that you registered your account with, for login credentials.</p>
        <p class="">It is recommended that you change your username and password as soon as possible.</p>
      </section>

      <section class="mb-6">
        <h3 class="text-2xl font-bold mb-2">Enable SSH In Windows</h3>
        <p class="mb-2">Windows, by default, does not comes with a SSH server installed. However, you can
          always enable it or install any SSH server of your choice. To enable it, follow these steps:</p>
        <ol class="list-decimal pl-4 mb-4">
          <li>Search for "features" in the start menu.</li>
          <li>Select "Manage optional features" from the search results.</li>
          <li>Click on the "Add a feature" button, right below the "Optional features" heading.</li>
          <li>Search for "ssh".</li>
          <li>Check "OpenSSH Server", then click the "Install" button.</li>
        </ol>

        <p class="mb-4">Next you need to start the SSH server, and optionally set it to always start at Windows startup.</p>

        <ol class="list-decimal pl-4 mb-4">
          <li>Search for "services" in the start menu.</li>
          <li>Scroll down until you find "OpenSSH server".</li>
          <li>Right-click it, and select "Properties".</li>
          <li>Set "Startup type" to "Automatic". Click on the "Apply" button.</li>
          <li>Click on the "Start" button.</li>
        </ol>

        <p>Now you should have a SSH server running, which will always launch everytime Windows starts up.</p>
      </section>
    </>
  )
}

export default Guidance