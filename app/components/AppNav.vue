<script setup lang="ts">
const { logout, accessStatus, expireAccess } = useAuth()

const navItems = [
  { label: 'Course', to: '/course' },
  { label: 'Practice', to: '/practice' },
  { label: 'Mock tests', to: '/mock-exams' },
  { label: 'Progress', to: '/progress' },
  { label: 'Account', to: '/account' }
]

const signOut = async () => {
  logout()
  await navigateTo('/login')
}
</script>

<template>
  <header class="app-nav">
    <NuxtLink class="brand" to="/dashboard">
      <span class="brand-mark">nu</span>
      <span>UK One Theory</span>
    </NuxtLink>
    <nav class="nav-links" aria-label="Student navigation">
      <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">
        {{ item.label }}
      </NuxtLink>
      <UButton variant="outline" color="neutral" size="sm" type="button" @click="expireAccess">
        Mock expired
      </UButton>
      <UButton variant="soft" color="neutral" size="sm" type="button" @click="signOut">
        Log out
      </UButton>
      <UBadge v-if="accessStatus === 'expired'" color="error" variant="soft">Expired</UBadge>
    </nav>
  </header>
</template>
