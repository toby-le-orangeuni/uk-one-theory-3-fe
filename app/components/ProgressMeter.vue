<script setup lang="ts">
defineProps<{
  value: number
  label?: string
}>()
</script>

<template>
  <div class="stack">
    <div v-if="label" class="muted">{{ label }}: {{ value }}%</div>
    <UProgress :model-value="Math.max(0, Math.min(value, 100))" color="primary" size="lg" />
  </div>
</template>
