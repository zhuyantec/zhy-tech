/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'zh', // default locale
    locales: ['zh', 'en'], // supported locales
    localeDetection: false, // optional: disable browser language detection
  },
  // localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  // reloadOnPrerender: process.env.NODE_ENV === 'development', //optional: reload on prerender
  // debug: process.env.NODE_ENV === 'development', // optional: enable debug mode
}; 