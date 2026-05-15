import type { Lesson } from './types'

export const slicesLesson: Lesson = {
  id: 'slices',
  number: '13',
  title: 'Slice 模式',
  summary: '把大型 store 拆成多个可组合的状态片段。',
  level: '进阶',
  explanation: [
    {
      heading: 'Slice 是组织方式',
      paragraphs: [
        'Slice 模式不是 Zustand 的必选功能，而是一种文件和代码组织方法。它把一个大 store 拆成多个业务片段。',
        '每个 slice 负责自己的 state 和 action，最后组合成一个完整 store。组件仍然从同一个 useAppStore 读取。',
      ],
    },
    {
      heading: '适合大型 store',
      paragraphs: [
        '当 store 开始包含用户、购物车、设置、通知等多个领域时，单文件会越来越难扫读。',
        'Slice 能让每个领域的更新规则靠近自己的字段，减少在巨大对象里上下滚动查找 action 的成本。',
      ],
    },
    {
      heading: '不要过早拆分',
      paragraphs: [
        '如果 store 只有几个字段，slice 会增加额外类型和组合代码。先保持简单，等边界真的出现再拆。',
        '拆分标准不是行数本身，而是业务领域是否清楚、维护者是否经常只改其中一个区域。',
      ],
    },
  ],
  review: [
    {
      question: 'Slice 模式解决什么问题？',
      answer: '它解决大型 store 的组织问题，让不同业务域的 state 和 action 有清晰维护边界。',
    },
    {
      question: '组件会感知 slice 的存在吗？',
      answer: '通常不会。组件仍然通过最终组合出的 useAppStore 使用 selector 和 action。',
    },
    {
      question: '什么时候不该使用 slice？',
      answer: 'store 很小时不必拆分。过早使用 slice 会让类型和组合代码比业务本身更复杂。',
    },
  ],
}
