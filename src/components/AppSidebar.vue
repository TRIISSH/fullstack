<template>
  <aside class="sidebar">
    <div class="brand">📦 <span>Inventora</span></div>
    <nav>
      <router-link to="/" class="link">🏠 Dashboard</router-link>
      <router-link to="/products" class="link">📋 Products</router-link>
    </nav>
    <div class="foot">
      <span>{{ ps.products.length }} products</span>
      <span class="low">{{ ps.lowStock.length }} low stock</span>
    </div>
    <!-- v-for loops over every item in ps.products -->
    <!-- "product" = current item, ":key" must be unique per item -->
    <div class="test" v-for="product in ps.products" :key="product.id">
    {{ product.name }}
    </div>
  </aside>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'
const ps = useProductStore()  //access product store
</script>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  gap: 1rem;
  flex-shrink: 0;
}

.brand {
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.link {
  display: block;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius);
  color: var(--text-2);
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.2s;
}

.link:hover {
  background: var(--bg-card);
  color: var(--text);
}

.link.router-link-active {
  background: rgba(99, 102, 241, 0.18);
  color: var(--primary);
}

.foot {
  border-top: 1px solid var(--border);
  padding-top: 0.75rem;
  font-size: 0.78rem;
  color: var(--text-3);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.low {
  color: var(--danger);
}

.test {
  color: var(--primary);
}
</style>
