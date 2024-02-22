// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "skool",
      link: [
        {
          rel: "icon",
          href: "/icon.svg",
        },
      ],
      script: [
        {
          src: "https://www.youtube.com/iframe_api",
          async: true,
        },
      ],
      meta: [
        // {
        //   name: "theme-color",
        //   content: "#5C0099",
        // },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  plugins: [{ src: "~/plugins/aos", mode: "client", ssr: false }],
  imports: {
    autoImport: true,
  },
  css: ["~/assets/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  // router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       name: '404',
  //       path: '*',
  //       component: resolve(__dirname, 'layouts/error.vue')
  //     })
  //   }
  // },
  modules: [
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "nuxt-swiper",
    "nuxt-tiptap-editor",
  ],
});
