import type { Lesson } from './types'

const architectureCode = `src/
  features/
    cart/
      store.ts
      CartPanel.tsx
      selectors.ts
    session/
      store.ts
      authFetch.ts
  stores/
    useUiStore.ts

// src/features/cart/store.ts
export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clearCart: () => set({ items: [] }),
}))

// src/features/cart/selectors.ts
export const selectCartCount = (state: CartState) => state.items.length`

export const architectureLesson: Lesson = {
  id: 'architecture',
  number: '14',
  title: '项目架构实践',
  summary: '决定 store 放在哪里、如何命名、如何控制增长。',
  level: '实践',
  explanation: [
    {
      heading: '按业务边界放 store',
      paragraphs: [
        '小项目可以把 store 放在 src/stores。项目变大后，更推荐把强业务相关的 store 放到对应 feature 目录。',
        '例如 cart/store.ts 和 cart/selectors.ts 靠近 CartPanel，比所有 store 都堆在 src/stores 更容易维护。',
      ],
    },
    {
      heading: '区分全局 UI 和业务状态',
      paragraphs: [
        '主题、侧栏展开、弹窗状态这类横跨多个业务域的状态，可以放在 useUiStore。',
        '购物车、会话、编辑器草稿这类有明确领域的状态，放在 feature 内部更好。这样业务删除或迁移时，相关状态也能一起移动。',
      ],
    },
    {
      heading: '控制 store 增长',
      paragraphs: [
        '一个 store 不应该无限增长。增长到难以快速理解时，先看是否出现多个生命周期或业务边界。',
        '拆分 store 的依据是边界，而不是追求文件数量。能一起变化、一起测试、一起删除的状态，可以放在一起。',
      ],
    },
  ],
  code: {
    title: '按 Feature 组织 Store',
    fileName: 'src/features/cart/store.ts',
    source: architectureCode,
  },
  review: [
    {
      question: '什么时候 store 应该放在 feature 目录？',
      answer: '当状态强依赖某个业务域，并且会随该业务一起维护、迁移或删除时。',
    },
    {
      question: '全局 UI 状态和业务状态为什么要区分？',
      answer: '它们生命周期和维护边界不同。混在一起会让 store 变成难以拆分的大对象。',
    },
    {
      question: '拆分 store 的依据是什么？',
      answer: '依据业务边界、生命周期和维护频率，而不是单纯依据文件行数。',
    },
  ],
}
