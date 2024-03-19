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
        {
          rel: "stylesheet",
          href: "https://unpkg.com/cropperjs@1.5.12/dist/cropper.min.css",
        },
      ],
      script: [
        {
          src: "https://www.youtube.com/iframe_api",
          async: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js",
        }
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
  plugins: [{ src: "~/plugins/aos", mode: "client", ssr: false }, { src: '~/plugins/vuejs-clipper.js', mode: 'client' }, { src: '~/plugins/laravel-echo.ts', mode: 'client' }],
  imports: {
    autoImport: true,
  },
  css: [
    "~/assets/scss/main.scss",
    "primevue/resources/themes/aura-light-green/theme.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // tiptap: {
  //   prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  // },
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
    "nuxt-primevue",
    // "nuxt-tiptap-editor",
  ],
});
