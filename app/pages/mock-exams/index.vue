<script setup lang="ts">
definePageMeta({ layout: 'app' })

const starting = ref(false)
const start = async () => {
  starting.value = true
  await new Promise((resolve) => setTimeout(resolve, 300))
  await navigateTo('/mock-exams/attempt-1024')
}
</script>

<template>
  <section class="app-page">
    <div class="app-page-hero">
      <div>
        <span class="app-eyebrow">
          <UIcon name="i-lucide-clipboard-check" />
          Readiness check
        </span>
        <h1>Mock exam</h1>
        <p class="lead">Answer realistic theory questions, then complete the hazard section before viewing results.</p>
      </div>
      <button class="btn btn-primary" :disabled="starting" type="button" @click="start">
        {{ starting ? 'Starting exam' : 'Start mock exam' }}
      </button>
    </div>

    <article class="app-action-card">
      <div class="app-metric-grid">
        <div class="app-metric-card">
          <small>Questions</small>
          <strong>50</strong>
          <p class="muted">Mocked exam shell</p>
        </div>
        <div class="app-metric-card">
          <small>Timing</small>
          <strong>Ready</strong>
          <p class="muted">Timer state prepared</p>
        </div>
        <div class="app-metric-card">
          <small>Flow</small>
          <strong>2 parts</strong>
          <p class="muted">Theory then hazard</p>
        </div>
      </div>
      <SystemState
        title="Before you start"
        message="If back navigation is restricted in the real exam mode, the learner should see that rule here first."
      />
    </article>
  </section>
</template>
