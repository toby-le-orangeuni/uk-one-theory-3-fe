export type PlanStatus = 'Available' | 'Unavailable'
export type AccessStatus = 'Active' | 'Expired' | 'Pending'
export type LessonStatus = 'Locked' | 'Available' | 'In-progress' | 'Completed'

export interface Plan {
  id: string
  name: string
  durationDays: number
  priceGbp: number
  recommended?: boolean
  status: PlanStatus
  includes: string[]
}

export interface UserProfile {
  name: string
  email: string
  accessStatus: AccessStatus
  planId: string
  accessUntil: string
}

export interface Lesson {
  id: string
  chapter: string
  title: string
  duration: string
  status: LessonStatus
  summary: string
  videoState?: 'Ready' | 'Loading' | 'Unavailable'
}

export interface Question {
  id: string
  topic: string
  text: string
  options: string[]
  answerIndex: number
  explanation: string
}

export interface ResultSummary {
  id: string
  score: number
  total: number
  passed: boolean
  date: string
  weakAreas: string[]
}
