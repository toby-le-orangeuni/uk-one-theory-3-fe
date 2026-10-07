<script setup lang="ts">
import type { Question } from '~/types/domain'

const props = defineProps<{
  question: Question
  index: number
  total: number
}>()

const selected = ref<number | null>(null)
const submitted = ref(false)
const validation = ref('')

const choose = (index: number) => {
  if (!submitted.value) {
    selected.value = index
    validation.value = ''
  }
}

const submit = () => {
  if (selected.value === null) {
    validation.value = 'Select an answer before continuing.'
    return
  }
  submitted.value = true
}

const reset = () => {
  selected.value = null
  submitted.value = false
  validation.value = ''
}

defineExpose({ reset })
</script>

<template>
  <section class="panel stack">
    <div>
      <p class="muted">Question {{ props.index + 1 }} of {{ props.total }} · {{ question.topic }}</p>
      <h2>{{ question.text }}</h2>
    </div>

    <div class="stack">
      <button
        v-for="(option, optionIndex) in question.options"
        :key="option"
        type="button"
        class="question-option"
        :class="{
          selected: selected === optionIndex && !submitted,
          correct: submitted && optionIndex === question.answerIndex,
          incorrect: submitted && selected === optionIndex && optionIndex !== question.answerIndex
        }"
        :disabled="submitted"
        @click="choose(optionIndex)"
      >
        <span>{{ String.fromCharCode(65 + optionIndex) }}.</span>
        <span>{{ option }}</span>
      </button>
    </div>

    <p v-if="validation" class="field-error">{{ validation }}</p>

    <div v-if="submitted" class="state-box">
      <strong>{{ selected === question.answerIndex ? 'Correct' : 'Incorrect' }}</strong>
      <p class="muted">{{ question.explanation }}</p>
    </div>

    <button v-if="!submitted" class="btn btn-primary" type="button" @click="submit">
      Submit answer
    </button>
    <slot v-else name="submitted" />
  </section>
</template>
