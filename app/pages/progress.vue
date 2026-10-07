<script setup lang="ts">
definePageMeta({ layout: 'app' })

const api = useMockApi()
const { data: result } = await useAsyncData('progress-result', () => api.getResult())
</script>

<template>
  <section class="stack">
    <div class="section-header">
      <div>
        <h1 class="page-title">Progress</h1>
        <p class="lead">Practical readiness feedback and the next recommended action.</p>
      </div>
      <NuxtLink class="btn btn-primary" to="/practice">Open practice</NuxtLink>
    </div>

    <div class="grid grid-3">
      <article class="card">
        <h2>Course</h2>
        <ProgressMeter :value="62" label="Lessons complete" />
      </article>
      <article class="card">
        <h2>Practice</h2>
        <ProgressMeter :value="80" label="Recent topic score" />
      </article>
      <article class="card">
        <h2>Mock exam</h2>
        <ProgressMeter :value="result ? Math.round((result.score / result.total) * 100) : 0" label="Latest score" />
      </article>
    </div>

    <article class="panel stack">
      <h2>Weak areas</h2>
      <p class="muted">{{ result?.weakAreas.join(', ') || 'No attempts yet.' }}</p>
      <div class="actions">
        <NuxtLink class="btn btn-primary" to="/course">Continue learning</NuxtLink>
        <NuxtLink class="btn btn-secondary" to="/mock-exams">Start mock exam</NuxtLink>
      </div>
    </article>
  </section>
</template>
