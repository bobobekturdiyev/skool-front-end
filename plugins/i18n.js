import { createI18n } from 'vue-i18n'
import uz from '../locales/uz.json'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'uz',
    messages: {
      uz, ru, en
    }
  })

  vueApp.use(i18n)
})