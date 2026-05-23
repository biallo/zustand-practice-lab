import type { LessonCode } from '../types'

export const resetCode: LessonCode = {
  title: '为 Store 提供 Reset',
  snippet: `import { create } from 'zustand'

type SessionState = {
  token: string | null
  userName: string | null
  setSession: (token: string, userName: string) => void
  resetSession: () => void
}

const initialSession = {
  token: null,
  userName: null,
}

export const useSessionStore = create<SessionState>()((set) => ({
  ...initialSession,
  setSession: (token, userName) => set({ token, userName }),
  // 初始化和 reset 复用同一份结构，避免新增字段后漏清理。
  resetSession: () => set(initialSession),
}))`,
}
