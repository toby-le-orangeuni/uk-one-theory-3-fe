<template>
  <header class="public-header">
    <div class="container nav-row">
      <NuxtLink class="brand" to="/">
        <span class="brand-mark">nu</span>
        <span>UK One Theory</span>
      </NuxtLink>
      <nav class="nav-links" aria-label="Public navigation">
        <NuxtLink to="/#how-it-works">How it works</NuxtLink>
        <NuxtLink to="/practice">Practice</NuxtLink>
        <NuxtLink to="/#pricing">Pricing</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
        <UButton to="/plans" color="secondary" size="lg" trailing-icon="i-lucide-arrow-right">
          View Plans
        </UButton>
      </nav>
    </div>
  </header>
</template>
