<script setup lang="ts">
const route = useRoute()
const api = useMockApi()
const { activateMockAccess } = useAuth()
const planId = computed(() => String(route.query.plan || '30-day'))
const email = computed(() => String(route.query.email || 'learner@example.com'))
const { data: plan } = await useAsyncData(`success-plan-${planId.value}`, () => api.getPlan(planId.value))
const pendingLink = ref(false)

const goDashboard = async () => {
  pendingLink.value = true
  activateMockAccess()
  await navigateTo('/dashboard')
}
</script>

<template>
  <section class="container section stack">
    <SystemState
      v-if="pendingLink"
      title="Finalizing account access"
      message="Your payment succeeded. We are linking the account safely before opening the dashboard."
      tone="warning"
    />
    <article class="panel stack">
      <span class="pill">Success</span>
      <h1 class="page-title">Your access is ready</h1>
      <p class="lead">Receipt sent to {{ email }}.</p>
      <div class="grid grid-2">
        <div class="card card-muted">
          <strong>Plan</strong>
          <p>{{ plan?.name || '30 days' }}</p>
        </div>
        <div class="card card-muted">
          <strong>Access until</strong>
          <p>2026-11-06</p>
        </div>
      </div>
      <div class="actions">
        <button class="btn btn-primary" type="button" @click="goDashboard">Go to Dashboard</button>
        <NuxtLink class="btn btn-secondary" to="/account">View account</NuxtLink>
      </div>
    </article>
  </section>
</template>
