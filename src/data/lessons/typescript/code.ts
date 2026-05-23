import type { LessonCode } from '../types'

export const typescriptCode: LessonCode = {
  title: '带联合类型的任务 Store',
  snippet: `import { create } from 'zustand'

type Filter = 'all' | 'active' | 'done'

type Task = {
  id: string
  title: string
  done: boolean
}

type TaskState = {
  tasks: Task[]
  filter: Filter
  addTask: (title: string) => void
  setFilter: (filter: Filter) => void
  toggleTask: (id: string) => void
}

export const useTaskStore = create<TaskState>()((set) => ({
  tasks: [],
  filter: 'all',
  addTask: (title) =>
    set((state) => ({
      tasks: [...state.tasks, { id: crypto.randomUUID(), title, done: false }],
    })),
  // 联合类型限制 filter 只能是合法值。
  setFilter: (filter) => set({ filter }),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    })),
}))`,
}
