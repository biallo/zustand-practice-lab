import type { Lesson } from './types'

export const subscribeWithSelectorLesson: Lesson = {
  id: 'subscribe-with-selector',
  number: '09',
  title: 'subscribeWithSelector',
  summary: '在组件外精确订阅某个字段变化，避免监听整个 store。',
  level: '进阶',
  explanation: [
    {
      heading: '普通 subscribe 的限制',
      paragraphs: [
        '普通 subscribe 可以监听 store 变化，但如果不加选择器，很容易对所有变化都执行副作用。',
        '组件外副作用通常只关心某个字段，例如 volume、token 或连接状态。精确订阅能减少无关执行。',
      ],
    },
    {
      heading: 'subscribeWithSelector 做什么',
      paragraphs: [
        'subscribeWithSelector 让 subscribe 接收 selector 和 listener。只有 selector 的结果变化时，listener 才会触发。',
        'listener 同时能拿到新值和旧值，这很适合写日志、同步外部 SDK 或触发非 React 侧效果。',
      ],
    },
    {
      heading: '清理订阅',
      paragraphs: [
        'subscribe 会返回 unsubscribe。只要订阅不是应用全生命周期固定存在，就应该在合适时机清理。',
        '测试里尤其要注意清理，否则上一个测试留下的监听器可能影响下一个测试。',
      ],
    },
  ],
  review: [
    {
      question: 'subscribeWithSelector 相比普通 subscribe 的优势是什么？',
      answer: '它能订阅 selector 结果，只在关心的状态片段变化时触发 listener。',
    },
    {
      question: 'listener 为什么需要 previousValue？',
      answer: '旧值可以帮助判断变化方向、记录日志或执行只在特定转变发生时触发的副作用。',
    },
    {
      question: '为什么要保存 unsubscribe？',
      answer: '用于清理监听器，避免重复订阅和测试之间的状态污染。',
    },
  ],
}
