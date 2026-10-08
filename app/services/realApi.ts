import type {
  ApiPackage,
  ApiProfile,
  AuthTokenPair,
  CabinetAccess,
  CabinetSubscription,
  CheckoutSessionCreated,
  CheckoutSessionStatus,
  CreateCheckoutRequest,
  PaginatedOrders,
  RegisterRequest,
  RegisterResponse
} from '~/types/api'
import { mapCabinetToProfile, mapOrder, mapPackageToPlan } from '~/services/mappers'
import { useApiClient } from '~/services/apiClient'

export const useRealApi = () => {
  const { apiFetch } = useApiClient()

  const login = (email: string, password: string) =>
    apiFetch<AuthTokenPair>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
      auth: false
    })

  const register = (payload: RegisterRequest) =>
    apiFetch<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: payload,
      auth: false
    })

  const getPackages = async () => {
    const packages = await apiFetch<ApiPackage[]>('/api/packages', { auth: false })
    return packages.map(mapPackageToPlan)
  }

  const getPackage = async (slug: string) => {
    try {
      const pkg = await apiFetch<ApiPackage>(`/api/packages/${slug}`, { auth: false })
      return mapPackageToPlan(pkg)
    } catch (error: unknown) {
      const status = (error as { statusCode?: number; status?: number })?.statusCode
        ?? (error as { statusCode?: number; status?: number })?.status
      if (status === 404) return undefined
      throw error
    }
  }

  const getCabinetProfile = () => apiFetch<ApiProfile>('/api/cabinet/me')

  const updateCabinetProfile = (payload: Partial<Pick<ApiProfile, 'first_name' | 'last_name' | 'phone' | 'postcode'>>) =>
    apiFetch<ApiProfile>('/api/cabinet/me', {
      method: 'PATCH',
      body: payload
    })

  const getAccess = () => apiFetch<CabinetAccess>('/api/cabinet/access')

  const getSubscription = () => apiFetch<CabinetSubscription>('/api/cabinet/subscription')

  const getProfileBundle = async () => {
    const [profile, access, subscription] = await Promise.all([
      getCabinetProfile(),
      getAccess(),
      getSubscription()
    ])
    return {
      profile: mapCabinetToProfile(profile, access, subscription),
      access,
      subscription,
      rawProfile: profile
    }
  }

  const createCheckoutSession = (payload: CreateCheckoutRequest) =>
    apiFetch<CheckoutSessionCreated>('/api/checkout/sessions', {
      method: 'POST',
      body: payload
    })

  const getCheckoutSession = (sessionId: string) =>
    apiFetch<CheckoutSessionStatus>(`/api/checkout/sessions/${sessionId}`)

  const simulateCheckoutPayment = (sessionId: string) =>
    apiFetch<CheckoutSessionStatus>(`/api/checkout/sessions/${sessionId}/simulate-payment`, {
      method: 'POST'
    })

  const getOrders = async () => {
    const page = await apiFetch<PaginatedOrders>('/api/payments/orders')
    return page.results.map(mapOrder)
  }

  return {
    login,
    register,
    getPackages,
    getPackage,
    getCabinetProfile,
    updateCabinetProfile,
    getAccess,
    getSubscription,
    getProfileBundle,
    createCheckoutSession,
    getCheckoutSession,
    simulateCheckoutPayment,
    getOrders
  }
}
