import type { LessonCode } from '../types'

export const serverCacheCode: LessonCode = {
  title: '服务端数据与 UI 状态分工',
  snippet: `import { create } from 'zustand'
import { useQuery } from '@tanstack/react-query'

type UiState = {
  selectedTodoId: string | null
  selectTodo: (id: string | null) => void
}

export const useTodoUiStore = create<UiState>()((set) => ({
  selectedTodoId: null,
  selectTodo: (selectedTodoId) => set({ selectedTodoId }),
}))

export function TodoScreen() {
  // 服务端数据交给请求库管理缓存、重试、过期和重新请求。
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then((response) => response.json()),
  })

  // 客户端交互状态交给 Zustand。
  const selectedTodoId = useTodoUiStore((state) => state.selectedTodoId)

  return <pre>{JSON.stringify({ selectedTodoId, todos: todosQuery.data })}</pre>
}`,
}
