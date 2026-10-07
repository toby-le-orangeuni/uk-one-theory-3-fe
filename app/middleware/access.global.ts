export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, accessStatus } = useAuth()

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

  if (isProtected && !isAuthenticated.value) {
    return navigateTo({ path: '/login', query: { returnTo: to.fullPath } })
  }

  if (needsActiveAccess && accessStatus.value === 'expired') {
    return navigateTo({ path: '/account', query: { state: 'expired' } })
  }

  if (to.path === '/login' && isAuthenticated.value) {
    return navigateTo(accessStatus.value === 'expired' ? '/account' : '/dashboard')
  }
})
