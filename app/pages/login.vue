<script setup lang="ts">
const route = useRoute()
const { login } = useAuth()
const form = reactive({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''
  if (!form.email || !form.password) {
    error.value = 'Enter your email and password.'
    return
  }
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 250))
  login(form.email)
  await navigateTo(String(route.query.returnTo || '/dashboard'))
}
</script>

<template>
  <section class="auth-shell">
    <form class="auth-card form" @submit.prevent="submit">
      <div class="auth-heading">
        <UBadge color="primary" variant="soft" icon="i-lucide-lock-keyhole">Learner access</UBadge>
        <h1>Welcome back</h1>
        <p>Log in to continue lessons, practice questions and mock exam progress.</p>
      </div>
      <SystemState
        v-if="$route.query.expired"
        title="Subscription expired"
        message="Log in to view your account and choose a new plan."
        tone="warning"
      />
      <label class="field">
        <span>Email</span>
        <input v-model="form.email" type="email" placeholder="ava@example.com">
      </label>
      <label class="field">
        <span>Password</span>
        <input v-model="form.password" type="password" placeholder="Password">
      </label>
      <p v-if="error" class="field-error">{{ error }}</p>
      <button class="btn btn-primary btn-full" :disabled="loading" type="submit">
        {{ loading ? 'Logging in' : 'Log in' }}
      </button>
      <div class="auth-divider"><span>or</span></div>
      <button class="btn auth-social-button btn-full" type="button" @click="login('google@example.com')">
        <UIcon name="i-lucide-chrome" />
        Continue with Google
      </button>
      <NuxtLink class="auth-link" to="/forgot-password">Forgot password?</NuxtLink>
    </form>
  </section>
</template>
