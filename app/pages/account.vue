<script setup lang="ts">
definePageMeta({ layout: 'app' })

const api = useMockApi()
const { accessStatus, activateMockAccess } = useAuth()
const { data: profile } = await useAsyncData('account-profile', () => api.getProfile())
const saved = ref(false)
</script>

<template>
  <section class="stack">
    <div class="section-header">
      <div>
        <h1 class="page-title">Account</h1>
        <p class="lead">Profile details, access period and subscription state.</p>
      </div>
    </div>

    <SystemState
      v-if="accessStatus === 'expired' || $route.query.state === 'expired'"
      title="Access expired"
      message="Lessons, practice and mock exams are locked until a new plan is selected."
      action-label="View plans"
      action-to="/plans"
      tone="warning"
    />

    <div class="grid grid-2">
      <article class="panel form">
        <h2>Profile details</h2>
        <label class="field">
          <span>Name</span>
          <input :value="profile?.name" type="text">
        </label>
        <label class="field">
          <span>Email</span>
          <input :value="profile?.email" type="email">
        </label>
        <button class="btn btn-primary" type="button" @click="saved = true">Edit profile</button>
        <p v-if="saved" class="pill">Profile saved</p>
      </article>

      <article class="panel stack">
        <h2>Current access</h2>
        <p><strong>Plan:</strong> {{ profile?.planId }}</p>
        <p><strong>Start:</strong> 2026-10-07</p>
        <p><strong>End:</strong> {{ profile?.accessUntil }}</p>
        <p>
          <strong>Status:</strong>
          <span :class="accessStatus === 'expired' ? 'pill pill-danger' : 'pill'">{{ accessStatus }}</span>
        </p>
        <button class="btn btn-secondary" type="button" @click="activateMockAccess">Mock active access</button>
      </article>
    </div>

    <article class="panel stack">
      <h2>Security</h2>
      <div class="actions">
        <button class="btn btn-secondary" type="button">Change password</button>
        <button class="btn btn-secondary" type="button">Change email</button>
      </div>
    </article>
  </section>
</template>
