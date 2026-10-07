<script setup lang="ts">
const api = useMockApi()
const { data: plans, pending } = await useAsyncData('landing-plans', () => api.getPlans())
const sampleOpen = ref(false)
const faqOpen = ref('payment')
const selectedVehicle = ref('Car')
const vehicles = ['Car', 'Motorcycle', 'Scooter']
</script>

<template>
  <div>
    <section class="hero-wrap">
      <div class="container hero">
        <div class="stack hero-copy">
          <UBadge color="secondary" variant="solid" size="lg">CBR-style UK theory prep</UBadge>
          <h1>Pass your theory with a clear route from lesson to mock exam.</h1>
          <p class="lead">
            Choose your vehicle, pick access, then study with videos, practice questions, hazard prep and progress feedback.
          </p>

          <div class="hero-steps" aria-label="Course selection steps">
            <UCard class="step-card">
              <div class="step-kicker">1 · Choose vehicle</div>
              <div class="vehicle-tabs">
                <button
                  v-for="vehicle in vehicles"
                  :key="vehicle"
                  class="vehicle-tab"
                  :class="{ active: selectedVehicle === vehicle }"
                  type="button"
                  @click="selectedVehicle = vehicle"
                >
                  {{ vehicle }}
                </button>
              </div>
            </UCard>
            <UCard class="step-card">
              <div class="step-kicker">2 · Choose course</div>
              <div class="course-choice">
                <strong>Online theory</strong>
                <span>Most flexible</span>
                <span class="price-small">from GBP 5</span>
              </div>
            </UCard>
          </div>

          <div class="actions">
            <UButton to="/plans" color="secondary" size="xl" trailing-icon="i-lucide-arrow-right">
              Start now
            </UButton>
            <UButton color="neutral" variant="outline" size="xl" icon="i-lucide-circle-play" @click="sampleOpen = !sampleOpen">
              Try sample questions
            </UButton>
          </div>
        </div>
        <UCard class="hero-panel">
          <div class="score-board">
            <div>
              <span>1.2M+</span>
              <small>Learners passed</small>
            </div>
            <div>
              <span>5/5</span>
              <small>Review score</small>
            </div>
            <div>
              <span>24/7</span>
              <small>Online access</small>
            </div>
          </div>
          <div class="hero-road" aria-hidden="true">
            <span class="road-line" />
            <span class="road-line" />
            <span class="road-line" />
            <div class="sign-card">
              <strong>Next best action</strong>
              <p class="muted">Finish road signs, then take a ten-question practice set.</p>
            </div>
          </div>
        </UCard>
      </div>
    </section>

    <section class="trust-strip">
      <div class="container trust-grid">
        <div><strong>1 minute</strong><span>to get started</span></div>
        <div><strong>CBR-style</strong><span>practice and explanations</span></div>
        <div><strong>Videos included</strong><span>watch, pause and repeat</span></div>
      </div>
    </section>

    <section id="how-it-works" class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <h2>Everything You Need to Pass</h2>
            <p class="muted">Lessons, videos, practice, mock tests and hazard preparation.</p>
          </div>
          <UButton to="/plans" color="neutral" variant="outline">View Plans</UButton>
        </div>
        <div class="grid grid-3">
          <UCard v-for="item in ['Theory lessons', 'Video explanations', 'Mock exam flow']" :key="item" class="feature-card">
            <UIcon name="i-lucide-badge-check" class="feature-icon" />
            <h2>{{ item }}</h2>
            <p class="muted">Clear learning blocks with progress feedback and a direct next step.</p>
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
        <UCard>
          <h2>Trust and method</h2>
          <p class="muted">The MVP keeps learners moving from explanation to practice to assessment without exposing internal order details.</p>
        </UCard>
        <UCard class="stack">
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
