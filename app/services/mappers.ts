import type {
  ApiOrder,
  ApiPackage,
  ApiProfile,
  CabinetAccess,
  CabinetSubscription
} from '~/types/api'
import type { AccessStatus, OrderSummary, Plan, UserProfile } from '~/types/domain'

const RECOMMENDED_SLUG = '30-day-access'

export const mapPackageToPlan = (pkg: ApiPackage): Plan => ({
  id: pkg.slug,
  name: pkg.name,
  durationDays: pkg.duration_days,
  priceGbp: Number.parseFloat(pkg.price),
  recommended: pkg.slug === RECOMMENDED_SLUG,
  status: 'available',
  includes: pkg.features.map((feature) => feature.name)
})

export const mapAccessStatus = (access: CabinetAccess | null | undefined): AccessStatus => {
  if (!access) return 'pending'
  if (access.has_active_subscription) return 'active'
  if (access.expires_at) return 'expired'
  return 'pending'
}

export const formatAccessDate = (value: string | null | undefined) => {
  if (!value) return '—'
  return value.slice(0, 10)
}

export const mapCabinetToProfile = (
  profile: ApiProfile,
  access: CabinetAccess | null | undefined,
  subscription: CabinetSubscription | null | undefined
): UserProfile => {
  const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ').trim()
  return {
    name: name || profile.email.split('@')[0] || 'Learner',
    email: profile.email,
    accessStatus: mapAccessStatus(access),
    planId: subscription?.package_slug || '—',
    accessUntil: formatAccessDate(access?.expires_at || subscription?.ends_at),
    firstName: profile.first_name,
    lastName: profile.last_name,
    phone: profile.phone,
    postcode: profile.postcode,
    startsAt: formatAccessDate(subscription?.starts_at)
  }
}

export const mapOrder = (order: ApiOrder): OrderSummary => ({
  id: order.id,
  packageSlug: order.package_slug,
  packageName: order.package_name,
  amount: order.amount,
  currency: order.currency,
  status: order.status,
  paidAt: order.paid_at,
  createdAt: order.created_at
})
