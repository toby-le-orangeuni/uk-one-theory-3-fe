<script setup lang="ts">
defineProps<{
  value: number
  label?: string
}>()
</script>

<template>
  <div class="stack">
    <div v-if="label" class="muted">{{ label }}: {{ value }}%</div>
    <div class="progress-track" role="progressbar" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-fill" :style="{ width: `${Math.max(0, Math.min(value, 100))}%` }" />
    </div>
  </div>
</template>
