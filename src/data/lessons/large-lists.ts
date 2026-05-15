import type { Lesson } from './types'

export const largeListsLesson: Lesson = {
  id: 'large-lists',
  number: '18',
  title: '大型列表与性能',
  summary: '在长列表中控制订阅范围，避免一次状态变化拖动整棵列表。',
  level: '实践',
  explanation: [
    {
      heading: '列表性能先看订阅范围',
      paragraphs: [
        '大型列表里最常见的问题是父组件读取整个 rows，然后把每个 row 作为 props 传给子组件。',
        '当某一行变化时，父组件先更新，所有子组件都可能被重新计算。数据量大时，这种结构很容易卡顿。',
      ],
    },
    {
      heading: '让行组件自己订阅',
      paragraphs: [
        '一种做法是父组件只负责渲染 id 列表，具体行组件按 id 从 store 里读取自己的数据。',
        '这样某一行变化时，理论上只有相关行需要更新。再配合 memo 或虚拟列表，性能边界会更清楚。',
      ],
    },
    {
      heading: '虚拟列表负责 DOM 数量',
      paragraphs: [
        'Zustand 可以减少无关 React 更新，但它不会减少 DOM 节点数量。几千行同时在页面上仍然会有布局和绘制成本。',
        '真实长列表通常还需要 react-window、TanStack Virtual 等虚拟列表库配合。',
      ],
    },
  ],
  review: [
    {
      question: '大型列表里父组件读取整个 rows 有什么风险？',
      answer: '任意一行变化都可能让父组件和大量子组件重新计算，数据量大时会明显影响性能。',
    },
    {
      question: '行组件自己订阅有什么好处？',
      answer: '订阅范围缩小到单行，某一行变化时更容易只更新相关组件。',
    },
    {
      question: 'Zustand 能替代虚拟列表吗？',
      answer: '不能。Zustand 控制状态订阅，虚拟列表控制 DOM 数量，两者解决的问题不同。',
    },
  ],
}
