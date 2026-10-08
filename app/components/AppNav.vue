<script setup lang="ts">
const { logout, accessStatus } = useAuth()

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-layout-dashboard' },
  { label: 'Course', to: '/course', icon: 'i-lucide-library-big' },
  { label: 'Practice', to: '/practice', icon: 'i-lucide-list-checks' },
  { label: 'Mock tests', to: '/mock-exams', icon: 'i-lucide-clipboard-check' },
  { label: 'Progress', to: '/progress', icon: 'i-lucide-chart-no-axes-combined' },
  { label: 'Account', to: '/account', icon: 'i-lucide-user-round' }
]

const signOut = async () => {
  logout()
  await navigateTo('/login')
}
</script>

<template>
  <aside class="app-nav">
    <div class="app-nav-top">
      <NuxtLink class="brand" to="/dashboard">
        <span class="brand-mark">nu</span>
        <span>UK One Theory</span>
      </NuxtLink>
      <UBadge v-if="accessStatus === 'expired'" color="error" variant="soft">Expired</UBadge>
    </div>

    <nav class="app-side-links" aria-label="Student navigation">
      <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">
        <UIcon :name="item.icon" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <div class="app-nav-bottom">
      <div class="app-mini-card">
        <span>Mock learner</span>
        <strong>30-day access</strong>
      </div>
      <button class="btn btn-ghost btn-full" type="button" @click="signOut">
        <UIcon name="i-lucide-log-out" />
        Log out
      </button>
    </div>
  </aside>
</template>
