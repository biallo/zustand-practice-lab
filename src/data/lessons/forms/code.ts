import type { LessonCode } from '../types'

export const formsCode: LessonCode = {
  title: '文章草稿 Store',
  snippet: `import { create } from 'zustand'

type DraftState = {
  title: string
  body: string
  dirty: boolean
  updateTitle: (title: string) => void
  updateBody: (body: string) => void
  resetDraft: () => void
}

const initialDraft = {
  title: '',
  body: '',
  dirty: false,
}

export const useDraftStore = create<DraftState>()((set) => ({
  ...initialDraft,
  // dirty 表示用户已经修改过草稿，可用于离开页面提示。
  updateTitle: (title) => set({ title, dirty: true }),
  updateBody: (body) => set({ body, dirty: true }),
  resetDraft: () => set(initialDraft),
}))`,
}
