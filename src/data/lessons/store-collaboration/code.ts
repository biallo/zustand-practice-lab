import type { LessonCode } from '../types'

export const storeCollaborationCode: LessonCode = {
  title: '用协调动作处理跨 Store 行为',
  snippet: `type SessionState = {
  userId: string | null
  resetSession: () => void
}

type CartState = {
  items: string[]
  clearCart: () => void
}

export function logout() {
  // 用一个明确入口协调跨 store 清理，避免组件散落多个清理调用。
  useSessionStore.getState().resetSession()
  useCartStore.getState().clearCart()
  useDraftStore.getState().resetDraft()
}`,
}
