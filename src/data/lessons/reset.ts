import type { Lesson } from './types'

export const resetLesson: Lesson = {
  id: 'reset',
  number: '15',
  title: 'Reset 与登出清理',
  summary: '为 store 设计可重复调用的重置动作，处理登出和流程结束。',
  level: '实践',
  explanation: [
    {
      heading: 'reset 是显式生命周期',
      paragraphs: [
        '很多 store 都需要回到初始状态：登出、提交表单、关闭编辑器、离开向导流程。',
        '与其在多个组件里手动 set 多个字段，不如为 store 提供 reset action，让生命周期变化有一个明确入口。',
      ],
    },
    {
      heading: '初始状态要可复用',
      paragraphs: [
        '把 initialSession 抽成常量，可以保证初始化和 reset 使用同一份结构。',
        '如果初始值散落在 create 和 reset 里，后续新增字段时很容易忘记同步更新其中一处。',
      ],
    },
    {
      heading: '登出可能涉及多个 store',
      paragraphs: [
        '真实登出不只清 token。购物车、草稿、通知、权限缓存都可能需要清理。',
        '可以用一个 logout 函数作为协调入口，依次调用各 store 的 reset action，而不是让组件到处清理。',
      ],
    },
  ],
  review: [
    {
      question: '为什么 reset action 比组件里手动 set 多个字段更好？',
      answer: 'reset 集中表达状态生命周期，减少重复清理逻辑，也降低漏字段风险。',
    },
    {
      question: 'initialState 常量有什么价值？',
      answer: '初始化和重置复用同一份结构，新增字段时更不容易不一致。',
    },
    {
      question: '登出清理应该放在哪里？',
      answer: '适合放在命名明确的协调函数或 action 中，统一调用各 store 的 reset。',
    },
  ],
}
