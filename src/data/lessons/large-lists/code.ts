import type { LessonCode } from '../types'

export const largeListsCode: LessonCode = {
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
}
