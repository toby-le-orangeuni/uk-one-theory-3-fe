import { mockApi } from '~/services/mockApi'
import { useRealApi } from '~/services/realApi'

export const useApi = () => {
  const real = useRealApi()

  return {
    getPlans: real.getPackages,
    getPlan: real.getPackage,
    getProfile: async () => {
      const { profile } = await real.getProfileBundle()
      return profile
    },
    updateProfile: real.updateCabinetProfile,
    getAccess: real.getAccess,
    getSubscription: real.getSubscription,
    getOrders: real.getOrders,
    createCheckoutSession: real.createCheckoutSession,
    getCheckoutSession: real.getCheckoutSession,
    simulateCheckoutPayment: real.simulateCheckoutPayment,
    getLessons: mockApi.getLessons,
    getLesson: mockApi.getLesson,
    getQuestions: mockApi.getQuestions,
    getResult: mockApi.getResult
  }
}
