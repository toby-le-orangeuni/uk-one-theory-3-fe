<script setup lang="ts">
const api = useMockApi()
const { data: plans, pending } = await useAsyncData('plans', () => api.getPlans())
</script>

<template>
  <div class="plans-page">
    <section class="container plans-hero">
      <div>
        <p class="section-kicker">Access plans</p>
        <h1>Choose the access window that fits your test date.</h1>
        <p>
          Every plan opens the same learner journey: lessons, practice questions, mock exams, hazard preparation and progress feedback.
        </p>
      </div>
    </section>

    <section class="container plans-board">
      <LoadingPanel v-if="pending" />
      <div v-else class="plans-grid">
        <PlanCard v-for="plan in plans" :key="plan.id" :plan="plan" />
      </div>
    </section>

    <section class="container reassurance-strip">
      <article>
        <UIcon name="i-lucide-layout-panel-top" />
        <span>
          <strong>One checkout screen</strong>
          <small>Plan, account details and payment preview stay together.</small>
        </span>
      </article>
      <article>
        <UIcon name="i-lucide-credit-card" />
        <span>
          <strong>Simulated payment</strong>
          <small>No card is charged while Stripe is out of scope.</small>
        </span>
      </article>
      <article>
        <UIcon name="i-lucide-rotate-ccw" />
        <span>
          <strong>Easy to change</strong>
          <small>Return here from checkout to choose another access window.</small>
        </span>
      </article>
    </section>
  </div>
</template>
