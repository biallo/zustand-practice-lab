import type { Lesson } from './types'

const immerCode = `import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type TreeNode = {
  id: string
  title: string
  selected: boolean
}

type TreeState = {
  nodes: TreeNode[]
  selectNode: (id: string) => void
  renameNode: (id: string, title: string) => void
}

export const useTreeStore = create<TreeState>()(
  immer((set) => ({
    nodes: [
      { id: 'root', title: 'Root', selected: true },
      { id: 'settings', title: 'Settings', selected: false },
    ],
    selectNode: (id) =>
      set((state) => {
        state.nodes.forEach((node) => {
          node.selected = node.id === id
        })
      }),
    renameNode: (id, title) =>
      set((state) => {
        const node = state.nodes.find((node) => node.id === id)
        if (node) {
          node.title = title
        }
      }),
  })),
)`

export const immerLesson: Lesson = {
  id: 'immer',
  number: '09',
  title: 'Immer 更新嵌套状态',
  summary: '在复杂对象更新里保持可读性，同时避免直接突变普通 state。',
  level: '进阶',
  explanation: [
    {
      heading: '嵌套更新容易变啰嗦',
      paragraphs: [
        '不用中间件时，更新嵌套对象需要一层层复制引用。对象越深，代码越难读，也越容易漏复制某一层。',
        'Immer 允许在 set 回调里写出类似突变的代码，但最终仍然生成不可变更新结果。',
      ],
    },
    {
      heading: '只在复杂场景引入',
      paragraphs: [
        '简单计数、简单数组追加不需要 Immer。直接返回新对象更清楚，也少一个概念。',
        '当状态包含多层对象、树结构或批量修改多个字段时，Immer 能明显降低代码噪音。',
      ],
    },
    {
      heading: '理解它不是直接突变',
      paragraphs: [
        '示例里 node.selected = true 看起来像直接改对象，但 Immer 会基于 draft 生成新状态。',
        '这和在普通 Zustand set 里直接修改 state 不一样。没有 Immer 时直接突变可能导致引用不变和渲染问题。',
      ],
    },
  ],
  code: {
    title: '用 Immer 简化树节点更新',
    fileName: 'src/stores/useTreeStore.ts',
    source: immerCode,
  },
  review: [
    {
      question: 'Immer 适合什么类型的状态？',
      answer: '适合多层嵌套对象、树结构、批量字段更新等手写不可变更新很啰嗦的场景。',
    },
    {
      question: '没有 Immer 时能直接修改 state 吗？',
      answer: '不应该。普通 set 里直接突变可能保持旧引用，导致订阅和渲染行为不可靠。',
    },
    {
      question: '为什么简单 store 不一定需要 Immer？',
      answer: '简单更新用对象或函数式 set 更直接，引入 Immer 反而增加学习和维护成本。',
    },
  ],
}
