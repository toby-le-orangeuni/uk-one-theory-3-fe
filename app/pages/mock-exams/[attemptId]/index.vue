<script setup lang="ts">
definePageMeta({ layout: 'app' })

const route = useRoute()
const api = useMockApi()
const { data: questions } = await useAsyncData(`exam-${route.params.attemptId}`, () => api.getQuestions())
const index = ref(0)
const unanswered = ref('')
const selected = ref<number | null>(null)
const current = computed(() => questions.value?.[index.value])

const next = async () => {
  if (selected.value === null) {
    unanswered.value = 'Choose an answer before continuing.'
    return
  }
  unanswered.value = ''
  selected.value = null
  if (index.value >= (questions.value?.length || 1) - 1) {
    await navigateTo(`/mock-exams/${route.params.attemptId}/hazard`)
    return
  }
  index.value += 1
}
</script>

<template>
  <section class="stack">
    <div class="section-header">
      <div>
        <h1 class="page-title">Exam question screen</h1>
        <p class="lead">Attempt {{ $route.params.attemptId }} · Question {{ index + 1 }} of {{ questions?.length || 0 }}</p>
      </div>
      <span class="pill">Timer 56:20</span>
    </div>

    <ProgressMeter :value="Math.round(((index + 1) / (questions?.length || 1)) * 100)" label="Exam progress" />

    <article v-if="current" class="panel stack">
      <h2>{{ current.text }}</h2>
      <div class="stack">
        <button
          v-for="(option, optionIndex) in current.options"
          :key="option"
          class="question-option"
          :class="{ selected: selected === optionIndex }"
          type="button"
          @click="selected = optionIndex"
        >
          {{ option }}
        </button>
      </div>
      <p v-if="unanswered" class="field-error">{{ unanswered }}</p>
      <button class="btn btn-primary" type="button" @click="next">
        {{ index >= (questions?.length || 1) - 1 ? 'Finish normal questions' : 'Submit / Next' }}
      </button>
    </article>

    <SystemState
      v-else
      title="Connection error"
      message="Exam questions could not be loaded. Retry without losing the attempt."
      action-label="Retry"
      :action-to="`/mock-exams/${$route.params.attemptId}`"
      tone="danger"
    />
  </section>
</template>
