export type PlanStatus = 'available' | 'unavailable'
export type AccessStatus = 'active' | 'expired' | 'pending'
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
  firstName?: string
  lastName?: string
  phone?: string
  postcode?: string
  startsAt?: string
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

export interface OrderSummary {
  id: string
  packageSlug: string
  packageName: string
  amount: string
  currency: string
  status: string
  paidAt: string | null
  createdAt: string
}
