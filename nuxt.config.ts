export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
    public: {
      BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
    }
  }
})
