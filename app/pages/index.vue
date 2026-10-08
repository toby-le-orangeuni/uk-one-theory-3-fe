<script setup lang="ts">
const api = useMockApi()
const { data: plans, pending } = await useAsyncData('landing-plans', () => api.getPlans())

const activePreview = ref('lesson')
const sampleIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const submittedAnswer = ref(false)
const openFaq = ref('payment')

const previews = [
  {
    id: 'lesson',
    label: 'Lesson',
    icon: 'i-lucide-play-circle',
    title: 'One clear idea at a time',
    detail: 'Watch a short lesson, read the key rule, then practise immediately.',
    metric: '4 min',
    metricLabel: 'lesson'
  },
  {
    id: 'practice',
    label: 'Practice',
    icon: 'i-lucide-message-circle-question',
    title: 'Every answer explains why',
    detail: 'Learners see the reason behind the answer instead of memorising blindly.',
    metric: '8/10',
    metricLabel: 'topic score'
  },
  {
    id: 'hazard',
    label: 'Hazard',
    icon: 'i-lucide-radar',
    title: 'Spot the developing risk',
    detail: 'Timed hazard-style scenarios prepare learners for quick judgement.',
    metric: '5 pts',
    metricLabel: 'best score'
  }
]

const featureBlocks = [
  {
    title: 'Theory lessons',
    description: 'Short guided lessons with the rule, example and next action kept together.',
    icon: 'i-lucide-book-open-check'
  },
  {
    title: 'Practice questions',
    description: 'Topic-based questions with instant explanations after each answer.',
    icon: 'i-lucide-list-checks'
  },
  {
    title: 'Mock exams',
    description: 'Test-style sessions that show pass/fail, weak areas and what to revise.',
    icon: 'i-lucide-clipboard-check'
  },
  {
    title: 'Hazard preparation',
    description: 'Fast hazard-style practice with countdown states and clear feedback.',
    icon: 'i-lucide-traffic-cone'
  }
]

const howItWorks = [
  {
    step: '01',
    title: 'Choose access',
    description: 'Pick 7, 30 or 90 days. One payment gives the learner access to the same core study flow.'
  },
  {
    step: '02',
    title: 'Study in short bursts',
    description: 'Continue lessons, answer practice questions and learn from explanations in one place.'
  },
  {
    step: '03',
    title: 'Check readiness',
    description: 'Use mock exam results, hazard practice and progress feedback to know what to revise next.'
  }
]

const sampleQuestions = [
  {
    topic: 'Motorways',
    text: 'What should you do before moving back to the left lane after overtaking?',
    options: ['Check mirrors and make sure there is a safe gap', 'Signal right again', 'Brake sharply to create space'],
    answerIndex: 0,
    explanation: 'Check your mirrors and only move left when the vehicle you passed is safely behind you.'
  },
  {
    topic: 'Road signs',
    text: 'What does a triangular road sign usually warn you about?',
    options: ['A hazard ahead', 'A parking restriction', 'A motorway service area'],
    answerIndex: 0,
    explanation: 'Triangular signs warn about hazards, so the safe response is to slow down and prepare.'
  },
  {
    topic: 'Hazard perception',
    text: 'A child is standing near a zebra crossing. What should you do first?',
    options: ['Prepare to slow down', 'Flash your headlights', 'Accelerate through quickly'],
    answerIndex: 0,
    explanation: 'Children can move unpredictably. Preparing to slow gives you time to stop safely.'
  }
]

const reassurance = [
  { title: 'One-off access', text: 'The purchase flow uses fixed access periods, not a recurring subscription.', icon: 'i-lucide-credit-card', tone: 'amber' },
  { title: 'Safe checkout preview', text: 'The purchase screen is simulated while the real payment service is still out of scope.', icon: 'i-lucide-shield-check', tone: 'green' },
  { title: 'Any device', text: 'The learner journey is responsive for phone, tablet and desktop review.', icon: 'i-lucide-smartphone', tone: 'blue' }
]

const faqs = [
  {
    id: 'payment',
    question: 'Is payment real right now?',
    answer: 'No. This frontend uses a simulated checkout, so no card is charged while the payment integration is out of scope.'
  },
  {
    id: 'included',
    question: 'What does access include?',
    answer: 'The public plan leads into lessons, practice, mock exams, hazard preparation, results and progress screens.'
  },
  {
    id: 'renewal',
    question: 'Is this a subscription?',
    answer: 'No. Access is shown as fixed windows such as 7, 30 and 90 days, with no auto-renewal in this flow.'
  }
]

