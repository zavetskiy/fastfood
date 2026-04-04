import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const STORAGE_KEY = 'techstore_cart_items'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalCount: 0,

      addToCart: (product) => {
        const items = get().items
        const existing = items.find((item) => item.id === product.id)

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            totalCount: get().totalCount + 1,
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
            totalCount: get().totalCount + 1,
          })
        }
      },

      removeFromCart: (id) => {
        const items = get().items
        const item = items.find((i) => i.id === id)
        if (item) {
          set({
            items: items.filter((i) => i.id !== id),
            totalCount: Math.max(0, get().totalCount - item.quantity),
          })
        }
      },

      decreaseItem: (id) => {
        const items = get().items
        const existing = items.find((item) => item.id === id)
        if (!existing) return

        if (existing.quantity <= 1) {
          get().removeFromCart(id)
        } else {
          set({
            items: items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
            totalCount: get().totalCount - 1,
          })
        }
      },

      clearCart: () => {
        set({ items: [], totalCount: 0 })
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ items: state.items }),
    }
  )
)
