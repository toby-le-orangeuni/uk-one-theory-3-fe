export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, accessStatus, refreshSession, bootstrapped } = useAuth()

  if (!bootstrapped.value && import.meta.client) {
    await refreshSession()
  }

  const protectedRoutes = [
    '/dashboard',
    '/account',
    '/course',
    '/practice',
    '/mock-exams',
    '/results',
    '/progress'
  ]
  const activeAccessRoutes = ['/course', '/practice', '/mock-exams']
  const isProtected = protectedRoutes.some((route) => to.path === route || to.path.startsWith(`${route}/`))
  const needsActiveAccess = activeAccessRoutes.some((route) => to.path === route || to.path.startsWith(`${route}/`))

  if (to.path === '/checkout' && !to.query.plan) {
    return navigateTo('/plans')
  }

  if (to.path === '/checkout' && !isAuthenticated.value) {
    return navigateTo({
      path: '/login',
      query: { returnTo: to.fullPath }
    })
  }

  if (isProtected && !isAuthenticated.value) {
    return navigateTo({ path: '/login', query: { returnTo: to.fullPath } })
  }

  if (needsActiveAccess && accessStatus.value === 'expired') {
    return navigateTo({ path: '/account', query: { state: 'expired' } })
  }

  if ((to.path === '/login' || to.path === '/register') && isAuthenticated.value) {
    return navigateTo(accessStatus.value === 'expired' ? '/account' : '/dashboard')
  }
})
