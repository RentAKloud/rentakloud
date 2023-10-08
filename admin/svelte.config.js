import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html'
    }),
  },

  preprocess: [vitePreprocess({})],
};

export default config;
