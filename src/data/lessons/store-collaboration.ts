import type { Lesson } from './types'

export const storeCollaborationLesson: Lesson = {
  id: 'store-collaboration',
  number: '14',
  title: '多个 Store 的协作',
  summary: '处理跨 store 行为时保持边界清晰，避免互相强耦合。',
  level: '实践',
  explanation: [
    {
      heading: '多个 store 是正常选择',
      paragraphs: [
        '当状态生命周期和业务边界明显不同时，多个 store 往往比一个巨大 store 更清楚。',
        '例如 session 和 cart 可以分开维护。session 负责登录态，cart 负责商品列表，它们不应该共享内部实现细节。',
      ],
    },
    {
      heading: '跨 store 行为放在协调层',
      paragraphs: [
        '登出时清空购物车是跨领域行为。可以由 logout 触发，也可以放到 auth service 这类协调层里。',
        '关键是避免 store 初始化时互相 import、互相读取内部字段。依赖方向混乱后，测试和重构都会变难。',
      ],
    },
    {
      heading: '少做隐式联动',
      paragraphs: [
        '一个 store 变化后另一个 store 自动变化，看起来方便，但太多隐式联动会让状态来源难以追踪。',
        '优先使用命名明确的 action 表达跨 store 操作，例如 logoutAndClearSessionData，而不是散落多个 subscribe。',
      ],
    },
  ],
  review: [
    {
      question: '什么时候应该拆成多个 store？',
      answer: '当状态属于不同业务边界、生命周期不同，或经常独立维护时。',
    },
    {
      question: '跨 store 行为最大风险是什么？',
      answer: '互相强耦合和隐式联动，导致状态变化来源难以追踪。',
    },
    {
      question: '为什么推荐命名明确的协调 action？',
      answer: '它让跨 store 操作可搜索、可测试，也更容易被团队理解。',
    },
  ],
}
