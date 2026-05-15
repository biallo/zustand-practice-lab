import type { Lesson } from './types'

const derivedCode = `import { useMemo } from 'react'
import { create } from 'zustand'

type Todo = {
  id: string
  title: string
  done: boolean
}

type TodoState = {
  todos: Todo[]
  toggleTodo: (id: string) => void
}

export const useTodoStore = create<TodoState>()((set) => ({
  todos: [],
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    })),
}))

export function TodoStats() {
  const todos = useTodoStore((state) => state.todos)

  const stats = useMemo(() => {
    const done = todos.filter((todo) => todo.done).length
    return { done, total: todos.length, active: todos.length - done }
  }, [todos])

  return <span>{stats.done} / {stats.total} completed</span>
}`

export const derivedLesson: Lesson = {
  id: 'derived',
  number: '12',
  title: '派生数据',
  summary: '把计算放在 selector 或组件 memo 中，避免重复 state。',
  level: '实践',
  explanation: [
    {
      heading: '派生值不一定要存',
      paragraphs: [
        'doneCount、activeCount、total 这类值都能从 todos 计算出来。它们通常不应该单独存进 store。',
        '重复存储派生值会带来同步问题：todos 改了，但 doneCount 忘记更新，界面就会展示矛盾数据。',
      ],
    },
    {
      heading: '读取阶段计算',
      paragraphs: [
        '当计算成本很低时，可以直接在 selector 或组件中计算。代码更少，也不会出现派生状态不同步。',
        '当计算稍重或返回对象时，可以在组件里结合 useMemo，让计算只在依赖变化时重新执行。',
      ],
    },
    {
      heading: '存储原始事实',
      paragraphs: [
        'store 应该优先保存业务事实，例如 todos 列表和每个 todo 的 done 字段。',
        '派生结果是视图需要的投影。把事实和投影分清楚，store 会更稳定，也更容易测试。',
      ],
    },
  ],
  code: {
    title: '从 Todo 列表计算统计信息',
    fileName: 'src/features/todos/TodoStats.tsx',
    source: derivedCode,
  },
  review: [
    {
      question: '为什么 doneCount 不一定要放进 store？',
      answer: '它可以从 todos 计算出来，重复存储会增加和原始数据不同步的风险。',
    },
    {
      question: '什么时候可以用 useMemo？',
      answer: '当派生计算相对复杂，且依赖变化不频繁时，useMemo 能减少重复计算。',
    },
    {
      question: 'store 更应该保存事实还是视图投影？',
      answer: '优先保存事实。视图投影通常在读取阶段计算，除非有明确缓存需求。',
    },
  ],
}
