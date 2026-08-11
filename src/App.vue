<template>
  <div class="shell">
    <AppSidebar />
    <main class="content"><router-view /></main>
  </div>
</template>

<script setup>
import AppSidebar from './components/AppSidebar.vue'
</script>

<style scoped>
.shell { display:flex; min-height:100vh; }
.content { flex:1; padding:2rem; background:var(--bg-main); overflow-y:auto; }
</style>
