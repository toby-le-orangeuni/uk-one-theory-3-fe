<script setup lang="ts">
import type { Plan } from '~/types/domain'

defineProps<{
  plan: Plan
  selected?: boolean
}>()
</script>

<template>
  <UCard class="plan-card" :class="{ 'plan-card-featured': plan.recommended, 'card-muted': selected }">
    <div class="stack">
      <div class="badge-row">
        <UBadge v-if="plan.recommended" color="secondary" variant="solid">Most flexible</UBadge>
        <UBadge v-if="plan.status === 'unavailable'" color="warning" variant="soft">Unavailable</UBadge>
        <UBadge v-if="!plan.recommended && plan.status === 'available'" color="primary" variant="soft">Online access</UBadge>
      </div>
      <div>
        <h2>{{ plan.name }}</h2>
        <p class="price">GBP {{ plan.priceGbp }}</p>
        <p class="muted">{{ plan.durationDays }} days of learner access.</p>
      </div>
      <ul class="feature-list">
        <li v-for="item in plan.includes" :key="item">
          <UIcon name="i-lucide-check" />
          <span>{{ item }}</span>
        </li>
      </ul>
      <UButton
        block
        size="lg"
        :color="plan.status === 'available' ? 'secondary' : 'neutral'"
        :variant="plan.status === 'available' ? 'solid' : 'soft'"
        :to="plan.status === 'available' ? `/checkout?plan=${plan.id}` : '/plans'"
        :trailing-icon="plan.status === 'available' ? 'i-lucide-arrow-right' : undefined"
      >
        {{ plan.status === 'available' ? 'Choose Plan' : 'Coming soon' }}
      </UButton>
    </div>
  </UCard>
</template>
