// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'UK One Theory',
      meta: [
        {
          name: 'description',
          content: 'Mock frontend for a UK driving theory learning platform.'
        }
      ]
    }
  },
  experimental: {
    typedPages: true
  }
})
