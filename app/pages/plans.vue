<script setup lang="ts">
const api = useMockApi()
const { data: plans, pending } = await useAsyncData('plans', () => api.getPlans())
</script>

<template>
  <section class="container section stack">
    <div class="section-header">
      <div>
        <h1 class="page-title">Choose your access plan</h1>
        <p class="lead">Every available plan includes lessons, videos, practice questions, mock exams and hazard preparation.</p>
      </div>
      <NuxtLink class="btn btn-secondary" to="/">Back to landing</NuxtLink>
    </div>

    <LoadingPanel v-if="pending" />
    <div v-else class="grid grid-3">
      <PlanCard v-for="plan in plans" :key="plan.id" :plan="plan" />
    </div>

    <article class="card">
      <h2>Payment reassurance</h2>
      <p class="muted">Checkout is one screen: selected package, account details and the mocked Stripe payment element stay together.</p>
    </article>
  </section>
</template>
