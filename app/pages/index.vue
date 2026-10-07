<script setup lang="ts">
const api = useMockApi()
const { data: plans, pending } = await useAsyncData('landing-plans', () => api.getPlans())
const sampleOpen = ref(false)
const faqOpen = ref('payment')
</script>

<template>
  <div>
    <section class="container hero">
      <div class="stack">
        <span class="pill">UK theory test preparation</span>
        <h1>Learn, practise and test readiness in one focused place.</h1>
        <p class="lead">
          A practical learner journey for lessons, videos, practice questions, mock tests and hazard preparation.
        </p>
        <div class="actions">
          <NuxtLink class="btn btn-primary" to="/plans">View Plans</NuxtLink>
          <button class="btn btn-secondary" type="button" @click="sampleOpen = !sampleOpen">
            Try sample questions
          </button>
        </div>
      </div>
      <div class="hero-panel">
        <div class="hero-road" aria-hidden="true">
          <span class="road-line" />
          <span class="road-line" />
          <span class="road-line" />
          <div class="sign-card">
            <strong>Next best action</strong>
            <p class="muted">Resume road signs, then take a ten-question practice session.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Everything You Need to Pass</h2>
            <p class="muted">Lessons, videos, practice, mock tests and hazard preparation.</p>
          </div>
          <NuxtLink class="btn btn-ghost" to="/plans">View Plans</NuxtLink>
        </div>
        <div class="grid grid-3">
          <article v-for="item in ['Theory lessons', 'Video explanations', 'Mock exam flow']" :key="item" class="card">
            <h2>{{ item }}</h2>
            <p class="muted">Clear learning blocks with progress feedback and a direct next step.</p>
          </article>
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
            <NuxtLink class="btn btn-primary" to="/plans">View Plans</NuxtLink>
          </template>
        </QuestionCard>
        <SystemState
          v-else
          title="Sample Questions"
          message="Open a sample card to see the practice feedback pattern used in the product."
          action-label="Try sample questions"
          action-to="/#how-it-works"
        />
      </div>
    </section>

    <section id="pricing" class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Pricing</h2>
            <p class="muted">Plan names, prices and ordering match checkout.</p>
          </div>
          <NuxtLink class="btn btn-secondary" to="/plans">Compare plans</NuxtLink>
        </div>
        <LoadingPanel v-if="pending" />
        <div v-else class="grid grid-3">
          <PlanCard v-for="plan in plans" :key="plan.id" :plan="plan" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container grid grid-2">
        <article class="card">
          <h2>Trust and method</h2>
          <p class="muted">The MVP keeps learners moving from explanation to practice to assessment without exposing internal order details.</p>
        </article>
        <article class="card stack">
          <h2>FAQ</h2>
          <button class="question-option" type="button" @click="faqOpen = faqOpen === 'payment' ? '' : 'payment'">
            Can I pay on one screen?
          </button>
          <p v-if="faqOpen === 'payment'" class="muted">Yes. The selected plan, account fields and mocked Stripe element stay on checkout.</p>
          <NuxtLink class="btn btn-primary" to="/plans">View Plans</NuxtLink>
        </article>
      </div>
    </section>

    <footer class="footer">
      <div class="container">UK One Theory · Mock frontend MVP</div>
    </footer>
  </div>
</template>
