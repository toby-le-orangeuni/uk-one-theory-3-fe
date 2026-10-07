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
      <span class="brand-mark">1</span>
      <span>UK One Theory</span>
    </NuxtLink>
    <nav class="nav-links" aria-label="Student navigation">
      <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">
        {{ item.label }}
      </NuxtLink>
      <button class="link-btn btn-ghost" type="button" @click="expireAccess">
        Mock expired
      </button>
      <button class="link-btn btn-secondary" type="button" @click="signOut">
        Log out
      </button>
      <span v-if="accessStatus === 'expired'" class="pill pill-danger">Expired</span>
    </nav>
  </header>
</template>
