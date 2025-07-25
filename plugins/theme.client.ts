import { loadThemeFromLocalStorage } from '~/composables/theme'

export default defineNuxtPlugin(() => {
  loadThemeFromLocalStorage()
})