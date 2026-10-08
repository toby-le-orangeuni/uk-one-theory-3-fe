<script setup lang="ts">
definePageMeta({ layout: 'app' })

const api = useApi()
const { accessStatus } = useAuth()
const { data: profile } = await useAsyncData('dashboard-profile', () => api.getProfile())
const { data: lessons } = await useAsyncData('dashboard-lessons', () => api.getLessons())
const { data: result } = await useAsyncData('dashboard-result', () => api.getResult())
const currentLesson = computed(() => lessons.value?.find((lesson) => lesson.status === 'In-progress') || lessons.value?.[0])
const completedLessons = computed(() => lessons.value?.filter((lesson) => lesson.status === 'Completed').length ?? 0)
const totalLessons = computed(() => lessons.value?.length ?? 0)
const courseProgress = 62
</script>

<template>
  <section class="dashboard-page">
    <SystemState
      v-if="accessStatus === 'expired'"
      title="Access expired"
      message="Choose a new plan to reopen lessons, practice and mock exams."
      action-label="View plans"
      action-to="/plans"
      tone="warning"
    />

    <section class="dashboard-hero">
      <div class="dashboard-hero-copy">
        <span class="dashboard-eyebrow">
          <UIcon name="i-lucide-circle-check" />
          Active learner access
        </span>
        <h1>Welcome back, {{ profile?.name?.split(' ')[0] || 'learner' }}</h1>
        <p>Resume the next lesson, practise weak areas and keep your mock-test readiness moving.</p>
      </div>
      <div class="dashboard-access-card">
        <span>Access until</span>
        <strong>{{ profile?.accessUntil }}</strong>
        <NuxtLink class="btn btn-primary btn-full" :to="`/course/${currentLesson?.id || 'road-signs'}`">
          Resume lesson
          <UIcon name="i-lucide-arrow-right" />
        </NuxtLink>
      </div>
    </section>

    <section class="dashboard-main-grid">
      <article class="dashboard-current-card">
        <div class="dashboard-card-head">
          <span class="dashboard-icon-badge">
            <UIcon name="i-lucide-book-open-check" />
          </span>
          <UBadge color="primary" variant="soft">Continue learning</UBadge>
        </div>
        <h2>{{ currentLesson?.title }}</h2>
        <p>{{ currentLesson?.summary }}</p>
        <div class="dashboard-progress-row">
          <span>Course progress</span>
          <strong>{{ courseProgress }}%</strong>
        </div>
        <ProgressMeter :value="courseProgress" />
        <div class="dashboard-card-actions">
          <NuxtLink class="btn btn-primary" :to="`/course/${currentLesson?.id || 'road-signs'}`">
            Continue lesson
            <UIcon name="i-lucide-arrow-right" />
          </NuxtLink>
          <NuxtLink class="btn btn-ghost" to="/course">View course</NuxtLink>
        </div>
      </article>

      <aside class="dashboard-next-card">
        <span class="dashboard-icon-badge dashboard-icon-badge-amber">
          <UIcon name="i-lucide-route" />
        </span>
        <h2>Next step</h2>
        <p>Finish road signs, then complete a related practice session while it is fresh.</p>
        <NuxtLink class="btn btn-secondary btn-full" to="/practice">
          Open practice
          <UIcon name="i-lucide-arrow-right" />
        </NuxtLink>
      </aside>
    </section>

    <section class="dashboard-stat-grid">
      <NuxtLink class="dashboard-stat-card" to="/course">
        <span class="dashboard-stat-icon">
          <UIcon name="i-lucide-library-big" />
        </span>
        <small>Theory lessons</small>
        <strong>{{ completedLessons }}/{{ totalLessons }}</strong>
        <p>Completed lessons</p>
      </NuxtLink>
      <NuxtLink class="dashboard-stat-card" to="/practice">
        <span class="dashboard-stat-icon">
          <UIcon name="i-lucide-list-checks" />
        </span>
        <small>Practice</small>
        <strong>8/10</strong>
        <p>Latest topic score</p>
      </NuxtLink>
      <NuxtLink class="dashboard-stat-card" to="/mock-exams">
        <span class="dashboard-stat-icon">
          <UIcon name="i-lucide-clipboard-check" />
        </span>
        <small>Mock exam</small>
        <strong>{{ result?.score }}/{{ result?.total }}</strong>
        <p>{{ result?.passed ? 'Pass-ready result' : 'Needs more practice' }}</p>
      </NuxtLink>
    </section>
  </section>
</template>
