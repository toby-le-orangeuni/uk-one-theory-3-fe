export default defineNuxtPlugin(async () => {
  const { refreshSession, bootstrapped } = useAuth()
  if (!bootstrapped.value) {
    await refreshSession()
  }
})
