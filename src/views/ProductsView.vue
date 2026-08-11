<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Products</h1>
    </div>

    <!-- Add product form -->
    <div class="card" style="margin-bottom:1.5rem">
      <h2 class="section-title">Add Product</h2>
      <form class="form-row" @submit.prevent="add">
        <input v-model="f.name"     class="form-input" placeholder="Name *"      required />
        <input v-model="f.price"    class="form-input" placeholder="Price *"     type="number" min="0" step="0.01" required />
        <input v-model="f.stock"    class="form-input" placeholder="Stock *"     type="number" min="0" required />
        <input v-model="f.minStock" class="form-input" placeholder="Min Stock *" type="number" min="0" required />
        <select v-model="f.categoryId" class="form-select" required>
          <option value="" disabled>Category…</option>
          <option v-for="c in CATEGORIES" :key="c.id" :value="c.id">{{ c.icon }} {{ c.name }}</option>
        </select>
        <button type="submit" class="btn btn-primary">＋ Add</button>
      </form>
    </div>

    <!-- Product list -->
    <div class="card">
      <h2 class="section-title">All Products ({{ ps.products.length }})</h2>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            <tr v-for="p in ps.products" :key="p.id">
              <td>{{ p.name }}</td>
              <td>{{ cat(p.categoryId) }}</td>
              <td>${{ p.price.toFixed(2) }}</td>
              <td>
                <span :class="['badge', p.stock <= p.minStock ? 'badge-warning' : 'badge-success']">{{ p.stock }}</span>
              </td>
              <td class="actions">
                <button class="btn btn-sm btn-success" @click="ps.adjustStock(p.id, 10)">+10</button>
                <button class="btn btn-sm btn-danger"  @click="ps.adjustStock(p.id, -10)">-10</button>
                <button class="btn btn-sm btn-danger"  @click="ps.deleteProduct(p.id)">🗑</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProductStore, CATEGORIES } from '../stores/productStore'

const ps = useProductStore()
const f  = ref({ name:'', price:'', stock:'', minStock:'5', categoryId:'' })

const cat = id => CATEGORIES.find(c => c.id === id)?.icon + ' ' + CATEGORIES.find(c => c.id === id)?.name ?? '—'

function add() {
  ps.addProduct({ ...f.value })
  f.value = { name:'', price:'', stock:'', minStock:'5', categoryId:'' }
}
</script>

<style scoped>
.form-row { display:flex; gap:.75rem; flex-wrap:wrap; }
.form-row .form-input,
.form-row .form-select { flex:1; min-width:120px; }
.actions { display:flex; gap:.4rem; }
</style>
