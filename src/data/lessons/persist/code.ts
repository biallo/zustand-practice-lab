import type { LessonCode } from '../types'

export const persistCode: LessonCode = {
  title: '只持久化长期偏好',
  snippet: `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SettingsState = {
  theme: 'light' | 'dark'
  fontSize: number
  draftText: string
  setTheme: (theme: SettingsState['theme']) => void
  setDraftText: (draftText: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 16,
      draftText: '',
      setTheme: (theme) => set({ theme }),
      setDraftText: (draftText) => set({ draftText }),
    }),
    {
      name: 'app-settings',
      // 只持久化长期偏好，避免把临时草稿也写进本地存储。
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
      }),
    },
  ),
)`,
}
