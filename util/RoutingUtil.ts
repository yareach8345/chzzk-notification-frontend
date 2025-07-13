export const navigateToHome = async () => {
  const route = useRoute()

  if(route.name === 'index') {
    window.location.reload()
  } else {
    await navigateTo({ name: 'index' })
  }
}