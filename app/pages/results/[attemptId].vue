<script setup lang="ts">
definePageMeta({ layout: 'app' })

const api = useMockApi()
const { data: result } = await useAsyncData('result-summary', () => api.getResult())
</script>

<template>
  <section class="stack">
    <article v-if="result" class="panel stack">
      <span :class="result.passed ? 'pill' : 'pill pill-danger'">{{ result.passed ? 'Passed' : 'Failed' }}</span>
      <h1 class="page-title">Result summary</h1>
      <div class="grid grid-3">
        <div class="card card-muted">
          <strong>Score</strong>
          <p>{{ result.score }} / {{ result.total }}</p>
        </div>
        <div class="card card-muted">
          <strong>Date</strong>
          <p>{{ result.date }}</p>
        </div>
        <div class="card card-muted">
          <strong>Attempt</strong>
          <p>{{ $route.params.attemptId }}</p>
        </div>
      </div>

      <h2>Breakdown</h2>
      <div class="grid grid-2">
        <div class="card">
          <h2>Theory topics</h2>
          <ProgressMeter :value="86" label="Theory score" />
        </div>
        <div class="card">
          <h2>Hazard section</h2>
          <ProgressMeter :value="72" label="Hazard score" />
        </div>
      </div>

      <article class="card stack">
        <h2>Weak areas</h2>
        <p class="muted">{{ result.weakAreas.join(', ') }}</p>
      </article>

      <div class="actions">
        <NuxtLink class="btn btn-secondary" to="/practice">Review incorrect answers</NuxtLink>
        <NuxtLink class="btn btn-primary" to="/mock-exams">Retry</NuxtLink>
        <NuxtLink class="btn btn-ghost" to="/course">Continue learning</NuxtLink>
      </div>
    </article>

    <SystemState
      v-else
      title="No attempts yet"
      message="Start a mock exam to generate a result."
      action-label="Start mock exam"
      action-to="/mock-exams"
    />
  </section>
</template>
