import type { Lesson } from './types'

export const testingLesson: Lesson = {
  id: 'testing',
  number: '19',
  title: 'Store 测试',
  summary: '直接调用 store API 测试 action 行为。',
  level: '实践',
  explanation: [
    {
      heading: 'store 可以脱离组件测试',
      paragraphs: [
        'Zustand store 本身不是 React 组件。很多 action 行为可以通过 getState 和 setState 直接测试，不需要渲染界面。',
        '这让状态规则的测试更快、更聚焦。组件测试则负责验证用户交互是否正确触发 action。',
      ],
    },
    {
      heading: '每个测试要重置状态',
      paragraphs: [
        'store 是模块级单例。如果一个测试修改了状态，下一个测试会继承这个状态，造成顺序依赖。',
        'beforeEach 里用 setState 恢复初始值，是测试 Zustand store 时最基本的隔离手段。',
      ],
    },
    {
      heading: '测试行为而不是实现',
      paragraphs: [
        '测试 increase 后 count 变为 1，比测试它内部是否调用了 set 更有价值。',
        'action 内部实现可以重构，但对外行为应该稳定。测试要保护这个行为契约。',
      ],
    },
  ],
  review: [
    {
      question: '为什么测试 store 不一定需要渲染 React？',
      answer: 'store 的 action 可以通过 getState 直接调用，状态结果也可以直接读取。',
    },
    {
      question: '为什么 beforeEach 要重置 store？',
      answer: 'Zustand store 通常是模块单例，不重置会让测试之间共享状态，造成顺序依赖。',
    },
    {
      question: '测试 action 时应该关注什么？',
      answer: '关注对外行为和状态结果，而不是内部是否用某种具体方式调用 set。',
    },
  ],
}
