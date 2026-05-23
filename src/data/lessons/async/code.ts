import type { LessonCode } from '../types'

export const asyncCode: LessonCode = {
  title: '异步 Action 的状态闭环',
  snippet: `import { create } from 'zustand'

type Todo = {
  id: string
  title: string
  done: boolean
}

type TodoState = {
  todos: Todo[]
  loading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
}

export const useTodoStore = create<TodoState>()((set) => ({
  todos: [],
  loading: false,
  error: null,
  fetchTodos: async () => {
    // 请求开始：清理旧错误，并显式进入 loading。
    set({ loading: true, error: null })

    try {
      const response = await fetch('/api/todos')
      if (!response.ok) throw new Error('Failed to load todos')

      const todos = (await response.json()) as Todo[]
      set({ todos, loading: false })
    } catch (error) {
      // 失败也是请求结束，必须关闭 loading。
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },
}))`,
}
