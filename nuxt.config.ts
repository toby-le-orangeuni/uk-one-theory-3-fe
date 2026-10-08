// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://103.199.19.184:8000',
      // Remote API only exposes simulate-payment while DEBUG is on.
      useCheckoutSimulation: process.env.NUXT_PUBLIC_USE_CHECKOUT_SIMULATION === 'true'
    }
  },
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
