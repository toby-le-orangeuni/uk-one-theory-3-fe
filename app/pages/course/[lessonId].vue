<script setup lang="ts">
definePageMeta({ layout: 'app' })

const route = useRoute()
const api = useMockApi()
const lessonId = computed(() => String(route.params.lessonId))
const { data: lesson } = await useAsyncData(`lesson-${lessonId.value}`, () => api.getLesson(lessonId.value))
const { data: lessons } = await useAsyncData('lesson-nav', () => api.getLessons())
const complete = ref(lesson.value?.status === 'completed')
const nextLesson = computed(() => {
  const list = lessons.value || []
  const index = list.findIndex((item) => item.id === lessonId.value)
  return list[index + 1]
})
</script>

<template>
  <section class="lesson-layout">
    <aside class="panel stack">
      <h2>Course sidebar</h2>
      <NuxtLink v-for="item in lessons" :key="item.id" class="list-row" :to="`/course/${item.id}`">
        <span>{{ item.title }}</span>
      </NuxtLink>
    </aside>

    <article v-if="lesson" class="panel stack">
      <span :class="lesson.status === 'locked' ? 'pill pill-warning' : 'pill'">{{ complete ? 'completed' : lesson.status }}</span>
      <h1 class="page-title">{{ lesson.title }}</h1>
      <p class="lead">{{ lesson.summary }}</p>

      <div class="state-box">
        <strong>Video player</strong>
        <p v-if="lesson.videoState === 'loading'" class="muted">Video loading...</p>
        <p v-else-if="lesson.videoState === 'unavailable'" class="field-error">Video unavailable. Try again later.</p>
        <p v-else class="muted">Protected media placeholder. Real signed video URLs plug in here later.</p>
      </div>

      <p class="muted">
        Read the short lesson notes, watch the video, then practise related questions. This page handles locked content,
        playback errors and completion state.
      </p>

      <div class="actions">
        <button class="btn btn-primary" type="button" @click="complete = true">Mark complete</button>
        <NuxtLink v-if="nextLesson" class="btn btn-secondary" :to="`/course/${nextLesson.id}`">Next</NuxtLink>
        <NuxtLink class="btn btn-ghost" to="/practice">Related practice questions</NuxtLink>
      </div>
    </article>

    <SystemState
      v-else
      title="Lesson not found"
      message="Choose a lesson from the course list."
      action-label="Back to course"
      action-to="/course"
      tone="warning"
    />
  </section>
</template>
