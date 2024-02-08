// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "skool",
      link: [
        // {
        //   rel: "icon",
        //   href: "/logo.svg",
        // },
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
  css: ["~/assets/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
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
  modules: ["@pinia/nuxt", "@element-plus/nuxt", "nuxt-swiper"],
});
