import type { AccessStatus } from '~/types/domain'
import { clearTokens, getAccessToken, setTokens } from '~/services/apiClient'
import { mapAccessStatus } from '~/services/mappers'
import { useRealApi } from '~/services/realApi'

export const useAuth = () => {
  const isAuthenticated = useState<boolean>('auth.isAuthenticated', () => Boolean(getAccessToken()))
  const accessStatus = useState<AccessStatus>('auth.accessStatus', () => 'pending')
  const userEmail = useState<string>('auth.email', () => '')
  const bootstrapped = useState<boolean>('auth.bootstrapped', () => false)

  const api = useRealApi()

  const applyAccess = (hasActive: boolean, expiresAt?: string | null) => {
    accessStatus.value = mapAccessStatus({
      features: [],
      has_active_subscription: hasActive,
      expires_at: expiresAt ?? null
    })
  }

  const refreshSession = async () => {
    if (!getAccessToken()) {
      isAuthenticated.value = false
      accessStatus.value = 'pending'
      userEmail.value = ''
      bootstrapped.value = true
      return false
    }

    try {
      const { profile, access } = await api.getProfileBundle()
      isAuthenticated.value = true
      userEmail.value = profile.email
      accessStatus.value = profile.accessStatus
      applyAccess(access.has_active_subscription, access.expires_at)
      bootstrapped.value = true
      return true
    } catch {
      clearTokens()
      isAuthenticated.value = false
      accessStatus.value = 'pending'
      userEmail.value = ''
      bootstrapped.value = true
      return false
    }
  }

  const login = async (email: string, password: string) => {
    const tokens = await api.login(email, password)
    setTokens(tokens)
    isAuthenticated.value = true
    userEmail.value = email
    await refreshSession()
  }

  const register = async (payload: {
    email: string
    password: string
    first_name?: string
    last_name?: string
  }) => {
    const response = await api.register(payload)
    setTokens({ access: response.access, refresh: response.refresh })
    isAuthenticated.value = true
    userEmail.value = response.user.email
    accessStatus.value = 'pending'
    await refreshSession()
  }

  const logout = () => {
    clearTokens()
    isAuthenticated.value = false
    accessStatus.value = 'pending'
    userEmail.value = ''
  }

  const markAccessActive = (expiresAt?: string | null) => {
    isAuthenticated.value = true
    applyAccess(true, expiresAt)
  }

  return {
    isAuthenticated,
    accessStatus,
    userEmail,
    bootstrapped,
    login,
    register,
    logout,
    refreshSession,
    markAccessActive
  }
}
