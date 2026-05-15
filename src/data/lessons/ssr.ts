import type { Lesson } from './types'

export const ssrLesson: Lesson = {
  id: 'ssr',
  number: '20',
  title: 'SSR 与 Next.js 注意事项',
  summary: '理解服务端渲染场景下 store 单例、用户隔离和 hydration 风险。',
  level: '实践',
  explanation: [
    {
      heading: '浏览器单例不等于服务端安全',
      paragraphs: [
        'Vite 单页应用里，模块级 store 单例通常只服务一个用户的浏览器会话。',
        'SSR 服务器上，模块可能被多个请求复用。如果 store 里有用户数据，错误的单例会造成请求之间数据串扰。',
      ],
    },
    {
      heading: '每个请求创建 store',
      paragraphs: [
        'SSR 场景更安全的做法是用工厂函数创建 store。每个请求、每个用户拿到自己的 store 实例。',
        'zustand/vanilla 的 createStore 很适合这种模式，再通过 Provider 或上下文把实例传给客户端组件。',
      ],
    },
    {
      heading: 'hydration 要保持一致',
      paragraphs: [
        '服务端渲染出的初始状态，要和客户端接管时使用的初始状态一致。否则可能出现 hydration mismatch。',
        '持久化状态也要小心：localStorage 只在浏览器存在，服务端不能直接读取。',
      ],
    },
  ],
  review: [
    {
      question: 'SSR 中模块级 store 单例有什么风险？',
      answer: '服务器模块可能跨请求复用，带用户数据的单例可能造成不同用户之间的数据泄漏。',
    },
    {
      question: '为什么要用 createStore 工厂函数？',
      answer: '它能为每个请求或每个渲染上下文创建独立 store 实例，避免共享用户状态。',
    },
    {
      question: 'persist 在 SSR 中要注意什么？',
      answer: 'localStorage 只在浏览器存在，服务端不能直接访问，初始状态也要避免 hydration 不一致。',
    },
  ],
}
