<script setup lang="ts">
const route = useRoute()
const { register } = useAuth()

const form = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: ''
})
const error = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''
  if (!form.email.includes('@') || form.password.length < 8) {
    error.value = 'Use a valid email and a password of at least 8 characters.'
    return
  }
  loading.value = true
  try {
    await register({
      email: form.email,
      password: form.password,
      first_name: form.firstName,
      last_name: form.lastName
    })
    await navigateTo(String(route.query.returnTo || '/plans'))
  } catch (err: unknown) {
    const data = (err as { data?: Record<string, string[] | string> })?.data
    if (data?.email) {
      error.value = Array.isArray(data.email) ? data.email[0] : String(data.email)
    } else {
      error.value = 'Unable to register. Check your details and try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="auth-shell">
    <form class="auth-card form" @submit.prevent="submit">
      <div class="auth-heading">
        <UBadge color="primary" variant="soft" icon="i-lucide-user-plus">New learner</UBadge>
        <h1>Create your account</h1>
        <p>Register to purchase access and save your progress.</p>
      </div>
      <label class="field">
        <span>First name</span>
        <input v-model="form.firstName" type="text" autocomplete="given-name">
      </label>
      <label class="field">
        <span>Last name</span>
        <input v-model="form.lastName" type="text" autocomplete="family-name">
      </label>
      <label class="field">
        <span>Email</span>
        <input v-model="form.email" type="email" autocomplete="email">
      </label>
      <label class="field">
        <span>Password</span>
        <input v-model="form.password" type="password" autocomplete="new-password">
      </label>
      <p v-if="error" class="field-error">{{ error }}</p>
      <button class="btn btn-primary btn-full" :disabled="loading" type="submit">
        {{ loading ? 'Creating account' : 'Create account' }}
      </button>
      <p class="muted" style="text-align:center;margin:0">
        Already registered?
        <NuxtLink class="auth-link" :to="{ path: '/login', query: route.query }">Log in</NuxtLink>
      </p>
    </form>
  </section>
</template>
