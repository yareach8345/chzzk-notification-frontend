import { loadThemeFromLocalStorage } from '~/composables/useTheme'

export default defineNuxtPlugin(() => {
  loadThemeFromLocalStorage()
})