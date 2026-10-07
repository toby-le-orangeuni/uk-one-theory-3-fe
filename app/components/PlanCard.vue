<script setup lang="ts">
import type { Plan } from '~/types/domain'

defineProps<{
  plan: Plan
  selected?: boolean
}>()
</script>

<template>
  <article class="card stack" :class="{ 'card-muted': selected }">
    <div>
      <span v-if="plan.recommended" class="pill">Recommended</span>
      <span v-if="plan.status === 'unavailable'" class="pill pill-warning">Unavailable</span>
    </div>
    <div>
      <h2>{{ plan.name }}</h2>
      <p class="price">GBP {{ plan.priceGbp }}</p>
      <p class="muted">{{ plan.durationDays }} days of learner access.</p>
    </div>
    <ul class="stack">
      <li v-for="item in plan.includes" :key="item">{{ item }}</li>
    </ul>
    <NuxtLink
      class="btn btn-primary"
      :class="{ 'btn-secondary': plan.status === 'unavailable' }"
      :aria-disabled="plan.status === 'unavailable'"
      :to="plan.status === 'available' ? `/checkout?plan=${plan.id}` : '/plans'"
    >
      {{ plan.status === 'available' ? 'Choose Plan' : 'Coming soon' }}
    </NuxtLink>
  </article>
</template>
