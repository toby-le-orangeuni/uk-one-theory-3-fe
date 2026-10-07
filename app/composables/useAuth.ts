import type { AccessStatus } from '~/types/domain'

export const useAuth = () => {
  const isAuthenticated = useState<boolean>('auth.isAuthenticated', () => false)
  const accessStatus = useState<AccessStatus>('auth.accessStatus', () => 'active')
  const userEmail = useState<string>('auth.email', () => 'ava@example.com')

  const login = (email = 'ava@example.com') => {
    userEmail.value = email
    isAuthenticated.value = true
    if (accessStatus.value === 'pending') {
      accessStatus.value = 'active'
    }
  }

  const logout = () => {
    isAuthenticated.value = false
  }

  const activateMockAccess = () => {
    isAuthenticated.value = true
    accessStatus.value = 'active'
  }

  const expireAccess = () => {
    isAuthenticated.value = true
    accessStatus.value = 'expired'
  }

  return {
    isAuthenticated,
    accessStatus,
    userEmail,
    login,
    logout,
    activateMockAccess,
    expireAccess
  }
}
