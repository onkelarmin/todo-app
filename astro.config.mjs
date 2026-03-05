// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://fm-todo-app-drag-drop.netlify.app/",

  devToolbar: {
    enabled: false,
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },

  adapter: netlify(),

  output: "static",
});
