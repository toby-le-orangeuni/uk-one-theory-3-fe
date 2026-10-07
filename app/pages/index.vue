<script setup lang="ts">
const api = useMockApi()
const { data: plans, pending } = await useAsyncData('landing-plans', () => api.getPlans())
const sampleOpen = ref(false)
const faqOpen = ref('payment')
const availablePlans = computed(() => (plans.value ?? []).filter((plan) => plan.status === 'available'))

const learningBlocks = [
  {
    title: 'Bite-size lessons',
    description: 'Short theory modules with video, notes and a clear next step.',
    icon: 'i-lucide-book-open-check'
  },
  {
    title: 'Practice with feedback',
    description: 'Answer questions, see the explanation, then continue while the idea is fresh.',
    icon: 'i-lucide-message-circle-question'
  },
  {
    title: 'Exam readiness',
    description: 'Mock exams, hazard questions and progress summaries show what to revise next.',
    icon: 'i-lucide-clipboard-check'
  }
]

const stats = [
  { value: '1 min', label: 'to start learning' },
  { value: '30+', label: 'mock exam style checks' },
  { value: '24/7', label: 'access on any device' }
]
</script>

<template>
  <div>
    <section class="landing-hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="proof-row">
            <UBadge color="primary" variant="soft" size="lg" icon="i-lucide-shield-check">Learner-first MVP</UBadge>
          </div>
          <h1>Learn the theory, practise the questions, know when you are ready.</h1>
          <p class="lead">
            A focused student area for UK theory learners: lessons, videos, practice, mock exams, hazard preparation and progress in one place.
          </p>

          <div class="actions">
            <UButton to="/plans" color="secondary" size="xl" trailing-icon="i-lucide-arrow-right">
              View plans
            </UButton>
            <UButton color="neutral" variant="outline" size="xl" icon="i-lucide-circle-play" @click="sampleOpen = !sampleOpen">
              Try a question
            </UButton>
          </div>

          <div class="hero-stat-row">
            <div v-for="stat in stats" :key="stat.label">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <UCard class="start-panel">
          <div class="panel-heading">
            <span>Get started</span>
            <UBadge color="secondary" variant="solid">Online access</UBadge>
          </div>

          <div class="selector-block">
            <p class="step-kicker">Select access plan</p>
            <div class="course-options">
              <NuxtLink
                v-for="plan in availablePlans"
                :key="plan.id"
                class="course-option"
                :class="{ recommended: plan.recommended }"
                :to="`/checkout?plan=${plan.id}`"
              >
                <span>
                  <strong>{{ plan.name }}</strong>
                  <small>{{ plan.durationDays }} days of learner access</small>
                </span>
                <strong>GBP {{ plan.priceGbp }}</strong>
              </NuxtLink>
            </div>
          </div>

          <UButton block to="/plans" color="primary" size="lg" trailing-icon="i-lucide-arrow-right">
            Compare all plans
          </UButton>
        </UCard>
      </div>
    </section>

    <section id="how-it-works" class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Everything stays connected</h2>
            <p class="muted">The learner always has one sensible next action.</p>
          </div>
          <UButton to="/plans" color="neutral" variant="outline">View Plans</UButton>
        </div>
        <div class="grid grid-3">
          <UCard v-for="item in learningBlocks" :key="item.title" class="feature-card">
            <UIcon :name="item.icon" class="feature-icon" />
            <h2>{{ item.title }}</h2>
            <p class="muted">{{ item.description }}</p>
          </UCard>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <QuestionCard
          v-if="sampleOpen"
          :question="{
            id: 'sample',
            topic: 'Road signs',
            text: 'What shape are warning signs?',
            options: ['Circular', 'Triangular', 'Rectangular'],
            answerIndex: 1,
            explanation: 'Warning signs are usually triangular so they can be recognized quickly.'
          }"
          :index="0"
          :total="1"
        >
          <template #submitted>
            <UButton to="/plans" color="secondary" trailing-icon="i-lucide-arrow-right">View Plans</UButton>
          </template>
        </QuestionCard>
        <SystemState
          v-else
          title="Practice feedback is immediate"
          message="Open a sample question to see how learners get the answer and explanation without leaving the flow."
          action-label="Open sample"
          action-to="/#how-it-works"
        />
      </div>
    </section>

    <section id="pricing" class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Simple access plans</h2>
            <p class="muted">The same plan names, prices and order appear on checkout.</p>
          </div>
          <UButton to="/plans" color="neutral" variant="outline">Compare plans</UButton>
        </div>
        <LoadingPanel v-if="pending" />
        <div v-else class="grid grid-3">
          <PlanCard v-for="plan in plans" :key="plan.id" :plan="plan" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container grid grid-2">
        <UCard class="support-card">
          <UIcon name="i-lucide-route" class="feature-icon" />
          <h2>Built for the learner journey</h2>
          <p class="muted">Landing, checkout and the student area all point toward one outcome: continue learning and understand progress.</p>
        </UCard>
        <UCard class="support-card stack">
          <UIcon name="i-lucide-badge-help" class="feature-icon" />
          <h2>FAQ</h2>
          <button class="question-option" type="button" @click="faqOpen = faqOpen === 'payment' ? '' : 'payment'">
            Can I pay on one screen?
          </button>
          <p v-if="faqOpen === 'payment'" class="muted">Yes. The selected plan, account fields and mocked Stripe element stay on checkout.</p>
          <UButton to="/plans" color="secondary">View Plans</UButton>
        </UCard>
      </div>
    </section>

    <footer class="footer">
      <div class="container">UK One Theory · Mock frontend MVP</div>
    </footer>
  </div>
</template>
