import type { Lesson } from './types'

export const persistLesson: Lesson = {
  id: 'persist',
  number: '05',
  title: 'Persist 中间件',
  summary: '把学习进度、偏好设置等状态保存到本地存储。',
  level: '入门',
  explanation: [
    {
      heading: 'persist 解决刷新丢失',
      paragraphs: [
        '浏览器刷新后，普通内存状态会重置。persist 中间件会把指定状态写入存储，并在应用启动时恢复。',
        '学习进度、主题、字号、筛选偏好这类长期设置很适合持久化。临时输入、加载状态和错误状态通常不适合长期保存。',
      ],
    },
    {
      heading: 'name 是存储键',
      paragraphs: [
        'persist 的 name 会成为 localStorage 或其他 storage 里的 key。它应该稳定、明确，并且避免和其他 store 冲突。',
        '如果 name 改了，旧数据还在浏览器里，但新 store 不会再读取它。上线项目里改 name 等同于做一次数据迁移。',
      ],
    },
    {
      heading: 'partialize 控制持久化范围',
      paragraphs: [
        '不是 store 里的所有字段都应该持久化。partialize 可以挑选需要保存的字段，让持久化数据更小、更干净。',
        '示例里 draftText 是临时草稿，没有被持久化。这样刷新后偏好仍在，但临时内容不会意外保留。',
      ],
    },
  ],
  review: [
    {
      question: 'persist 的 name 为什么必须稳定？',
      answer: '它是存储里的 key。改名后旧数据不会被新 store 读取，可能造成用户数据看起来丢失。',
    },
    {
      question: 'partialize 的作用是什么？',
      answer: '它用来选择需要持久化的 state 字段，避免把临时状态、错误状态或大对象写入存储。',
    },
    {
      question: '哪些状态适合 persist？',
      answer: '长期偏好、学习进度、登录后可恢复的轻量设置适合；请求 loading 和临时错误不适合。',
    },
  ],
}
