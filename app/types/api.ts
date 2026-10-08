export interface AuthTokenPair {
  access: string
  refresh: string
}

export interface PackageFeature {
  code: string
  name: string
}

export interface ApiPackage {
  slug: string
  name: string
  description: string
  price: string
  currency: string
  duration_days: number
  features: PackageFeature[]
}

export interface ApiProfile {
  email: string
  first_name: string
  last_name: string
  phone: string
  postcode: string
}

export interface RegisterRequest {
  email: string
  password: string
  first_name?: string
  last_name?: string
  phone?: string
  postcode?: string
}

export interface RegisterResponse extends AuthTokenPair {
  user: ApiProfile
}

export interface CabinetAccess {
  features: string[]
  has_active_subscription: boolean
  expires_at: string | null
}

export interface CabinetSubscription {
  package_slug: string | null
  package_name: string | null
  status: string | null
  starts_at: string | null
  ends_at: string | null
}

export interface CreateCheckoutRequest {
  package_slug: string
  promo_code?: string
}

export interface CheckoutSessionCreated {
  session_id: string
  checkout_url: string
  status: string
}

export interface CheckoutSessionStatus {
  session_id: string
  status: string
  package_slug: string
  expires_at: string
}

export interface ApiOrder {
  id: string
  package_slug: string
  package_name: string
  amount: string
  currency: string
  status: string
  paid_at: string | null
  created_at: string
}

export interface PaginatedOrders {
  count: number
  next: string | null
  previous: string | null
  results: ApiOrder[]
}
