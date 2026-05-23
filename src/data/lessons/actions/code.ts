import type { LessonCode } from '../types'

export const actionsCode: LessonCode = {
  title: '把购物车规则收敛到 Action',
  snippet: `import { create } from 'zustand'

type CartItem = {
  id: string
  name: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((entry) => entry.id === item.id)

      // 业务规则集中在 action 中：重复商品只增加数量。
      if (existing) {
        return {
          items: state.items.map((entry) =>
            entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
          ),
        }
      }

      return { items: [...state.items, { ...item, quantity: 1 }] }
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clearCart: () => set({ items: [] }),
}))`,
}
