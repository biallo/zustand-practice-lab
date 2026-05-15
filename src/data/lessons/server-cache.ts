import type { Lesson } from './types'

export const serverCacheLesson: Lesson = {
  id: 'server-cache',
  number: '07',
  title: 'Zustand 与服务端缓存边界',
  summary: '区分客户端状态和服务端数据，不把所有数据都塞进 Zustand。',
  level: '进阶',
  explanation: [
    {
      heading: '服务端数据不是普通客户端状态',
      paragraphs: [
        '服务端数据有缓存时间、重新请求、失败重试、分页、失效和并发请求等问题。把这些都手写进 Zustand 会让 store 变重。',
        'React Query 或 SWR 这类库更擅长管理服务端缓存。Zustand 更适合管理客户端交互状态和业务本地状态。',
      ],
    },
    {
      heading: '边界怎么划分',
      paragraphs: [
        '从接口获取的 todos 列表属于服务端数据。当前选中的 todo id、弹窗是否打开、筛选面板状态属于客户端 UI 状态。',
        '边界清楚后，数据刷新、缓存失效和 optimistic update 都有更合适的位置，不会把一个 store 写成半个请求框架。',
      ],
    },
    {
      heading: '可以协作但不要混淆',
      paragraphs: [
        '组件可以同时使用 React Query 和 Zustand。一个负责远端数据，一个负责本地选择和交互状态。',
        '不要为了“统一状态管理”而强行用 Zustand 接管所有服务端缓存。统一不是目标，可维护才是目标。',
      ],
    },
  ],
  review: [
    {
      question: '为什么服务端数据不一定适合放进 Zustand？',
      answer: '它涉及缓存、过期、重试和重新请求等问题，专门的数据请求库处理起来更完整。',
    },
    {
      question: 'selectedTodoId 应该放在哪里？',
      answer: '它是客户端 UI 状态，适合放在 Zustand 或组件本地状态中。',
    },
    {
      question: 'React Query 和 Zustand 能一起用吗？',
      answer: '可以。它们负责不同类型的状态，组合使用比强行统一更清晰。',
    },
  ],
}
