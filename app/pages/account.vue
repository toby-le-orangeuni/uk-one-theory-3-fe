<script setup lang="ts">
definePageMeta({ layout: 'app' })

const api = useMockApi()
const { accessStatus, activateMockAccess, expireAccess } = useAuth()
const { data: profile } = await useAsyncData('account-profile', () => api.getProfile())
const saved = ref(false)
</script>

<template>
  <section class="app-page">
    <div class="app-page-hero">
      <div>
        <span class="app-eyebrow">
          <UIcon name="i-lucide-user-round-cog" />
          Learner account
        </span>
        <h1>Account</h1>
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

    <div class="account-grid">
      <article class="panel form">
        <span class="app-eyebrow">
          <UIcon name="i-lucide-id-card" />
          Profile
        </span>
        <h2>Profile details</h2>
        <label class="field">
          <span>Name</span>
          <input :value="profile?.name" type="text">
        </label>
        <label class="field">
          <span>Email</span>
          <input :value="profile?.email" type="email">
        </label>
        <button class="btn btn-primary" type="button" @click="saved = true">Save profile</button>
        <p v-if="saved" class="pill">Profile saved</p>
      </article>

      <article class="panel stack">
        <span class="app-eyebrow">
          <UIcon name="i-lucide-key-round" />
          Access
        </span>
        <h2>Current access</h2>
        <div class="account-access-list">
          <span>Plan</span>
          <strong>{{ profile?.planId }}</strong>
          <span>Start</span>
          <strong>2026-10-07</strong>
          <span>End</span>
          <strong>{{ profile?.accessUntil }}</strong>
          <span>Status</span>
          <strong>
            <span :class="accessStatus === 'expired' ? 'pill pill-danger' : 'pill'">{{ accessStatus }}</span>
          </strong>
        </div>
        <div class="dev-tools">
          <span>Mock state controls</span>
          <div class="actions">
            <button class="btn btn-ghost" type="button" @click="activateMockAccess">Set active</button>
            <button class="btn btn-ghost" type="button" @click="expireAccess">Set expired</button>
          </div>
        </div>
      </article>
    </div>

    <article class="panel stack">
      <span class="app-eyebrow">
        <UIcon name="i-lucide-shield-check" />
        Security
      </span>
      <h2>Security</h2>
      <div class="actions">
        <button class="btn btn-ghost" type="button">Change password</button>
        <button class="btn btn-ghost" type="button">Change email</button>
      </div>
    </article>
  </section>
</template>
