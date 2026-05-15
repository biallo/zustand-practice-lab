import type { LessonCode } from './types'

export const lessonCode: Record<string, LessonCode> = {
  intro: {
    title: '最小可用的 Zustand Store',
    snippet: `import { create } from 'zustand'

type BearState = {
  bears: number
  increase: () => void
  reset: () => void
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,

  // set 接收局部 state；Zustand 会把对象结果浅合并到当前 store。
  increase: () => set((state) => ({ bears: state.bears + 1 })),

  // action 放在 store 里，组件只负责触发，不需要知道更新细节。
  reset: () => set({ bears: 0 }),
}))

export function BearCounter() {
  // selector 只订阅 bears；其他字段变化不会触发这个组件重新渲染。
  const bears = useBearStore((state) => state.bears)
  const increase = useBearStore((state) => state.increase)
  const reset = useBearStore((state) => state.reset)

  return (
    <section>
      <strong>{bears} bears</strong>
      <button onClick={increase}>+1</button>
      <button onClick={reset}>Reset</button>
    </section>
  )
}`,
  },
  selectors: {
    title: '用 Selector 缩小组件订阅范围',
    snippet: `import { create } from 'zustand'

type ProfileState = {
  name: string
  email: string
  theme: 'light' | 'dark'
  setName: (name: string) => void
  toggleTheme: () => void
}

export const useProfileStore = create<ProfileState>()((set) => ({
  name: 'Ada',
  email: 'ada@example.com',
  theme: 'light',
  setName: (name) => set({ name }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}))

export function ProfileName() {
  // 只订阅 name，theme 或 email 改变时不会因为无关字段重渲染。
  const name = useProfileStore((state) => state.name)
  return <strong>{name}</strong>
}

export function ThemeButton() {
  // action 引用是稳定的，单独订阅能让组件依赖更明确。
  const theme = useProfileStore((state) => state.theme)
  const toggleTheme = useProfileStore((state) => state.toggleTheme)

  return <button onClick={toggleTheme}>Theme: {theme}</button>
}`,
  },
  shallow: {
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
  },
  actions: {
    title: '把购物车规则收敛到 Action',
    snippet: `import { create } from 'zustand'

type CartItem = {
  id: string
  name: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((entry) => entry.id === item.id)

      // 业务规则集中在 action 中：重复商品只增加数量。
      if (existing) {
        return {
          items: state.items.map((entry) =>
            entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
          ),
        }
      }

      return { items: [...state.items, { ...item, quantity: 1 }] }
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clearCart: () => set({ items: [] }),
}))`,
  },
  persist: {
    title: '只持久化长期偏好',
    snippet: `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SettingsState = {
  theme: 'light' | 'dark'
  fontSize: number
  draftText: string
  setTheme: (theme: SettingsState['theme']) => void
  setDraftText: (draftText: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 16,
      draftText: '',
      setTheme: (theme) => set({ theme }),
      setDraftText: (draftText) => set({ draftText }),
    }),
    {
      name: 'app-settings',
      // 只持久化长期偏好，避免把临时草稿也写进本地存储。
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
      }),
    },
  ),
)`,
  },
  async: {
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
  },
  'server-cache': {
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
  },
  vanilla: {
    title: '在请求工具中读取 Session',
    snippet: `import { create } from 'zustand'

type SessionState = {
  token: string | null
  setToken: (token: string | null) => void
  logout: () => void
}

export const useSessionStore = create<SessionState>()((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  logout: () => set({ token: null }),
}))

export async function authFetch(input: RequestInfo, init?: RequestInit) {
  // React 组件外不能用 hook，但可以用 getState 读取当前快照。
  const token = useSessionStore.getState().token

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: token ? 'Bearer ' + token : '',
    },
  })
}`,
  },
  'subscribe-with-selector': {
    title: '精确监听字段变化',
    snippet: `import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type PlayerState = {
  playing: boolean
  volume: number
  setPlaying: (playing: boolean) => void
  setVolume: (volume: number) => void
}

export const usePlayerStore = create<PlayerState>()(
  subscribeWithSelector((set) => ({
    playing: false,
    volume: 0.8,
    setPlaying: (playing) => set({ playing }),
    setVolume: (volume) => set({ volume }),
  })),
)

const unsubscribe = usePlayerStore.subscribe(
  (state) => state.volume,
  (volume, previousVolume) => {
    // 只有 volume 变化时触发；playing 变化不会执行这里。
    console.info('volume changed', previousVolume, '->', volume)
  },
)`,
  },
  typescript: {
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
  },
  devtools: {
    title: '给状态变化命名',
    snippet: `import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CounterState = {
  count: number
  increase: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>()(
  devtools(
    (set) => ({
      count: 0,
      increase: () =>
        set((state) => ({ count: state.count + 1 }), false, 'counter/increase'),
      reset: () => set({ count: 0 }, false, 'counter/reset'),
    }),
    {
      // Redux DevTools 里显示的 store 名称。
      name: 'counter-store',
    },
  ),
)`,
  },
  immer: {
    title: '用 Immer 简化树节点更新',
    snippet: `import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type TreeNode = {
  id: string
  title: string
  selected: boolean
}

type TreeState = {
  nodes: TreeNode[]
  selectNode: (id: string) => void
}

export const useTreeStore = create<TreeState>()(
  immer((set) => ({
    nodes: [
      { id: 'root', title: 'Root', selected: true },
      { id: 'settings', title: 'Settings', selected: false },
    ],
    selectNode: (id) =>
      set((state) => {
        // 这里修改的是 Immer draft，不是直接突变真实 state。
        state.nodes.forEach((node) => {
          node.selected = node.id === id
        })
      }),
  })),
)`,
  },
  slices: {
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
  },
  'store-collaboration': {
    title: '用协调动作处理跨 Store 行为',
    snippet: `type SessionState = {
  userId: string | null
  resetSession: () => void
}

type CartState = {
  items: string[]
  clearCart: () => void
}

export function logout() {
  // 用一个明确入口协调跨 store 清理，避免组件散落多个清理调用。
  useSessionStore.getState().resetSession()
  useCartStore.getState().clearCart()
  useDraftStore.getState().resetDraft()
}`,
  },
  reset: {
    title: '为 Store 提供 Reset',
    snippet: `import { create } from 'zustand'

type SessionState = {
  token: string | null
  userName: string | null
  setSession: (token: string, userName: string) => void
  resetSession: () => void
}

const initialSession = {
  token: null,
  userName: null,
}

export const useSessionStore = create<SessionState>()((set) => ({
  ...initialSession,
  setSession: (token, userName) => set({ token, userName }),
  // 初始化和 reset 复用同一份结构，避免新增字段后漏清理。
  resetSession: () => set(initialSession),
}))`,
  },
  forms: {
    title: '文章草稿 Store',
    snippet: `import { create } from 'zustand'

type DraftState = {
  title: string
  body: string
  dirty: boolean
  updateTitle: (title: string) => void
  updateBody: (body: string) => void
  resetDraft: () => void
}

const initialDraft = {
  title: '',
  body: '',
  dirty: false,
}

export const useDraftStore = create<DraftState>()((set) => ({
  ...initialDraft,
  // dirty 表示用户已经修改过草稿，可用于离开页面提示。
  updateTitle: (title) => set({ title, dirty: true }),
  updateBody: (body) => set({ body, dirty: true }),
  resetDraft: () => set(initialDraft),
}))`,
  },
  derived: {
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
  },
  'large-lists': {
    title: '让行组件按 id 订阅',
    snippet: `import { memo } from 'react'

const RowItem = memo(function RowItem({ id }: { id: string }) {
  // 每一行只订阅自己的数据，避免父组件读取整张表后带着所有行重渲染。
  const row = useTableStore((state) => state.rows.find((row) => row.id === id))
  const toggleRow = useTableStore((state) => state.toggleRow)

  if (!row) return null

  return (
    <button
      aria-pressed={row.selected}
      onClick={() => toggleRow(id)}
    >
      {row.title}
    </button>
  )
})`,
  },
  testing: {
    title: '直接测试 Store 行为',
    snippet: `beforeEach(() => {
  // Zustand store 通常是模块单例，每个测试前要恢复初始状态。
  useCounterStore.setState({ count: 0 })
})

it('increases count', () => {
  useCounterStore.getState().increase()
  expect(useCounterStore.getState().count).toBe(1)
})

it('resets count', () => {
  useCounterStore.setState({ count: 5 })
  useCounterStore.getState().reset()
  expect(useCounterStore.getState().count).toBe(0)
})`,
  },
  ssr: {
    title: '用工厂函数创建 Store 实例',
    snippet: `import { createStore } from 'zustand/vanilla'

type CounterState = {
  count: number
  increase: () => void
}

export function createCounterStore(initialCount = 0) {
  // SSR 中每个请求应该创建自己的 store，避免用户数据互相串扰。
  return createStore<CounterState>()((set) => ({
    count: initialCount,
    increase: () => set((state) => ({ count: state.count + 1 })),
  }))
}`,
  },
  architecture: {
    title: '按 Feature 组织 Store',
    snippet: `src/
  features/
    cart/
      store.ts
      CartPanel.tsx
      selectors.ts
    session/
      store.ts
      authFetch.ts
  stores/
    useUiStore.ts

// 强业务相关的状态靠近 feature。
// 横跨多个业务域的 UI 状态再放到 stores/。`,
  },
  'anti-patterns': {
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
  },
}
