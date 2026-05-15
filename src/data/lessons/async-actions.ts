import type { Lesson } from './types'

const asyncCode = `import { create } from 'zustand'

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
    set({ loading: true, error: null })

    try {
      const response = await fetch('/api/todos')
      if (!response.ok) {
        throw new Error('Failed to load todos')
      }

      const todos = (await response.json()) as Todo[]
      set({ todos, loading: false })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },
}))`

export const asyncActionsLesson: Lesson = {
  id: 'async',
  number: '05',
  title: '异步 Action',
  summary: '在 store 内组织请求、加载状态和错误状态。',
  level: '入门',
  explanation: [
    {
      heading: '异步 action 不需要特殊 API',
      paragraphs: [
        'Zustand 不关心 action 是同步还是异步。action 可以直接写成 async 函数，在请求开始、成功和失败时分别调用 set。',
        '这让异步流程和普通状态更新保持一致。组件只调用 fetchTodos，不需要自己拼接 loading、error 和 todos 的更新顺序。',
      ],
    },
    {
      heading: '显式建模请求状态',
      paragraphs: [
        '一个实用的异步 store 通常至少包含 data、loading 和 error。它们表达三个不同问题：已有数据是什么、请求是否进行中、失败原因是什么。',
        '不要只用空数组表示加载中或失败。空数组可能是真的没有数据，也可能是还没加载完成，语义会混乱。',
      ],
    },
    {
      heading: '错误处理也属于 action',
      paragraphs: [
        '请求失败时，store 应该把 loading 关掉，并写入可展示的错误信息。否则界面可能永远停留在加载状态。',
        '真实项目里还可以加入 retry、abort controller 或请求版本号，避免慢请求覆盖新请求。本课先掌握最基本的状态闭环。',
      ],
    },
  ],
  code: {
    title: '异步加载 Todo 列表',
    fileName: 'src/stores/useTodoStore.ts',
    source: asyncCode,
  },
  review: [
    {
      question: 'Zustand 里的 action 可以是 async 函数吗？',
      answer: '可以。它只是普通函数，可以 await 请求，并在合适时机调用 set 更新状态。',
    },
    {
      question: '为什么需要单独的 loading 字段？',
      answer: 'loading 表示请求是否进行中，不能用空数据替代，否则无法区分未加载、加载中和真实空结果。',
    },
    {
      question: 'catch 里为什么要设置 loading: false？',
      answer: '失败也是请求结束的一种结果。如果不关闭 loading，界面会一直显示加载状态。',
    },
  ],
}
