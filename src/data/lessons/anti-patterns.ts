import type { Lesson } from './types'

export const antiPatternsLesson: Lesson = {
  id: 'anti-patterns',
  number: '22',
  title: '常见反模式',
  summary: '总结 Zustand 项目中最容易让状态变乱的写法。',
  level: '实践',
  explanation: [
    {
      heading: '把所有状态放进一个 store',
      paragraphs: [
        '一个 store 不是越大越好。无关状态混在一起，会让订阅范围、重置逻辑和测试都变复杂。',
        '按生命周期和业务边界拆分，比追求单一入口更重要。',
      ],
    },
    {
      heading: '读取过多状态',
      paragraphs: [
        '组件直接 useStore() 读取整个 store 是高风险写法。store 增长后，这个组件会被很多无关变化影响。',
        '优先写 selector，必要时使用 shallow。让组件明确表达自己依赖哪些字段。',
      ],
    },
    {
      heading: '持久化和派生值滥用',
      paragraphs: [
        'persist 整个 store 会把 loading、error、临时草稿等不该长期保存的状态写入浏览器。',
        '派生值重复存储会增加同步成本。能从原始事实计算出来的值，通常在读取阶段计算更稳。',
      ],
    },
  ],
  review: [
    {
      question: '为什么不建议组件 useStore() 读取整个 store？',
      answer: '它会让组件依赖所有字段，任何无关变化都可能触发重新渲染。',
    },
    {
      question: 'persist 整个 store 有什么问题？',
      answer: '会保存临时状态、错误状态或大对象，刷新后可能恢复出错误 UI。',
    },
    {
      question: '判断是否拆 store 的关键是什么？',
      answer: '看业务边界、生命周期和维护频率，而不是单纯看文件大小。',
    },
  ],
}
