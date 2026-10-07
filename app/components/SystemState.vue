<script setup lang="ts">
defineProps<{
  title: string
  message: string
  actionLabel?: string
  actionTo?: string
  tone?: 'normal' | 'warning' | 'danger'
}>()
</script>

<template>
  <section class="state-box stack">
    <span v-if="tone === 'warning'" class="pill pill-warning">Needs attention</span>
    <span v-if="tone === 'danger'" class="pill pill-danger">Unavailable</span>
    <h2>{{ title }}</h2>
    <p class="muted">{{ message }}</p>
    <NuxtLink v-if="actionLabel && actionTo" class="btn btn-primary" :to="actionTo">
      {{ actionLabel }}
    </NuxtLink>
  </section>
</template>
