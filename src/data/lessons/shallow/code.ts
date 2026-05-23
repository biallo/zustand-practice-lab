import type { LessonCode } from '../types'

export const shallowCode: LessonCode = {
  title: '用 useShallow 读取多个字段',
  snippet: `import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

type AccountState = {
  name: string
  email: string
  notifications: number
  setName: (name: string) => void
}

export const useAccountStore = create<AccountState>()((set) => ({
  name: 'Ada',
  email: 'ada@example.com',
  notifications: 0,
  setName: (name) => set({ name }),
}))

export function AccountHeader() {
  const { name, email } = useAccountStore(
    useShallow((state) => ({
      // selector 每次都会创建对象；useShallow 负责浅比较对象字段。
      name: state.name,
      email: state.email,
    })),
  )

  return <span>{name} · {email}</span>
}`,
}
