import type { LessonCode } from '../types'

export const slicesCode: LessonCode = {
  title: '把 App Store 拆成多个 Slice',
  snippet: `import { create, type StateCreator } from 'zustand'

type UserSlice = {
  userName: string
  setUserName: (userName: string) => void
}

type CartSlice = {
  itemCount: number
  addOne: () => void
}

type AppState = UserSlice & CartSlice

const createUserSlice: StateCreator<AppState, [], [], UserSlice> = (set) => ({
  userName: 'Ada',
  setUserName: (userName) => set({ userName }),
})

const createCartSlice: StateCreator<AppState, [], [], CartSlice> = (set) => ({
  itemCount: 0,
  addOne: () => set((state) => ({ itemCount: state.itemCount + 1 })),
})

export const useAppStore = create<AppState>()((...args) => ({
  ...createUserSlice(...args),
  ...createCartSlice(...args),
}))`,
}
