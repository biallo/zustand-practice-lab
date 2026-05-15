import type { Lesson } from './types'

const selectorCode = `import { create } from 'zustand'

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
  // 只订阅 name，theme 或 email 改变时这个组件不会因为无关字段重渲染。
  const name = useProfileStore((state) => state.name)
  return <strong>{name}</strong>
}

export function ThemeButton() {
  const theme = useProfileStore((state) => state.theme)
  const toggleTheme = useProfileStore((state) => state.toggleTheme)

  return <button onClick={toggleTheme}>Theme: {theme}</button>
}`

export const selectorsLesson: Lesson = {
  id: 'selectors',
  number: '02',
  title: 'Selector 与渲染边界',
  summary: '学习如何只订阅需要的 state slice，减少无关更新。',
  level: '入门',
  explanation: [
    {
      heading: 'Selector 是订阅边界',
      paragraphs: [
        '在 Zustand 里，组件调用 store hook 时可以传入 selector。selector 的返回值就是这个组件订阅的状态片段。',
        '如果组件只需要 name，就不要读取整个 state。读取整个 state 会让组件对所有字段变化敏感，后续 store 增长时更容易出现无关渲染。',
      ],
    },
    {
      heading: '默认比较方式',
      paragraphs: [
        'Zustand 默认用严格相等比较 selector 的返回值。读取字符串、数字、布尔值或稳定的 action 引用时，这个默认行为通常足够。',
        '如果 selector 每次都返回新对象或新数组，即使里面的值没有变化，引用也会不同。此时组件仍然会重新渲染。',
      ],
    },
    {
      heading: '组合读取的取舍',
      paragraphs: [
        '一个组件可以多次调用同一个 store hook，分别读取多个字段。这样每个订阅都保持简单，适合初学和大多数业务组件。',
        '当确实需要一次返回多个字段时，可以后续引入 shallow 比较或自定义比较函数。本课先把边界意识建立起来。',
      ],
    },
  ],
  code: {
    title: '用 Selector 缩小组件订阅范围',
    fileName: 'src/stores/useProfileStore.ts',
    source: selectorCode,
  },
  review: [
    {
      question: '为什么不建议组件直接读取整个 store？',
      answer: '组件会订阅整个 state 对象，任何字段变化都可能触发它重新渲染，状态越多问题越明显。',
    },
    {
      question: 'selector 返回原始值有什么好处？',
      answer: '原始值可以用严格相等稳定比较，只有真正变化时才触发订阅组件更新。',
    },
    {
      question: '什么时候 selector 返回对象会有风险？',
      answer: '如果每次渲染都创建新对象，即使对象里的字段没变，引用也变了，组件仍会重新渲染。',
    },
  ],
}
