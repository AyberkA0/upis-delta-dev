import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en/common.json'
import trCommon from './locales/tr/common.json'
import ruCommon from './locales/ru/common.json'
import zhCommon from './locales/zh/common.json'
import jaCommon from './locales/ja/common.json'
import koCommon from './locales/ko/common.json'
import deCommon from './locales/de/common.json'
import esCommon from './locales/es/common.json'
import ptCommon from './locales/pt/common.json'
import arCommon from './locales/ar/common.json'

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      tr: { common: trCommon },
      ru: { common: ruCommon },
      zh: { common: zhCommon },
      ja: { common: jaCommon },
      ko: { common: koCommon },
      de: { common: deCommon },
      es: { common: esCommon },
      pt: { common: ptCommon },
      ar: { common: arCommon },
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
