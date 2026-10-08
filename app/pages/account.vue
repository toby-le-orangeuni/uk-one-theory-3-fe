<script setup lang="ts">
definePageMeta({ layout: 'app' })

const api = useApi()
const { accessStatus, refreshSession } = useAuth()

const { data: profile, refresh: refreshProfile } = await useAsyncData('account-profile', () => api.getProfile())
const { data: orders } = await useAsyncData('account-orders', () => api.getOrders())

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  postcode: ''
})
const saved = ref(false)
const saveError = ref('')
const saving = ref(false)

watch(
  profile,
  (value) => {
    if (!value) return
    form.firstName = value.firstName || ''
    form.lastName = value.lastName || ''
    form.phone = value.phone || ''
    form.postcode = value.postcode || ''
  },
  { immediate: true }
)

const saveProfile = async () => {
  saved.value = false
  saveError.value = ''
  saving.value = true
  try {
    await api.updateProfile({
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
      postcode: form.postcode
    })
    await refreshProfile()
    await refreshSession()
    saved.value = true
  } catch {
    saveError.value = 'Could not save profile.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section class="app-page">
    <div class="app-page-hero">
      <div>
        <span class="app-eyebrow">
          <UIcon name="i-lucide-user-round-cog" />
          Learner account
        </span>
        <h1>Account</h1>
        <p class="lead">Profile details, access period and subscription state.</p>
      </div>
    </div>

    <SystemState
      v-if="accessStatus === 'expired' || $route.query.state === 'expired'"
      title="Access expired"
      message="Lessons, practice and mock exams are locked until a new plan is selected."
      action-label="View plans"
      action-to="/plans"
      tone="warning"
    />

    <div class="account-grid">
      <article class="panel form">
        <span class="app-eyebrow">
          <UIcon name="i-lucide-id-card" />
          Profile
        </span>
        <h2>Profile details</h2>
        <label class="field">
          <span>First name</span>
          <input v-model="form.firstName" type="text">
        </label>
        <label class="field">
          <span>Last name</span>
          <input v-model="form.lastName" type="text">
        </label>
        <label class="field">
          <span>Email</span>
          <input :value="profile?.email" type="email" disabled>
        </label>
        <label class="field">
          <span>Phone</span>
          <input v-model="form.phone" type="text">
        </label>
        <label class="field">
          <span>Postcode</span>
          <input v-model="form.postcode" type="text">
        </label>
        <button class="btn btn-primary" type="button" :disabled="saving" @click="saveProfile">
          {{ saving ? 'Saving' : 'Save profile' }}
        </button>
        <p v-if="saved" class="pill">Profile saved</p>
        <p v-if="saveError" class="field-error">{{ saveError }}</p>
      </article>

      <article class="panel stack">
        <span class="app-eyebrow">
          <UIcon name="i-lucide-key-round" />
          Access
        </span>
        <h2>Current access</h2>
        <div class="account-access-list">
          <span>Plan</span>
          <strong>{{ profile?.planId }}</strong>
          <span>Start</span>
          <strong>{{ profile?.startsAt || '—' }}</strong>
          <span>End</span>
          <strong>{{ profile?.accessUntil }}</strong>
          <span>Status</span>
          <strong>
            <span :class="accessStatus === 'expired' ? 'pill pill-danger' : 'pill'">{{ accessStatus }}</span>
          </strong>
        </div>
        <NuxtLink class="btn btn-secondary" to="/plans">Change plan</NuxtLink>
      </article>
    </div>

    <article class="panel stack">
      <span class="app-eyebrow">
        <UIcon name="i-lucide-receipt" />
        Orders
      </span>
      <h2>Order history</h2>
      <p v-if="!orders?.length" class="muted">No orders yet.</p>
      <div v-else class="account-access-list">
        <template v-for="order in orders" :key="order.id">
          <span>{{ order.packageName }}</span>
          <strong>{{ order.currency }} {{ order.amount }} · {{ order.status }}</strong>
        </template>
      </div>
    </article>
  </section>
</template>
