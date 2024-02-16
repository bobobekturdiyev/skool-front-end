import { createI18n } from "vue-i18n";
import uz from "../locales/uz_uz.json";
import uz_ru from "../locales/uz_ru.json";
import ru from "../locales/ru.json";
import en from "../locales/en.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const locale =
    typeof localStorage !== "undefined" ? localStorage.getItem("lang") : "en";

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: locale,
    messages: {
      uz,
      uz_ru,
      ru,
      en,
    },
  });

  vueApp.use(i18n);
});
