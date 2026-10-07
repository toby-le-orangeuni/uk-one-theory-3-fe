<script setup lang="ts">
definePageMeta({ layout: 'app' })

const api = useMockApi()
const { data: lessons, pending } = await useAsyncData('course-lessons', () => api.getLessons())
const chapters = computed(() => {
  const grouped = new Map<string, typeof lessons.value>()
  for (const lesson of lessons.value || []) {
    grouped.set(lesson.chapter, [...(grouped.get(lesson.chapter) || []), lesson])
  }
  return [...grouped.entries()]
})
</script>

<template>
  <section class="stack">
    <div class="section-header">
      <div>
        <h1 class="page-title">Course</h1>
        <p class="lead">Browse theory lessons and continue in order.</p>
      </div>
      <NuxtLink class="btn btn-primary" to="/course/road-signs">Resume current lesson</NuxtLink>
    </div>

    <ProgressMeter :value="62" label="Course progress" />
    <LoadingPanel v-if="pending" />
    <SystemState
      v-else-if="!lessons?.length"
      title="No lessons yet"
      message="Course content will appear here when available."
      action-label="Return to dashboard"
      action-to="/dashboard"
    />

    <div v-else class="stack">
      <article v-for="[chapter, chapterLessons] in chapters" :key="chapter" class="panel stack">
        <h2>{{ chapter }}</h2>
        <div class="list">
          <NuxtLink
            v-for="lesson in chapterLessons"
            :key="lesson.id"
            class="list-row"
            :to="lesson.status === 'locked' ? '/account?state=locked' : `/course/${lesson.id}`"
          >
            <span>
              <strong>{{ lesson.title }}</strong>
              <span class="muted"> · {{ lesson.duration }}</span>
            </span>
            <span :class="lesson.status === 'locked' ? 'pill pill-warning' : 'pill'">{{ lesson.status }}</span>
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>
