import type { LessonCode } from '../types'

export const vanillaCode: LessonCode = {
  title: '在请求工具中读取 Session',
  snippet: `import { create } from 'zustand'

type SessionState = {
  token: string | null
  setToken: (token: string | null) => void
  logout: () => void
}

export const useSessionStore = create<SessionState>()((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  logout: () => set({ token: null }),
}))

export async function authFetch(input: RequestInfo, init?: RequestInit) {
  // React 组件外不能用 hook，但可以用 getState 读取当前快照。
  const token = useSessionStore.getState().token

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: token ? 'Bearer ' + token : '',
    },
  })
}`,
}
