import type { LessonCode } from '../types'

export const immerCode: LessonCode = {
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
}
