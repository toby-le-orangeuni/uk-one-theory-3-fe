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
  <section class="stack">
    <article class="panel stack">
      <h1 class="page-title">Mock exam</h1>
      <p class="lead">Answer realistic theory questions, then complete the hazard section before viewing results.</p>
      <div class="grid grid-3">
        <div class="card card-muted">
          <strong>Questions</strong>
          <p>50 mocked exam questions</p>
        </div>
        <div class="card card-muted">
          <strong>Timing</strong>
          <p>Timer-ready shell</p>
        </div>
        <div class="card card-muted">
          <strong>Back navigation</strong>
          <p>Explain limits before start</p>
        </div>
      </div>
      <SystemState
        title="Before you start"
        message="If back navigation is restricted in the real exam mode, the learner should see that rule here first."
      />
      <button class="btn btn-primary" :disabled="starting" type="button" @click="start">
        {{ starting ? 'Starting exam' : 'Start mock exam' }}
      </button>
    </article>
  </section>
</template>
