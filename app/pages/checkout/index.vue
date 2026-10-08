<script setup lang="ts">
const route = useRoute()
const api = useMockApi()
const { activateMockAccess } = useAuth()

const planId = computed(() => String(route.query.plan || ''))
const { data: plan, pending } = await useAsyncData(`checkout-plan-${planId.value}`, () => api.getPlan(planId.value))

const form = reactive({
  email: '',
  name: '',
  consent: false
})
const errors = reactive<Record<string, string>>({})
const state = ref<'idle' | 'processing' | 'secure' | 'error'>('idle')

const validate = () => {
  errors.email = form.email.includes('@') ? '' : 'Enter a valid email address.'
  errors.name = form.name.trim().length > 1 ? '' : 'Enter your full name.'
  errors.consent = form.consent ? '' : 'Accept the terms before purchase.'
  return !errors.email && !errors.name && !errors.consent
}

const confirmPurchase = async () => {
  if (!validate()) return
  state.value = 'processing'
  await new Promise((resolve) => setTimeout(resolve, 500))
  state.value = 'secure'
  await new Promise((resolve) => setTimeout(resolve, 500))
  activateMockAccess()
  await navigateTo(`/checkout/success?plan=${planId.value}&email=${encodeURIComponent(form.email)}`)
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
        <h2>Account details</h2>
        <label class="field">
          <span>Email</span>
          <input v-model="form.email" type="email" placeholder="you@example.com">
          <small v-if="errors.email" class="field-error">{{ errors.email }}</small>
        </label>
        <label class="field">
          <span>Name</span>
          <input v-model="form.name" type="text" placeholder="Full name">
          <small v-if="errors.name" class="field-error">{{ errors.name }}</small>
        </label>
        <button class="btn auth-social-button" type="button">
          <UIcon name="i-lucide-chrome" />
          Continue with Google
        </button>

        <div class="state-box stack">
          <strong>Payment details</strong>
          <p class="muted">Mock Stripe payment element. Real Stripe integration will mount here later.</p>
          <label class="question-option">
            <input v-model="form.consent" type="checkbox">
            <span>I agree to the terms and understand this confirms a paid purchase.</span>
          </label>
          <small v-if="errors.consent" class="field-error">{{ errors.consent }}</small>
        </div>

        <SystemState
          v-if="state === 'secure'"
          title="Bank verification"
          message="Mock 3D Secure check in progress. Stay on this screen while verification completes."
          tone="warning"
        />
        <SystemState
          v-if="state === 'error'"
          title="Payment failed"
          message="Your details are preserved. Try again when ready."
          tone="danger"
        />

        <button class="btn btn-primary" :disabled="state === 'processing' || state === 'secure'" type="submit">
          {{ state === 'processing' || state === 'secure' ? 'Processing payment' : `Confirm Purchase · GBP ${plan.priceGbp}` }}
        </button>
      </form>
    </div>
  </section>
</template>
