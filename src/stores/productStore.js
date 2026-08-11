import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Categories are static — no need for a separate store
export const CATEGORIES = [
  { id:1, name:'Electronics', icon:'💻', color:'#6366f1' },
  { id:2, name:'Clothing',    icon:'👕', color:'#f59e0b' },
  { id:3, name:'Food',        icon:'🍎', color:'#10b981' },
  { id:4, name:'Tools',       icon:'🔧', color:'#ef4444' },
]

export const useProductStore = defineStore('product', () => {
  const products = ref([
    { id:1, name:'Wireless Headphones', categoryId:1, price:79.99,  stock:45, minStock:10 },
    { id:2, name:'Cotton T-Shirt',      categoryId:2, price:19.99,  stock:8,  minStock:15 },
    { id:3, name:'Organic Apple Juice', categoryId:3, price:3.49,   stock:120,minStock:30 },
    { id:4, name:'Power Drill',         categoryId:4, price:149.99, stock:5,  minStock:5  },
  ])
  let nextId = 5

  const lowStock   = computed(() => products.value.filter(p => p.stock <= p.minStock))
  const totalValue = computed(() => products.value.reduce((s, p) => s + p.price * p.stock, 0))

  function addProduct(data) {
    products.value.push({ id: nextId++, ...data, stock: +data.stock, price: +data.price, minStock: +data.minStock })
  }

  function deleteProduct(id) {
    const i = products.value.findIndex(p => p.id === id)
    if (i !== -1) products.value.splice(i, 1)
  }

  function adjustStock(id, delta) {
    const p = products.value.find(p => p.id === id)
    if (p) p.stock = Math.max(0, p.stock + delta)
  }

  return { products, lowStock, totalValue, addProduct, deleteProduct, adjustStock }
})
