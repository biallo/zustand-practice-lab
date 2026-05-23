import type { LessonCode } from '../types'

export const selectorsCode: LessonCode = {
  title: '用 Selector 缩小组件订阅范围',
  snippet: `import { create } from 'zustand'

type ProfileState = {
  name: string
  email: string
  theme: 'light' | 'dark'
  setName: (name: string) => void
  toggleTheme: () => void
}

export const useProfileStore = create<ProfileState>()((set) => ({
  name: 'Ada',
  email: 'ada@example.com',
  theme: 'light',
  setName: (name) => set({ name }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}))

export function ProfileName() {
  // 只订阅 name，theme 或 email 改变时不会因为无关字段重渲染。
  const name = useProfileStore((state) => state.name)
  return <strong>{name}</strong>
}

export function ThemeButton() {
  // action 引用是稳定的，单独订阅能让组件依赖更明确。
  const theme = useProfileStore((state) => state.theme)
  const toggleTheme = useProfileStore((state) => state.toggleTheme)

  return <button onClick={toggleTheme}>Theme: {theme}</button>
}`,
}
