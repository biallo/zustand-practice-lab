import type { Lesson } from './types'

export const vanillaLesson: Lesson = {
  id: 'vanilla',
  number: '08',
  title: 'React 外访问 Store',
  summary: '掌握 getState、setState 和 subscribe 的非组件用法。',
  level: '进阶',
  explanation: [
    {
      heading: 'store hook 也带有工具方法',
      paragraphs: [
        'create 返回的不是只能在组件里用的 hook，它还带有 getState、setState 和 subscribe 等方法。',
        '这让你可以在请求工具、事件监听、调试脚本或非 React 模块里访问同一个 store，而不需要为了读取状态伪造组件。',
      ],
    },
    {
      heading: 'getState 是快照读取',
      paragraphs: [
        'getState 会立即返回当前 store 快照，但它不会建立 React 订阅。组件里仍然应该优先使用 hook 和 selector。',
        '请求拦截器、日志模块、一次性命令这类场景适合用 getState，因为它们需要的是当前值，而不是自动渲染。',
      ],
    },
    {
      heading: 'subscribe 适合副作用桥接',
      paragraphs: [
        'subscribe 可以监听状态变化，适合把 Zustand 状态桥接到非 React 世界，例如同步日志、连接状态或外部 SDK。',
        '订阅会返回取消订阅函数。长期运行的订阅要注意清理，否则在测试或动态模块中可能造成重复监听。',
      ],
    },
  ],
  review: [
    {
      question: 'getState 会让 React 组件重新渲染吗？',
      answer: '不会。getState 只是读取当前快照，React 组件需要通过 hook 订阅才会响应变化。',
    },
    {
      question: '为什么请求工具适合用 getState？',
      answer: '请求工具通常只需要发请求瞬间的 token，不需要和 React 渲染生命周期绑定。',
    },
    {
      question: 'subscribe 使用时要注意什么？',
      answer: '要保留并调用取消订阅函数，避免重复监听或测试之间互相影响。',
    },
  ],
}
