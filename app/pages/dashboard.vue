<script setup lang="ts">
definePageMeta({ layout: 'app' })

const api = useMockApi()
const { accessStatus } = useAuth()
const { data: profile } = await useAsyncData('dashboard-profile', () => api.getProfile())
const { data: lessons } = await useAsyncData('dashboard-lessons', () => api.getLessons())
const { data: result } = await useAsyncData('dashboard-result', () => api.getResult())
const currentLesson = computed(() => lessons.value?.find((lesson) => lesson.status === 'in-progress') || lessons.value?.[0])
</script>

<template>
  <section class="stack">
    <SystemState
      v-if="accessStatus === 'expired'"
      title="Access expired"
      message="Choose a new plan to reopen lessons, practice and mock exams."
      action-label="View plans"
      action-to="/plans"
      tone="warning"
    />

    <div class="section-header">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="lead">Access active until {{ profile?.accessUntil }}. Continue where you left off.</p>
      </div>
      <NuxtLink class="btn btn-primary" :to="`/course/${currentLesson?.id || 'road-signs'}`">Resume</NuxtLink>
    </div>

    <article class="panel stack">
      <h2>Continue learning</h2>
      <p class="muted">{{ currentLesson?.title }} · {{ currentLesson?.summary }}</p>
      <ProgressMeter :value="62" label="Course progress" />
    </article>

    <div class="grid grid-3">
      <NuxtLink class="card stack" to="/course">
        <h2>Theory lessons</h2>
        <p class="muted">62% complete</p>
      </NuxtLink>
      <NuxtLink class="card stack" to="/practice">
        <h2>Practice</h2>
        <p class="muted">Topic score: 8 of 10</p>
      </NuxtLink>
      <NuxtLink class="card stack" to="/mock-exams">
        <h2>Mock exam</h2>
        <p class="muted">Last result: {{ result?.score }}/{{ result?.total }}</p>
      </NuxtLink>
    </div>

    <SystemState
      title="Recommended next step"
      message="Finish road signs, then complete a related practice session."
      action-label="Open practice"
      action-to="/practice"
    />
  </section>
</template>
