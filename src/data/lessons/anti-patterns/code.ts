import type { LessonCode } from '../types'

export const antiPatternsCode: LessonCode = {
  title: '反模式与更好的写法',
  snippet: `// 反模式：读取整个 store，组件会响应所有字段变化。
const state = useAppStore()

// 更好：只读取需要的字段。
const userName = useAppStore((state) => state.userName)

// 反模式：把可计算值也存进 store，容易和原始数据不同步。
set({ todos, doneCount })

// 更好：存原始事实，读取时派生。
const doneCount = useTodoStore((state) =>
  state.todos.filter((todo) => todo.done).length,
)`,
}
