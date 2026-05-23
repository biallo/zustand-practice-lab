import type { LessonCode } from '../types'

export const ssrCode: LessonCode = {
  title: '用工厂函数创建 Store 实例',
  snippet: `import { createStore } from 'zustand/vanilla'

type CounterState = {
  count: number
  increase: () => void
}

export function createCounterStore(initialCount = 0) {
  // SSR 中每个请求应该创建自己的 store，避免用户数据互相串扰。
  return createStore<CounterState>()((set) => ({
    count: initialCount,
    increase: () => set((state) => ({ count: state.count + 1 })),
  }))
}`,
}
