<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <router-link to="/products" class="btn btn-primary">View Products →</router-link>
    </div>

    <!-- 4 quick stats -->
    <div class="stats">
      <div class="stat-card">
        <div class="sv">{{ ps.products.length }}</div>
        <div class="sl">Total Products</div>
      </div>
      <div class="stat-card">
        <div class="sv">{{ totalStock }}</div>
        <div class="sl">Total Stock</div>
      </div>
      <div class="stat-card">
        <div class="sv">${{ ps.totalValue.toFixed(2) }}</div>
        <div class="sl">Inventory Value</div>
      </div>
      <div class="stat-card warn">
        <div class="sv">{{ ps.lowStock.length }}</div>
        <div class="sl">Low Stock Alerts</div>
      </div>
    </div>

    <!-- Low stock list -->
    <div class="card">
      <h2 class="section-title">⚠️ Low Stock</h2>
      <p v-if="!ps.lowStock.length" class="text-muted">All products are well stocked.</p>
      <div v-else class="list">
        <div v-for="p in ps.lowStock" :key="p.id" class="row">
          <span>{{ p.name }}</span>
          <span class="badge badge-warning">{{ p.stock }} / {{ p.minStock }} min</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'
const ps = useProductStore()
const totalStock = computed(() => ps.products.reduce((s, p) => s + p.stock, 0))
</script>

<style scoped>
.stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:1rem; margin-bottom:1.5rem; }
.stat-card { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-lg); padding:1.25rem; text-align:center; }
.stat-card.warn .sv { color:var(--danger); }
.sv { font-size:1.6rem; font-weight:700; }
.sl { font-size:.75rem; color:var(--text-2); text-transform:uppercase; margin-top:.2rem; }
.list { display:flex; flex-direction:column; gap:.5rem; }
.row { display:flex; justify-content:space-between; align-items:center; padding:.6rem .75rem; background:rgba(255,255,255,.02); border:1px solid var(--border); border-radius:var(--radius); font-size:.875rem; }
</style>
