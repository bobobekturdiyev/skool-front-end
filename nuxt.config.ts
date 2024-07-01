// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
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
        },
        {
          src: "https://connect.facebook.net/en_US/fbevents.js",
          async: true,
        },
        {
          innerHTML: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${process.env.FACEBOOK_PIXEL_ID});
            fbq('track', 'PageView');
          `,
          type: "text/javascript",
        },
      ],
      meta: [
        {
          name: "theme-color",
          content: "#F0F5FA",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
  plugins: [
    { src: "~/plugins/aos", mode: "client", ssr: false },
    { src: "~/plugins/vuejs-clipper.js", mode: "client" },
    { src: "~/plugins/laravel-echo.ts", mode: "client" },
    { src: "~/plugins/vue-paginate-scroll.js", mode: "client" },
    {src: "~/plugins/giphy.js", mode: "client"},
  ],
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
  modules: [
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "nuxt-swiper",
    "nuxt-primevue",
    // "nuxt-facebook-pixel-module",
    // "nuxt-tiptap-editor",
    // [
    //   "nuxt-facebook-pixel-module",
    //   {
    //     /* module options */
    //     pixelId: process.env.FACEBOOK_PIXEL_ID,
    //   },
    // ],
  ],
  // facebook: {
  //   pixelId: process.env.FACEBOOK_PIXEL_ID,
  //   autoPageView: true,
  // },
});
