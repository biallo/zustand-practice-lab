import type { Lesson } from './types'

export const devtoolsLesson: Lesson = {
  id: 'devtools',
  number: '11',
  title: 'Devtools 与调试',
  summary: '给状态变化命名，降低调试复杂度。',
  level: '进阶',
  explanation: [
    {
      heading: 'devtools 记录状态变化',
      paragraphs: [
        'devtools 中间件可以把 Zustand store 接入 Redux DevTools。你能看到 action 触发顺序和每次变化后的状态快照。',
        '当一个交互由多个组件触发时，DevTools 能帮助你判断到底是谁先改了状态、状态是否被意外覆盖。',
      ],
    },
    {
      heading: '给 action 命名',
      paragraphs: [
        'set 的第三个参数可以传入 action 名称。与其让工具显示 anonymous，不如用 counter/increase 这类稳定命名。',
        '命名建议采用领域加动作的格式，例如 cart/addItem、session/logout。这样在时间线上更容易扫描。',
      ],
    },
    {
      heading: '调试不是业务依赖',
      paragraphs: [
        'devtools 只应该辅助观察状态，不应该成为业务逻辑的一部分。组件不需要知道 store 是否接入调试工具。',
        '真实项目可以只在开发环境接入 devtools，避免生产环境暴露过多内部状态。',
      ],
    },
  ],
  review: [
    {
      question: 'devtools 主要解决什么问题？',
      answer: '它帮助观察 action 顺序和状态快照，适合定位复杂交互中的状态变化来源。',
    },
    {
      question: '为什么要给 set 传 action 名称？',
      answer: '稳定命名能让调试时间线更可读，避免出现大量匿名状态变化。',
    },
    {
      question: '组件需要知道 store 使用了 devtools 吗？',
      answer: '不需要。devtools 是 store 的调试增强，不应该影响组件调用 action 的方式。',
    },
  ],
}
