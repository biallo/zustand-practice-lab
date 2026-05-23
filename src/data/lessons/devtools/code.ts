import type { LessonCode } from '../types'

export const devtoolsCode: LessonCode = {
  title: '给状态变化命名',
  snippet: `import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CounterState = {
  count: number
  increase: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>()(
  devtools(
    (set) => ({
      count: 0,
      increase: () =>
        set((state) => ({ count: state.count + 1 }), false, 'counter/increase'),
      reset: () => set({ count: 0 }, false, 'counter/reset'),
    }),
    {
      // Redux DevTools 里显示的 store 名称。
      name: 'counter-store',
    },
  ),
)`,
}
