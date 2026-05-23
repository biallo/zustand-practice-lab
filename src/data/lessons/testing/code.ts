import type { LessonCode } from '../types'

export const testingCode: LessonCode = {
  title: '直接测试 Store 行为',
  snippet: `beforeEach(() => {
  // Zustand store 通常是模块单例，每个测试前要恢复初始状态。
  useCounterStore.setState({ count: 0 })
})

it('increases count', () => {
  useCounterStore.getState().increase()
  expect(useCounterStore.getState().count).toBe(1)
})

it('resets count', () => {
  useCounterStore.setState({ count: 5 })
  useCounterStore.getState().reset()
  expect(useCounterStore.getState().count).toBe(0)
})`,
}
