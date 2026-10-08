<template>
  <header class="public-header">
    <div class="container nav-row">
      <NuxtLink class="brand" to="/">
        <span class="brand-mark">nu</span>
        <span>UK One Theory</span>
      </NuxtLink>
      <nav class="nav-links" aria-label="Public navigation">
        <NuxtLink to="/#how-it-works">How it works</NuxtLink>
        <NuxtLink to="/#try">Try question</NuxtLink>
        <NuxtLink to="/#pricing">Pricing</NuxtLink>
        <NuxtLink to="/#help">FAQ</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
        <UButton to="/plans" color="secondary" size="lg" trailing-icon="i-lucide-arrow-right">
          Get started
        </UButton>
      </nav>
    </div>
  </header>
</template>
