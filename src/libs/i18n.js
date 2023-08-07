import { createI18n } from 'vue-i18n'
const { language } = kintone.getLoginUser()

import zh from '@/locales/zh.json'
import ja from '@/locales/ja.json'
import en from '@/locales/en.json'

const i18n = createI18n({
  // fallbackLocale: 'zh', //预设语言环境
  // globalInjection: true,
  // legacy: false, // you must specify 'legacy: false' option
  locale: language, //默认显示的语言
  messages: {
    zh,
    ja,
    en,
  },
})

export default i18n
