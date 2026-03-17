import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// import trCommon from './locales/tr/common.json'
import enCommon from './locales/en/common.json'

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources: {
      // tr: { common: trCommon },
      en: { common: enCommon },
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],  
      caches: ['localStorage'],
    },
  })

export default i18n
