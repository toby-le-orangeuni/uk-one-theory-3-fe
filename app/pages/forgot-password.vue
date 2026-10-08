<script setup lang="ts">
const email = ref('')
const submitted = ref(false)
const error = ref('')

const submit = () => {
  if (!email.value.includes('@')) {
    error.value = 'Enter a valid email address.'
    return
  }
  error.value = ''
  submitted.value = true
}
</script>

<template>
  <section class="auth-shell">
    <form class="auth-card form" @submit.prevent="submit">
      <div class="auth-heading">
        <UBadge color="primary" variant="soft" icon="i-lucide-mail">Account recovery</UBadge>
        <h1>Reset password</h1>
        <p>Enter your email. If an account exists, a reset link will be sent.</p>
      </div>
      <label class="field">
        <span>Email</span>
        <input v-model="email" type="email" placeholder="you@example.com">
      </label>
      <p v-if="error" class="field-error">{{ error }}</p>
      <SystemState
        v-if="submitted"
        title="Check your email"
        message="If that email is registered, the reset link is on its way."
      />
      <button class="btn btn-primary btn-full" type="submit">Send reset link</button>
      <NuxtLink class="auth-link" to="/login">Return to login</NuxtLink>
    </form>
  </section>
</template>