const selectedPreview = computed(() => previews.find((item) => item.id === activePreview.value) ?? previews[0])
const sampleQuestion = computed(() => sampleQuestions[sampleIndex.value])
const sampleComplete = computed(() => sampleIndex.value === sampleQuestions.length - 1 && submittedAnswer.value)

const chooseAnswer = (index: number) => {
  if (!submittedAnswer.value) {
    selectedAnswer.value = index
  }
}

const submitAnswer = () => {
  if (selectedAnswer.value !== null) {
    submittedAnswer.value = true
  }
}

const resetAnswer = () => {
  selectedAnswer.value = null
  submittedAnswer.value = false
}

const nextSampleQuestion = () => {
  if (sampleIndex.value < sampleQuestions.length - 1) {
    sampleIndex.value += 1
  } else {
    sampleIndex.value = 0
  }
  resetAnswer()
}
</script>

<template>
  <div>
    <section class="landing-hero">
      <div class="container hero-grid hero-grid-product">
        <div class="hero-copy">
          <div class="proof-row">
            <UBadge color="primary" variant="soft" size="lg" icon="i-lucide-shield-check">UK theory learner journey</UBadge>
            <UBadge color="neutral" variant="outline" size="lg">One-off access flow</UBadge>
          </div>

          <h1>Pass-ready theory practice, from first lesson to mock test.</h1>
          <p class="lead">
            A focused learning flow for UK theory learners: short lessons, explained questions, hazard preparation, mock exams and practical progress feedback.
          </p>

          <div class="actions">
            <UButton to="/plans" color="secondary" size="xl" trailing-icon="i-lucide-arrow-right">
              Get started from GBP 5
            </UButton>
            <UButton color="neutral" variant="outline" size="xl" icon="i-lucide-circle-play" to="/#try">
              Try a question
            </UButton>
          </div>

          <div class="hero-stat-row">
            <div>
              <strong>43/50</strong>
              <span>mock pass target</span>
            </div>
            <div>
              <strong>3 routes</strong>
              <span>lesson, practice, exam</span>
            </div>
            <div>
              <strong>1 place</strong>
              <span>study and progress</span>
            </div>
          </div>
        </div>

        <UCard class="product-preview-card">
          <div class="preview-topline">
            <span>Learning preview</span>
            <UBadge color="primary" variant="soft">Interactive</UBadge>
          </div>

          <div class="preview-tabs" aria-label="Learning preview">
            <button
              v-for="item in previews"
              :key="item.id"
              type="button"
              class="preview-tab"
              :class="{ active: activePreview === item.id }"
              @click="activePreview = item.id"
            >
              <UIcon :name="item.icon" />
              <span>{{ item.label }}</span>
            </button>
          </div>

          <div class="preview-stage">
            <div class="readiness-ring">
              <span>{{ selectedPreview.metric }}</span>
              <small>{{ selectedPreview.metricLabel }}</small>
            </div>
            <div>
              <h2>{{ selectedPreview.title }}</h2>
              <p class="muted">{{ selectedPreview.detail }}</p>
            </div>
          </div>

          <div class="mini-progress">
            <div>
              <span>Lessons</span>
              <strong>62%</strong>
            </div>
            <div class="progress-track">
              <span class="progress-fill" style="width: 62%" />
            </div>
            <div>
              <span>Practice</span>
              <strong>78%</strong>
            </div>
            <div class="progress-track">
              <span class="progress-fill" style="width: 78%" />
            </div>
          </div>

          <UButton block to="/dashboard" color="primary" size="lg" trailing-icon="i-lucide-arrow-right">
            Preview student dashboard
          </UButton>
        </UCard>
      </div>
    </section>

    <section id="how-it-works" class="section section-tinted">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-kicker">Everything needed to pass</p>
            <h2>Turn the wireframe features into one learning product.</h2>
          </div>
        </div>

        <div class="feature-mosaic">
          <UCard v-for="item in featureBlocks" :key="item.title" class="feature-card feature-card-rich">
            <span class="feature-icon-badge">
              <UIcon :name="item.icon" class="feature-icon" />
            </span>
            <h3>{{ item.title }}</h3>
            <p class="muted">{{ item.description }}</p>
          </UCard>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-kicker">How it works</p>
            <h2>A simple path from purchase to readiness.</h2>
          </div>
        </div>

        <div class="journey-steps">
          <article v-for="item in howItWorks" :key="item.step" class="journey-step">
            <span>{{ item.step }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="try" class="section section-dark">
      <div class="container try-grid">
        <div class="try-copy">
          <p class="section-kicker">Sample content</p>
          <h2>Show the learner value before checkout.</h2>
          <p>
            Try a real-style question, get immediate feedback, then continue into the access plan that fits your timeline.
          </p>
          <UButton to="/plans" class="try-copy-cta" color="secondary" size="lg" trailing-icon="i-lucide-arrow-right">
            Choose access
          </UButton>
        </div>

        <div class="sample-card">
          <div class="sample-card-head">
            <span>{{ sampleQuestion.topic }}</span>
            <small>Question {{ sampleIndex + 1 }} of {{ sampleQuestions.length }}</small>
          </div>
          <h3>{{ sampleQuestion.text }}</h3>
          <div class="sample-progress" aria-hidden="true">
            <span :style="{ width: `${((sampleIndex + (submittedAnswer ? 1 : 0)) / sampleQuestions.length) * 100}%` }" />
          </div>

          <div class="stack">
            <button
              v-for="(option, index) in sampleQuestion.options"
              :key="option"
              type="button"
              class="question-option sample-option"
              :class="{
                selected: selectedAnswer === index && !submittedAnswer,
                correct: submittedAnswer && index === sampleQuestion.answerIndex,
                incorrect: submittedAnswer && selectedAnswer === index && index !== sampleQuestion.answerIndex
              }"
              :disabled="submittedAnswer"
              @click="chooseAnswer(index)"
            >
              <span>{{ String.fromCharCode(65 + index) }}</span>
              <span>{{ option }}</span>
            </button>
          </div>

          <div v-if="submittedAnswer" class="answer-explanation">
            <strong>{{ selectedAnswer === sampleQuestion.answerIndex ? 'Correct' : 'Not quite' }}</strong>
            <p>{{ sampleQuestion.explanation }}</p>
          </div>

          <div class="actions">
            <UButton v-if="!submittedAnswer" color="secondary" :disabled="selectedAnswer === null" @click="submitAnswer">
              Check answer
            </UButton>
            <UButton v-else color="primary" trailing-icon="i-lucide-arrow-right" @click="nextSampleQuestion">
              {{ sampleComplete ? 'Restart sample' : 'Next question' }}
            </UButton>
            <UButton v-if="submittedAnswer" color="neutral" variant="outline" @click="resetAnswer">Try again</UButton>
          </div>
        </div>
      </div>
    </section>

    <section id="pricing" class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <p class="section-kicker">Pricing</p>
            <h2>Choose access before checkout.</h2>
            <p class="muted">Plan names, prices and order stay consistent from landing to checkout.</p>
          </div>
        </div>
        <LoadingPanel v-if="pending" />
        <div v-else class="grid grid-3">
          <PlanCard v-for="plan in plans" :key="plan.id" :plan="plan" />
        </div>
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container trust-grid">
        <div>
          <p class="section-kicker">Trust and method</p>
          <h2>Reduce purchase risk before checkout.</h2>
          <p class="muted">The page explains what access includes, how payment works in this preview and what the learner can do next.</p>
        </div>

        <div class="reassurance-grid">
          <article v-for="item in reassurance" :key="item.title" class="reassurance-card" :class="`reassurance-card-${item.tone}`">
            <span class="reassurance-icon">
              <UIcon :name="item.icon" />
            </span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="help" class="section">
      <div class="container faq-grid">
        <div>
          <p class="section-kicker">FAQ</p>
          <h2>Questions before starting.</h2>
          <p class="muted">Keep answers practical, learner-facing and aligned with the simulated checkout.</p>
        </div>

        <div class="faq-list">
          <button
            v-for="item in faqs"
            :key="item.id"
            class="faq-item"
            type="button"
            @click="openFaq = openFaq === item.id ? '' : item.id"
          >
            <span>
              <strong>{{ item.question }}</strong>
              <small v-if="openFaq === item.id">{{ item.answer }}</small>
            </span>
            <UIcon :name="openFaq === item.id ? 'i-lucide-minus' : 'i-lucide-plus'" />
          </button>
        </div>
      </div>
    </section>

    <section class="final-cta">
      <div class="container final-cta-inner">
        <div>
          <p class="section-kicker">Ready to continue?</p>
          <h2>Start with the access window that matches the learner’s test date.</h2>
        </div>
        <UButton to="/plans" color="secondary" size="xl" trailing-icon="i-lucide-arrow-right">
          Get started
        </UButton>
      </div>
    </section>

    <footer class="footer">
      <div class="container">UK One Theory · Frontend preview · Not affiliated with the DVSA</div>
    </footer>
  </div>
</template>
