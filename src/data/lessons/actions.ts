import type { Lesson } from './types'

const actionCode = `import { create } from 'zustand'

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
}))`

export const actionsLesson: Lesson = {
  id: 'actions',
  number: '03',
  title: 'Action 设计',
  summary: '把状态更新收敛成可读、可测试的业务动作。',
  level: '入门',
  explanation: [
    {
      heading: 'Action 表达业务意图',
      paragraphs: [
        'action 不只是 setState 的包装。好的 action 名称应该描述用户或业务正在做什么，例如 addItem、removeItem、clearCart。',
        '组件触发 action 后，不需要知道内部是追加数组、合并数量还是过滤列表。这样组件更薄，store 更集中。',
      ],
    },
    {
      heading: '把规则放在 store 内',
      paragraphs: [
        '购物车示例里，重复添加同一商品时不新增一行，而是数量加一。这个规则属于购物车领域，应该靠 addItem 维护。',
        '如果多个组件都自己写这段规则，后续需求变化时会出现重复修改和行为不一致。',
      ],
    },
    {
      heading: '函数式更新更稳',
      paragraphs: [
        '当新状态依赖旧状态时，用 set((state) => ...) 更稳妥。它能确保读取的是当前 store 快照。',
        '直接 set({ items }) 适合不依赖旧值的场景，比如 clearCart。不同更新方式服务于不同语义。',
      ],
    },
  ],
  code: {
    title: '把购物车规则收敛到 Action',
    fileName: 'src/stores/useCartStore.ts',
    source: actionCode,
  },
  review: [
    {
      question: 'action 名称应该描述实现还是业务意图？',
      answer: '应该描述业务意图。addItem 比 setItemsWithSpread 更稳定，也更容易被组件理解。',
    },
    {
      question: '为什么重复商品数量加一的逻辑应该放在 store？',
      answer: '这是购物车业务规则，集中在 store 能避免多个组件重复实现并产生不一致。',
    },
    {
      question: '什么时候使用函数式 set？',
      answer: '当更新依赖旧状态时，例如数组追加、计数递增、根据现有字段计算新值。',
    },
  ],
}
