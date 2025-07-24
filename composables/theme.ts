const _theme = ref('default')

const setTheme = (theme: string) => {
  _theme.value = theme

  if(theme === 'default') {
    document.documentElement.removeAttribute('data-theme')
  }
  document.documentElement.setAttribute('data-theme', theme)
}

watch(_theme, (value) => {
  if(import.meta.client) {
    window.localStorage.setItem('theme', _theme.value);
  }

  setTheme(value)
})

export const getTheme = () => _theme

export const loadThemeFromLocalStorage = () => {
  console.log("loadThemeFromLocalStorage")
  const initStyle = window.localStorage.getItem('theme') ?? 'default'
  setTheme(initStyle)
}