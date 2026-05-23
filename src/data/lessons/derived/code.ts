import type { LessonCode } from '../types'

export const derivedCode: LessonCode = {
  title: '从 Todo 列表计算统计信息',
  snippet: `import { useMemo } from 'react'

export function TodoStats() {
  const todos = useTodoStore((state) => state.todos)

  const stats = useMemo(() => {
    const done = todos.filter((todo) => todo.done).length
    return {
      done,
      total: todos.length,
      active: todos.length - done,
    }
  }, [todos])

  return <span>{stats.done} / {stats.total} completed</span>
}`,
}
