The project is build using [SolidJS](https://solidjs.com), [DaisyUI](https://daisyui.com/) (which is built on top of [TailwindCSS](https://tailwindcss.com/)), and [KobalteUI](https://kobalte.dev/).

## Available Scripts

In the project directory, you can run:

### `yarn dev` or `yarn start`

> Make sure you have the `.env.local` file.

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `yarn run build`

> Make sure you have the `.env.production` file, or the environment variables are defined in your CI/CD settings.

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
