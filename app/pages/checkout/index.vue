<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const api = useApi()
const { isAuthenticated, userEmail, markAccessActive } = useAuth()

const planId = computed(() => String(route.query.plan || ''))
const { data: plan, pending } = await useAsyncData(`checkout-plan-${planId.value}`, () => api.getPlan(planId.value))

const form = reactive({
  consent: false
})
const errors = reactive<Record<string, string>>({})
const state = ref<'idle' | 'processing' | 'secure' | 'error'>('idle')
const errorMessage = ref('')

const validate = () => {
  errors.consent = form.consent ? '' : 'Accept the terms before purchase.'
  return !errors.consent
}

const confirmPurchase = async () => {
  if (!isAuthenticated.value) {
    await navigateTo({ path: '/login', query: { returnTo: route.fullPath } })
    return
  }
  if (!validate() || !plan.value) return

  state.value = 'processing'
  errorMessage.value = ''
  try {
    const session = await api.createCheckoutSession({ package_slug: plan.value.id })
    state.value = 'secure'

    if (config.public.useCheckoutSimulation) {
      try {
        await api.simulateCheckoutPayment(session.session_id)
        markAccessActive()
        await navigateTo(`/checkout/success?plan=${plan.value.id}&session=${session.session_id}&email=${encodeURIComponent(userEmail.value)}`)
        return
      } catch (simulateError: unknown) {
        const simulateStatus = (simulateError as { statusCode?: number; status?: number })?.statusCode
          ?? (simulateError as { statusCode?: number; status?: number })?.status
        // Remote API may disable simulate-payment outside DEBUG; fall through to Stripe.
        if (simulateStatus !== 404) throw simulateError
      }
    }

    if (session.checkout_url) {
      if (import.meta.client) {
        window.location.assign(session.checkout_url)
        return
      }
      await navigateTo(session.checkout_url, { external: true })
      return
    }

    throw new Error('Checkout URL missing')
  } catch (err: unknown) {
    state.value = 'error'
    const status = (err as { statusCode?: number; status?: number })?.statusCode
      ?? (err as { statusCode?: number; status?: number })?.status
    errorMessage.value = status === 502
      ? 'Payment provider is unavailable. Try again shortly.'
      : 'Checkout failed. Your details were not charged.'
  }
}
</script>

<template>
  <section class="container section stack">
    <h1 class="page-title">Checkout</h1>
    <LoadingPanel v-if="pending" />

    <SystemState
      v-else-if="!plan"
      title="Plan unavailable"
      message="Choose an available package before checkout."
      action-label="View plans"
      action-to="/plans"
      tone="warning"
    />

    <div v-else class="checkout-grid">
      <aside class="panel stack">
        <span v-if="plan.recommended" class="pill">Recommended</span>
        <h2>Selected plan</h2>
        <p class="price">GBP {{ plan.priceGbp }}</p>
        <p class="muted">{{ plan.name }} · {{ plan.durationDays }} days</p>
        <ul class="stack">
          <li v-for="item in plan.includes" :key="item">{{ item }}</li>
        </ul>
        <NuxtLink class="btn btn-secondary" to="/plans">Change plan</NuxtLink>
      </aside>

      <form class="panel form" @submit.prevent="confirmPurchase">
        <h2>Account</h2>
        <p class="muted">Signed in as <strong>{{ userEmail || 'your account' }}</strong>.</p>
        <NuxtLink class="auth-link" to="/account">Manage account</NuxtLink>

        <div class="state-box stack">
          <strong>Payment</strong>
          <p class="muted">
            You will complete payment via Stripe Checkout. If the API allows simulation in DEBUG, that path is tried first.
          </p>
          <label class="question-option">
            <input v-model="form.consent" type="checkbox">
            <span>I agree to the terms and understand this confirms a paid purchase.</span>
          </label>
          <small v-if="errors.consent" class="field-error">{{ errors.consent }}</small>
        </div>

        <SystemState
          v-if="state === 'secure'"
          title="Confirming payment"
          message="Provisioning your learner access. Stay on this screen."
          tone="warning"
        />
        <SystemState
          v-if="state === 'error'"
          title="Payment failed"
          :message="errorMessage"
          tone="danger"
        />

        <button class="btn btn-primary" :disabled="state === 'processing' || state === 'secure'" type="submit">
          {{ state === 'processing' || state === 'secure' ? 'Processing payment' : `Confirm Purchase · GBP ${plan.priceGbp}` }}
        </button>
      </form>
    </div>
  </section>
</template>
