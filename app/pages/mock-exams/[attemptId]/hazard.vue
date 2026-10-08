<script setup lang="ts">
definePageMeta({ layout: 'app' })

const route = useRoute()
const selected = ref('')
const submitted = ref(false)
const seconds = ref(8)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    seconds.value -= 1
    if (seconds.value <= 0) {
      submitted.value = true
      clearInterval(timer)
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const submit = async () => {
  if (!selected.value) return
  submitted.value = true
  if (timer) clearInterval(timer)
  await new Promise((resolve) => setTimeout(resolve, 300))
  await navigateTo(`/results/${route.params.attemptId}`)
}
</script>

<template>
  <section class="app-page">
    <div class="app-page-hero">
      <div>
        <span class="app-eyebrow">
          <UIcon name="i-lucide-radar" />
          Timed section
        </span>
        <h1>Hazard perception</h1>
        <p class="lead">Short timed hazard-style multiple-choice section.</p>
      </div>
      <span :class="seconds <= 3 ? 'pill pill-danger' : 'pill'">Countdown: {{ Math.max(seconds, 0) }} seconds</span>
    </div>

    <article class="panel stack">
      <div class="hero-road" aria-label="Road traffic image placeholder">
        <span class="road-line" />
        <span class="road-line" />
        <span class="road-line" />
      </div>
      <h2>A cyclist ahead looks over their shoulder. What should you do?</h2>
      <div class="stack">
        <button
          v-for="option in ['Brake', 'Release accelerator', 'Do nothing']"
          :key="option"
          class="question-option"
          :class="{ selected: selected === option }"
          :disabled="submitted"
          type="button"
          @click="selected = option"
        >
          {{ option }}
        </button>
      </div>
      <p class="muted">No back navigation and no answer changes after submit.</p>
      <button class="btn btn-primary" :disabled="submitted || !selected" type="button" @click="submit">Submit</button>
      <SystemState
        v-if="submitted && seconds <= 0"
        title="Time expired"
        message="The frontend locks the answer state. The backend should enforce final timing."
        action-label="View results"
        :action-to="`/results/${$route.params.attemptId}`"
        tone="warning"
      />
    </article>
  </section>
</template>
