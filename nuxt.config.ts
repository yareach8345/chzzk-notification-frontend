export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=IBM+Plex+Sans+KR&display=swap'
        }
      ]
    }
  },
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
