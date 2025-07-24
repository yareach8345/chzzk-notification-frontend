const theme = ref('default')

const _setTheme = (theme: string) => {
  if(theme === 'default') {
    document.documentElement.removeAttribute('data-theme')
  }
  document.documentElement.setAttribute('data-theme', theme)
}

watch(theme, (value) => {
  if(import.meta.client) {
    window.localStorage.setItem('theme', theme.value);
  }

  _setTheme(value)
})

export const getTheme = () => theme

export const loadThemeFromLocalStorage = () => {
  console.log("loadThemeFromLocalStorage")
  const initStyle = window.localStorage.getItem('theme') ?? 'default'
  _setTheme(initStyle)
}