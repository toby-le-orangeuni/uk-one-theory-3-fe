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
  <section class="container section">
    <form class="panel form" style="max-width: 520px; margin: 0 auto;" @submit.prevent="submit">
      <h1 class="page-title">Login</h1>
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
      <button class="btn btn-primary" :disabled="loading" type="submit">
        {{ loading ? 'Logging in' : 'Log in' }}
      </button>
      <button class="btn btn-secondary" type="button" @click="login('google@example.com')">Continue with Google</button>
      <NuxtLink class="muted" to="/forgot-password">Forgot password?</NuxtLink>
    </form>
  </section>
</template>
