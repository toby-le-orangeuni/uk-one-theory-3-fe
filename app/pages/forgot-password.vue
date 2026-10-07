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
  <section class="container section">
    <form class="panel form" style="max-width: 520px; margin: 0 auto;" @submit.prevent="submit">
      <h1 class="page-title">Reset password</h1>
      <p class="muted">Enter your email. If an account exists, a reset link will be sent.</p>
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
      <button class="btn btn-primary" type="submit">Send reset link</button>
      <NuxtLink class="muted" to="/login">Return to login</NuxtLink>
    </form>
  </section>
</template>
