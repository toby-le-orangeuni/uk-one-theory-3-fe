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
  <UAlert
    :color="tone === 'danger' ? 'error' : tone === 'warning' ? 'warning' : 'primary'"
    :variant="tone ? 'soft' : 'subtle'"
    :icon="tone === 'danger' ? 'i-lucide-circle-alert' : tone === 'warning' ? 'i-lucide-triangle-alert' : 'i-lucide-info'"
    :title="title"
    :description="message"
  >
    <template v-if="actionLabel && actionTo" #actions>
      <UButton :to="actionTo" color="primary" trailing-icon="i-lucide-arrow-right">
        {{ actionLabel }}
      </UButton>
    </template>
  </UAlert>
</template>
