<template>
  <header class="public-header">
    <div class="container nav-row">
      <NuxtLink class="brand" to="/">
        <span class="brand-mark">1</span>
        <span>UK One Theory</span>
      </NuxtLink>
      <nav class="nav-links" aria-label="Public navigation">
        <NuxtLink to="/#how-it-works">How it works</NuxtLink>
        <NuxtLink to="/practice">Practice</NuxtLink>
        <NuxtLink to="/#pricing">Pricing</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
        <NuxtLink class="btn btn-primary" to="/plans">View Plans</NuxtLink>
      </nav>
    </div>
  </header>
</template>
