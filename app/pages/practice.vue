<script setup lang="ts">
definePageMeta({ layout: 'app' })

const api = useMockApi()
const { data: questions } = await useAsyncData('practice-questions', () => api.getQuestions())
const index = ref(0)
const complete = ref(false)
const current = computed(() => questions.value?.[index.value])

const next = () => {
  if (!questions.value) return
  if (index.value >= questions.value.length - 1) {
    complete.value = true
    return
  }
  index.value += 1
}
</script>

<template>
  <section class="app-page">
    <div class="app-page-hero">
      <div>
        <span class="app-eyebrow">
          <UIcon name="i-lucide-list-checks" />
          Topic practice
        </span>
        <h1>Practice</h1>
        <p class="lead">Practise by topic and learn from explanations immediately after submitting.</p>
      </div>
    </div>

    <SystemState
      v-if="complete"
      title="Session complete"
      message="You completed this practice set. Review progress or continue learning."
      action-label="View progress"
      action-to="/progress"
    />

    <QuestionCard v-else-if="current" :question="current" :index="index" :total="questions?.length || 0">
      <template #submitted>
        <button class="btn btn-primary" type="button" @click="next">
          {{ index >= (questions?.length || 1) - 1 ? 'Finish session' : 'Next question' }}
        </button>
      </template>
    </QuestionCard>

    <SystemState
      v-else
      title="No practice questions"
      message="Practice content will appear here when available."
      action-label="Open course"
      action-to="/course"
    />
  </section>
</template>
