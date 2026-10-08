import type { AuthTokenPair } from '~/types/api'

type ApiFetchOptions = {
  method?: string
  body?: unknown
  headers?: HeadersInit
  auth?: boolean
  query?: Record<string, string | number | undefined>
}

const TOKEN_ACCESS = 'uk_theory_access'
const TOKEN_REFRESH = 'uk_theory_refresh'

export const getAccessToken = () => {
  if (import.meta.client) {
    return localStorage.getItem(TOKEN_ACCESS) || useCookie<string | null>(TOKEN_ACCESS).value
  }
  return useCookie<string | null>(TOKEN_ACCESS).value
}

export const getRefreshToken = () => {
  if (import.meta.client) {
    return localStorage.getItem(TOKEN_REFRESH) || useCookie<string | null>(TOKEN_REFRESH).value
  }
  return useCookie<string | null>(TOKEN_REFRESH).value
}

export const setTokens = (tokens: AuthTokenPair) => {
  const accessCookie = useCookie<string | null>(TOKEN_ACCESS, { sameSite: 'lax', maxAge: 60 * 60 * 24 * 30 })
  const refreshCookie = useCookie<string | null>(TOKEN_REFRESH, { sameSite: 'lax', maxAge: 60 * 60 * 24 * 30 })
  accessCookie.value = tokens.access
  refreshCookie.value = tokens.refresh
  if (import.meta.client) {
    localStorage.setItem(TOKEN_ACCESS, tokens.access)
    localStorage.setItem(TOKEN_REFRESH, tokens.refresh)
  }
}

export const clearTokens = () => {
  const accessCookie = useCookie<string | null>(TOKEN_ACCESS)
  const refreshCookie = useCookie<string | null>(TOKEN_REFRESH)
  accessCookie.value = null
  refreshCookie.value = null
  if (import.meta.client) {
    localStorage.removeItem(TOKEN_ACCESS)
    localStorage.removeItem(TOKEN_REFRESH)
  }
}

export const useApiClient = () => {
  const config = useRuntimeConfig()
  const baseURL = String(config.public.apiBase || 'http://103.199.19.184:8000')

  const refreshAccessToken = async () => {
    const refresh = getRefreshToken()
    if (!refresh) throw new Error('Missing refresh token')

    const tokens = await $fetch<AuthTokenPair>('/api/auth/token/refresh', {
      baseURL,
      method: 'POST',
      body: { refresh }
    })
    setTokens(tokens)
    return tokens.access
  }

  const apiFetch = async <T>(path: string, options: ApiFetchOptions = {}, retried = false): Promise<T> => {
    const headers = new Headers(options.headers)
    const needsAuth = options.auth !== false

    if (needsAuth) {
      const access = getAccessToken()
      if (access) headers.set('Authorization', `Bearer ${access}`)
    }

    try {
      return await $fetch<T>(path, {
        baseURL,
        method: options.method,
        body: options.body,
        query: options.query,
        headers
      })
    } catch (error: unknown) {
      const status = (error as { statusCode?: number; status?: number })?.statusCode
        ?? (error as { statusCode?: number; status?: number })?.status

      if (needsAuth && status === 401 && !retried) {
        try {
          await refreshAccessToken()
          return apiFetch<T>(path, options, true)
        } catch {
          clearTokens()
          throw error
        }
      }

      throw error
    }
  }

  return { apiFetch, baseURL }
}
