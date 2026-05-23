import type { LessonCode } from '../types'

export const introCode: LessonCode = {
  title: '最小可用的 Zustand Store',
  snippet: `import { create } from 'zustand'

type BearState = {
  bears: number
  increase: () => void
  reset: () => void
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,

  // set 接收局部 state；Zustand 会把对象结果浅合并到当前 store。
  increase: () => set((state) => ({ bears: state.bears + 1 })),

  // action 放在 store 里，组件只负责触发，不需要知道更新细节。
  reset: () => set({ bears: 0 }),
}))

export function BearCounter() {
  // selector 只订阅 bears；其他字段变化不会触发这个组件重新渲染。
  const bears = useBearStore((state) => state.bears)
  const increase = useBearStore((state) => state.increase)
  const reset = useBearStore((state) => state.reset)

  return (
    <section>
      <strong>{bears} bears</strong>
      <button onClick={increase}>+1</button>
      <button onClick={reset}>Reset</button>
    </section>
  )
}`,
}
