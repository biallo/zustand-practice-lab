import type { Lesson } from './types'

const typescriptCode = `import { create } from 'zustand'

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
  setFilter: (filter) => set({ filter }),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    })),
}))`

export const typescriptLesson: Lesson = {
  id: 'typescript',
  number: '07',
  title: 'TypeScript 模型',
  summary: '为 state、action 和 selector 建立清晰类型。',
  level: '进阶',
  explanation: [
    {
      heading: '先定义 store shape',
      paragraphs: [
        'TypeScript 里的 Zustand store 最重要的是清楚定义 state 和 action 的形状。字段、参数和返回值都应该表达业务语义。',
        '示例中的 TaskState 同时包含数据 tasks、视图过滤 filter，以及操作这些数据的 action。',
      ],
    },
    {
      heading: 'create<State>()(...) 写法',
      paragraphs: [
        '常见写法是 create<State>()((set) => ...)。第一个括号给 Zustand 明确的状态类型，第二个括号提供初始化函数。',
        '这种写法能让 set、selector 和 action 参数获得更稳定的类型提示，尤其适合中间件组合后的 store。',
      ],
    },
    {
      heading: '联合类型限制输入',
      paragraphs: [
        'filter 使用联合类型 all、active、done，而不是任意 string。这样调用 setFilter 时只能传合法值。',
        '越靠近 store 边界，类型越应该收紧。组件传错值时能在编译阶段发现，而不是运行后才暴露。',
      ],
    },
  ],
  code: {
    title: '带联合类型的任务 Store',
    fileName: 'src/stores/useTaskStore.ts',
    source: typescriptCode,
  },
  review: [
    {
      question: '为什么要先定义 TaskState？',
      answer: '它集中描述 store 的数据和 action 契约，组件、测试和后续维护都可以依赖这个契约。',
    },
    {
      question: 'create<State>()(...) 的好处是什么？',
      answer: '它显式绑定 store 类型，让 set、selector 和 action 参数获得稳定的类型推导。',
    },
    {
      question: 'filter 为什么不用 string？',
      answer: '联合类型能限制合法输入，避免组件传入 unknown、archived 等 store 不支持的值。',
    },
  ],
}
