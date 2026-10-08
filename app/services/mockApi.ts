import type { Lesson, Plan, Question, ResultSummary, UserProfile } from '~/types/domain'

const wait = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms))

export const plans: Plan[] = [
  {
    id: '7-day',
    name: '7 days',
    durationDays: 7,
    priceGbp: 5,
    status: 'available',
    includes: ['All theory lessons', 'Practice questions', 'One mock exam']
  },
  {
    id: '30-day',
    name: '30 days',
    durationDays: 30,
    priceGbp: 15,
    recommended: true,
    status: 'available',
    includes: ['Everything in 7 days', 'Unlimited mock exams', 'Hazard practice']
  },
  {
    id: '90-day',
    name: '90 days',
    durationDays: 90,
    priceGbp: 25,
    status: 'available',
    includes: ['Everything in 30 days', 'Longer revision window', 'Progress history']
  }
]

export const profile: UserProfile = {
  name: 'Ava Learner',
  email: 'ava@example.com',
  accessStatus: 'active',
  planId: '30-day',
  accessUntil: '2026-11-06'
}

export const lessons: Lesson[] = [
  {
    id: 'road-signs',
    chapter: 'Chapter 1',
    title: 'Road signs and markings',
    duration: '18 min',
    status: 'In-progress',
    summary: 'Understand common signs, road markings, and priority rules.',
    videoState: 'Ready'
  },
  {
    id: 'alertness',
    chapter: 'Chapter 1',
    title: 'Alertness and observation',
    duration: '14 min',
    status: 'Available',
    summary: 'Build safe habits for scanning, mirrors, and anticipating risk.',
    videoState: 'Loading'
  },
  {
    id: 'motorways',
    chapter: 'Chapter 2',
    title: 'Motorway rules',
    duration: '20 min',
    status: 'Locked',
    summary: 'Lane discipline, joining, leaving, speed control, and breakdowns.',
    videoState: 'Unavailable'
  },
  {
    id: 'vulnerable-road-users',
    chapter: 'Chapter 2',
    title: 'Vulnerable road users',
    duration: '16 min',
    status: 'Completed',
    summary: 'Cyclists, pedestrians, horse riders, and shared-space judgement.',
    videoState: 'Ready'
  }
]

export const questions: Question[] = [
  {
    id: 'q1',
    topic: 'Road signs',
    text: 'What should you do when you see a triangular warning sign?',
    options: ['Speed up to clear the area', 'Look for a hazard ahead', 'Stop immediately'],
    answerIndex: 1,
    explanation: 'Triangular signs warn you about hazards ahead, so slow down and prepare to respond.'
  },
  {
    id: 'q2',
    topic: 'Alertness',
    text: 'Why should you check mirrors before changing speed?',
    options: ['To see how your action affects traffic behind', 'To avoid using signals', 'To check your fuel level'],
    answerIndex: 0,
    explanation: 'Mirror checks help you understand what is behind before braking, accelerating, or changing direction.'
  },
  {
    id: 'q3',
    topic: 'Hazard perception',
    text: 'A child is waiting near a zebra crossing. What is the safest response?',
    options: ['Maintain speed', 'Prepare to slow or stop', 'Sound the horn early'],
    answerIndex: 1,
    explanation: 'Children can be unpredictable. Prepare to slow and give them time to cross safely.'
  }
]

export const latestResult: ResultSummary = {
  id: 'attempt-1024',
  score: 43,
  total: 50,
  passed: true,
  date: '2026-10-06',
  weakAreas: ['Motorway rules', 'Vehicle handling in poor weather']
}

export const mockApi = {
  async getPlans() {
    await wait()
    return plans
  },
  async getPlan(planId: string) {
    await wait()
    return plans.find((plan) => plan.id === planId)
  },
  async getProfile() {
    await wait()
    return profile
  },
  async getLessons() {
    await wait()
    return lessons
  },
  async getLesson(lessonId: string) {
    await wait()
    return lessons.find((lesson) => lesson.id === lessonId)
  },
  async getQuestions() {
    await wait()
    return questions
  },
  async getResult() {
    await wait()
    return latestResult
  }
}
